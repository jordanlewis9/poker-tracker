import React from "react";
import { Link } from "react-router-dom";
import GoogleAuth from "./GoogleAuth";

const Header = () => {
  return (
    <div className="ui inverted menu">
      <Link to="/" className="item">
        Home
      </Link>
      <Link to="/sessions/new" className="item">
        Record Sessions
      </Link>
      <Link to="/sessions/:id" className="item">
        View Results
      </Link>
      <Link to="/" className="right menu item">
        <GoogleAuth />
      </Link>
    </div>
  );
};

export default Header;
