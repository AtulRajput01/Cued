const AWS = require('aws-sdk');
const bcrypt = require('bcrypt');

AWS.config.update({
  region: 'us-east-1',
});

const dynamoDBTableName = 'Users';
const dynamodb = new AWS.DynamoDB.DocumentClient();

exports.handler = async (event, context) => {
  try {
    const { triggerSource, request, response } = event;

    // Check if this is a Pre Sign-up trigger
    if (triggerSource === 'PreSignUp_SignUp') {
      const { username, userAttributes } = request;
      const { email, name } = userAttributes;

      // Check if the email is already in use
      const emailExists = await checkIfEmailExists(email);

      if (emailExists) {
        // Reject the registration if email already in use
        return {
          statusCode: 400,
          response: 'Registration failed. Email already in use.',
        };
      }

      // Generate a unique user ID using uuid 
      const userId = generateUniqueId();

      // Hash the password securely
      const hashedPassword = await hashPassword(userAttributes.password);

      // Save user data to your database
      await saveUserData(userId, email, hashedPassword, name);

      // Return the user attributes including the generated user ID
      return {
        statusCode: 200,
        response: {
          userAttributes: {
            ...userAttributes,
            sub: userId, // Include the generated user ID in user attributes
          },
        },
      };
    } else {
      // Handle other triggers if needed
      return {};
    }
  } catch (error) {
    console.error(error);
    return {
      statusCode: 500,
      response: 'Internal server error.',
    };
  }
};

// Implement the logic to check if email already exists in your database
const checkIfEmailExists = async (email) => {
  const params = {
    TableName: Users,
    IndexName: 'EmailIndex', // Assuming you have an index on the 'email' attribute
    KeyConditionExpression: 'email = :email',
    ExpressionAttributeValues: {
      ':email': email,
    },
  };

  try {
    const result = await dynamodb.query(params).promise();

    return result.Items.length > 0; // If items with the email exist, return true.
  } catch (error) {
    console.error('Error checking email existence:', error);
    throw error;
  }
};

// Function to generate a unique user ID
const generateUniqueId = () => {
  return 'u-' + Date.now(); // A simple example, you may use uuid or other methods
};

// Function to securely hash the password
const hashPassword = async (password) => {
  const saltRounds = 10; // Number of salt rounds, adjust as needed
  return bcrypt.hash(password, saltRounds);
};

// Function to save user data to the database
const saveUserData = async (userId, email, password, name) => {
  const params = {
    TableName: Users,
    Item: {
      userId,
      email,
      password,
      name,
    },
  };

  try {
    await dynamodb.put(params).promise();
  } catch (error) {
    console.error('Error saving user data:', error);
    throw error;
  }
};
