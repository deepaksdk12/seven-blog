import React from "react";
import "./post.css";
import { useState } from "react";
import { Link } from "react-router-dom";
import { storage } from "../../firebase";
const { ref, uploadBytes } = require("firebase/storage");

const Post = ({ post, id }) => {
  return (
    <div className="post">
      {post.photo && <img className="postImg" src={post.photo} alt="" />}
      <div className="postInfo">
        <div className="postCats">
          {post.categories.map((c) => (
            <span className="postCat" key={c}>
              {c}
            </span>
          ))}
        </div>
        <Link to={`/post/${post._id}`} className="link">
          <span className="postTitle">{post.title}</span>
        </Link>{" "}
        <hr />
        <span className="postDate">
          {new Date(post.createdAt).toDateString()}
        </span>
        <span className="postDesc">{post.desc}</span>
      </div>
    </div>
  );
};

export default Post;
