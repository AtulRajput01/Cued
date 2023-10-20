const AWS = require('aws-sdk');
const dynamoDB = new AWS.DynamoDB.DocumentClient();

exports.handler = async () => {
  try {
    // Step 1: Retrieve the list of event IDs
    const eventIds = await getEventIds();

    // Step 2: Fetch the details of each event
    const eventsDetails = await Promise.all(eventIds.map(async (eventId) => {
      return await getEventDetails(eventId);
    }));

    // Step 3: Return the list of events to the client
    return buildResponse(200, { events: eventsDetails });
  } catch (error) {
    console.error('Error fetching events:', error);
    return buildResponse(500, 'Internal server error');
  }
};

async function getEventIds() {
  const params = {
    TableName: 'EventsUsers-uvz42cvcjncbnoq7sctsiqiqxy-dev',
  };

  const result = await dynamoDB.scan(params).promise();
  return result.Items.map(item => item.eventId);
}

async function getEventDetails(eventId) {
  const params = {
    TableName: 'Events-uvz42cvcjncbnoq7sctsiqiqxy-dev',
    Key: { id: eventId },
  };

  const result = await dynamoDB.get(params).promise();
  return result.Item;
}

function buildResponse(statusCode, data) {
  return {
    statusCode,
    body: JSON.stringify({
      success: statusCode === 200,
      data,
    }),
  };
}
