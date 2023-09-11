import React from 'react';
import { Link } from 'react-router-dom';
import { Button } from '@mui/material';
import LoadingClapboard from '../components/LoadingClapBoard';

const LandingPage = () => {

  return (
    <>
    <h1>streamHub</h1>
    <LoadingClapboard/>
    <div>
      <Link to='signup'><Button variant='contained'>Sign Up</Button></Link>
      <Link to='login'><Button variant='contained'>Login</Button></Link>
    </div>
    
    </>
  )
  
};

export default LandingPage;