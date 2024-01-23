import React from "react";
import Post from "./Post";
import PostBox from "./PostBox";
import CreateUser from "./CreateUser";
import db from "../firebase";
import { collection, getDocs } from "firebase/firestore";
import DeleteButton from "./DeleteButton";

function Feed() {
  const init: any[] = [];

  const [posts, setPosts] = React.useState(init);

  async function pullData() {
    const query = await getDocs(collection(db, "posts"));
    let docData: any[] = [];
    query.forEach((doc) => {
      let singleData = doc.data();
      singleData["id"] = doc.id;
      docData.push(singleData);
      docData.sort((a, b) => b.time - a.time);
    });
    setPosts(docData);
  }

  React.useEffect(() => {
    pullData();
  }, init);

  return (
    <div className="feed">
      <CreateUser />
      <DeleteButton pullData={pullData} />
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
