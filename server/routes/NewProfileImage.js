import fs from "fs";
import path from "path";
import { uploadFile } from "../logic/AWS.js";

const NewProfileImage = async (req, res) => {
  const postFile = req.file;
  const postUsername = req.user.username;
  await uploadFile(postFile, postUsername);
  res.send({ imagePath: `/server/images/${postUsername}` });

  const filePath = path.join("uploads/", postFile.filename);
  fs.unlink(filePath, (err) => {
    if (err) {
      console.error(err);
    } else {
      console.log("File is deleted.");
    }
  });
};

export default NewProfileImage;
