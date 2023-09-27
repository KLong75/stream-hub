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
    <Link
      component="button"
      onClick={handleOpenSettingsDrawer}
      style={{ padding: ".5rem", marginTop: ".25rem" }}
    >
      <SettingsIcon
        onClick={handleOpenSettingsDrawer}
        fontSize="large"
        style={{ color: "black" }}
      />
    </Link>
    </>
  );
};
export default AccountSettingsIconButton;
