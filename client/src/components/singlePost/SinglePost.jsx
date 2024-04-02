import axios from "axios";
import { useContext, useEffect, useState } from "react";
import { useLocation } from "react-router";
import { Link } from "react-router-dom";
import { Context } from "../../context/Context";
import "./singlePost.css";
import { storage } from "../../firebase";
import { getDownloadURL, ref } from "firebase/storage";

export default function SinglePost() {
  const location = useLocation();
  const path = location.pathname.split("/")[2];
  const [post, setPost] = useState({});
  // const PF = "https://seven-blog.onrender.com/api/getImage/";
  const [imageUrl, setImageUrl] = useState(""); // State to store image URL
  const { user } = useContext(Context);
  const [title, setTitle] = useState("");
  const [desc, setDesc] = useState("");
  const [updateMode, setUpdateMode] = useState(false);

  useEffect(() => {
    const getPost = async () => {
      const res = await axios.get(
        "https://seven-blog.onrender.com/api/posts/" + path
      );
      setPost(res.data);
      setTitle(res.data.title);
      setDesc(res.data.desc);
      // if (res.data.photo && res.data.photo.trim() !== "") {
      //   // Fetch image URL only if photo exists
      //   try {
      //     console.log(storage);
      //     console.log(ref);
      //     const imagePath = `/${res.data.photo}`;
      //     console.log("Image path:", imagePath);
      //     const imgRef = ref(storage, imagePath);
      //     const imgUrl = await getDownloadURL(imgRef);
      //     setImageUrl(imgUrl); // Store the fetched image URL
      //   } catch (error) {
      //     console.error("Error fetching image:", error);
      //   }
      // }
    };
    getPost();
  }, [path]);

  // useEffect(() => {
  //   const fetchImage = async () => {
  //     if (post.photo) {
  //       try {
  //         const imgResponse = await axios.get(
  //           `http://localhost:5001/api/image/${post.photo}`
  //         );
  //         setImageUrl(imgResponse.data.imageUrl); // Store the fetched image URL
  //       } catch (error) {
  //         console.error("Error fetching image:", error);
  //       }
  //     }
  //   };

  //   fetchImage();
  // }, [post.photo]);

  const handleDelete = async () => {
    try {
      await axios.delete(
        `https://seven-blog.onrender.com/api/posts/${post._id}`,
        {
          data: { username: user.username },
        }
      );
      window.location.replace("/");
    } catch (err) {
      console.error("Error deleting post:", err);
    }
  };

  const handleUpdate = async () => {
    try {
      await axios.put(`https://seven-blog.onrender.com/api/posts/${post._id}`, {
        username: user.username,
        title,
        desc,
      });
      setUpdateMode(false);
    } catch (err) {
      console.error("Error updating post:", err);
    }
  };

  return (
    <div className="singlePost">
      <div className="singlePostWrapper">
        {post.photo && (
          <img src={post.photo} alt="" className="singlePostImg" />
        )}
        {updateMode ? (
          <input
            type="text"
            value={title}
            className="singlePostTitleInput"
            autoFocus
            onChange={(e) => setTitle(e.target.value)}
          />
        ) : (
          <h1 className="singlePostTitle">
            {title}
            {post.username === user?.username && (
              <div className="singlePostEdit">
                <i
                  className="singlePostIcon far fa-edit"
                  onClick={() => setUpdateMode(true)}
                ></i>
                <i
                  className="singlePostIcon far fa-trash-alt"
                  onClick={handleDelete}
                ></i>
              </div>
            )}
          </h1>
        )}
        <div className="singlePostInfo">
          <span className="singlePostAuthor">
            Author:
            <Link to={`/?user=${post.username}`} className="link">
              <b> {post.username}</b>
            </Link>
          </span>
          <span className="singlePostDate">
            {new Date(post.createdAt).toDateString()}
          </span>
        </div>
        {updateMode ? (
          <textarea
            className="singlePostDescInput"
            value={desc}
            onChange={(e) => setDesc(e.target.value)}
          />
        ) : (
          <p className="singlePostDesc">{desc}</p>
        )}
        {updateMode && (
          <button className="singlePostButton" onClick={handleUpdate}>
            Update
          </button>
        )}
      </div>
    </div>
  );
}
