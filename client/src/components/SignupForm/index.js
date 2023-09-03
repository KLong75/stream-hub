import { useState } from "react";
import { TextField, InputLabel, Select, FormControl } from "@mui/material";
import { useMutation } from "@apollo/client";
import { ADD_USER } from '../../utils/mutations';
import Auth from '../../utils/auth';

const SignupForm = () => {
  const [formState, setFormState] = useState({
    username: "",
    email: "",
    password: "",
  });
  const [addUser, { error }] = useMutation(ADD_USER);

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
      Auth.login(data.addUser.token);
    } catch (e) {
      console.error(e);
    }
  };

  // setFormState({
  //   username: "",
  //   email: "",
  //   password: "",
  // });

  return (
    <div>
      <h2>Signup</h2>
      <form onSubmit={handleFormSubmit}>
        <div>
          <TextField
            required
            label="Username"
            id="username"
            name="username"
            type="text"
            value={formState.username}
            onChange={handleChanges}
          />
        </div>
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
        {error && <span className='font-link'>Sign up failed.</span>}
      </form>
    </div>
  );
};

export default SignupForm;
