const AWS = require('aws-sdk');

AWS.config.update({
  region: 'us-east-1'
});

const dynamoDBTableName = 'users'; 
const dynamodb = new AWS.DynamoDB.DocumentClient();
const userPath = '/users';

exports.handler = async (event) => {
  let response;
  try {
    const { httpMethod, path } = event;

    if (httpMethod === 'GET' && path === '/api/fetch-event-details') {
      // Extract eventId from the query parameters
      const eventId = event.queryStringParameters.eventId;

      // Implement logic to fetch event details based on eventId
      const eventDetails = await fetchEventDetails(eventId);

      if (!eventDetails) {
        response = {
          statusCode: 404,
          body: JSON.stringify({ success: false, message: 'Event details not found' }),
        };
      } else {
        response = {
          statusCode: 200,
          body: JSON.stringify({
            success: true,
            message: 'Event details fetched successfully',
            data: eventDetails,
          }),
        };
      }
    } else {
      // Handle unknown or unsupported API endpoints
      response = {
        statusCode: 404,
        body: JSON.stringify({ message: 'Not Found' }),
      };
    }
  } catch (error) {
    console.error(error);
    response = {
      statusCode: 500,
      body: JSON.stringify({
        success: false,
        message: 'Internal server error.',
      }),
    };
  }

  return response;
};

// Function to fetch event details based on eventId
const fetchEventDetails = async (eventId) => {
  const params = {
    TableName: dynamoDBTableName,
    Key: {
      eventId: eventId,
    },
  };

  try {
    const result = await dynamodb.get(params).promise();

    if (!result.Item) {
      return null; // Event not found
    }

    // Return an object with event details
    return {
      eventPoster: result.Item.eventPoster,
      eventName: result.Item.eventName,
      eventOrganizer: result.Item.eventOrganizer,
      eventDescription: result.Item.eventDescription,
    };
  } catch (error) {
    console.error('Error fetching event details:', error);
    throw error;
  }
};
