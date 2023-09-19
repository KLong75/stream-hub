import React from "react";
import { Link as RouterLink, useLocation } from "react-router-dom";
// import from utils
import Auth from "../../utils/auth";
// import from mui
import { AppBar, Toolbar, Button, Typography, Link } from "@mui/material";

import styles from "./Header.module.css";

const Header = () => {
  const location = useLocation();
  const logout = (event) => {
    event.preventDefault();
    Auth.logout();
  };

  // If the location is the landing page don't render the header
  if (location.pathname === "/") {
    return null;
  }
  // If the user is not logged in don't render the header
  if (!Auth.loggedIn()) {
    return null;
  }

  return (
    <>
      <AppBar position="static" className={styles.header}>
        <Toolbar>
          <Typography
            variant="h1"
            component="div"
            sx={{ flexGrow: 1 }}
            className={styles.app_title}
          >
            streamHub
          </Typography>
          <nav>
            {/* The following conditionally renders each link based on the current path */}
            {location.pathname !== "/home_page" && (
              <Link
                color="inherit"
                component={RouterLink}
                to="/home_page"
                variant="button"
                underline="none"
                sx={{ marginRight: 2, textTransform: "uppercase" }}
              >
                Home
              </Link>
            )}
            {location.pathname !== "/search" && (
              <Link
                color="inherit"
                component={RouterLink}
                to="/search"
                variant="button"
                underline="none"
                sx={{ marginRight: 2, textTransform: "uppercase" }}
              >
                Search
              </Link>
            )}
            {location.pathname !== "/now_trending" && (
              <Link
                color="inherit"
                component={RouterLink}
                to="/now_trending"
                variant="button"
                underline="none"
                sx={{ marginRight: 2, textTransform: "uppercase" }}
              >
                Trending Titles
              </Link>
            )}
          </nav>
          <Button
            className="styles.signout_button"
            color="inherit"
            onClick={logout}
            sx={{
              marginRight: 2,
              paddingRight: 0,
              paddingLeft: 0,
              backgroundImage: "none",
              "&:hover": {
                backgroundImage: "none",
                color: "white",
              },
            }}
          >
            Sign Out
          </Button>
        </Toolbar>
      </AppBar>
    </>
  );
};

export default Header;
