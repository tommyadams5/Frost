import "./Post.css";

interface Props {
  username: string;
  text: string;
  image: string;
  avatar: string;
  time: Date;
}

function Post({ text, username, avatar, image, time }: Props) {
  const datetime = new Date(time);
  const datetimeFormatted = new Intl.DateTimeFormat("en-US", {
    dateStyle: "short",
    timeStyle: "short",
  }).format(datetime);

  return (
    <div className="post_box">
      <div className="post_avatar_box">
        <img
          className="post_avatar"
          src={"http://localhost:8000/server/images/" + avatar}
        ></img>
        <div className="post_username">{username}</div>
      </div>
      <div className="post_content">
        <div className="post_time">{datetimeFormatted}</div>
        <div className="post_text">{text}</div>
        <div className="post_image">
          <img src={image} alt="" />
        </div>
      </div>
    </div>
  );
}

export default Post;
