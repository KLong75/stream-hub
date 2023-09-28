// import from utils
import Auth from "../../utils/auth";
// import from mui
import { Link } from "@mui/material";
import LogoutIcon from "@mui/icons-material/Logout";


const LogOutButton = () => {
  const logout = (event) => {
    event.preventDefault();
    Auth.logout();
  };

  return (
    <>
      <Link
        component="button"
       
        underline="none"
        role="button"
        onClick={logout}
        
      >
        <LogoutIcon fontSize="large" sx={{  marginBottom: "-1.55rem" }} style={{ color: "black", marginLeft: '.75rem' }} />
    
      <h6 style={{color: "black"}}>Sign Out</h6>
      </Link>
    </>
  );
};

export default LogOutButton;
