import React from "react";
import Post from "./Post.tsx";
import PostBox from "./PostBox.tsx";
import axios from "axios";

// Initialize feed of posts that loads after user logs in.
function Feed() {
  const [following, setFollowing] = React.useState(new Set([]));
  const [posts, setPosts] = React.useState([]);
  const [username, setUsername] = React.useState("");
  const [toggleFeed, setToggleFeed] = React.useState(true);

  const updatePosts = async () => {
    let queryPosts: any = [];
    if (toggleFeed) {
      queryPosts = await axios.get("/server/posts");
    } else {
      queryPosts = await axios.get("/server/follow-posts");
    }
    setPosts(queryPosts.data);
    const queryID = await axios.get("/server/verify");
    setUsername(queryID.data);
    const queryFollowing = await axios.get("/server/follow");
    setFollowing(new Set(queryFollowing.data));
  };

  React.useEffect(() => {
    updatePosts();
  }, [toggleFeed]);

  return (
    <div className="feed">
      <PostBox updatePosts={updatePosts} username={username} />
      <div>
        <button onClick={() => setToggleFeed(!toggleFeed)}>Following</button>
      </div>
      {posts.map((post: any) => (
        <Post
          text={post.text}
          username={post.username}
          profileImg={post.profileImg}
          image={post.image}
          time={post.time}
          postID={post.id}
          likes={post.likes}
          liked={post.liked}
          following={following}
          setFollowing={setFollowing}
          currentUser={post.username === username}
        />
      ))}
    </div>
  );
}

export default Feed;
