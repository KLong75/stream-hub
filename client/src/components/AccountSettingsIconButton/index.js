import { useState } from "react";
import AccountSettingsDrawer from "../AccountSettingsDrawer";
import { Link } from "@mui/material";
import SettingsIcon from "@mui/icons-material/Settings";

const AccountSettingsIconButton = () => {
  const [isSettingsDrawerOpen, setSettingsDrawerOpen] = useState(false);
  const handleOpenSettingsDrawer = () => {
    setSettingsDrawerOpen(true);
  };

  const handleCloseSettingsDrawer = () => {
    setSettingsDrawerOpen(false);
  };

  return (
    <>
      <AccountSettingsDrawer
        isOpen={isSettingsDrawerOpen}
        onClose={handleCloseSettingsDrawer}
      />
      <Link underline="none" component="button" onClick={handleOpenSettingsDrawer}>
        <SettingsIcon
          sx={{ marginBottom: "-1.5rem" }}
          onClick={handleOpenSettingsDrawer}
          fontSize="large"
          style={{ color: "black" }}
        />
        <h6 style={{color: "black"}}>Account Settings</h6>
      </Link>
    </>
  );
};
export default AccountSettingsIconButton;
