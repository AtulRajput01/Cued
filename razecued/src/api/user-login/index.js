const AWS = require('aws-sdk');
const crypto = require('crypto');

AWS.config.update({
  region: 'us-east-1'
});

const dynamoDBTableName = 'Users';
const dynamodb = new AWS.DynamoDB.DocumentClient();

exports.handler = async (event) => {
  try {
    const { httpMethod, path } = event;

    if (httpMethod === 'POST' && path === '/api/login') {
      // Extract email and password from the request body
      const { email, password } = JSON.parse(event.body);

      // Validate input data (email and password)
      if (!email || !password) {
        return {
          statusCode: 400,
          body: JSON.stringify({ success: false, message: 'Invalid or missing input data' }),
        };
      }

      // Retrieve the user by email
      const user = await getUserByEmail(email);

      if (!user) {
        return {
          statusCode: 401,
          body: JSON.stringify({ success: false, message: 'Login failed. Incorrect email or password.' }),
        };
      }

      // Verify the password
      if (!verifyPassword(password, user.password)) {
        return {
          statusCode: 401,
          body: JSON.stringify({ success: false, message: 'Login failed. Incorrect email or password.' }),
        };
      }

      // Return the user ID
      return {
        statusCode: 200,
        body: JSON.stringify({ success: true, message: 'Login successful', data: { userId: user.userId } }),
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

// Function to retrieve the user by email
const getUserByEmail = async (email) => {
  const params = {
    TableName: 'Users',
    IndexName: 'EmailIndex', // Replace with your index name if applicable
    KeyConditionExpression: 'email = :email',
    ExpressionAttributeValues: {
      ':email': email,
    },
  };

  const result = await dynamodb.query(params).promise();
  return result.Items[0] || null;
};

// Function to verify the password using a simple SHA-256 hash
const verifyPassword = (inputPassword, hashedPassword) => {
  const hash = crypto.createHash('sha256');
  hash.update(inputPassword);
  const hashedInputPassword = hash.digest('hex');
  return hashedInputPassword === hashedPassword;
};
