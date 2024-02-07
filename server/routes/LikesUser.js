import db from "../logic/firestore.js";

const LikesUser = async (req, res, next) => {
  const userRef = db.collection("users").doc(req.user.username);
  const userQuery = await userRef.get();
  req.likedPosts = userQuery.data().likedPosts;
  next();
};

export default LikesUser;
