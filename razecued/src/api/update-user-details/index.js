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

    if (httpMethod === 'POST' && path === '/api/update-user-details') {
      // Extract request parameters from the request body
      const { collegeName, collegeId, passingYear, aadharCard } = JSON.parse(event.body);

      // Validate request parameters (you can add more validation logic as needed)
      if (!collegeName || !collegeId || !passingYear || !aadharCard) {
        return {
          statusCode: 400,
          body: JSON.stringify({ success: false, message: 'Submission failed. Please check your input.' }),
        };
      }

      // Save user's basic details to DynamoDB
      const userId = await saveBasicDetails(collegeName, collegeId, passingYear, aadharCard);

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

// Function to save user's basic details to DynamoDB
const saveBasicDetails = async (collegeName, collegeId, passingYear, aadharCard) => {
  // Generate a unique user ID using UUID
  const userId = uuidv4();

  // Prepare the item for DynamoDB
  const params = {
    TableName: dynamoDBTableName,
    Item: {
      userId,
      collegeName,
      collegeId,
      passingYear,
      aadharCard,
    },
  };

  // Save the user details to DynamoDB
  try {
    await dynamodb.put(params).promise();
    return userId;
  } catch (error) {
    console.error('Error saving user details:', error);
    throw error; 
  }
};
