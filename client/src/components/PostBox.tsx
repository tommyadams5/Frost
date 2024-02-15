import React from "react";
import sendData from "./sendData.tsx";
import axios from "axios";
import "./PostBox.css";
import ProfileImage from "./ProfileImage.tsx";
import Navbar from "./Navbar.tsx";

function PostBox({ updatePosts }: any) {
  const [postText, setPostText] = React.useState("");
  const [postPic, setPostPic] = React.useState("");
  const [username, setUsername] = React.useState("");

  // Confirm user's ID
  async function UserID() {
    const query = await axios.get("/server/verify");
    setUsername(query.data);
  }
  UserID();

  // Send post to server and update post feed
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

    updatePosts();
    setPostText("");
    setPostPic("");
  };

  return (
    <div>
      <Navbar />
      <div className="postbox">
        <div className="postbox_profile">
          <div>{username}</div>
          <ProfileImage username={username} />
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
    </div>
  );
}

export default PostBox;
