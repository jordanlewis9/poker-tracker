import React from "react";
import { Link } from "react-router-dom";
import GoogleAuth from "./GoogleAuth";
import history from "../history";

const Header = () => {
  const active = history.location.pathname;
  return (
    <div className="ui inverted menu">
      <Link to="/" className={`item ${active === "/" ? "active" : ""}`}>
        Home
      </Link>
      <Link
        to="/sessions/new"
        className={`item ${active === "/sessions/new" ? "active" : ""}`}
      >
        Record Sessions
      </Link>
      <Link
        to="/sessions"
        className={`item ${active === "/sessions" ? "active" : ""}`}
      >
        View Results
      </Link>
      <Link to="/" className="right menu item">
        <GoogleAuth />
      </Link>
    </div>
  );
};

export default Header;
