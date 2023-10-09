import { useState } from "react";
import AccountSettingsDrawer from "../AccountSettingsDrawer";
import SettingsIcon from "@mui/icons-material/Settings";
import { Link } from "@mui/material";
import styles from "./AccountSettingsIconButton.module.css";

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
      <Link className={styles.settingsButton} underline="none" >
        <SettingsIcon
          className={styles.settingsButton}
          onClick={handleOpenSettingsDrawer}
          sx={{ marginBottom: "-.5rem", cursor: "pointer" }}
          fontSize="large"
        />
        <h6>Settings</h6>
      </Link>
    </>
  );
};
export default AccountSettingsIconButton;
