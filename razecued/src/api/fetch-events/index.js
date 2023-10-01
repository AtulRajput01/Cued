const AWS = require('aws-sdk');
AWS.config.update({
  region: 'us-east-1',
});

const dynamoDBTableName = 'Events';
const dynamodb = new AWS.DynamoDB.DocumentClient();
const discoverPath = '/api/Discover';

exports.handler = async (event) => {
  let response;
  console.log(event);
  try {
    const { httpMethod, path } = event;

    if (httpMethod === 'GET' && path === discoverPath) {
      const eventType =
        event.queryStringParameters && event.queryStringParameters.type;

      if (!eventType || (eventType !== 'vertical' && eventType !== 'horizontal')) {
        return buildResponse(400, 'Invalid event type specified');
      }

      const eventData = await fetchEventData(eventType);

      response = {
        statusCode: 200,
        body: JSON.stringify({
          success: true,
          message: 'Events fetched successfully',
          data: eventData,
        }),
      };
    } else {
      response = buildResponse(404, 'Endpoint not found');
    }
  } catch (error) {
    console.error(error);
    response = buildResponse(500, 'Internal server error');
  }

  return response;
};

async function fetchEventData(eventType) {
  const params = {
    TableName: 'Events',
  };

  const result = await dynamodb.scan(params).promise();

  // Shuffle the events randomly
  const shuffledEvents = shuffleArray(result.Items);

  // Split the shuffled events into vertical and horizontal based on index
  const verticalEvents = shuffledEvents.filter((_, index) => index % 2 === 0);
  const horizontalEvents = shuffledEvents.filter((_, index) => index % 2 === 1);

  // Return events based on the specified event type
  return eventType === 'vertical' ? verticalEvents : horizontalEvents;
}

// Function to shuffle an array randomly
function shuffleArray(array) {
  for (let i = array.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [array[i], array[j]] = [array[j], array[i]];
  }
  return array;
}

function buildResponse(statusCode, message) {
  return {
    statusCode,
    body: JSON.stringify({
      success: statusCode === 200,
      message,
    }),
  };
}
