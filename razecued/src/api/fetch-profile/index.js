const AWS = require('aws-sdk');
const dynamoDB = new AWS.DynamoDB.DocumentClient();

exports.handler = async () => {
  try {
    // Step 1: Retrieve the list of user IDs
    const userIds = await getUserIds();

    // Step 2: Fetch the details of each user
    const usersDetails = await Promise.all(userIds.map(async (userId) => {
      return await getUserDetails(userId);
    }));

    // Step 3: Return the list of users to the client
    return buildResponse(200, { users: usersDetails });
  } catch (error) {
    console.error('Error fetching data:', error);
    return buildResponse(500, 'Internal server error');
  }
};

async function getUserIds() {
  const params = {
    TableName: 'Users-uvz42cvcjncbnoq7sctsiqiqxy-dev',
  };

  const result = await dynamoDB.scan(params).promise();
  return result.Items.map(item => item.id);
}

async function getUserDetails(userId) {
  const params = {
    TableName: 'Users-uvz42cvcjncbnoq7sctsiqiqxy-dev',
    Key: { id: userId },
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
