const AWS = require('aws-sdk');
const QRCode = require('qrcode');
const Jimp = require('jimp');
const s3 = new AWS.S3();
const dynamoDB = new AWS.DynamoDB.DocumentClient();

exports.handler = async () => {
  try {
    // Step 1: Retrieve the list of event IDs
    const eventIds = await getEventIds();

    // Step 2: Fetch the details of each event and generate QR code
    const eventsDetails = await Promise.all(eventIds.map(async (eventId) => {
      const eventDetails = await getEventDetails(eventId);
      const qrCodeUrl = await generateAndUploadQRCode(eventDetails.userId, eventId);
      eventDetails.qrCodeUrl = qrCodeUrl;
      return eventDetails;
    }));

    // Step 3: Return the list of events with QR code URLs to the client
    return buildResponse(200, { events: eventsDetails });
  } catch (error) {
    console.error('Error fetching events:', error);
    return buildResponse(500, 'Internal server error');
  }
};

async function getEventIds() {
  const params = {
    TableName: 'EventsUsers-uvz42cvcjncbnoq7sctsiqiqxy-dev',
  };

  const result = await dynamoDB.scan(params).promise();
  return result.Items.map(item => item.eventId);
}

async function getEventDetails(eventId) {
  const params = {
    TableName: 'Events-uvz42cvcjncbnoq7sctsiqiqxy-dev',
    Key: { id: eventId },
  };

  const result = await dynamoDB.get(params).promise();
  return result.Item;
}

async function generateAndUploadQRCode(userId, eventId) {
  try {
    // Concatenate user and event IDs into a string
    const qrCodeData = `User ID: ${userId}\nEvent ID: ${eventId}`;

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

    // Load the background image
    const backgroundImage = await Jimp.read('https://media.gettyimages.com/id/159768022/photo/crowd-attending-music-festival.jpg?s=612x612&w=0&k=20&c=C17ZBUQFRML43Fo1Z6RzabTKvncmkoZ8hcUoFTxFcDk=');

    // Generate QR code buffer
    const qrCodeBuffer = await QRCode.toBuffer(qrCodeData, { ...options, width: size, height: size });

    // Load QR code as a layer on top of the background
    const qrCodeLayer = await Jimp.read(qrCodeBuffer);
    backgroundImage.composite(qrCodeLayer, (backgroundImage.bitmap.width - size) / 2, (backgroundImage.bitmap.height - size) / 2);

    // Specify the S3 bucket and object key
    const bucketName = 'users-bucket-qr';
    const objectKey = `qr-codes/${userId}-${eventId}.png`;

    // Upload the composed image to S3
    await s3.putObject({
      Bucket: bucketName,
      Key: objectKey,
      Body: await backgroundImage.getBufferAsync(Jimp.MIME_PNG),
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

