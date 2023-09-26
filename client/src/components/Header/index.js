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
import Grid from "@mui/material/Unstable_Grid2/Grid2";

import MenuItem from "@mui/material/MenuItem";
import SettingsIcon from "@mui/icons-material/Settings";

import AccountSettingsDrawer from "../AccountSettingsDrawer";
import Nav from "../Nav";

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
      <header className={styles.header}>
        <AccountSettingsDrawer
          isOpen={isSettingsDrawerOpen}
          onClose={handleCloseSettingsDrawer}
        />
        <Grid container alignItems="center" justifyContent="center" spacing={0}>
          <Grid xs={1}>
            <Box
            className={styles.tvIcon}
              component="img"
              src={tvIcon}
              alt="TV icon"
              sx={{ width: "auto", height: "4rem", padding: ".25rem" }}
            />
          </Grid>
          <Grid xs={4}>
            <h1 className={styles.appTitle}>streamHub</h1>
          </Grid>
          <Grid xs={3}></Grid>
          <Grid>
            <Box>
              <Nav />
            </Box>
          </Grid>
          <Grid xs={0}>
            <Link component="button" onClick={handleOpenSettingsDrawer} style={{padding: '.5rem', marginTop: '.25rem'}}>
              <SettingsIcon
                onClick={handleOpenSettingsDrawer}
                fontSize="large"
                style={{ color: "black"}}
              />
            </Link>
          </Grid>
        </Grid>
      </header>
    </>
  );
};

export default Header;
