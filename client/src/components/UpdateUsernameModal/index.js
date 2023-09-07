import { useState } from "react";
import { TextField } from "@mui/material";
import { useMutation } from "@apollo/client";
import { UPDATE_USER } from "../../utils/mutations";
import Auth from "../../utils/auth";
import { QUERY_ME } from "../../utils/queries";

const UpdateUsernameModal = ({ onClose, onSuccessfulUpdate }) => {
  const [formState, setFormState] = useState({
    username: "",
  });
  const [updateUser, { error }] = useMutation(UPDATE_USER, {
    refetchQueries: [{ query: QUERY_ME }]
  });
  

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
          username: formState.username 
        },
      });
      if (data && data.updateUser) {
        console.log("Username updated successfully:", data.updateUser);
        onClose();
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
      <p>Update Your Username</p>
      <form onSubmit={handleFormSubmit}>
        <TextField
          required
          label="Username"
          id="username"
          name="username"
          type="username"
          value={formState.username}
          onChange={handleChanges}
        />
        <button type="submit">Submit</button>
        {error && <span className="font-link">Update failed.</span>}
      </form>

      <button onClick={onClose}>Close</button>
    </>
  );
};

export default UpdateUsernameModal;
