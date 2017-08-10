import AWS from 'aws-sdk';

AWS.config.update({region:'us-west-2'});

export function call(action, params) {
  const dynamoDb = new AWS.DynamoDB.DocumentClient();

  return dynamoDb[action](params).promise();
}

/*
Here we are using the promise form of the DynamoDB methods. Promises are a method
for managing asynchronous code that serve as an alternative to the standard callback
function syntax. It will make our code a lot easier to read.
*/
