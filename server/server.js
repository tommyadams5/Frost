import express from "express";
import multer from "multer";
import path from "path";
import { getFileStream } from "./logic/AWS.js";
import cookieJWT from "./routes/JWTauth.js";
import cookieParser from "cookie-parser";
import DeleteAccount from "./routes/DeleteAccount.js";
import GetPosts from "./routes/GetPosts.js";
import NewProfileImage from "./routes/NewProfileImage.js";
import LikesPost from "./routes/LikesPost.js";
import LikesUser from "./routes/LikesUser.js";
import LikesUserUpdate from "./routes/LikesUserUpdate.js";
import Login from "./routes/Login.js";
import NewUser from "./routes/NewUser.js";
import NewPost from "./routes/NewPost.js";
import DeleteAllPosts from "./routes/DeleteAllPosts.js";
import followsUser from "./routes/FollowsUser.js";
import followsUpdate from "./routes/FollowsUpdate.js";

const __dirname = path.resolve();
const app = express();
const upload = multer({ dest: "uploads" });
app.use(cookieParser());

// Enabling React Router URLs
app.use("/", express.static(path.join(__dirname, "../client/dist/")));
app.use("/login", express.static(path.join(__dirname, "../client/dist/")));
app.use("/newuser", express.static(path.join(__dirname, "../client/dist/")));

// Routes
app.get("/server/delete-account", cookieJWT, DeleteAccount);
app.get("/server/delete", DeleteAllPosts);
app.post("/server/images", cookieJWT, upload.single("image"), NewProfileImage);
app.get("/server/images/:key", getFileStream, getFileStream);
app.get("/server/follow/:key", cookieJWT, followsUser, followsUpdate);
app.post(
  "/server/like",
  cookieJWT,
  upload.none(),
  LikesUser,
  LikesUserUpdate,
  LikesPost
);
app.post("/server/login", upload.none(), Login);
app.get("/server/logout", (req, res) => {
  res.clearCookie("token").status(200).redirect("/");
});
app.post("/server/newpost", cookieJWT, upload.none(), NewPost);
app.post("/server/newuser", upload.none(), NewUser);
app.get("/server/posts", cookieJWT, LikesUser, GetPosts);
app.get("/server/verify", cookieJWT, (req, res) => {
  res.send(req.user.username);
});

// Initialize server
app.listen(3000, () => {
  console.log("Server running on port 3000");
});
