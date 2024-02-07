import "./Post.css";
import sendData from "./sendData";

interface Props {
  text: string;
  username: string;
  profileImg: string;
  image: string;
  time: Date;
  postID: string;
}

function Post({ text, username, profileImg, image, time, postID }: Props) {
  const datetime = new Date(time);
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
    let checkbox = document.getElementById(time + username) as HTMLInputElement;
    if (checkbox !== null) {
      if (checkbox.checked) {
        sendData({ postID: postID }, "/server/like");
      } else {
        sendData({ postID: postID }, "/server/unlike");
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
        <div className="post_image">
          <img src={image} alt="" />
        </div>
        <div className="star_box">
          <div className="likes">Likes</div>
          <input
            type="checkbox"
            className="star"
            id={time + username}
            onChange={sendLike}
          />
          <label htmlFor={time + username} className="star_label"></label>
        </div>
      </div>
    </div>
  );
}

export default Post;
