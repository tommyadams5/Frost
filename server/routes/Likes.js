import db from "../logic/firestore.js";

function Likes(change) {
  return async (req, res) => {
    const docRef = db.collection("posts").doc(req.body.postID);
    try {
      const query = await docRef.get();
      const oldLikes = query.data().likes;
      docRef.update({ likes: oldLikes + change });
    } catch (error) {
      docRef.update({ likes: change });
    }
  };
}

export default Likes;
