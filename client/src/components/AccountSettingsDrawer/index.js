import React, { useState, useEffect } from "react";

import { useNavigate } from "react-router-dom";

import Button from "@mui/material/Button";

import Box from "@mui/material/Box";
import Drawer from "@mui/material/Drawer";
import List from "@mui/material/List";
import Divider from "@mui/material/Divider";
import ListItem from "@mui/material/ListItem";

import Auth from "../../utils/auth";

import DeleteAccountModal from "../../components/DeleteAccountModal";
import UpdateUsernameModal from "../../components/UpdateUsernameModal";
import UpdateUserEmailModal from "../../components/UpdateUserEmailModal";
import UpdatePasswordModal from "../../components/UpdatePasswordModal";
import Heading from "../../components/Heading";
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
    <Drawer anchor="right" open={isOpen} onClose={onClose}>
      <Box
        sx={{
          height: "100%",
          backgroundColor: "#f5f5f5",
        }}
        role="presentation"
        className={styles.settingsDrawer}
      >
        <Heading heading={"Account Settings"} variant="h2" />
        <List>
          <ListItem style={{ margin: "1rem" }} textAlign='center'>
            <Box
              display="flex"
              alignItems="center"
              justifyContent="center"
              width="100%"
              height="100%"
            >
              <Button onClick={() => setModalType("email")}>
                Update Email
              </Button>
            </Box>
          </ListItem>

          <Divider />
          <ListItem style={{ margin: "1rem" }}>
            <Box
              display="flex"
              alignItems="center"
              justifyContent="center"
              width="100%"
            >
              <Button onClick={() => setModalType("username")}>
                Update Username
              </Button>
            </Box>
          </ListItem>
          <Divider />
          <ListItem style={{ margin: "1rem" }}>
            <Box
              display="flex"
              alignItems="center"
              justifyContent="center"
              width="100%"
            >
              <Button onClick={() => setModalType("password")}>
                Update Password
              </Button>
            </Box>
          </ListItem>
          <Divider />
          <ListItem style={{ margin: "1rem" }}>
            <Box
              display="flex"
              alignItems="center"
              justifyContent="center"
              width="100%"
            >
              <Button onClick={() => setModalType("delete")}>
                Delete Account
              </Button>
            </Box>
          </ListItem>
          <Divider />
        </List>

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
