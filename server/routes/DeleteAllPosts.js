import db from "../logic/firestore.js";

// Clear all history of posts. Used for app development.
const DeleteAllPosts = async (req, res) => {
  const query = await db.collection("posts").get();
  query.docs.forEach((doc) => {
    doc.ref.delete();
  });
  res.send("Feed cleared");
};

export default DeleteAllPosts;
