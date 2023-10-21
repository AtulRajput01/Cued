const AWS = require('aws-sdk');
const QRCode = require('qrcode');
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
    // Generate a QR code
    const qrCodeData = JSON.stringify({ userId, eventId });
    const qrCode = await QRCode.toDataURL(qrCodeData);

    // Convert the data URL to a buffer
    const qrCodeBuffer = Buffer.from(qrCode.replace(/^data:image\/\w+;base64,/, ''), 'base64');

    // Specify the S3 bucket and object key
    const bucketName = 'users-bucket-qr';
    const objectKey = `qr-codes/${userId}-${eventId}.png`;

    // Upload the QR code image to S3
    await s3.putObject({
      Bucket: bucketName,
      Key: objectKey,
      Body: qrCodeBuffer,
      ContentType: 'image/png', // Set the content type accordingly
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
