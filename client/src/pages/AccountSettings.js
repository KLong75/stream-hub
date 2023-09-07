import DeleteAccountModal from "../components/DeleteAccountModal";
import UpdateUsernameModal from "../components/UpdateUsernameModal";
import UpdateUserEmailModal from "../components/UpdateUserEmailModal";
import UpdatePasswordModal from "../components/UpdatePasswordModal";

import React, { useState } from "react";

const AccountSettings = () => {
  const [updateSuccess, setUpdateSuccess] = useState(false);

  const handlePasswordUpdate = () => {
    setUpdateSuccess(true);
    setTimeout(() => setUpdateSuccess(false), 5000); // hides the message after 5 seconds
  };

  const [modalType, setModalType] = useState("");

  return (
    <>
      <h3>Account Settings</h3>

      <button onClick={() => setModalType("delete")}>Delete Account</button>
      <button onClick={() => setModalType("username")}>Update Username</button>
      <button onClick={() => setModalType("email")}>Update Email</button>
      <button onClick={() => setModalType("password")}>Update Password</button>

      {modalType === "delete" && (
        <DeleteAccountModal onClose={() => setModalType("")} />
      )}
      {modalType === "username" && (
        <UpdateUsernameModal onClose={() => setModalType("")} />
      )}
      {modalType === "email" && (
        <UpdateUserEmailModal onClose={() => setModalType("")} />
      )}
      {modalType === "password" && (
        <UpdatePasswordModal
          onClose={() => setModalType("")}
          onSuccessfulUpdate={handlePasswordUpdate}
        />
      )}
      {updateSuccess && <div>Password updated successfully!</div>}
    </>
  );
};

export default AccountSettings;
