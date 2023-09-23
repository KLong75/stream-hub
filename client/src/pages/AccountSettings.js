import React, { useState, useEffect } from "react";

import { useNavigate } from "react-router-dom";

import Button from "@mui/material/Button";

import Auth from "../utils/auth";

import DeleteAccountModal from "../components/DeleteAccountModal";
import UpdateUsernameModal from "../components/UpdateUsernameModal";
import UpdateUserEmailModal from "../components/UpdateUserEmailModal";
import UpdatePasswordModal from "../components/UpdatePasswordModal";


const AccountSettings = () => {
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
    <>
      <h3>Account Settings</h3>
      <Button onClick={() => setModalType("delete")}>Delete Account</Button>
      <Button onClick={() => setModalType("username")}>Update Username</Button>
      <Button onClick={() => setModalType("email")}>Update Email</Button>
      <Button onClick={() => setModalType("password")}>Update Password</Button>
      
      {modalType === "delete" && (
        <DeleteAccountModal 
          onClose={() => setModalType("")}  
        />
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
    </>
  );
};

export default AccountSettings;
