const AWS = require('aws-sdk');
const QRCode = require('qrcode');
const s3 = new AWS.S3();
const dynamoDB = new AWS.DynamoDB.DocumentClient();

exports.handler = async () => {
  try {
    // Step 1: Retrieve the list of eventUser items
    const eventUsers = await getEventUsers();

    // Step 2: Fetch the details of each event and generate QR code
    const eventsDetails = await Promise.all(eventUsers.map(async (eventUser) => {
      const eventDetails = await getEventDetails(eventUser.eventId);
      const userId = eventUser.userId; // Get user ID from eventUser table
      const userInformation = await getUserInformation(userId); // Fetch user information
      const userEmail = await getUserEmail(userId); // Fetch user email
      userInformation.email = userEmail; // Add email to user information
      const qrCodeUrl = await generateAndUploadQRCode(userId, eventUser.eventId, eventUser.id, eventDetails, userInformation);
      eventDetails.qrCodeUrl = qrCodeUrl;

      // Log or print user information
      console.log('User Information:', userInformation);

      return eventDetails;
    }));

    // Step 3: Return the list of events with QR code URLs to the client
    return buildResponse(200, { events: eventsDetails });
  } catch (error) {
    console.error('Error fetching events:', error);
    return buildResponse(500, 'Internal server error');
  }
};

async function getEventUsers() {
  const params = {
    TableName: 'EventsUsers-uvz42cvcjncbnoq7sctsiqiqxy-dev',
  };

  const result = await dynamoDB.scan(params).promise();
  return result.Items;
}

async function getEventDetails(eventId) {
  const params = {
    TableName: 'Events-uvz42cvcjncbnoq7sctsiqiqxy-dev',
    Key: { id: eventId },
  };

  const result = await dynamoDB.get(params).promise();
  return result.Item;
}

// ...

async function getUserInformation(userId) {
  try {
    const params = {
      TableName: 'user_data',
      Key: { userId },
    };

    const result = await dynamoDB.get(params).promise();
    return result.Item || {}; // Return an empty object if result.Item is undefined
  } catch (error) {
    console.error('Error fetching user information:', error);
    throw error;
  }
}

async function getUserEmail(userId) {
  try {
    const params = {
      TableName: 'Users',
      Key: { userId },
    };

    const result = await dynamoDB.get(params).promise();
    return result.Item ? result.Item.email : ''; // Return an empty string if result.Item or result.Item.email is undefined
  } catch (error) {
    console.error('Error fetching user email:', error);
    throw error;
  }
}

async function generateAndUploadQRCode(userId, eventId, eventUserId, eventDetails, userInformation) {
  try {
    // Extract relevant information from the eventDetails and userInformation objects
    const { eventName, eventDate, eventOrganizer } = eventDetails;
    const { age, collegeRollNo, dateOfBirth, gender, name, passingYear, phone, email, collegeName } = userInformation || {};

    // Include user and event information in the QR code data
    const qrCodeData = `Name: ${name || 'N/A'}\nAge: ${age || 'N/A'}\nCollege Name: ${collegeName || 'N/A'}\nCollege Roll No: ${collegeRollNo || 'N/A'}\nDate of Birth: ${dateOfBirth || 'N/A'}\nGender: ${gender || 'N/A'}\nPassing Year: ${passingYear || 'N/A'}\nPhone: ${phone || 'N/A'}\nEmail: ${email || 'N/A'}\nEvent Name: ${eventName}\nEvent Date: ${eventDate}\nEvent Organizer: ${eventOrganizer}`;

    // Generate a QR code with customization options
    const options = {
      type: 'png',
      color: {
        dark: '#000000',  // Set the color of the QR code
        light: '#ffffff', // Set the background color
      },
      errorCorrectionLevel: 'H', // Set error correction level (L, M, Q, H)
    };

    // Increase the size of the QR code (adjust as needed)
    const size = 370;

    // Generate QR code buffer
    const qrCodeBuffer = await QRCode.toBuffer(qrCodeData, { ...options, width: size, height: size });

    // Specify the S3 bucket and object key
    const bucketName = 'users-bucket-qr';
    const objectKey = `qr-codes/${userId}-${eventId}-${eventUserId}.png`;

    // Upload the QR code to S3
    await s3.putObject({
      Bucket: bucketName,
      Key: objectKey,
      Body: qrCodeBuffer,
      ContentType: 'image/png',
    }).promise();

    // Return the S3 URL of the uploaded QR code
    const s3Url = `https://${bucketName}.s3.amazonaws.com/${objectKey}`;
    return s3Url;
  } catch (error) {
    console.error('Error generating or uploading QR Code:', error);
    throw error; // Propagate the error
  }
}

function buildResponse(statusCode, data) {
  return {
    statusCode,
    body: JSON.stringify({
      success: statusCode === 200,
      data,
    }),
  };
}

