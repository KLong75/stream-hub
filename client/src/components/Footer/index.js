// import images
import filmStrip from "../../assets/images/FilmStrip_PNG.png";
// import from mui
import Grid from "@mui/material/Unstable_Grid2";
import { Link } from "@mui/material";
// import from react-router-dom
import { useLocation } from "react-router-dom";
// import styles
import styles from "./Footer.module.css";

const Footer = () => {
  const location = useLocation();
  if (location.pathname === "/") return null;

  return (
    <footer
      style={{
        position: "relative",
        bottom: 0,
        height: "5rem",
        backgroundImage: `url(${filmStrip})`,
        backgroundRepeat: "repeat-x",
        backgroundSize: "auto 5rem",
        backgroundPosition: "left bottom",
      }}>
      <Grid container spacing={2} justifyContent="center" alignItems="center">
        <Grid style={{ position: "relative", marginTop: "-1.75rem" }}>
          <span>
            <Link
              className={styles.footerLink}
              underline="none"
              target="_blank"
              rel="noreferrer"
              href="https://kevinlong.dev/">
              ©2023 www.kevinlong.dev
            </Link>
          </span>
        </Grid>
      </Grid>
    </footer>
  );
};

export default Footer;
