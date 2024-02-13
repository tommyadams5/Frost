import db from "../logic/firestore.js";

// Request posts from database
const GetPosts = async (req, res) => {
  const posts = await db.collection("posts").get();
  let docData = [];
  posts.forEach((doc) => {
    let singleData = doc.data();
    singleData["id"] = doc.id;
    singleData["liked"] = req.likedPosts.includes(doc.id);
    docData.push(singleData);
  });

  // Sort posts so that most recent is shown first
  docData.sort((a, b) => b.time - a.time);

  res.send(docData);
};

export default GetPosts;
