import React from "react";
import { Link as RouterLink, useLocation } from "react-router-dom";
// import from utils
import Auth from "../../utils/auth";
// import from mui
import { AppBar, Toolbar, Typography, Link } from "@mui/material";
import Box from "@mui/material/Box";
import IconButton from "@mui/material/IconButton";
import Menu from "@mui/material/Menu";
import MenuIcon from "@mui/icons-material/Menu";
import Container from "@mui/material/Container";

import MenuItem from "@mui/material/MenuItem";
import SettingsIcon from "@mui/icons-material/Settings";

import AccountSettingsDrawer from "../AccountSettingsDrawer";

// import images
import tvIcon from "../../assets/images/tvIcon.png";

import styles from "./Header.module.css";

const Header = () => {
  const [isSettingsDrawerOpen, setSettingsDrawerOpen] = React.useState(false);
  const handleOpenSettingsDrawer = () => {
    setSettingsDrawerOpen(true);
  };

  const handleCloseSettingsDrawer = () => {
    setSettingsDrawerOpen(false);
  };


  const [anchorElNav, setAnchorElNav] = React.useState(null);

  const handleOpenNavMenu = (event) => {
    setAnchorElNav(event.currentTarget);
  };

  const handleCloseNavMenu = () => {
    setAnchorElNav(null);
  };

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
        <Container maxWidth="xl">
        <AccountSettingsDrawer isOpen={isSettingsDrawerOpen}
        onClose={handleCloseSettingsDrawer}/>
          <Toolbar>
            <Box
              component="img"
              src={tvIcon}
              alt="TV icon"
              sx={{ display: { xs: "none", md: "flex" }, mr: 1 }}
            />
            <Typography
              noWrap
              variant="h1"
              sx={{
                mr: 2,
                fontFamily: "monospace",
                fontWeight: 700,
                letterSpacing: ".3rem",
                textDecoration: "none",
                display: { xs: "none", md: "flex" },
              }}
              className={styles.app_title}
            >
              streamHub
            </Typography>

            <Box sx={{ flexGrow: 1, display: { xs: "flex", md: "none" } }}>
              <IconButton
                size="large"
                edge="start"
                aria-label="open menu"
                aria-controls="menu-appbar"
                aria-haspopup="true"
                onClick={handleOpenNavMenu}
              >
                <MenuIcon fontSize="large"/>
              </IconButton>
              
              <Menu
                id="menu-appbar"
                anchorEl={anchorElNav}
                anchorOrigin={{
                  vertical: "bottom",
                  horizontal: "left",
                }}
                keepMounted
                transformOrigin={{
                  vertical: "top",
                  horizontal: "left",
                }}
                open={Boolean(anchorElNav)}
                onClose={handleCloseNavMenu}
                sx={{
                  display: { xs: "block", md: "none" },
                }}
              >
                {location.pathname !== "/home_page" && (
                  <MenuItem onClick={handleCloseNavMenu}>
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
                  </MenuItem>
                )}

                {location.pathname !== "/search" && (
                  <MenuItem onClick={handleCloseNavMenu}>
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
                  </MenuItem>
                )}

                {location.pathname !== "/now_trending" && (
                  <MenuItem onClick={handleCloseNavMenu}>
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
                  </MenuItem>
                )}
              </Menu>
            </Box>
            <Box
              component="img"
              src={tvIcon}
              alt="TV icon"
              sx={{ display: { xs: "flex", md: "none" }, mr: 1 }}
            />

            <Typography
              className={styles.app_title}
              variant="h1"
              noWrap
              sx={{
                mr: 2,
                display: { xs: "flex", md: "none" },
                flexGrow: 1,
                fontFamily: "monospace",
                fontWeight: 700,
                letterSpacing: ".3rem",
                color: "inherit",
                
              }}
            >
              streamHub
            </Typography>
            <Box sx={{ flexGrow: 1, display: { xs: "none", md: "flex" } }}>
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
              <Link
                underline="none"
                variant="button"
                color="inherit"
                onClick={logout}
                sx={{
                  cursor: "pointer",
                  textTransform: "uppercase",
                  color: "inherit",
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
              </Link>
            </Box>

            <Link component="button" onClick={handleOpenSettingsDrawer}>
              <SettingsIcon onClick={handleOpenSettingsDrawer}fontSize="large" style={{color: 'black'}} />
            </Link>
          </Toolbar>
        </Container>
      </AppBar>
    </>
  );
};

export default Header;
