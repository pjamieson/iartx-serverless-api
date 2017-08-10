import * as dynamoDbLib from './libs/dynamodb-lib';
import { success, failure } from './libs/response-lib';

export async function main(event, context, callback) {
  const params = {
    TableName: 'paintings',
    // 'KeyConditionExpression' defines the condition for the query
    // - 'sellerId = :sellerId': only return items with matching 'sellerId' partition key
    // 'ExpressionAttributeValues' defines the value in the condition
    // - ':sellerId': defines 'sellerId' to be Identity Pool identity id of the authenticated user
    KeyConditionExpression: "sellerId = :sellerId",
    ExpressionAttributeValues: {
      ":sellerId": event.requestContext.identity.cognitoIdentityId,
    }
  };

  try {
    const result = await dynamoDbLib.call('query', params);
    // Return the matching list of items in response body
    callback(null, success(result.Items));
  }
  catch(e) {
    callback(null, failure({status: false}));
  }
};
