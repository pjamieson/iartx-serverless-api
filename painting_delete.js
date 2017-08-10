import * as dynamoDbLib from './libs/dynamodb-lib';
import { success, failure } from './libs/response-lib';

export async function main(event, context, callback) {
  const params = {
    TableName: 'paintings',
    // 'Key' defines the partition key and sort key of the item to be removed
    // - 'sellerId': Identity Pool identity id of the authenticated user
    // - 'paintingId': path parameter
    Key: {
      sellerId: event.requestContext.identity.cognitoIdentityId,
      paintingId: event.pathParameters.id,
    },
  };

  try {
    const result = await dynamoDbLib.call('delete', params);
    callback(null, success({status: true}));
  }
  catch(e) {
    callback(null, failure({status: false}));
  }
};
