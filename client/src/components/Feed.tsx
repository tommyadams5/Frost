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
    console.log(query.data[0].id);
  }

  React.useEffect(() => {
    pullData();
  }, init);

  return (
    <div className="feed">
      <a href="/server/delete-account">Delete Account</a>
      <div></div>
      <a href="/server/delete">Clear Feed</a>
      <div></div>
      <a href="/server/logout">Logout</a>
      <PostBox pullData={pullData} />
      {posts.map((post: any) => (
        <Post
          text={post.text}
          username={post.username}
          profileImg={post.profileImg}
          image={post.image}
          time={post.time}
          postID={post.id}
        />
      ))}
    </div>
  );
}

export default Feed;
