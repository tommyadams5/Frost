import React from "react";
import Post from "./Post.tsx";
import PostBox from "./PostBox.tsx";

import axios from "axios";

function Feed() {
  const init: any[] = [];

  const [posts, setPosts] = React.useState(init);

  async function pullData() {
    const query = await axios.get("/server/posts");
    setPosts(query.data);
  }

  React.useEffect(() => {
    pullData();
  }, init);

  return (
    <div className="feed">
      <a href="/server/delete">Clear Feed</a>
      <div></div>
      <a href="/server/logout">Logout</a>
      <PostBox pullData={pullData} />
      {posts.map((post: any) => (
        <Post
          username={post.username}
          text={post.text}
          image={post.image}
          avatar={post.avatar}
          key={post.id}
          time={post.time}
        />
      ))}
    </div>
  );
}

export default Feed;
