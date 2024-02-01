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
    <div className="postBox">
      <ProfileImage username={username} />

      <div>Username: {username}</div>
      <form>
        <div className="postBoxInput">
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
