import "./Post.css";
import sendData from "./sendData";
import React from "react";

interface Props {
  text: string;
  username: string;
  profileImg: string;
  image: string;
  time: Date;
  postID: string;
  likes: number;
  liked: boolean;
}

function Post({
  text,
  username,
  profileImg,
  image,
  time,
  postID,
  likes,
  liked,
}: Props) {
  const datetime = new Date(time);
  const [likesCount, setLikesCount] = React.useState(likes);
  const [isChecked, setIsChecked] = React.useState(liked);
  const [followStatus, setFollowStatus] = React.useState("Follow");

  // Update likes count and like checkbox in response to post reloading
  React.useEffect(() => {
    setLikesCount(likes);
  }, [time]);
  React.useEffect(() => {
    setIsChecked(liked);
  }, [time]);

  // Format time for each post
  const datetimeFormatted = new Intl.DateTimeFormat("en-US", {
    dateStyle: "short",
    timeStyle: "short",
  }).format(datetime);

  // Replace URLs with clickable links
  const urlRegex = /(https?:\/\/[^\s]+)/g;
  const textWithLinks = text.replace(
    urlRegex,
    (url) => `<a href="${url}" style="color: white;">${url}</a>`
  );

  // Updates likes count for the post. Function will unlike the post if user
  // has previously liked it, or like the post if user has not already liked it.
  const sendLike = () => {
    setIsChecked(!isChecked);
    sendData({ postID: postID }, "/server/like");
    let checkbox = document.getElementById(time + username) as HTMLInputElement;
    if (checkbox !== null) {
      if (checkbox.checked) {
        setLikesCount(likesCount + 1);
      } else {
        setLikesCount(likesCount - 1);
      }
    }
  };

  const followChange = () => {
    if (followStatus === "Follow") {
      setFollowStatus("Unfollow");
    } else {
      setFollowStatus("Follow");
    }
  };

  return (
    <div className="post_box">
      <div className="post_profileImg_box">
        <div className="follow_box">
          <button onClick={followChange} className={"follow_button"}>
            {followStatus === "Follow" && (
              <div className="follow_text">{followStatus}</div>
            )}
            {followStatus !== "Follow" && (
              <div className="unfollow_text">{followStatus}</div>
            )}
          </button>
        </div>
        <img
          className="post_profileImg"
          src={"http://localhost:8000/server/images/" + profileImg}
        ></img>
        <div className="post_username">{username}</div>
      </div>
      <div className="post_content">
        <div className="post_time">{datetimeFormatted}</div>
        <div
          className="post_text"
          dangerouslySetInnerHTML={{ __html: textWithLinks }}
        />
        <img className="post_image" src={image} alt="" />
        <div className="star_box">
          <div className="likes">{likesCount > 0 && likesCount}</div>
          <input
            type="checkbox"
            className="star"
            checked={isChecked}
            id={time + username}
            onChange={sendLike}
          />
          <label htmlFor={time + username} className="star_label"></label>
        </div>
      </div>
      <div></div>
    </div>
  );
}

export default Post;
