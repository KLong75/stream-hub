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
      <Link className={styles.settingsButton} underline="none" onClick={handleOpenSettingsDrawer} >
        <SettingsIcon
          className={styles.settingsButton}
          
          sx={{ marginBottom: "-.5rem", cursor: "pointer" }}
          fontSize="large"
        />
        <h6 className={styles.settingsLabel}>Settings</h6>
      </Link>
    </>
  );
};
export default AccountSettingsIconButton;
