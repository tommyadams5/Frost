import db from "../logic/firestore.js";

// Updates list of posts that user has liked and calculates the change in likes
// that should happen in response to the liked button being clicked
const LikesUserUpdate = async (req, res, next) => {
  const postID = req.body.postID;
  let likedPosts = req.likedPosts;
  if (likedPosts === undefined) {
    likedPosts = [postID];
  } else {
    if (likedPosts.includes(postID)) {
      likedPosts = likedPosts.filter((item) => item !== postID);
      req.likeChange = -1;
    } else {
      likedPosts.push(postID);
      req.likeChange = 1;
    }
  }
  const userRef = db.collection("users").doc(req.user.username);
  userRef.update({ likedPosts: likedPosts });
  next();
};

export default LikesUserUpdate;
