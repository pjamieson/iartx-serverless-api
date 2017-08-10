import uuid from 'uuid';
import * as dynamoDbLib from './libs/dynamodb-lib';
import { success, failure } from './libs/response-lib';

export async function main(event, context, callback) {
  const data = JSON.parse(event.body);
  const params = {
    TableName: 'paintings',
    Item: {
      sellerId: event.requestContext.identity.cognitoIdentityId,
      paintingId: uuid.v1(),
      title: data.title,
      primaryImage: data.primaryImage,
      createdAt: new Date().getTime(),
    },
  };

  try {
    const result = await dynamoDbLib.call('put', params);
    callback(null, success(params.Item));
  }
  catch(e) {
    //console.log(e);
    callback(null, failure({status: false}));
  }
};
