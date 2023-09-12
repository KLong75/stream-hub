
import React, { useState} from "react";
// import { Link } from "react-router-dom";
import { Button } from "@mui/material";
import Grid from "@mui/material/Unstable_Grid2/Grid2";

import Tv from "../assets/images/TV.png";

import LoginForm from "../components/LoginForm";
import SignupForm from "../components/SignupForm";


const LandingPage = () => {
  const [modalType, setModalType] = useState("");

  return (
    <>
      <Grid container justifyContent="center">
        <Grid >
          <h1 style={{fontSize: '3rem'}}>streamHub</h1>
        </Grid>
      </Grid>

      <Grid container justifyContent="center" style={{marginTop: '0rem'}} className='tv-container'>
        <Grid >
          <img src={Tv} alt="tv" style={{height: '20rem'}}/>
        </Grid>
      </Grid>

      
      <Grid container justifyContent="center" style={{ marginTop: '-10.5rem', marginRight: '3.5rem'}} >
      {modalType === "" && (
   <>
        <Grid xs={5}></Grid>  
        <Grid xs={2} style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', marginTop: '.5rem' }}>
          {/* <Link to="login"> */}
            <Button onClick={() => setModalType("login")} variant="contained" className="landing-button">Login</Button>
          {/* </Link> */}
        </Grid>
        <Grid xs={5}></Grid>  
        <Grid xs={5}></Grid>
        <Grid xs={2} style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', marginTop: '.5rem' }}>
          {/* <Link to="signup"> */}
            <Button onClick={()=> setModalType('signup')} variant="contained" className="landing-button">Sign Up</Button>
          {/* </Link> */}
        </Grid>
        <Grid xs={5}></Grid>
        </>
      )}
      </Grid>

      {modalType === "login" && (
        <section style={{ position: 'fixed', top: '42%', left: '48%', transform: 'translate(-50%, -50%)', zIndex: 1000 }}>
        <LoginForm 
          onClose={() => setModalType("")}  
        />
        </section>
      )}
      {modalType === "signup" && (
        <SignupForm 
          onClose={() => setModalType("")}  
        />
      )}

    </>
  
  );
};

export default LandingPage;



// import React, { useState, useEffect } from "react";
// import { Link } from "react-router-dom";
// import { Button } from "@mui/material";
// import Grid from "@mui/material/Unstable_Grid2/Grid2";

// import Tv from "../assets/images/TV.png";

// import LoginForm from "../components/LoginForm";
// import SignupForm from "../components/SignupForm";


// const LandingPage = () => {
//   const [modalType, setModalType] = useState("");

//   return (
//     <>
//       <Grid container justifyContent="center">
//         <Grid >
//           <h1 style={{fontSize: '3rem'}}>streamHub</h1>
//         </Grid>
//       </Grid>

//       <Grid container justifyContent="center" style={{marginTop: '0rem'}} className='tv-container'>
//         <Grid >
//           <img src={Tv} alt="tv" style={{height: '20rem'}}/>
//         </Grid>
//       </Grid>
   
//       <Grid container justifyContent="center" style={{ marginTop: '-10.5rem', marginRight: '3.5rem'}} >
//         <Grid xs={5}></Grid>  
//         <Grid xs={2} style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', marginTop: '.5rem' }}>
//           <Link to="login">
//             <Button variant="contained" className="landing-button">Login</Button>
//           </Link>
//         </Grid>
//         <Grid xs={5}></Grid>  
//         <Grid xs={5}></Grid>
//         <Grid xs={2} style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', marginTop: '.5rem' }}>
//           <Link to="signup">
//             <Button variant="contained" className="landing-button">Sign Up</Button>
//           </Link>
//         </Grid>
//         <Grid xs={5}></Grid>
//       </Grid>
//     </>
//   );
// };

// export default LandingPage;
