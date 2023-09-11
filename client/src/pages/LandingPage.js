
import React from "react";
import { Link } from "react-router-dom";
import { Button } from "@mui/material";
import Grid from "@mui/material/Unstable_Grid2/Grid2";

// import { ReactComponent as TV } from "../assets/images/TV.svg";


const LandingPage = () => {
  return (
    <>
      <Grid container justifyContent="center" spacing={2}>
        <Grid >
          <h1>streamHub</h1>
        </Grid>
      </Grid>
   
      <Grid container spacing={2} justifyContent="center">
         <Grid >
          <Link to="login">
            <Button variant="contained">Login</Button>
          </Link>
        </Grid>
        
        <Grid >
          <Link to="signup">
            <Button variant="contained">Sign Up</Button>
          </Link>
        </Grid>
      </Grid>
    </>
  );
};

export default LandingPage;
