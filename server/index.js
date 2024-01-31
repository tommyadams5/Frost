import express from "express";
import multer from "multer";
import fs from "fs";
import path from "path";
import { uploadFile, getFileStream } from "./AWS.js";
import db from "./firestore.js";
import jwt from "jsonwebtoken";
import cookieJWT from "./JWTauth.js";
import cookieParser from "cookie-parser";

const app = express();
const upload = multer({ dest: "uploads" });
app.use(cookieParser());

app.get("/server/userid", cookieJWT, (req, res) => {
  res.send(req.user.username);
});

app.get("/server", cookieJWT, (req, res) => {
  res.json("Hi, this is index.js speaking");
});

app.get("/server/images/:key", (req, res) => {
  const readStream = getFileStream(req.params.key);
  readStream.pipe(res);
});

app.get("/server/posts", async (req, res) => {
  const posts = await db.collection("posts").get();
  let docData = [];
  posts.forEach((doc) => {
    let singleData = doc.data();
    singleData["id"] = doc.id;
    docData.push(singleData);
  });
  docData.sort((a, b) => b.time - a.time);
  res.send(docData);
});

app.post("/server/images", upload.single("image"), async (req, res) => {
  const postFile = req.file;
  const postUsername = req.body.user;
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
});

app.post("/server/login", upload.none(), async (req, res) => {
  try {
    const doc = await db.collection("users").doc(req.body.username).get();
    if (doc.data().password === req.body.password) {
      const token = jwt.sign({ username: req.body.username }, "excalibur", {
        expiresIn: "1h",
      });
      res.cookie("token", token, { httpOnly: true });
      res.send("Password match");
    } else {
      res.send("Wrong password");
    }
  } catch (err) {
    res.send("Username does not exist");
  }

  // return res.redirect("/");
});

app.post("/server/newuser", upload.none(), async (req, res) => {
  const doc = await db.collection("users").doc(req.body.username).get();
  if (doc.data()) {
    res.send("Username already exists");
  } else {
    db.collection("users")
      .doc(req.body.username)
      .set({ password: req.body.password });
    res.send("User created");
  }
});

app.post("/server/newpost", upload.none(), async (req, res) => {
  await db.collection("posts").add({
    username: req.body.username,
    avatar: req.body.username,
    verified: true,
    text: req.body.text,
    image: req.body.image,
    time: Number(req.body.time),
  });
  res.send("User created");
});

app.get("/server/delete", async (req, res) => {
  const query = await db.collection("posts").get();
  query.docs.forEach((doc) => {
    doc.ref.delete();
  });
  res.send("Feed cleared");
});

app.listen(3000, () => {
  console.log("Server running on port 3000");
});
