import "./Post.css";

interface Props {
  username: string;
  text: string;
  image: string;
  avatar: string;
}

function Post({ text, username, avatar, image }: Props) {
  return (
    <div className="post_box">
      <div className="post__avatar">
        <img src={avatar}></img>
      </div>
      <div className="post__username">{username}</div>

      <div className="post__text">
        <p>{text}</p>
      </div>
      <div className="post__image">
        <img src={image} alt="" />
      </div>
    </div>
  );
}

export default Post;
