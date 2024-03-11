import "./settings.css";
import Sidebar from "../../components/sidebar/Sidebar";
import { useContext, useState } from "react";
import { Context } from "../../context/Context";
import axios from "axios";

export default function Settings() {
  const { user, dispatch } = useContext(Context);
  const [file, setFile] = useState(null);
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isPasswordEmpty, setIsPasswordEmpty] = useState(false);
  const [isUsernameEmpty, setIsUsernameEmpty] = useState(false);
  const [isEmailEmpty, setIsEmailEmpty] = useState(false);

  const [success, setSuccess] = useState(false);
  const PF = "https://seven-blog.onrender.com/images/";

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!username && !email && !password) {
      setIsUsernameEmpty(true);
      setIsEmailEmpty(true);
      setIsPasswordEmpty(true);
      return;
    }
    dispatch({ type: "UPDATE_START" });
    const updatedUser = {
      userId: user._id,
      username,
      email,
      password,
    };
    if (file) {
      const data = new FormData();
      const filename = Date.now() + file.name;
      data.append("name", filename);
      data.append("file", file);
      updatedUser.profilePic = filename;
      try {
        await axios.post("https://seven-blog.onrender.com/api/upload", data);
      } catch (err) {}
    }
    try {
      const res = await axios.put(
        "https://seven-blog.onrender.com/api/users/" + user._id,
        updatedUser
      );
      setSuccess(true);
      dispatch({ type: "UPDATE_SUCCESS", payload: res.data });
    } catch (err) {
      dispatch({ type: "UPDATE_FAILURE" });
    }
  };
  return (
    <div className="settings">
      <div className="settingsWrapper">
        <div className="settingsTitle">
          <span className="settingsUpdateTitle">Update Your Account</span>
          <span className="settingsDeleteTitle">Delete Account</span>
        </div>
        <form className="settingsForm" onSubmit={handleSubmit}>
          <label>Profile Picture</label>
          <div className="settingsPP">
            <img
              src={file ? URL.createObjectURL(file) : PF + user.profilePic}
              alt=""
            />
            <label htmlFor="fileInput">
              <i className="settingsPPIcon far fa-user-circle"></i>
            </label>
            <input
              type="file"
              id="fileInput"
              style={{ display: "none" }}
              onChange={(e) => setFile(e.target.files[0])}
            />
          </div>
          <label>Username</label>
          <input
            type="text"
            placeholder={user.username}
            onChange={(e) => {
              setUsername(e.target.value);
              setIsUsernameEmpty(false);
            }}
          />
          {isUsernameEmpty && <p>Username cannot be empty</p>}

          <label>Email</label>
          <input
            type="email"
            placeholder={user.email}
            onChange={(e) => {
              setEmail(e.target.value);
              setIsEmailEmpty(false);
            }}
          />
          {isEmailEmpty && <p>Email cannot be empty</p>}

          <label>Password</label>
          <input
            id="password"
            type="password"
            minLength={6}
            onChange={(e) => {
              setPassword(e.target.value);
              setIsPasswordEmpty(false);
            }}
          />
          {/* {email === ""  && <p>Email cannot be empty</p>}
          {username === "" && <p>Username cannot be empty</p>} */}
          {isPasswordEmpty && <p>Password cannot be empty</p>}
          <button className="settingsSubmit" type="submit">
            Update
          </button>
          {success && (
            <span
              style={{ color: "green", textAlign: "center", marginTop: "20px" }}
            >
              Profile has been updated...
            </span>
          )}
        </form>
      </div>
      <Sidebar />
    </div>
  );
}
