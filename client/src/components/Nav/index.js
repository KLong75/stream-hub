import React from "react";
import { Link } from 'react-router-dom';

const Nav= () => {
  
  return (
    <nav>
      <ul>
        <Link to='/'><li>Landing Page</li></Link>
        <Link to='/home_page'> <li>Home</li></Link>
        <Link to='/login'><li>Login</li></Link>
        <Link to='/signup'><li>Sign Up</li></Link>
        <Link to='/search'><li>Search</li></Link>
        <Link to='/now_trending'><li>Now Trending</li></Link>
        <a href='/'><li>Sign Out</li></a>
      </ul>
    </nav> 
  );
};

export default Nav;