import * as dynamoDbLib from './libs/dynamodb-lib';
import { success, failure } from './libs/response-lib';

export async function main(event, context, callback) {
  const params = {
    TableName: 'paintings',
    // 'Key' defines the partition key and sort key of the item to be retrieved
    // - 'sellerId': Identity Pool identity id of the authenticated user
    // - 'paintingId': path parameter
    Key: {
      sellerId: event.requestContext.identity.cognitoIdentityId,
      paintingId: event.pathParameters.id,
    },
  };

  try {
    const result = await dynamoDbLib.call('get', params);
    if (result.Item) {
      // Return the retrieved item
      callback(null, success(result.Item));
    }
    else {
      callback(null, failure({status: false, error: 'Item not found.'}));
    }
  }
  catch(e) {
    callback(null, failure({status: false}));
  }
};
