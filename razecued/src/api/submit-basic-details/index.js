const AWS = require('aws-sdk');

AWS.config.update({
  region: 'us-east-1',
});

const dynamoDBTableName = process.env.Users;
const dynamodb = new AWS.DynamoDB.DocumentClient();

exports.handler = async (event) => {
  try {
    const { httpMethod, path, requestContext } = event;

    if (httpMethod === 'POST' && path === '/api/submit-basic-details') {
      const { collegeName, collegeId, passingYear, aadharCard } = JSON.parse(event.body);

      if (!collegeName || !collegeId || !passingYear || !aadharCard) {
        return buildResponse(400, { success: false, message: 'Submission failed. Please check your input.' });
      }

      const userId = requestContext.authorizer.claims.sub; // Retrieve Cognito user ID

      const savedUserId = await saveBasicDetails(userId, collegeName, collegeId, passingYear, aadharCard);

      if (!savedUserId) {
        return buildResponse(500, { success: false, message: 'Failed to save user details.' });
      }

      return buildResponse(200, { success: true, message: 'Basic details submitted successfully', userId });
    } else {
      return buildResponse(404, { message: 'Not Found' });
    }
  } catch (error) {
    console.error(error);
    return buildResponse(500, { success: false, message: 'Internal server error.' });
  }
};

const saveBasicDetails = async (userId, collegeName, collegeId, passingYear, aadharCard) => {
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

  try {
    await dynamodb.put(params).promise();
    return userId;
  } catch (error) {
    console.error('Error saving user details:', error);
    return null;
  }
};

const buildResponse = (statusCode, body) => {
  return {
    statusCode: statusCode,
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(body),
  };
};
