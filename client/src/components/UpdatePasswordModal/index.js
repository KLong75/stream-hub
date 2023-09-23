import { useState } from "react";
import {
  Dialog,
  DialogTitle,
  DialogContent,
  Button,
  DialogActions, TextField
} from "@mui/material";

import { useMutation } from "@apollo/client";
import { UPDATE_USER } from "../../utils/mutations";

import Auth from "../../utils/auth";

const UpdatePasswordModal = ({ onClose, onSuccessfulUpdate }) => {
  const [formState, setFormState] = useState({
    password: "",
  });
  const [updateUser, { error }] = useMutation(UPDATE_USER);

  const handleChanges = (event) => {
    const { name, value } = event.target;
    setFormState({ ...formState, [name]: value });
  };

  const handleFormSubmit = async (event) => {
    event.preventDefault();
    try {
      const { data } = await updateUser({
        variables: {
          _id: Auth.getProfile().data._id,
          password: formState.password,
        },
      });

      if (data && data.updateUser) {
        console.log("Password updated successfully:", data.updateUser);
        onClose();
        // Notify the parent component of the successful update
        if (onSuccessfulUpdate) {
          onSuccessfulUpdate();
        }
      } else {
        console.log("Update failed:", data);
      }
    } catch (e) {
      console.error("An error occurred while updating the user:", e);
    }
  };

  return (
    <>
    <Dialog open={true} onClose={onClose}>
      <DialogTitle>Enter Your New Password</DialogTitle>
      <DialogContent>
      <form onSubmit={handleFormSubmit}>
        <TextField
          required
          label="Password"
          id="password"
          name="password"
          type="password"
          value={formState.password}
          onChange={handleChanges}
        />
        <DialogActions>
        <Button type="submit">Submit</Button>
        </DialogActions>
        {error && <span className="font-link">Update failed.</span>}
      </form>
      </DialogContent>
      <Button onClick={onClose}>Close</Button>
    </Dialog>
    </>
  );
};

export default UpdatePasswordModal;
