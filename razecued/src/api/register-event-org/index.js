const AWS = require('aws-sdk');

AWS.config.update({
  region: 'us-east-1'
});

const dynamoDBTableName = 'Events';
const dynamodb = new AWS.DynamoDB.DocumentClient();
const userPath = '/register-event-org';

exports.handler = async (event) => {
  let response;
  console.log(event);
  
  switch (event.httpMethod) {
    case 'POST':
      // Generate a timestamp-based unique ID
      const timestampId = new Date().getTime().toString();
      // Add the unique ID to the request body
      const requestBody = JSON.parse(event.body);
      requestBody.Event_id = timestampId;
      response = await saveUser(requestBody);
      break;
    case 'GET':
      response = await getUsers();
      break;
    case 'PUT':
      const updateRequestBody = JSON.parse(event.body);
      response = await updateUser(updateRequestBody.id, updateRequestBody.updateKey, updateRequestBody.updateValue);
      break;
    case 'DELETE':
      response = await deleteUser(JSON.parse(event.body).id);
      break;
    
    default:
      response = buildResponse(404, '404 not found');
  }
  return response;
};

async function deleteUser(id) {
  const params = {
    TableName: dynamoDBTableName,
    Key: {
      'id': id
    },
    ReturnValues: 'ALL_OLD'
  };
  return await dynamodb.delete(params).promise()
    .then(response => {
      const body = {
        Operation: 'DELETE',
        Message: 'SUCCESS',
        Item: response
      }
      return buildResponse(200, body);
    })
    .catch((error) => {
      console.error(error);
    })
}

async function updateUser(id, updateKey, updateValue) {
  const params = {
    TableName: dynamoDBTableName,
    Key: {
      'id': id
    },
    UpdateExpression: `set ${updateKey} = :value`,
    ExpressionAttributeValues: {
      ':value': updateValue
    },
    ReturnValues: 'UPDATED_NEW'
  };
  return await dynamodb.update(params).promise()
    .then(response => {
      const body = {
        Operation: 'UPDATE',
        Message: 'SUCCESS',
        Item: response
      };
      return buildResponse(200, body);
    })
    .catch((error) => {
      console.error(error);
      return buildResponse(500, 'Internal Server Error');
    });
}

async function getUsers() {
  const params = {
    TableName: dynamoDBTableName
  };
  const allUsers = await dynamodb.scan(params).promise();
  const body = {
    users: allUsers
  };
  return buildResponse(200, body);
}

async function saveUser(requestBody) {
  const params = {
    TableName: dynamoDBTableName,
    Item: requestBody
  };
  return await dynamodb.put(params).promise().then(() => {
      const body = {
        Operation: 'SAVE',
        Message: 'SUCCESS',
        Item: requestBody
      };
      return buildResponse(200, body);
    })
    .catch((error) => {
      console.error(error);
      return buildResponse(500, 'Internal Server Error');
    });
}

function buildResponse(statusCode, body) {
  return {
    statusCode: statusCode,
    headers: {
      'Content-Type': 'application/json' 
    },
    body: JSON.stringify(body)
  };
}
