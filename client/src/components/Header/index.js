import { useLocation } from "react-router-dom";
// import from utils
import Auth from "../../utils/auth";
// import from mui
import Box from "@mui/material/Box";
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
        <Grid container alignItems="center" justifyContent="center" spacing={2}>
          <Grid xs={1}>
            <Box
              className={styles.tvIcon}
              component="img"
              src={tvIcon}
              alt="TV icon"
              sx={{ width: "auto", height: "4rem", padding: ".25rem" }}
            />
          </Grid>
          <Grid xs={3}>
            <h1 className={styles.appTitle}>streamHub</h1>
          </Grid>
          <Grid xs={8}>
            <Nav />
          </Grid>
        </Grid>
      </header>
    </>
  );
};

export default Header;
