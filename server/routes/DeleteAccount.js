import db from "../logic/firestore.js";
import { deleteFile } from "../logic/AWS.js";

const DeleteAccount = async (req, res) => {
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

  res.clearCookie("token").status(200).redirect("/");
};

export default DeleteAccount;
