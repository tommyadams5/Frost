const express = require("express");
const app = express();
const multer = require("multer");
const upload = multer({ dest: "uploads" });
const fs = require("fs");
const path = require("path");
const AWS = require("./AWS.js");

app.get("/server", (req, res) => {
  res.json("Hi, this is index.js speaking");
});

app.get("/server/images/:key", (req, res) => {
  const readStream = AWS.getFileStream(req.params.key);
  readStream.pipe(res);
});

app.post("/server/images", upload.single("image"), async (req, res) => {
  const postFile = req.file;
  const postUsername = req.body.user;
  await AWS.uploadFile(postFile, postUsername);
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

app.post("/server/login", upload.none(), async (req, res) => {
  const credentials = req.body.user;
  console.log(credentials);
  res.send(credentials);
});

app.listen(3000, () => {
  console.log("Server running on port 3000");
});
