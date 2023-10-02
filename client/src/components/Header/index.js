import { useLocation } from "react-router-dom";
// import from utils
import Auth from "../../utils/auth";
// import from mui
import Grid from "@mui/material/Unstable_Grid2/Grid2";
// import components
import Nav from "../Nav";
// import images
import tvIcon from "../../assets/images/tvIcon.png";

import styles from "./Header.module.css";

const Header = () => {
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
        <Grid container alignItems="center">
          <Grid xs={2}>
            <img className={styles.tvIcon} src={tvIcon} alt="TV icon" />
          </Grid>
          <Grid xs={4} >
            <h1 className={styles.appTitle}>streamHub</h1>
          </Grid>
          <Grid xs={3}></Grid>
          <Grid xs={3} sx={{marginBottom: '-.75rem'}}>
            <Nav />
          </Grid>
        </Grid>
      </header>
    </>
  );
};

export default Header;
