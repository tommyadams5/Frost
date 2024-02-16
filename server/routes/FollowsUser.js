import db from "../logic/firestore.js";

// Request record of persons that user has followed from database
const followsUser = async (req, res, next) => {
  const userRef = db.collection("users").doc(req.user.username);
  const userQuery = await userRef.get();
  req.followedUsers = userQuery.data().followedUsers;
  next();
};

export default followsUser;
