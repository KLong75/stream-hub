import React from "react";
import { Link as RouterLink, useLocation } from "react-router-dom";
// import from utils

// import from mui
import { Link } from "@mui/material";
import Grid from "@mui/material/Unstable_Grid2/Grid2";
// import components
import AccountSettingsIconButton from "../AccountSettingsIconButton";
import LogOutButton from "../LogOutButton";

import styles from "./Nav.module.css";

const Nav = () => {
  const location = useLocation();

  return (
    <>
      <nav>
        <Grid container alignItems="center" justifyContent="center" spacing={4}>
        {/* The following conditionally renders each link based on the current path */}
         {location.pathname !== "/home_page" && (
          <Grid>
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
          </Grid>
        )}
        {location.pathname !== "/search" && (
          <Grid>
          <Link
            className={styles.navLink}
            component={RouterLink}
            to="/search"
            underline="none"
            sx={{ marginRight: 2, textTransform: "uppercase" }}
          >
            Search
          </Link>
          </Grid>
        )}
        {location.pathname !== "/now_trending" && (
          <Grid>
          <Link
            className={styles.navLink}
            component={RouterLink}
            to="/now_trending"
            underline="none"
            sx={{ marginRight: 2, textTransform: "uppercase" }}
          >
            Trending Titles
          </Link>
          </Grid>
        )} 
        {/* <Grid container alignItems="center" justifyContent="center" spacing={4}> */}
          <Grid>
            <AccountSettingsIconButton />
          </Grid>
          <Grid>
            <LogOutButton />
          </Grid>
        </Grid>
        
      </nav>
    </>
  );
};

export default Nav;
