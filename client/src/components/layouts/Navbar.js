import React, { useContext } from "react";
import AuthContext from "../../context/authContext/authContext";
import { Link } from "react-router-dom";

const Navbar = () => {
  const { logOut, clearError, userAuth, user } = useContext(AuthContext);

  const onLogOut = () => {
    logOut();
    clearError();
  };

  const userLinks = (
    <>
      <li>Hello, {user && user.name}</li>
      <span className="sm-hide">|</span>
      <li>
        <a href="#!" onClick={onLogOut}>
          <span className="sm-hide">Logout</span>
          <i className="fas fa-sign-out-alt"></i>
        </a>
      </li>
    </>
  );

  const authLink = (
    <>
      <li>
        <Link to="register">Register</Link>
      </li>
      <span className="sm-hide">|</span>
      <li>
        <Link to="login">Login</Link>
      </li>
    </>
  );
  return (
    <div className="navbar">
      <div className="logo">
        <h1>
          <i className="fas fa-glass-cheers" />
          RSVPs
        </h1>
      </div>
      <ul>{userAuth ? userLinks : authLink}</ul>
    </div>
  );
};

export default Navbar;
