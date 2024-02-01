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

// function getFileStream(fileKey) {
//   const downloadParams = {
//     Key: fileKey,
//     Bucket: bucket,
//   };

//   const data = s3
//     .getObject(downloadParams)
//     .createReadStream()
//     .on("error", (e) => {
//       console.error("Error fetching file stream");
//       return "error";
//     });
//   return data;
// }

const getFileStream = async (req, res, next) => {
  // const fileKey = req.params.key;
  console.log(req.params.key);

  const fileKey = req.params.key;
  const downloadParams = {
    Key: fileKey,
    Bucket: bucket,
  };
  const defaultParams = {
    Key: "default",
    Bucket: bucket,
  };
  const data = s3
    .getObject(downloadParams)
    .createReadStream()
    .on("error", (err) => {
      // res.sendStatus(500);
      next();
    });
  data.pipe(res);
};

const getFileStream3 = async (req, res) => {
  const defaultParams = {
    Key: "default",
    Bucket: bucket,
  };
  const data = s3
    .getObject(defaultParams)
    .createReadStream()
    .on("error", (err) => {
      res.sendStatus(500);
    });
  data.pipe(res);
};

export { uploadFile, getFileStream, getFileStream3 };
