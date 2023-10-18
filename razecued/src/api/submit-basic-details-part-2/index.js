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
      response = await updateUser(requestBody.userId, requestBody.updateKey, requestBody.updateValue);
      break;
    case 'DELETE':
      response = await deleteUser(JSON.parse(event.body).userId);
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
    idurnValues: 'ALL_OLD'
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
      return buildResponse(500, 'Internal Server Error');
    });
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
    Item: {
      'id': requestBody.id, // Assuming id is present in the request body
      'email': requestBody.email,
      'user_name': requestBody.user_name,
      'user_phone': requestBody.user_phone,
      'user_collegeName': requestBody.user_collegeName,
      'user_collegeRollNo': requestBody.user_collegeRollNo,
      'user_passingYear': requestBody.user_passingYear,
      'user_gender': requestBody.user_gender,
      'user_dob': requestBody.user_dob,
      'user_age': requestBody.user_age,
      // Add other attributes as needed
    }
  };

  try {
    await dynamodb.put(params).promise();
    const body = {
      Operation: 'SAVE',
      Message: 'SUCCESS'
    };
    return buildResponse(200, body);
  } catch (error) {
    console.error(error);
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
