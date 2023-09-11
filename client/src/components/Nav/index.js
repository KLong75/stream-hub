import React from "react";
import { useLocation } from "react-router-dom";
import { Link as RouterLink } from "react-router-dom";
// import from utils
import Auth from "../../utils/auth";
// import from mui
import { AppBar, Toolbar, Button, Typography, Link } from "@mui/material";

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
          <AppBar position="static">
            <Toolbar>
              <Typography component="div" sx={{ flexGrow: 1 }}>
                <h1>streamHub</h1>
              </Typography>
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
              <Button
                color="inherit"
                onClick={logout}
                sx={{ marginRight: 2, paddingRight: 0, paddingLeft: 0 }}
              >
                Sign Out
              </Button>
            </Toolbar>
          </AppBar>
        </>
      ) : (
        <>
          <AppBar position="static">
            <Toolbar>
              <Typography component="div" sx={{ flexGrow: 1 }}>
                <Link
                  to="/"
                  color={"inherit"}
                  underline="none"
                  component={RouterLink}
                  // variant="button"
                >
                  <h1>streamHub</h1>
                </Link>
              </Typography>
              {/* If on login page, show signup link */}
              {location.pathname === "/login" && (
                <Link
                  color="inherit"
                  component={RouterLink}
                  to="/signup"
                  variant="button"
                  underline="none"
                  sx={{ marginRight: 2, textTransform: "uppercase" }}
                >
                  Signup
                </Link>
              )}
              {location.pathname === "/signup" && (
                <Link
                  color="inherit"
                  component={RouterLink}
                  to="/login"
                  variant="button"
                  underline="none"
                  sx={{ marginRight: 2, textTransform: "uppercase" }}
                >
                  Login
                </Link>
              )}
            </Toolbar>
          </AppBar>
        </>
      )}
    </nav>
  );
};

export default Nav;
