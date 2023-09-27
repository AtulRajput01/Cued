const AWS = require('aws-sdk');
const { v4: uuidv4 } = require('uuid');
const bcrypt = require('bcrypt'); 

AWS.config.update({
  region: 'us-east-1',
});

const dynamoDBTableName = 'users';
const dynamodb = new AWS.DynamoDB.DocumentClient();

exports.handler = async (event) => {
  try {
    const { httpMethod, path } = event;

    if (httpMethod === 'POST' && path === '/api/register') {
      // Extract email and password from the request body
      const { email, password } = JSON.parse(event.body);

      // Check if the email is already in use
      const emailExists = await checkIfEmailExists(email);

      if (emailExists) {
        return {
          statusCode: 400,
          body: JSON.stringify({ success: false, message: 'Registration failed. Email already in use.' }),
        };
      }

      // Generate a unique user ID using uuid
      const userId = generateUniqueId();

      // Hash the password securely
      const hashedPassword = await hashPassword(password);

      // Save user data to your database
      await saveUserData(userId, email, hashedPassword);

      return {
        statusCode: 200,
        body: JSON.stringify({ success: true, message: 'Registration successful', data: { userId } }),
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

// Implement the logic to check if email already exists in your database
const checkIfEmailExists = async (email) => {
  // Simulated database query (replace with your actual database query)
  const params = {
    TableName: dynamoDBTableName,
    Key: {
      email,
    },
  };

  try {
    const result = await dynamodb.get(params).promise();

    return !!result.Item; // If an item with the email exists, return true.
  } catch (error) {
    console.error('Error checking email existence:', error);
    throw error;
  }
};

// Function to generate a unique user ID
const generateUniqueId = () => {
  return uuidv4();
};

// Function to securely hash the password
const hashPassword = async (password) => {
  // Use bcrypt to hash the password
  const saltRounds = 10; // Number of salt rounds, adjust as needed
  return bcrypt.hash(password, saltRounds);
};

// Function to save user data to the database
const saveUserData = async (userId, email, password) => {
  // Simulated database save (replace with  actual database save logic)
  const params = {
    TableName: 'users',
    Item: {
      userId,
      email,
      password,
    },
  };

  try {
    await dynamodb.put(params).promise();
  } catch (error) {
    console.error('Error saving user data:', error);
    throw error;
  }
};
