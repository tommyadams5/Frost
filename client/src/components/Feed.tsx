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
      <PostBox pullData={pullData} />
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
