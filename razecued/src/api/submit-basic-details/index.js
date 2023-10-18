const AWS = require('aws-sdk');

AWS.config.update({
  region: 'us-east-1'
});

const dynamoDBTableName = 'Users-uvz42cvcjncbnoq7sctsiqiqxy-dev';
const dynamodb = new AWS.DynamoDB.DocumentClient();
const userPath = '/register-event-org';

exports.handler = async (event) => {
  let response;
  console.log(event);
  
  switch (event.httpMethod) {
    case 'POST':
      response = await saveUser(JSON.parse(event.body));
      break;
    case 'GET':
      response = await getUsers();
      break;
    case 'PUT':
      const requestBody = JSON.parse(event.body);
      response = await updateUser(requestBody.id, requestBody.updateKey, requestBody.updateValue);
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
  // Generate a unique ID
  const userId = generateUniqueId();

  // Update the requestBody with the generated ID
  requestBody.id = userId;

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

// Function to generate a unique ID
function generateUniqueId() {
  const timestamp = new Date().getTime().toString(36);
  const randomString = Math.random().toString(36).substring(2, 8);
  return timestamp + randomString;
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
