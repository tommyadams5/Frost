import React from "react";
import Post from "./Post.tsx";
import PostBox from "./PostBox.tsx";

import axios from "axios";

// Initialize feed of posts that loads after user logs in.
function Feed() {
  const init: any[] = [];
  const [posts, setPosts] = React.useState(init);

  async function updatePosts() {
    const query = await axios.get("/server/posts");
    setPosts(query.data);
  }

  React.useEffect(() => {
    updatePosts();
  }, init);

  return (
    <div className="feed">
      <PostBox pullData={updatePosts} />
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
        />
      ))}
    </div>
  );
}

export default Feed;
