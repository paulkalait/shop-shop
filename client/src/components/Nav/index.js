import React from "react";
import Auth from "../../utils/auth";
import { Link } from "react-router-dom";

function Nav() {

  function showNavigation() {
    if (Auth.loggedIn()) {
      return (
        <ul className="flex-row">
          <li className="mx-1">
            <Link to="/orderHistory">
              Order History
            </Link>
          </li>
          <li className="mx-1">
            {/* this is not using the Link component to logout or user and then refresh the application to the start */}
            <a href="/" onClick={() => Auth.logout()}>
              Logout
            </a>
          </li>
        </ul>
      );
    } else {
      return (
        <div className="flex-row mx-3 nav-items" >
          <div className="mx-1">
            <Link to="/signup">
              Signup
            </Link>
          </div>
          <div className="mx-1">
            <Link to="/login">
              Login
            </Link>
          </div>
        </div>
      );
    }
  }

  return (
    <header className="flex-row px-1 header">
      <h1 className="header-logo">
        <Link to="/">
          <span role="img" aria-label="shopping bag" ></span>
          Shop-Shop
        </Link>
      </h1>

      <nav>
        {showNavigation()}
      </nav>
    </header>
  );
}

export default Nav;
