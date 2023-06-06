import React from 'react';
import { Link } from 'react-router-dom';


const LandingPage = () => {

  return (
    <>
    <h2>streamHub</h2>
    <div>
      <Link to='signup'><button>Sign Up</button></Link>
      <Link to='login'><button>Login</button></Link>
    </div>
    
    </>
  )
  
};

export default LandingPage;