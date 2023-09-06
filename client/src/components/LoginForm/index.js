import { useState } from "react";
import { Link } from "react-router-dom";
import { TextField } from "@mui/material";
import { useMutation } from "@apollo/client";
import { LOGIN_USER } from "../../utils/mutations";
import Auth from "../../utils/auth";

const LoginForm = () => {
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

  // setFormState({
  //   username: "",
  //   email: "",
  //   password: "",
  // });

  return (
    <div>
      <h2>Login</h2>
      <form onSubmit={handleFormSubmit}>
        <div>
          <TextField
            required
            label="Email"
            id="email"
            name="email"
            type="email"
            value={formState.email}
            onChange={handleChanges}
          />
        </div>
        <div>
          <TextField
            required
            label="Password"
            id="password"
            name="password"
            type="password"
            value={formState.password}
            onChange={handleChanges}
          />
        </div>
        <button type="submit">Submit</button>
        {error ? (
          <>
          <p className="error-text font-link" id="log-in-error">
            Login failed.
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