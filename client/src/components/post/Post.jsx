import React from "react";
import "./post.css";
import { Link } from "react-router-dom";

const Post = ({ post, id }) => {
  const PF = "http://localhost:5001/images/";
  return (
    <div className="post">
      {post.photo && <img className="postImg" src={PF + post.photo} alt="" />}
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
