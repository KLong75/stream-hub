import React from "react";
import { Link as RouterLink, useLocation } from "react-router-dom";
// import from utils
import Auth from "../../utils/auth";
// import from mui
import { Link } from "@mui/material";


import styles from "./Nav.module.css";

const Nav = () => {
  const location = useLocation();
  const logout = (event) => {
    event.preventDefault();
    Auth.logout();
  };

  return (
    <>
      <nav>
        {/* The following conditionally renders each link based on the current path */}
        {location.pathname !== "/home_page" && (
          <Link
            className={styles.navLink}
            component={RouterLink}
            to="/home_page"
            sx={{
              marginRight: 2,
              textTransform: "uppercase",
              textDecoration: "none",
            }}
          >
            Home
          </Link>
        )}
        {location.pathname !== "/search" && (
          <Link
            className={styles.navLink}
            component={RouterLink}
            to="/search"
            underline="none"
            sx={{ marginRight: 2, textTransform: "uppercase" }}
          >
            Search
          </Link>
        )}
        {location.pathname !== "/now_trending" && (
          <Link
            className={styles.navLink}
            component={RouterLink}
            to="/now_trending"
            underline="none"
            sx={{ marginRight: 2, textTransform: "uppercase" }}
          >
            Trending Titles
          </Link>
        )}
        <Link
          className={styles.signOutButton}
          underline="none"
          role="button"
          onClick={logout}
          sx={{ marginRight: 2, textTransform: "uppercase" }}
        >
          Sign Out
        </Link>
      </nav>
    </>
  );
};

export default Nav;
