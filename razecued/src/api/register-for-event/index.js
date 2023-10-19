const AWS = require('aws-sdk');
const dynamoDB = new AWS.DynamoDB.DocumentClient();

exports.handler = async (event) => {
  try {
    const { id: userId, id: eventId } = JSON.parse(event.body);

    // Fetch event details to ensure it exists
    const eventDetails = await getEventDetails(eventId);

    if (!eventDetails) {
      return buildResponse(404, 'Event not found');
    }

    // Update user's record in the Users DynamoDB table
    await updateUserEvents(userId, eventId);

    return buildResponse(200, 'User registered for the event successfully');
  } catch (error) {
    console.error('Error registering user for event:', error);
    return buildResponse(500, 'Internal server error');
  }
};

async function getEventDetails(eventId) {
  const params = {
    TableName: 'Events-uvz42cvcjncbnoq7sctsiqiqxy-dev',
    Key: { id: eventId },
  };

  const result = await dynamoDB.get(params).promise();
  return result.Item;
}

async function updateUserEvents(userId, eventId) {
  const userParams = {
    TableName: 'Users-uvz42cvcjncbnoq7sctsiqiqxy-dev',
    Key: { id: userId },
    UpdateExpression: 'SET #events = list_append(if_not_exists(#events, :emptyList), :event)',
    ExpressionAttributeNames: { '#events': 'events' },
    ExpressionAttributeValues: {
      ':emptyList': [],
      ':event': [eventId],
    },
  };

  await dynamoDB.update(userParams).promise();
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
