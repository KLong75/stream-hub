import React from 'react';

import { Link } from 'react-router-dom';

import Auth from '../../utils/auth';

const WatchList = () => {
  const loggedIn = Auth.loggedIn();

  return (
    <>
      {loggedIn ? (
        <>
    <h4>{Auth.getProfile().data.username}'s Watchlist</h4>
    </>
      ) : (
        <>
          <h2>Welcome to streamHub</h2>
          <p>Please</p>
          <Link to='/login'>
            <button>Login</button>
          </Link>
          <br/>
          <p>Or</p>
          <Link to='/signup'>
            <button>Sign Up</button>
          </Link>
    </>
      )}
    </>
  );
};

export default WatchList;