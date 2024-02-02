import db from "./firestore.js";
import { deleteFile } from "./AWS.js";

const DeleteAccount = async (req, res, next) => {
  const query = await db
    .collection("posts")
    .where("username", "==", req.user.username)
    .get();
  query.docs.forEach((doc) => {
    doc.ref.delete();
  });

  const account = await db.collection("users").doc(req.user.username).get();
  account.ref.delete();

  deleteFile(req.user.username);

  next();
};

export default DeleteAccount;
