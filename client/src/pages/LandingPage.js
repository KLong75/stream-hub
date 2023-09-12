import React, { useState } from "react";

import { Button } from "@mui/material";
import Grid from "@mui/material/Unstable_Grid2/Grid2";

import Tv from "../assets/images/TvNew.png";

import LoginForm from "../components/LoginForm";
import SignupForm from "../components/SignupForm";

const LandingPage = () => {
  const [modalType, setModalType] = useState("");

  const switchToSignup = () => {
    setModalType("signup");
  };

  const switchToLogin = () => {
    setModalType("login");
  };

  return (
    <>
      <Grid
        container
        justifyContent="center"
        style={{
          position: "fixed",
          top: "46%",
          left: "47.5%",
          transform: "translate(-50%, -50%)",
        }}
      >
        <Grid>
          {modalType === "" && (
            <h1
              onClick={() => setModalType("")}
              style={{ fontSize: "3rem", color: "black", cursor: "pointer" }}
            >
              streamHub
            </h1>
          )}
        </Grid>
      </Grid>

      <Grid
        container
        justifyContent="center"
        style={{
          marginTop: "0rem",
          zIndex: 0,
          position: "fixed",
          top: "42%",
          left: "50%",
          transform: "translate(-50%, -50%)",
        }}
        className="tv-container"
      >
        <Grid>
          <img src={Tv} alt="tv" style={{ height: "32rem" }} />
        </Grid>
      </Grid>

      <Grid
        container
        justifyContent="center"
        style={{
          marginTop: "0",
          marginRight: "0",
          zIndex: 1000,

          position: "fixed",
          top: "46%",
          left: "60.5%",
          transform: "translate(-50%, -50%)",
        }}
      >
        <>
          <Grid xs={5}></Grid>
          <Grid
            xs={2}
            style={{
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              marginTop: ".5rem",
            }}
          >
            <Button
              size="small"
              onClick={() => setModalType("login")}
              variant="contained"
              className="landing-button"
              style={{
                width: "55px",
                height: "60px",
                borderRadius: "50%",
                padding: 0, // to reset any default padding
              }}
            >
              Login
            </Button>
          </Grid>
          <Grid xs={5}></Grid>
          <Grid xs={5}></Grid>
          <Grid
            xs={2}
            style={{
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              marginTop: ".5rem",
            }}
          >
            <Button
              size="small"
              onClick={() => setModalType("signup")}
              variant="contained"
              className="landing-button"
              style={{
                width: "55px",
                height: "60px",
                borderRadius: "50%",
                padding: 0, // to reset any default padding
              }}
            >
              Sign Up
            </Button>
          </Grid>
          <Grid xs={5}></Grid>
          <Grid xs={5}></Grid>
          <Grid
            xs={2}
            style={{
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              marginTop: ".5rem",
            }}
          >
            <Button
              size="small"
              onClick={() => setModalType("")}
              variant="contained"
              className="landing-button"
              color="warning"
              style={{
                fontSize: ".75rem",
                width: "55px",
                height: "60px",
                borderRadius: "50%",
                padding: 0, // to reset any default padding
                textTransform: "none",
              }}
            >
              streamHub
            </Button>
          </Grid>
          <Grid xs={5}></Grid>
        </>
      </Grid>

      {modalType === "login" && (
        <section
          className="fade-in"
          style={{
            position: "fixed",
            top: "43%",
            left: "47.35%",
            transform: "translate(-50%, -50%)",
            zIndex: 1000,
          }}
        >
          <LoginForm
            onClose={() => setModalType("")}
            switchToSignup={switchToSignup}
          />
        </section>
      )}
      {modalType === "signup" && (
        <section
          style={{
            position: "fixed",
            top: "43%",
            left: "47.35%",
            transform: "translate(-50%, -50%)",
            zIndex: 1000,
          }}
        >
          <SignupForm
            onClose={() => setModalType("")}
            switchToLogin={switchToLogin}
          />
        </section>
      )}
    </>
  );
};

export default LandingPage;
