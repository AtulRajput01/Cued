const AWS = require('aws-sdk');

AWS.config.update({
  region: 'us-east-1'
});

const dynamoDBTableName = 'users'; 
const dynamodb = new AWS.DynamoDB.DocumentClient();

exports.handler = async (event) => {
  try {
    const { httpMethod, path } = event;

    if (httpMethod === 'GET' && path === '/api/fetch-registered-events') {
      // Implement the logic to fetch registered events
      const registeredEvents = await fetchRegisteredEvents();

      return {
        statusCode: 200,
        body: JSON.stringify({
          success: true,
          message: 'Registered events fetched successfully',
          data: registeredEvents,
        }),
      };
    } else {
      // Handle unknown or unsupported API endpoints
      return {
        statusCode: 404,
        body: JSON.stringify({ message: 'Not Found' }),
      };
    }
  } catch (error) {
    console.error(error);
    return {
      statusCode: 500,
      body: JSON.stringify({
        success: false,
        message: 'Internal server error.',
      }),
    };
  }
};

// Function to fetch registered events from DynamoDB
const fetchRegisteredEvents = async () => {
  const params = {
    TableName: dynamoDBTableName,
  };

  try {
    const result = await dynamodb.scan(params).promise();
    
    // Extract the relevant data from the result
    const registeredEvents = result.Items.map((item) => ({
      eventId: item.eventId,
      eventPoster: item.eventPoster,
      eventName: item.eventName,
      eventDescription: item.eventDescription,
    }));

    return registeredEvents;
  } catch (error) {
    console.error('Error fetching registered events:', error);
    throw error;
  }
};
