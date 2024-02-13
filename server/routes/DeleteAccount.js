import db from "../logic/firestore.js";
import { deleteFile } from "../logic/AWS.js";

const DeleteAccount = async (req, res) => {
  // Delete user posts
  const query = await db
    .collection("posts")
    .where("username", "==", req.user.username)
    .get();
  query.docs.forEach((doc) => {
    doc.ref.delete();
  });

  // Delete username and password
  const account = await db.collection("users").doc(req.user.username).get();
  account.ref.delete();

  // Delete profile image
  deleteFile(req.user.username);

  res.clearCookie("token").status(200).redirect("/");
};

export default DeleteAccount;
