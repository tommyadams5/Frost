import db from "../logic/firestore.js";

const LikesPost = async (req, res) => {
  const docRef = db.collection("posts").doc(req.body.postID);
  const query = await docRef.get();
  const oldLikes = query.data().likes;
  if (isNaN(oldLikes)) {
    docRef.update({ likes: req.likeChange });
  } else {
    docRef.update({ likes: oldLikes + req.likeChange });
  }
  res.sendStatus(200);
};

export default LikesPost;
