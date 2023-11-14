import { React, useState } from "react";
import { TextField, Button } from "@mui/material";
import { useMutation } from "@apollo/client";
import { ADD_USER } from "../../utils/mutations";
import Auth from "../../utils/auth";
import styles from "./SignupForm.module.css";
import Snackbar from "@mui/material/Snackbar";




const SignupForm = () => {
  const [openSnackbar, setOpenSnackbar] = useState(false);
  const [snackbarMessage, setSnackbarMessage] = useState("");

  const [formState, setFormState] = useState({
    username: "",
    email: "",
    password: "",
  });
  const [addUser] = useMutation(ADD_USER);

  const handleChanges = (event) => {
    const { name, value } = event.target;
    setFormState({ ...formState, [name]: value });
  };

  const handleFormSubmit = async (event) => {
    event.preventDefault();
    try {
      const { data } = await addUser({
        variables: { ...formState },
      });
      alert("Your account has been created. We are logging you in.");
      Auth.login(data.addUser.token);
    } catch (e) {
      let errorMessage =
        "Please try again. Your password must include at least one number, one lowercase letter, one uppercase letter, and one special character.";
      if (e.message.includes("minimum allowed length")) {
        errorMessage = "Password must be at least 6 characters long.";
      } else if (e.message.includes("duplicate key error" && "email")) {
        errorMessage = "An account with that email address already exists.";
      } else if (e.message.includes("duplicate key error" && "username")) {
        errorMessage = "An account with that username already exists.";
      }

      console.log(e);
      setSnackbarMessage(errorMessage);
      setOpenSnackbar(true);
    }
  };

  const handleCloseSnackbar = () => {
    setOpenSnackbar(false);
  };

  return (
    <div>
      <h2 className={styles.signup_form_title}>Sign Up</h2>
      <form onSubmit={handleFormSubmit} className={styles.signUpForm}>
        <div>
          <TextField
            color="formOutline"
            size="small"
            variant="standard"
            required
            label="Username"
            id="username"
            name="username"
            type="text"
            value={formState.username}
            onChange={handleChanges}
          />
        </div>
        <div style={{ marginTop: ".5rem" }}>
          <TextField
            variant="standard"
            color="formOutline"
            size="small"
            required
            label="Email"
            id="email"
            name="email"
            type="email"
            value={formState.email}
            onChange={handleChanges}
          />
        </div>
        <div style={{ marginTop: ".5rem" }}>
          <TextField
            variant="standard"
            color="formOutline"
            size="small"
            required
            label="Password"
            id="password"
            name="password"
            type="password"
            value={formState.password}
            onChange={handleChanges}
          />
        </div>
        <Button
          sx={{ marginTop: ".2rem" }}
          className={styles.signUpButton}
          variant="contained"
          type="submit">
          Sign Up
        </Button>
        {/* {error && <span className="font-link">Sign up failed.</span>} */}
      </form>
      <Snackbar
        open={openSnackbar}
        autoHideDuration={6000}
        onClose={handleCloseSnackbar}
        message={snackbarMessage}
        />
    </div>
  );
};

export default SignupForm;
