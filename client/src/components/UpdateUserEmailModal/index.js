import { useState } from "react";
import { TextField } from "@mui/material";
import { useMutation } from "@apollo/client";
import { UPDATE_USER } from '../../utils/mutations';
import Auth from '../../utils/auth';

const UpdateUserEmailModal = ({ onClose }) => {

  // const [formState, setFormState] = useState({
  //   email: "",
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
      <p>Update Your Email Address</p>
      <form >
          <TextField
            required
            label="Email"
            id="Email"
            name="Email"
            type="Email"
           
          />
        <button type="submit">Submit</button>
        
      </form>
      <button onClick={onClose}>Close</button>
    </>
  );
};

export default UpdateUserEmailModal;