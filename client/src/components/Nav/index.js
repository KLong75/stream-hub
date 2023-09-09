import React from "react";
import { Link, useLocation } from "react-router-dom";

import Auth from "../../utils/auth";

const Nav = () => {
  const location = useLocation();
  const logout = (event) => {
    event.preventDefault();
    Auth.logout();
  };

  return (
    <nav>
      {Auth.loggedIn() ? (
        <>
          {/* The following conditionally renders each link based on the current path */}
          {location.pathname !== "/home_page" && (
            <Link to="/home_page">
              <li>Home</li>
            </Link>
          )}
          {location.pathname !== "/search" && (
            <Link to="/search">
              <li>Search</li>
            </Link>
          )}
          {location.pathname !== "/now_trending" && (
            <Link to="/now_trending">
              <li>Now Trending</li>
            </Link>
          )}
          <a href="/" onClick={logout}>
            <li>Sign Out</li>
          </a>
        </>
      ) : (
        <>
          <ul>
            <Link to="/">
              <li>streamHub</li>
            </Link>
            {/* If on signup page, show login link */}
            {location.pathname === "/signup" && (
              <Link to="/login">
                <li>Login</li>
              </Link>
            )}

            {/* If on login page, show signup link */}
            {location.pathname === "/login" && (
              <Link to="/signup">
                <li>Sign Up</li>
              </Link>
            )}
          </ul>
        </>
      )}
    </nav>
  );
};

export default Nav;
