import React, { useState, useEffect } from "react";

import { useNavigate } from "react-router-dom";


import Box from "@mui/material/Box";
import Drawer from "@mui/material/Drawer";
import List from "@mui/material/List";
import Divider from "@mui/material/Divider";
import ListItem from "@mui/material/ListItem";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";
import DeleteForeverIcon from '@mui/icons-material/DeleteForever';
import PersonIcon from '@mui/icons-material/Person';
import EmailIcon from "@mui/icons-material/Email";
import PasswordIcon from "@mui/icons-material/Password";
import Auth from "../../utils/auth";

import Heading from "../../components/Heading";
import DeleteAccountModal from "../../components/DeleteAccountModal";
import UpdateUsernameModal from "../../components/UpdateUsernameModal";
import UpdateUserEmailModal from "../../components/UpdateUserEmailModal";
import UpdatePasswordModal from "../../components/UpdatePasswordModal";
import styles from "./AccountSettingsDrawer.module.css";


const AccountSettingsDrawer = ({ isOpen, onClose }) => {
  const navigate = useNavigate();
  const [updateSuccess, setUpdateSuccess] = useState(false);

  const [showRedirectMessage, setShowRedirectMessage] = useState(false);
  const [isAuthenticated, setIsAuthenticated] = useState(Auth.loggedIn());

  useEffect(() => {
    if (!isAuthenticated) {
      setShowRedirectMessage(true);
      setTimeout(() => {
        navigate("/");
      }, 3000);
    }
  }, [navigate, isAuthenticated]);

  useEffect(() => {
    setIsAuthenticated(Auth.loggedIn());
  }, []);

  const handlePasswordUpdate = () => {
    setUpdateSuccess(true);
    setTimeout(() => setUpdateSuccess(false), 5000); // hides the message after 5 seconds
  };

  const handleUserEmailUpdate = () => {
    setUpdateSuccess(true);
    setTimeout(() => setUpdateSuccess(false), 5000); // hides the message after 5 seconds
  };

  const handleUsernameUpdate = () => {
    setUpdateSuccess(true);
    setTimeout(() => setUpdateSuccess(false), 5000); // hides the message after 5 seconds
  };

  const [modalType, setModalType] = useState("");

  if (showRedirectMessage) {
    return <div>Please login or signup</div>;
  }
  return (
    <Drawer anchor="top" open={isOpen} onClose={onClose}>
      <Box
        sx={{
          height: "100%",
          backgroundColor: "#f5f5f5",
        }}
        className={styles.settingsDrawer}
      >
        <List>
        <Heading heading={"Account Settings"} variant="h2" />
          <Divider />
          <ListItem>
            <ListItemButton onClick={() => setModalType("email")}>
              <ListItemIcon>
                <EmailIcon />
              </ListItemIcon>
              <ListItemText primary="Update Email" />
            </ListItemButton>
          </ListItem>
          <Divider />

          <ListItem>
              <ListItemButton onClick={() => setModalType("username")}>
                <ListItemIcon>
                  <PersonIcon />
                </ListItemIcon>
                <ListItemText primary="Update Username" />
              </ListItemButton>
          </ListItem>
          <Divider />
          <ListItem>
              <ListItemButton onClick={() => setModalType("password")}>
                <ListItemIcon>
                  <PasswordIcon />
                </ListItemIcon>
               <ListItemText primary="Update Password" />
              </ListItemButton>
          </ListItem>
          <Divider />
          <ListItem >
              <ListItemButton onClick={() => setModalType("delete")}>
                <ListItemIcon>
                  <DeleteForeverIcon />
                </ListItemIcon>
               <ListItemText primary="Delete Account" />
              </ListItemButton>
          </ListItem>
          <Divider />
        </List>

        {/* <Grid container spacing={2} justifyContent="center" textAlign="center">
        <Grid xs={12} >
          <Button onClick={() => setModalType("email")}>Update Email</Button>
        </Grid>
        <Grid xs={12}>
          <Button onClick={() => setModalType("username")}>
            Update Username
          </Button>
        </Grid>
        <Grid xs={12} >
          <Button onClick={() => setModalType("password")}>
            Update Password
          </Button>
        </Grid>
        <Grid xs={12}>
          <Button onClick={() => setModalType("delete")}>Delete Account</Button>
        </Grid>
      </Grid> */}

        {modalType === "delete" && (
          <DeleteAccountModal onClose={() => setModalType("")} />
        )}
        {modalType === "username" && (
          <UpdateUsernameModal
            onClose={() => setModalType("")}
            onSuccessfulUpdate={handleUsernameUpdate}
          />
        )}
        {modalType === "email" && (
          <UpdateUserEmailModal
            onClose={() => setModalType("")}
            onSuccessfulUpdate={handleUserEmailUpdate}
          />
        )}
        {modalType === "password" && (
          <UpdatePasswordModal
            onClose={() => setModalType("")}
            onSuccessfulUpdate={handlePasswordUpdate}
          />
        )}
        {updateSuccess && <div>Your account information has been updated.</div>}
      </Box>
    </Drawer>
  );
};

export default AccountSettingsDrawer;
