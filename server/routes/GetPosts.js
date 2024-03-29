import db from "../logic/firestore.js";

// Request posts from database
const GetPosts = async (req, res) => {
  let docRef = "";
  if (req.followedUsers) {
    req.followedUsers.push(req.user.username);
    docRef = db.collection("posts").where("username", "in", req.followedUsers);
  } else {
    docRef = db.collection("posts");
  }
  const posts = await docRef.get();
  let docData = [];
  posts.forEach((doc) => {
    let singleData = doc.data();
    singleData["id"] = doc.id;
    singleData["liked"] = req.likedPosts.includes(doc.id);
    docData.push(singleData);
  });

  // Sort posts so that most recent is shown first
  docData.sort((a, b) => b.time - a.time);

  // Send requested posts
  const offset = parseInt(req.query.offset) || 0;
  const limit = parseInt(req.query.limit) || 15;
  const pagePosts = docData.slice(offset, offset + limit);

  res.send(pagePosts);
};

export default GetPosts;
