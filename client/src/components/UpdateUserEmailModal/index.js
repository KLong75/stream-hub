import { useState } from "react";
import { TextField } from "@mui/material";
import { useMutation } from "@apollo/client";
import { UPDATE_USER } from '../../utils/mutations';
import Auth from '../../utils/auth';

const UpdateUserEmailModal = ({ onClose, onSuccessfulUpdate }) => {

  const [formState, setFormState] = useState({
    email: "",
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
          email: formState.email
        },
      });

      if (data && data.updateUser) {
        console.log("Email updated successfully:", data.updateUser);
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
      <p>Update Your Email Address</p>
      <form onSubmit={handleFormSubmit}>
          <TextField
            required
            label="Email"
            id="email"
            name="email"
            type="email"
            value={formState.email}
            onChange={handleChanges}
          />
        <button type="submit">Submit</button>
        {error && <span className="font-link">Update failed.</span>}
      </form>
      <button onClick={onClose}>Close</button>
    </>
  );
};

export default UpdateUserEmailModal;