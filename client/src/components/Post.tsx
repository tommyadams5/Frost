import "./Post.css";

interface Props {
  username: string;
  text: string;
  image: string;
  profileImg: string;
  time: Date;
}

function Post({ text, username, profileImg, image, time }: Props) {
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
      </div>
    </div>
  );
}

export default Post;
