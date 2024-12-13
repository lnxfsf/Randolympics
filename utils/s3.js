
const {S3Client, PutObjectCommand} = require("@aws-sdk/client-s3");


// with this we can use in other parts of backend we just import function:  uploadFile(bucket, location, file)

const s3 = new S3Client({
    endpoint: "https://fra1.digitaloceanspaces.com", 
    forcePathStyle: false,
    region: "fra1",
    credentials: {
      accessKeyId: process.env.S3_BUCKET_ACCESS_KEY,
      secretAccessKey: process.env.S3_BUCKET_SECRET_KEY
    }
  });


// upload to digitalocean spaces
async function uploadFileS3Bucket({ bucket, location, file, filename }) {
    let key = `${location ? `${location}/` : ""}${filename}`;

    


    const command = new PutObjectCommand({
      Key: key,

      Body: file.buffer,
      ContentType: file.mimetype,
      
      Bucket: bucket,
      ACL: 'public-read',
    });
    await s3.send(command);
    return key;
  };

  //   Body: file.buffer,

  module.exports = uploadFileS3Bucket;


