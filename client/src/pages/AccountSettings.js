import DeleteAccountModal from "../components/DeleteAccountModal";
import UpdateUsernameModal from "../components/UpdateUsernameModal";
import UpdateUserEmailModal from "../components/UpdateUserEmailModal";
import UpdatePasswordModal from "../components/UpdatePasswordModal";


import React, { useState } from "react";
// import { Link, useNavigate } from "react-router-dom";

// import Auth from "../utils/auth";
// import { useMutation } from "@apollo/client";

// import { DELETE_USER } from "../utils/mutations";

const AccountSettings = () => {
  // const navigate = useNavigate();
  const [modalType, setModalType] = useState("");
  // const [deleteUser, { error }] = useMutation(DELETE_USER);
  
  // const [showModal, setShowModal] = useState(false);
  // "delete", "username", "email", "password"

  // const deleteAccount = async (event) => {
  //   event.preventDefault();
  //   try {
  //     await deleteUser();
  //     Auth.logout();
  //     navigate("/");
  //     alert("Account Deleted");
  //   } catch (e) {
  //     console.log(e);
  //   }
  // };

  // const handleOpenModal = (type) => {
  //   setModalType(type);
  //   setShowModal(true);
  // };

  // const handleCloseModal = () => {
  //   setModalType("");
  //   setShowModal(false);
  // };

  return (
    <>
      <h3>Account Settings</h3>

      <button onClick={() => setModalType("delete")}>Delete Account</button>
      <button onClick={() => setModalType("username")}>Update Username</button>
      <button onClick={() => setModalType("email")}>Update Email</button>
      <button onClick={() => setModalType("password")}>Update Password</button>

      {modalType === "delete" && <DeleteAccountModal onClose={() => setModalType("")} />}
      {modalType === "username" && <UpdateUsernameModal onClose={() => setModalType("")} />}
      {modalType === "email" && <UpdateUserEmailModal onClose={() => setModalType("")} />}
      {modalType === "password" && <UpdatePasswordModal onClose={() => setModalType("")} />}

    
      {/* <button onClick={() => handleOpenModal("delete")}>
        Delete Account
      </button>
      <button onClick={() => handleOpenModal("username")}>
        Update Username
      </button>
      <button onClick={() => handleOpenModal("email")}>
        Update Email
      </button>
      <button onClick={() => handleOpenModal("password")}>
        Update Password
      </button> */}

      {/* {showModal && (
        <div className="modal">
          {modalType === "delete" && (
            <div>
              <p>Are you sure you want to delete your account?</p>
              <button onClick={deleteAccount}>Confirm Delete</button>
            </div>
          )}
          {modalType === "username" && (
            <div>
              <p>Update your username</p>
               Form to update username 
            </div>
          )}
          {modalType === "email" && (
            <div>
              <p>Update your email</p>
               Form to update email 
            </div>
          )}
          {modalType === "password" && (
            <div>
              <p>Update your password</p>
               Form to update password 
            </div>
          )}
          <button onClick={handleCloseModal}>Close</button>
        </div>
      )}  */}

       {/* <Link to="/home_page">
        <button>Return Home</button>
      </Link> 

       {error ? (
        <p className="error-text font-link" id="log-in-error">
          Account Deletion Failed.
        </p>
      ) : null} */}
     </> 
  );
};

export default AccountSettings;
