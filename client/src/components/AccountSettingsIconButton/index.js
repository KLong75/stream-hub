import { useState } from "react";
import AccountSettingsDrawer from "../AccountSettingsDrawer";
import { Link } from "@mui/material";
import SettingsIcon from "@mui/icons-material/Settings";

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
      <Link className={styles.settingsButton} underline="none" component="button" onClick={handleOpenSettingsDrawer}>
        <SettingsIcon
          sx={{ marginBottom: "-2rem" }}
          onClick={handleOpenSettingsDrawer}
          fontSize="large"
        />
        <h6>Settings</h6>
      </Link>
    </>
  );
};
export default AccountSettingsIconButton;
