import { useState } from "react";
import { Link } from "react-router-dom";
import { TextField, Button } from "@mui/material";
import { useMutation } from "@apollo/client";
import { LOGIN_USER } from "../../utils/mutations";
import Auth from "../../utils/auth";
import styles from "./LoginForm.module.css";


const LoginForm = ({ switchToSignup }) => {
  const [formState, setFormState] = useState({
    email: "",
    password: "",
  });
  const [login, { error }] = useMutation(LOGIN_USER);

  const handleChanges = (event) => {
    const { name, value } = event.target;
    setFormState({ ...formState, [name]: value });
  };

  const handleFormSubmit = async (event) => {
    event.preventDefault();
    try {
      const mutationResponse = await login({
        variables: { ...formState },
      });
      const token = mutationResponse.data.login.token;
      Auth.login(token);
    } catch (e) {
      console.log(e);
    }
  };

  return (
    <div>
      <h2 className={styles.login_form_title}>Log In</h2>
      <form onSubmit={handleFormSubmit}>
        <div>
          <TextField
            size="small"
            required
            label="Email"
            id="email"
            name="email"
            type="email"
            value={formState.email}
            onChange={handleChanges}
            variant="outlined" 
          />
        </div>
        <div>
          <TextField
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
        <Button sx={{marginTop: '.25rem'}} className={styles.submitButton}size='small' variant="contained" type="submit">
          Log In
        </Button>
        {/* <Button onClick={switchToSignup}>Sign Up</Button> */}
        {error ? (
          <>
            <p className="error-text font-link" id="log-in-error">
              Log In failed.
            </p>
            <p>Please try again.</p>
            <p>Or</p>
            <Link to="/signup">
              <button>Sign Up</button>
            </Link>
          </>
        ) : null}
      </form>
    </div>
  );
};

export default LoginForm;
