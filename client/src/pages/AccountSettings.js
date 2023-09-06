import React from "react";
import { Link, useNavigate } from "react-router-dom";

import Auth from "../utils/auth";
import { useMutation } from "@apollo/client";

import { DELETE_USER } from "../utils/mutations";

const AccountSettings = () => {
  const navigate = useNavigate();
  const [deleteUser, { error }] = useMutation(DELETE_USER);
  
  const deleteAccount = async (event) => {
    event.preventDefault();
    try {
      await deleteUser();
      Auth.logout();
      navigate("/");
      alert("Account Deleted");
    } catch (e) {
      console.log(e);
    }
  };

  return (
    <>
      <h3>Are you sure you want to delete your account?</h3>
      <Link to="/home_page">
        <button>Return Home</button>
      </Link>
      <br />
      <p>Or</p>
      <button 
        onClick={deleteAccount}>
        Delete Account
      </button>
      {error ? (
        <>
          <p className="error-text font-link" id="log-in-error">
            Account Deletion Failed.
          </p>
        </>
      ) : null}
    </>
  );
};

export default AccountSettings;
