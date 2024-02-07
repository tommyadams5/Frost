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
  React.useEffect(() => {
    setLikesCount(likes);
  }, [time]);
  React.useEffect(() => {
    setIsChecked(liked);
  }, [time]);

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

  return (
    <div className="post_box">
      <div className="post_profileImg_box">
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
