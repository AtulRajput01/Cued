const AWS = require('aws-sdk');

AWS.config.update({
  region: 'us-east-1'
});

const dynamoDBTableName = 'users';
const dynamodb = new AWS.DynamoDB.DocumentClient();
const userPath = '/users';

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

async function saveUser(requestBody) {
  const params = {
    TableName: dynamoDBTableName,
    Item: requestBody
  };
  return await dynamodb.put(params).promise()
    .then(() => {
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

async function fetchRegisteredEvents() {
  // Logic to fetch registered events
  const eventData = [
    {
      "eventId": "1",
      "eventPoster": "https.//poster.jpg",
      "eventName": "Music Festival",
      "eventDescription": "Join us for a night of music and fun."
    },
    {
      "eventId": "2",
      "eventPoster": "https.//poster.jpg",
      "eventName": "Art Exhibition",
      "eventDescription": "Explore beautiful artworks from local artists."
    }
  ];

  const body = {
    success: true,
    message: "Registered events fetched successfully",
    data: eventData
  };

  return buildResponse(200, body);
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

// Other existing functions...

function buildResponse(statusCode, body) {
  return {
    statusCode: statusCode,
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(body)
  };
}
