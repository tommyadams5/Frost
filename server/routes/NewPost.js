import db from "../logic/firestore.js";

const NewPost = async (req, res) => {
  await db.collection("posts").add({
    username: req.user.username,
    profileImg: req.user.username,
    text: req.body.text,
    image: req.body.image,
    time: Number(req.body.time),
    likes: 0,
  });
  res.send("User created");
};

export default NewPost;
