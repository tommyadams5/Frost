import db from "../logic/firestore.js";

// Updates list of persons that user has followed in response to the
// follow / unfollow button being clicked.
const followsUpdate = async (req, res) => {
  const personID = req.params.key;
  let followedUsers = req.followedUsers;
  if (followedUsers === undefined) {
    followedUsers = [personID];
  } else {
    if (followedUsers.includes(personID)) {
      followedUsers = followedUsers.filter((item) => item !== personID);
    } else {
      followedUsers.push(personID);
    }
  }
  const userRef = db.collection("users").doc(req.user.username);
  userRef.update({ followedUsers: followedUsers });
  res.sendStatus(200);
};

export default followsUpdate;
