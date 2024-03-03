import React from "react";
import { useInView } from "react-intersection-observer";
import Post from "./Post.tsx";
import PostBox from "./PostBox.tsx";
import axios from "axios";
import "./Feed.css";

// Initialize feed of posts that loads after user logs in.
function Feed() {
  const [following, setFollowing] = React.useState(new Set([]));
  const [posts, setPosts] = React.useState<any[]>([]);
  const [username, setUsername] = React.useState("");
  const [toggleFeed, setToggleFeed] = React.useState(true);
  const [page, setPage] = React.useState(1);
  const [hasNextPage, setHasNextPage] = React.useState(true);
  const [ref, inView] = useInView();

  const getUsername = async () => {
    const queryID = await axios.get("/server/verify");
    setUsername(queryID.data);
  };

  React.useEffect(() => {
    getUsername();
  }, []);

  const updatePosts = async (page_num = 1, usr_post = false) => {
    if (page_num) {
      const PAGE_LEN = 15;
      let offset = (page_num - 1) * PAGE_LEN;
      let queryPosts: any = [];
      if (toggleFeed) {
        queryPosts = await axios.get(
          `/server/posts?offset=${offset}&limit=${PAGE_LEN}`
        );
      } else {
        queryPosts = await axios.get(
          `/server/follow-posts?offset=${offset}&limit=${PAGE_LEN}`
        );
      }
      if (usr_post) {
        const uniqueArray = Array.from(new Set([...queryPosts.data, ...posts]));
        setPosts(uniqueArray);
      } else if (queryPosts.data.length) {
        setPosts([...posts, ...queryPosts.data]);
      } else {
        setHasNextPage(false);
      }
      const queryFollowing = await axios.get("/server/follow");
      setFollowing(new Set(queryFollowing.data));
    }
  };

  React.useEffect(() => {
    updatePosts(page);
  }, [page, toggleFeed]);

  React.useEffect(() => {
    if (inView && hasNextPage) {
      setPage(page + 1);
    }
  }, [inView]);

  return (
    <div className="feed">
      <PostBox updatePosts={updatePosts} username={username} />
      <div className="feed_toggle_box">
        <button
          className={toggleFeed ? "feed_toggle_clicked" : "feed_toggle"}
          onClick={() => {
            if (!toggleFeed) {
              setToggleFeed(true);
              setPosts([]);
              setHasNextPage(true);
              setPage(1);
            }
          }}
        >
          News
        </button>
        <button
          className={toggleFeed ? "feed_toggle" : "feed_toggle_clicked"}
          onClick={() => {
            if (toggleFeed) {
              setToggleFeed(false);
              setPosts([]);
              setHasNextPage(true);
              setPage(1);
            }
          }}
        >
          Following
        </button>
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
      <div className="feed_end" ref={ref}></div>
    </div>
  );
}

export default Feed;
