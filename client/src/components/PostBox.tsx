import React from "react";
import sendData from "./sendData.tsx";
import axios from "axios";
import "./PostBox.css";
import ProfileImage from "./ProfileImage.tsx";

function PostBox({ pullData }: any) {
  const [postText, setPostText] = React.useState("");
  const [postPic, setPostPic] = React.useState("");
  const [username, setUsername] = React.useState("");
  async function UserID() {
    const query = await axios.get("/server/verify");
    setUsername(query.data);
  }
  UserID();
  const createPost = async (e: any) => {
    e.preventDefault();
    await sendData(
      {
        text: postText,
        image: postPic,
        time: Date.now(),
      },
      "/server/newpost"
    );

    pullData();
    setPostText("");
    setPostPic("");
  };

  return (
    <div className="postbox">
      <div className="postbox_profile">
        <ProfileImage username={username} />
        <div>{username}</div>
      </div>
      <form>
        <input
          className="postbox_input"
          value={postText}
          onChange={(e) => setPostText(e.target.value)}
          placeholder="What's Up?"
          type="text"
        />
        <button onClick={createPost} type="submit" className="postbox_button">
          Post
        </button>
      </form>
    </div>
  );
}

export default PostBox;
