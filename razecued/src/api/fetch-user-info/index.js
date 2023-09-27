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
    const { httpMethod, path, queryStringParameters } = event;

    if (httpMethod === 'GET' && path === '/api/fetch-user-details') {
      const userId = queryStringParameters.userId;

      if (!userId) {
        return {
          statusCode: 400,
          body: JSON.stringify({ success: false, message: 'Missing userId parameter' }),
        };
      }

      // Implement the logic to fetch user details from your database based on userId
      const userDetails = await fetchUserInfo(userId);

      if (!userDetails) {
        return {
          statusCode: 404,
          body: JSON.stringify({ success: false, message: 'User not found' }),
        };
      }

      response = {
        statusCode: 200,
        body: JSON.stringify({
          success: true,
          message: 'User details fetched successfully',
          data: userDetails,
        }),
      };
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

// Function to fetch user details from the database based on userId
const fetchUserInfo = async (userId) => {
  const params = {
    TableName: users, //table name here
    Key: {
      userId: userId,
    },
  };

  try {
    const result = await dynamodb.get(params).promise();

    if (!result.Item) {
      // If the user is not found, return null or an appropriate response
      return null;
    }

    // Return the user data found in DynamoDB
    return result.Item;
  } catch (error) {
    console.error('Error fetching user info:', error);
    throw error;
  }
};
