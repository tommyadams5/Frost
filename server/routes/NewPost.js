import db from "../logic/firestore.js";

// Add a post to the database
const NewPost = async (req, res) => {
  await db.collection("posts").add({
    username: req.user.username,
    profileImg: req.user.username,
    text: req.body.text,
    image: req.body.image,
    time: Number(req.body.time),
    likes: 0,
  });
  res.send("Post created");
};

export default NewPost;
