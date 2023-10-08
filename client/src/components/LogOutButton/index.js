// import from utils
import Auth from "../../utils/auth";
// import from mui
import { Link } from "@mui/material";
import LogoutIcon from "@mui/icons-material/Logout";
// import styles
import styles from "./LogOutButton.module.css";


const LogOutButton = () => {
  const logout = (event) => {
    event.preventDefault();
    Auth.logout();
  };

  return (
    <>
      <Link
        className={styles.logOutButton}
        component="button"
        underline="none"
        role="button"
        onClick={logout}
      >
        <LogoutIcon fontSize="large" sx={{  marginBottom: "-.5rem" }} style={{ marginLeft: '.75rem' }} />
      <h6>Log Out</h6>
      </Link>
    </>
  );
};

export default LogOutButton;
