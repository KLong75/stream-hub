import { useState } from "react";

import Grid from "@mui/material/Unstable_Grid2/Grid2";

import Tv from "../../assets/images/TvNew2.png";
import TvIcon from "../../assets/images/TvIcon.png";
import LoginForm from "../../components/LoginForm";
import SignupForm from "../../components/SignupForm";

import styles from "./TV.module.css";

const TV = () => {
  const [modalType, setModalType] = useState("");
  const [tvOn, setTvOn] = useState(false);

  const setModal = (type) => {
    setModalType(type);
  
    if (type === "" || type === null) {
      setTvOn(false);
    } else {
      setTvOn(true);
    }
  };
  
  // const switchToSignup = () => {
  //   setModalType("signup");
  //   setTvOn(true);
  // };

  // const switchToLogin = () => {
  //   setModalType("login");
  //   setTvOn(true);
  // };

  // const turnOffTV = () => {
  //   setModalType("");
  //   setTvOn(false);
  // };
  

  return (
    <main className={styles.landingPageContainer}>
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
            <h1 className={styles.app_title} style={{ fontSize: "3rem" }}>
              streamHub
            </h1>
          </Grid>
        </Grid>
      )}

      {(modalType === "login" || modalType === "signup") && (
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
            <h1 className={styles.app_title}>streamHub</h1>
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
          <Grid>
            <div className={styles.tvScreen}  style={{ background: tvOn ? 'linear-gradient(315deg, #43cea2 0%, #185a9d 75%)' : '#262424' }}></div>
          </Grid>
        </Grid>
        <Grid>
          <img
            className="landing_page_tv"
            src={Tv}
            alt="tv"
            style={{ height: "32rem" }}
          />
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
              onClick={() => setModal("login")}

              // onClick={() => setModalType("login")}
              variant="contained"
              className={styles.tv_button}
              style={{
                fontSize: ".74rem",
                height: "4rem",
                width: "4rem",
                borderRadius: "50%",
                padding: 0,
                textTransform: "uppercase",
              }}
            >
              {modalType === "login" ? (
                <span style={{ visibility: "hidden" }}>Login</span>
              ) : (
                "Login"
              )}
            </button>
          </Grid>

          <Grid xs={4}>
            <button
              size="small"
              onClick={() => setModal("signup")}
              variant="contained"
              className={styles.tv_button}
              style={{
                fontSize: ".74rem",
                height: "4rem",
                width: "4rem",
                borderRadius: "50%",
                padding: 0, // to reset any default padding
              }}
            >
              {modalType === "signup" ? (
                <span style={{ visibility: "hidden" }}>Sign Up</span>
              ) : (
                "Sign Up"
              )}
            </button>
          </Grid>

          <Grid xs={4}>
            <button
              size="small"
              onClick={() => setModal("")}
              variant="contained"
              className={styles.tv_button}
              // color="warning"
              style={{
                // fontSize: ".74rem",
                height: "4rem",
                width: "4rem",
                borderRadius: "50%",
                padding: 0, // to reset any default padding
                textTransform: "none",
              }}
            >
              {modalType === "" ? (
                <img
                  src={TvIcon}
                  style={{
                    visibility: "hidden",
                    width: "auto",
                    height: "3rem",
                  }}
                  alt="tv icon"
                />
              ) : (
                <img
                  src={TvIcon}
                  style={{ width: "auto", height: "3rem" }}
                  alt="tv icon"
                />
              )}
            </button>
          </Grid>
        </>
      </Grid>

      {modalType === "login" && (
        <section
          className={styles.landing_page_modal}
          style={{
            position: "fixed",
            top: "50%",
            left: "47.35%",
            transform: "translate(-50%, -50%)",
            zIndex: 1000,
          }}
        >
          <LoginForm
          />
        </section>
      )}
      {modalType === "signup" && (
        <section
          className={styles.landing_page_modal}
          style={{
            position: "fixed",
            top: "51.2%",
            left: "47.35%",
            transform: "translate(-50%, -50%)",
            zIndex: 1000,
          }}
        >
          <SignupForm
          />
        </section>
      )}
    </main>
  );
};

export default TV;
