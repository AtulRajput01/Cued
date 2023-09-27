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
  try {
    const { httpMethod, path } = event;

    if (httpMethod === 'GET' && path === '/api/fetch-events') {
      const eventData = fetchEventData();

      response = {
        statusCode: 200,
        body: JSON.stringify({
          success: true,
          message: 'Events fetched successfully',
          data: eventData,
        }),
      };
    } else if (httpMethod === 'POST') {
      const requestBody = JSON.parse(event.body);
      if (requestBody.action === 'saveUser') {
        response = await saveUser(requestBody.user);
      } else {
        response = buildResponse(400, 'Invalid action');
      }
    } else if (httpMethod === 'GET') {
      response = await getUsers();
    } else if (httpMethod === 'PUT') {
      const requestBody = JSON.parse(event.body);
      response = await updateUser(requestBody.id, requestBody.updateKey, requestBody.updateValue);
    } else if (httpMethod === 'DELETE') {
      const requestBody = JSON.parse(event.body);
      response = await deleteUser(requestBody.id);
    } else {
      response = buildResponse(404, 'Endpoint not found');
    }
  } catch (error) {
    console.error(error);
    response = buildResponse(500, 'Internal server error');
  }

  return response;
};

// Function to fetch event data
const fetchEventData = () => {
  // logic to fetch event data
  // Return an array of objects representing events
  return [
    {
      eventId: "1",
      eventName: "Music Festival",
      eventLocation: "City Park",
      eventDate: "2023-12-15",
      eventDescription: "Club Event",
      registrationStatus: true,
      eventPoster: "https://example.com/poster.jpg",
    },
    {
      eventId: "2",
      eventName: "Tech Conference",
      eventLocation: "Convention Center",
      eventDate: "2024-01-20",
      eventDescription: "Coding Event",
      registrationStatus: false,
      eventPoster: "https://example.com/poster.jpg",
    },
    // ...other events
  ];
};

// Helper function to build consistent responses
const buildResponse = (statusCode, message) => {
  return {
    statusCode,
    body: JSON.stringify({
      success: statusCode === 200,
      message,
    }),
  };
};
