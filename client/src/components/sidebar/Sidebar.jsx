import React from "react";
import "./sidebar.css";
import { useEffect, useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";

const Sidebar = () => {
  const [cats, setCats] = useState([]);

  useEffect(() => {
    const getCats = async () => {
      const res = await axios.get(
        "https://seven-blog.onrender.com/api/categories"
      );
      setCats(res.data);
    };
    getCats();
  }, []);

  return (
    <div className="sidebar">
      <div className="sidebarItem">
        <span className="sidebarTitle">ABOUT ME</span>
        <img
          src="https://img.freepik.com/free-vector/online-article-concept-illustration_114360-5193.jpg?w=1380&t=st=1707744595~exp=1707745195~hmac=a2d9b0680cc37bd86cbaed343132c6c9f98153c735db49e3022faed9e9101541"
          alt=""
        />
        <p>
          Welcome to SevenBlog - your hub for insightful content across various
          topics. Explore engaging posts on technology, lifestyle, travel, food,
          health & fitness, business & finance, sports, and entertainment. Join
          our community for thought-provoking articles curated to inform,
          inspire, and entertain. Dive into our archives, engage with fellow
          readers, and stay updated with fresh content. Welcome to a world of
          discovery and enrichment at SevenBlog!
        </p>
      </div>

      <div className="sidebarItem">
        <span className="sidebarTitle">CATEGORIES</span>
        <ul className="sidebarList">
          {cats.map((c) => (
            <Link to={`/?cat=${c.name}`} className="link" key={c.name}>
              <li className="sidebarListItem">{c.name}</li>
            </Link>
          ))}
        </ul>
      </div>

      <div className="sidebarItem">
        <span className="sidebarTitle">FOLLOW US</span>
        <div className="sidebarSocial">
          <i className="sidebarIcon fa-brands fa-facebook"></i>
          <i className="sidebarIcon fa-brands fa-x-twitter"></i>
          <i className="sidebarIcon fa-brands fa-instagram"></i>
        </div>
      </div>
    </div>
  );
};

export default Sidebar;
