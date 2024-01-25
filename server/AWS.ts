const AWS1 = require("aws-sdk");
require("dotenv").config();
const fs1 = require("fs");

const accessKey = process.env.AWS_ACCESS_KEY;
const secretKey = process.env.AWS_SECRET_KEY;
const bucket = process.env.AWS_BUCKET;
const awsregion = process.env.AWS_REGION;

const s3 = new AWS1.S3({
  accessKeyId: accessKey,
  secretAccessKey: secretKey,
  region: awsregion,
});

function uploadFile(file, username) {
  const fileStream = fs1.createReadStream(file.path);
  return s3
    .putObject({
      Body: fileStream,
      Bucket: bucket,
      Key: username,
    })
    .promise();
}

function getFileStream(fileKey) {
  const downloadParams = {
    Key: fileKey,
    Bucket: bucket,
  };

  return s3.getObject(downloadParams).createReadStream();
}

module.exports = { uploadFile, getFileStream };
