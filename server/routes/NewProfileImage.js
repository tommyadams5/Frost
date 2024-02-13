import fs from "fs";
import path from "path";
import { uploadFile } from "../logic/AWS.js";

// Add a profile image to the database
const NewProfileImage = async (req, res) => {
  const postFile = req.file;
  const postUsername = req.user.username;
  await uploadFile(postFile, postUsername);
  res.send({ imagePath: `/server/images/${postUsername}` });

  // Delete file from local multer folder after sending to database
  const filePath = path.join("uploads/", postFile.filename);
  fs.unlink(filePath, (err) => {
    if (err) {
      console.error(err);
    }
  });
};

export default NewProfileImage;
