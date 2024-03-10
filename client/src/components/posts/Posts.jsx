import React from "react";
import "./posts.css";
import Post from "../post/Post";

const Posts = ({ posts }) => {

   if (!Array.isArray(posts)) {
    return <div>No posts available</div>;
  }
  return (
    <div className="posts">
      {posts.map((p) => (
        <Post post={p} />
      ))}
    </div>
  );
};

export default Posts;
