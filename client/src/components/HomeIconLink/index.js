// import from react-router-dom
import { Link } from "react-router-dom";
// import from mui
import HomeIcon from "@mui/icons-material/Home";
// import styles
import styles from "./HomeIconLink.module.css";

const HomeIconLink = () => {
  return (
    <>
      <Link className={styles.homeIconLink} underline="none" to="/home_page">
        <HomeIcon fontSize="large" sx={{ marginBottom: "-1.85rem" }} />
        <h6>Home</h6>
      </Link>
    </>
  );
};
export default HomeIconLink;
