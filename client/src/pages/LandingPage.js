
import React from "react";
import { Link } from "react-router-dom";
import { Button } from "@mui/material";
import Grid from "@mui/material/Unstable_Grid2/Grid2";

import Tv from "../assets/images/TV.png";


const LandingPage = () => {
  return (
    <>
      <Grid container justifyContent="center" spacing={2}>
        <Grid >
          <h1>streamHub</h1>
        </Grid>
      </Grid>

      <Grid container justifyContent="center" style={{marginTop: '4rem'}} className='tv-container'>
        <Grid >
          <img src={Tv} alt="tv" style={{height: '20rem'}}/>
        </Grid>
      </Grid>
   
      <Grid container justifyContent="center" style={{ marginTop: '-10.5rem', marginRight: '3.5rem'}} >
        <Grid xs={5}></Grid>  
        <Grid xs={2} style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', marginTop: '.5rem' }}>
          <Link to="login">
            <Button variant="contained" className="landing-button">Login</Button>
          </Link>
        </Grid>
        <Grid xs={5}></Grid>  
        <Grid xs={5}></Grid>
        <Grid xs={2} style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', marginTop: '.5rem' }}>
          <Link to="signup">
            <Button variant="contained" className="landing-button">Sign Up</Button>
          </Link>
        </Grid>
        <Grid xs={5}></Grid>
      </Grid>
    </>
  );
};

export default LandingPage;
