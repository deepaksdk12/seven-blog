import React from "react";
import "./header.css";

const Header = () => {
  return (
    <div className="header">
      <div className="headerTitles">
        <span className="headerTitleSm">Seven</span>
        <span className="headerTitleLg">Blog</span>
      </div>
      <img
        className="headerImg"
        src="https://img.freepik.com/free-photo/beautiful_1203-2633.jpg?w=2000&t=st=1707735963~exp=1707736563~hmac=aeda2ba4ed7c843257a3eceecec2e95487d9248dd9c702c68067376ab6e50e3f"
        alt=""
      />
    </div>
  );
};

export default Header;
