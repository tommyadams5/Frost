import { collection, addDoc } from "firebase/firestore";
import React from "react";
import db from "../firebase.tsx";

function PostBox({ pullData }: any) {
  const [postText, setPostText] = React.useState("");
  const [postPic, setPostPic] = React.useState("");
  const createPost = async (e: any) => {
    e.preventDefault();
    await addDoc(collection(db, "posts"), {
      username: "happystark",
      displayName: "Atharva Deosthale",
      avatar:
        "https://media.istockphoto.com/id/1341288649/photo/75mpix-panorama-of-beautiful-mount-ama-dablam-in-himalayas-nepal.jpg?s=612x612&w=0&k=20&c=0xb_bb-NBIxjiJL_kqY-o3dCjv2PmKFZfRjHcVEijDc=",
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
