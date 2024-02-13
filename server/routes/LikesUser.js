import db from "../logic/firestore.js";

// Request record of posts user has liked from database
const LikesUser = async (req, res, next) => {
  const userRef = db.collection("users").doc(req.user.username);
  const userQuery = await userRef.get();
  req.likedPosts = userQuery.data().likedPosts;
  next();
};

export default LikesUser;
