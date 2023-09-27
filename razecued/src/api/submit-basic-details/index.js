const AWS = require('aws-sdk');
const { v4: uuidv4 } = require('uuid'); // Import the uuidv4 function

AWS.config.update({
  region: 'us-east-1', // Replace with your desired AWS region
});

const dynamoDBTableName = process.env.DYNAMODB_TABLE_NAME; // Use environment variable for DynamoDB table name
const dynamodb = new AWS.DynamoDB.DocumentClient();

exports.handler = async (event) => {
  try {
    const { httpMethod, path } = event;

    if (httpMethod === 'POST' && path === '/api/submit-basic-details') {
      // Extract request parameters from the request body
      const { collegeName, collegeId, passingYear, aadharCard } = JSON.parse(event.body);

      // Validate request parameters
      if (!collegeName || !collegeId || !passingYear || !aadharCard) {
        return buildResponse(400, { success: false, message: 'Submission failed. Please check your input.' });
      }

      // Generate a unique user ID using UUID
      const userId = uuidv4();

      // Save user's basic details to your database
      const savedUserId = await saveBasicDetails(userId, collegeName, collegeId, passingYear, aadharCard);

      if (!savedUserId) {
        return buildResponse(500, { success: false, message: 'Failed to save user details.' });
      }

      return buildResponse(200, { success: true, message: 'Basic details submitted successfully', userId });
    } else {
      // Handle unknown or unsupported API endpoints
      return buildResponse(404, { message: 'Not Found' });
    }
  } catch (error) {
    console.error(error);
    return buildResponse(500, { success: false, message: 'Internal server error.' });
  }
};

// Function to save user's basic details to the database
const saveBasicDetails = async (userId, collegeName, collegeId, passingYear, aadharCard) => {
  // Implement the logic to save user's basic details to your database
  // For DynamoDB, you can use the DocumentClient to put an item
  const params = {
    TableName: dynamoDBTableName,
    Item: {
      userId,
      collegeName,
      collegeId,
      passingYear,
      aadharCard,
      // Add more user details as needed
    },
  };

  try {
    await dynamodb.put(params).promise();
    return userId;
  } catch (error) {
    console.error('Error saving user details:', error);
    return null;
  }
};

// Function to build API response
const buildResponse = (statusCode, body) => {
  return {
    statusCode: statusCode,
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(body),
  };
};
