import { useContext, useRef, useState } from "react";
import "./write.css";
import axios from "axios";
import { Context } from "../../context/Context";

const Write = () => {
  const titleRef = useRef("");
  const descRef = useRef("");
  //const [categories, setCategories] = useState("");
  const categoryRef = useRef([]);
  const categoryArrayRef = useRef([]);
  const [file, setFile] = useState(null);
  const { user } = useContext(Context);

  const handleSubmit = async (e) => {
    e.preventDefault();
    const categoriesArray = categoryRef.current.value
      .trim()
      .split(",")
      .map((category) => category.trim());
    categoryArrayRef.current = categoriesArray;
    const newPost = {
      username: user.username,
      title: titleRef.current.value,
      desc: descRef.current.value,
      categories: categoryArrayRef.current,
    };
    if (file) {
      const data = new FormData();
      const filename = Date.now() + file.name;
      data.append("name", filename);
      data.append("file", file);
      newPost.photo = filename;
      try {
        await axios.post("/upload", data);
      } catch (err) {}
    }
    try {
      const res = await axios.post(
        "https://seven-blog.onrender.com/api/posts",
        newPost
      );
      window.location.replace("/post/" + res.data._id);
    } catch (err) {
      console.error("Error occurred during post:", err);
    }
  };
  return (
    <div className="write">
      {file && (
        <img className="writeImg" src={URL.createObjectURL(file)} alt="" />
      )}
      <form className="writeForm" onSubmit={handleSubmit}>
        <div className="writeFormGroup">
          <label htmlFor="fileInput">
            <i className="writeIcon fas fa-plus"></i>
          </label>
          <input
            type="file"
            id="fileInput"
            style={{ display: "none" }}
            onChange={(e) => setFile(e.target.files[0])}
          />
          <input
            type="text"
            placeholder="Title"
            className="writeInput"
            autoFocus={true}
            ref={titleRef}
          />
        </div>
        <div className="writeFormGroup">
          <input
            type="text"
            placeholder="Category (separate multiple categories by comma)"
            className="writeInput"
            ref={categoryRef}
          />
        </div>
        <div className="writeFormGroup">
          <textarea
            placeholder="Tell your story..."
            type="text"
            className="writeInput writeText"
            ref={descRef}
          ></textarea>
        </div>
        <button className="writeSubmit" type="submit">
          Publish
        </button>
      </form>
    </div>
  );
};

export default Write;
