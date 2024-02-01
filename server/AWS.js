import AWS from "aws-sdk";
import "dotenv/config";
import fs from "fs";

const accessKey = process.env.AWS_ACCESS_KEY;
const secretKey = process.env.AWS_SECRET_KEY;
const bucket = process.env.AWS_BUCKET;
const awsregion = process.env.AWS_REGION;

const s3 = new AWS.S3({
  accessKeyId: accessKey,
  secretAccessKey: secretKey,
  region: awsregion,
});

function uploadFile(file, username) {
  const fileStream = fs.createReadStream(file.path);
  return s3
    .putObject({
      Body: fileStream,
      Bucket: bucket,
      Key: username,
    })
    .promise();
}

const getFileStream = (req, res, next) => {
  const downloadParams = {
    Key: req.params.key,
    Bucket: bucket,
  };

  const data = s3
    .getObject(downloadParams)
    .createReadStream()
    .on("error", (err) => {
      req.params.key = "default";
      next();
    });
  data.pipe(res);
};

export { uploadFile, getFileStream };
