require("dotenv").config();
const AWS = require("aws-sdk");
const express = require("express");
const multer = require("multer");
const upload = multer({ dest: "uploads" });
const fs = require("fs");
const path = require("path");
const app = express();
const accessKey = process.env.AWS_ACCESS_KEY;
const secretKey = process.env.AWS_SECRET_KEY;
const bucket = process.env.AWS_BUCKET;
const awsregion = process.env.AWS_REGION;

app.get("/server", (req, res) => {
  res.json("Hi, this is index.js speaking");
});

app.get("/server/images/:key", (req, res) => {
  const key = req.params.key;
  const readStream = getFileStream(key);
  readStream.pipe(res);
});

app.post("/server/images", upload.single("image"), async (req, res) => {
  const postFile = req.file;
  const postUsername = req.body.user;
  console.log(postFile);
  console.log(postUsername);
  const result = await uploadFile(postFile, postUsername);

  console.log(result);
  res.send({ imagePath: `/server/images/${postUsername}` });

  filePath = path.join("uploads/", postFile.filename);
  fs.unlink(filePath, (err) => {
    if (err) {
      console.error(err);
    } else {
      console.log("File is deleted.");
    }
  });
});

app.listen(3000, () => {
  console.log("Server running on port 3000");
});

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

function getFileStream(fileKey) {
  const downloadParams = {
    Key: fileKey,
    Bucket: bucket,
  };

  return s3.getObject(downloadParams).createReadStream();
}
