import React, { useState } from "react";

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
      {/* <Grid
        className="title-container"
        container
        justifyContent="center"
        style={{
          position: "fixed",
          top: "44%",
          left: "47.4%",
          transform: "translate(-50%, -50%)",
          zIndex: 1001,
        }}
      >
        <Grid>
          {modalType === "" && (
            <h1 className="app-title"
              style={{ fontSize: "3rem" }}
            >
              streamHub
            </h1>
          )}
        </Grid>
      </Grid> */}

      {modalType === "" && (
        <Grid
          className="title-container"
          container
          justifyContent="center"
          style={{
            position: "fixed",
            top: "50%",
            left: "47.4%",
            transform: "translate(-50%, -50%)",
            zIndex: 1001,
          }}
        >
          <Grid>
            <h1 className="app-title" style={{ fontSize: "3rem" }}>
              streamHub
            </h1>
          </Grid>
        </Grid>
      )}

      { (modalType === "login" || modalType === "signup") && (
        <Grid
          className="title-container-top"
          container
          justifyContent="center"
          style={{
            position: "fixed",
            top: "5%",
            left: "50%",
            transform: "translate(-50%, -50%)",
            zIndex: 1001,
          }}
        >
          <Grid>
            <h1 className="app-title" style={{ fontSize: "3rem" }}>
              streamHub
            </h1>
          </Grid>
        </Grid>
      )}

      <Grid
        className="tv-container"
        container
        justifyContent="center"
        style={{
          zIndex: 0,
          position: "fixed",
          top: "48%",
          left: "50%",
          transform: "translate(-50%, -50%)",
        }}
      >
        <Grid>
          <img className='landing_page_tv' src={Tv} alt="tv" style={{ height: "32rem" }} />
        </Grid>
      </Grid>

      <Grid
        direction={"column"}
        spacing={2}
        className="tv-button-container"
        container
        justifyContent="center"
        style={{
          marginTop: "0",
          marginRight: "0",
          zIndex: 1000,
          position: "fixed",
          top: "52.5%",
          right: "34%",
          transform: "translate(-50%, -50%)",
        }}
      >
        <>
          <Grid xs={4}>
            <button
              size="small"
              onClick={() => setModalType("login")}
              variant="contained"
              className="tv-button"
              style={{
                fontSize: ".74rem",
                // width: "55px",
                height: "4rem",
                width: "4rem",
                // height: "4rem",
                borderRadius: "50%",
                padding: 0, // to reset any default padding
              }}
            >
              LOGIN
            </button>
          </Grid>

          <Grid xs={4}>
            <button
              size="small"
              onClick={() => setModalType("signup")}
              variant="contained"
              className="tv-button"
              style={{
                fontSize: ".74rem",
                height: "4rem",
                width: "4rem",
                borderRadius: "50%",
                padding: 0, // to reset any default padding
              }}
            >
              Sign Up
            </button>
          </Grid>

          <Grid xs={4}>
            <button
              size="small"
              onClick={() => setModalType("")}
              variant="contained"
              className="tv-button"
              // color="warning"
              style={{
                fontSize: ".74rem",
                height: "4rem",
                width: "4rem",
                borderRadius: "50%",
                padding: 0, // to reset any default padding
                textTransform: "none",
              }}
            >
              streamHub
            </button>
          </Grid>
        </>
      </Grid>

      {modalType === "login" && (
        <section
          className="landing-page-modal"
          style={{
            position: "fixed",
            top: "50%",
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
          className="landing-page-modal"
          style={{
            position: "fixed",
            top: "51.2%",
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
