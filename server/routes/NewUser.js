import db from "../logic/firestore.js";

const NewUser = async (req, res) => {
  const doc = await db.collection("users").doc(req.body.username).get();
  if (doc.data()) {
    res.send("Username already exists");
  } else {
    db.collection("users")
      .doc(req.body.username)
      .set({ password: req.body.password });
    res.send("User created");
  }
};

export default NewUser;
