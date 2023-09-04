import React from "react";
import { Link, useLocation } from 'react-router-dom';

import Auth from '../../utils/auth';

const Nav= () => {
  const location = useLocation();
  const logout = event => {
    event.preventDefault();
    Auth.logout();
  };
  
  return (
    <nav>
    {Auth.loggedIn() ? (
      <>
      <ul>
        {/* <Link to='/'><li>Landing Page</li></Link> */}
        <Link to='/home_page'> <li>Home</li></Link>
        <Link to='/search'><li>Search</li></Link>
        <Link to='/now_trending'><li>Now Trending</li></Link>
        <a href='/' onClick={logout}><li>Sign Out</li></a>
      </ul>
      </>
    ) : (
      <>
      <ul>
        <Link to='/'><li>streamHub</li></Link>
        {/* If on signup page, show login link */}
        {location.pathname === '/signup' && <Link to='/login'><li>Login</li></Link>}
          
          {/* If on login page, show signup link */}
          {location.pathname === '/login' && <Link to='/signup'><li>Sign Up</li></Link>}
        {/* <Link to='/home_page'> <li>Home</li></Link> */}
        {/* <Link to='/login'><li>Login</li></Link> */}
        {/* <Link to='/signup'><li>Sign Up</li></Link> */}
      </ul>
      </>
    )}
    </nav> 
  );
};

export default Nav;