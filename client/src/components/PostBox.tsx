import { collection, addDoc } from "firebase/firestore";
import React from "react";
import db from "../firebase.tsx";

function PostBox({ pullData }: any) {
  const [postText, setPostText] = React.useState("");
  const [postUser, setPostUser] = React.useState("");
  const [postPic, setPostPic] = React.useState("");
  const createPost = async (e: any) => {
    e.preventDefault();
    await addDoc(collection(db, "posts"), {
      username: postUser,
      avatar: postUser,
      verified: true,
      text: postText,
      image: postPic,
      time: Date.now(),
    });
    pullData();
    setPostText("");
    setPostPic("");
  };

  return (
    <div className="postBox">
      <form>
        <div className="postBoxInput">
          <div>Username</div>
          <input
            value={postUser}
            onChange={(e) => setPostUser(e.target.value)}
            placeholder="Username"
            type="text"
          />
          <div>Message</div>
          <input
            value={postText}
            onChange={(e) => setPostText(e.target.value)}
            placeholder="What's Up?"
            type="text"
          />
        </div>
        <button onClick={createPost} type="submit" className="postBoxButton">
          Post
        </button>
      </form>
    </div>
  );
}

export default PostBox;
