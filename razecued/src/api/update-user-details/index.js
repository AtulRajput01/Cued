const AWS = require('aws-sdk');

AWS.config.update({
  region: 'us-east-1',
});

const dynamoDBTableName = 'Users';
const dynamodb = new AWS.DynamoDB.DocumentClient();

exports.handler = async (event) => {
  try {
    const { httpMethod, path, requestContext } = event;

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

      // Use Cognito user ID as the unique identifier
      const userId = requestContext.authorizer.claims.sub;

      // Save user's basic details to DynamoDB
      await saveBasicDetails(userId, collegeName, collegeId, passingYear, aadharCard);

      return {
        statusCode: 200,
        body: JSON.stringify({ success: true, message: 'Basic details updated successfully', userId }),
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
const saveBasicDetails = async (userId, collegeName, collegeId, passingYear, aadharCard) => {
  // Prepare the item for DynamoDB
  const params = {
    TableName: 'Users',
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
  } catch (error) {
    console.error('Error saving user details:', error);
    throw error;
  }
};
