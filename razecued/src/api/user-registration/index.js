const AWS = require('aws-sdk');
const dynamodb = new AWS.DynamoDB();

exports.handler = async (event) => {
    const { request } = event;

    if (request && request.userAttributes) {
        const { sub: userId, email } = request.userAttributes;

        // Save user data to DynamoDB
        const params = {
            TableName: 'Users',
            Item: {
                'userId': { S: userId },
                'email': { S: email },
                // Add other attributes as needed
            },
        };

        try {
            await dynamodb.putItem(params).promise();
            console.log('User data saved successfully to DynamoDB');
        } catch (error) {
            console.error('Error saving user data to DynamoDB:', error);
        }
    }

    return event;
};
