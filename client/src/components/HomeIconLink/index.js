// import from mui
import HomeIcon from "@mui/icons-material/Home";
import { Link } from "@mui/material";
// import styles
import styles from "./HomeIconLink.module.css";

const HomeIconLink = () => {
  return (
    <>
      <Link className={styles.homeIconLink} underline="none" href="/home_page">
        <HomeIcon fontSize="large" sx={{ marginBottom: "-2rem" }} />
        <h6>Home</h6>
      </Link>
    </>
  );
};
export default HomeIconLink;
