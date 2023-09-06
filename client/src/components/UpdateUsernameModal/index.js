import { useState } from "react";
import { TextField } from "@mui/material";
import { useMutation } from "@apollo/client";
import { UPDATE_USER } from "../../utils/mutations";
import Auth from "../../utils/auth";

const UpdateUsernameModal = ({ onClose }) => {
  // const [formState, setFormState] = useState({
  //   username: "",
  // });
  // const [updateUser, { error }] = useMutation(UPDATE_USER);

  // const handleChanges = (event) => {
  //   const { name, value } = event.target;
  //   setFormState({ ...formState, [name]: value });
  // };

  // const handleFormSubmit = async (event) => {
  //   event.preventDefault();
  //   try {
  //     const { data } = await updateUser({
  //       variables: { ...formState },
  //     });
  //     Auth.login(data.addUser.token);
  //   } catch (e) {
  //     console.error(e);
  //   }
  // };

  return (
    <>
      <p>Update Your Username</p>
      <form >
        <TextField
          required
          label="Username"
          id="Username"
          name="Username"
          type="Username"
        
        />
        <button type="submit">Submit</button>
       
      </form>

      <button onClick={onClose}>Close</button>
    </>
  );
};

export default UpdateUsernameModal;
