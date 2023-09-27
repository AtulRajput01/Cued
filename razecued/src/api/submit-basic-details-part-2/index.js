const AWS = require('aws-sdk');
const { v4: uuidv4 } = require('uuid');

AWS.config.update({
  region: 'us-east-1',
});

const dynamoDBTableName = 'users';
const dynamodb = new AWS.DynamoDB.DocumentClient();

exports.handler = async (event) => {
  try {
    const { httpMethod, path } = event;

    if (httpMethod === 'POST' && path === '/api/submit-basic-details-part-2') {
      const { age, gender, dateOfBirth, phoneNumber, alternatePhoneNumber } = JSON.parse(event.body);

      // Validate input data
      if (!age || !gender || !dateOfBirth || !phoneNumber) {
        return {
          statusCode: 400,
          body: JSON.stringify({ success: false, message: 'Invalid or missing input data' }),
        };
      }

      // Generate a unique user ID using UUID
      const userId = uuidv4();

      // Implement the logic to sanitize inputs (if necessary)

      // Implement the logic to save user basic details to your DynamoDB table
      await saveUserToDynamoDB(userId, age, gender, dateOfBirth, phoneNumber, alternatePhoneNumber);

      // Return a success response with the generated userId
      return {
        statusCode: 200,
        body: JSON.stringify({ success: true, message: 'Basic details submitted successfully', userId }),
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

// Function to save user details to DynamoDB
const saveUserToDynamoDB = async (userId, age, gender, dateOfBirth, phoneNumber, alternatePhoneNumber) => {
  const params = {
    TableName: dynamoDBTableName,
    Item: {
      userId,
      age,
      gender,
      dateOfBirth,
      phoneNumber,
      alternatePhoneNumber,
      // Add more user details as needed
    },
  };

  await dynamodb.put(params).promise();
};
