import React, { useContext } from "react";
import { useNavigate, Link } from "react-router-dom";
import AuthContext from "../../context/AuthContext";
import "./NavBar.css";

const Navbar = () => {
  const { logoutUser, user } = useContext(AuthContext);
  const navigate = useNavigate();

  console.log()

  return (
    <div className="navBar">
      <ul>
        <li className="brand">
          <Link to="/" style={{ textDecoration: "none", color: "white" }}>
            <b>LetsTrack</b>
          </Link>
        </li>
        <li>
          <Link to="/" style={{ textDecoration: "none", color: "white" }}>
            <b>Homepage</b>
          </Link>
        </li>
        {/* <li>
          <Link to="/events" style={{ textDecoration: "none", color: "white" }}>
            <b>Events</b>
          </Link>
        </li>
          <li>
            <Link
              to="/students"
              style={{ textDecoration: "none", color: "white" }}>
              <b>Students</b>
            </Link>
          </li> */}
        <li>
          {user ? (
            <button onClick={logoutUser}>Logout</button>
          ) : (
            <button onClick={() => navigate("/login")}>Login</button>
          )}
        </li>
      </ul>
    </div>
  );
};

export default Navbar;

