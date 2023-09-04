// import from react
import React from "react";
import { useLocation } from 'react-router-dom';
// import components
import Nav from '../Nav';


const Header = () => {
  const location = useLocation();
  
  return (
    <header>
      {location.pathname !== '/' && <Nav />}
    </header>
  );
};

export default Header;

