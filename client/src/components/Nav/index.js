import React from "react";
import { Link as RouterLink, useLocation } from "react-router-dom";
// import from utils

// import from mui
import { Link } from "@mui/material";
import Grid from "@mui/material/Unstable_Grid2/Grid2";
// import components
import AccountSettingsIconButton from "../AccountSettingsIconButton";
import SearchDrawerIconButton from "../SearchDrawerIconButton";
import LogOutButton from "../LogOutButton";
import WhatsHotModal from "../WhatsHotModal";
// import styles
import styles from "./Nav.module.css";

const Nav = () => {
  const location = useLocation();

  return (
    <>
      <nav>
        <Grid container alignItems="center" justifyContent={'center'} textAlign='center'>
        {/* The following conditionally renders each link based on the current path */}
         {location.pathname !== "/home_page" && (
          <Grid xs={2}>
          <Link
            className={styles.navLink}
            component={RouterLink}
            to="/home_page"
            sx={{
              textTransform: "uppercase",
              textDecoration: "none",
            }}
          >
            Home
          </Link>
          </Grid>
        )}
        {/* {location.pathname !== "/search" && (
          <Grid xs={3}>
          <Link
            className={styles.navLink}
            component={RouterLink}
            to="/search"
            underline="none"
            sx={{ textTransform: "uppercase" }}
          >
            Search
          </Link>
          </Grid>
        )} */}
        {/* {location.pathname !== "/now_trending" && (
          <Grid xs={3}>
          <Link
            className={styles.navLink}
            component={RouterLink}
            to="/now_trending"
            underline="none"
            sx={{ textTransform: "uppercase", justifyContent: "center" }}
          >
            Trending 
          </Link>
          </Grid>
        )}  */}
        {/* <Grid container alignItems="center" justifyContent="center" spacing={4}> */}
          <Grid xs={2}>
            <WhatsHotModal />
          </Grid>
          <Grid xs={2}>
            <SearchDrawerIconButton />
          </Grid>
          <Grid xs={2}>
            <AccountSettingsIconButton />
          </Grid>
          <Grid xs={2}>
            <LogOutButton />
          </Grid>
        </Grid>
      </nav>
    </>
  );
};

export default Nav;
