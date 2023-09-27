const AWS = require('aws-sdk');

AWS.config.update({
  region: 'us-east-1'
});

const dynamoDBTableName = 'users';
const dynamodb = new AWS.DynamoDB.DocumentClient();

exports.handler = async (event) => {
  let response;
  console.log(event);
  switch (event.httpMethod) {
    case 'POST':
      response = await saveUser(JSON.parse(event.body));
      break;
    case 'GET':
      if (event.path === '/api/fetch-registered-events') {
        response = await fetchRegisteredEvents();
      } else {
        response = await getUsers();
      }
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
    TableName: users,
    Key: {
      'id': id
    },
    ReturnValues: 'ALL_OLD'
  };
  try {
    const deletedUser = await dynamodb.delete(params).promise();
    const body = {
      Operation: 'DELETE',
      Message: 'SUCCESS',
      Item: deletedUser
    };
    return buildResponse(200, body);
  } catch (error) {
    console.error('Error deleting user:', error);
    return buildResponse(500, 'Internal Server Error');
  }
}

async function updateUser(id, updateKey, updateValue) {
  const params = {
    TableName: users,
    Key: {
      'id': id
    },
    UpdateExpression: `set ${updateKey} = :value`,
    ExpressionAttributeValues: {
      ':value': updateValue
    },
    ReturnValues: 'UPDATED_NEW'
  };
  try {
    const updatedUser = await dynamodb.update(params).promise();
    const body = {
      Operation: 'UPDATE',
      Message: 'SUCCESS',
      Item: updatedUser
    };
    return buildResponse(200, body);
  } catch (error) {
    console.error('Error updating user:', error);
    return buildResponse(500, 'Internal Server Error');
  }
}

async function getUsers() {
  const params = {
    TableName: dynamoDBTableName
  };
  try {
    const result = await dynamodb.scan(params).promise();
    const allUsers = result.Items;
    const body = {
      users: allUsers
    };
    return buildResponse(200, body);
  } catch (error) {
    console.error('Error fetching users:', error);
    return buildResponse(500, 'Internal Server Error');
  }
}

async function saveUser(requestBody) {
  const params = {
    TableName: users,
    Item: requestBody
  };
  try {
    await dynamodb.put(params).promise();
    const body = {
      Operation: 'SAVE',
      Message: 'SUCCESS',
      Item: requestBody
    };
    return buildResponse(200, body);
  } catch (error) {
    console.error('Error saving user:', error);
    return buildResponse(500, 'Internal Server Error');
  }
}

async function fetchRegisteredEvents() {
  const params = {
    TableName: users,
  };
  try {
    const result = await dynamodb.scan(params).promise();
    const registeredEvents = result.Items;
    return buildResponse(200, {
      success: true,
      message: 'Registered events fetched successfully',
      data: registeredEvents
    });
  } catch (error) {
    console.error('Error fetching registered events:', error);
    return buildResponse(500, 'Internal Server Error');
  }
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
