import * as dynamoDbLib from './libs/dynamodb-lib';
import { success, failure } from './libs/response-lib';

export async function main(event, context, callback) {
  const data = JSON.parse(event.body);
  const params = {
    TableName: 'paintings',
    // 'Key' defines the partition key and sort key of the item to be updated
    // - 'sellerId': Identity Pool identity id of the authenticated user
    // - 'noteId': path parameter
    Key: {
      sellerId: event.requestContext.identity.cognitoIdentityId,
      paintingId: event.pathParameters.id,
    },
    // 'UpdateExpression' defines the attributes to be updated
    // 'ExpressionAttributeValues' defines the value in the update expression
    UpdateExpression: 'SET title = :title, primaryImage = :primaryImage',
    ExpressionAttributeValues: {
      ':primaryImage': data.primaryImage ? data.primaryImage : null,
      ':title': data.title ? data.title : null,
    },
    ReturnValues: 'ALL_NEW',
  };

  try {
    const result = await dynamoDbLib.call('update', params);
    callback(null, success({status: true}));
  }
  catch(e) {
    callback(null, failure({status: false}));
  }
};
