// import from react
import { useState } from "react";
// impoirt from mui
import Grid from "@mui/material/Unstable_Grid2/Grid2";
import styled from "@emotion/styled";
// import images
import Tv from "../../assets/images/TvNew2.png";
import tvIcon from "../../assets/images/tvIcon.png";
// import components
import TVButton from "../TVButton";
import LoginForm from "../../components/LoginForm";
import SignupForm from "../../components/SignupForm";
// import styles
import styles from "./TV.module.css";

const TVWrapper = styled.div`
font-size: 16px;

@media (max-width: 768px) {
  font-size: 14px;
}
@media (max-width: 600px) {
  font-size: 12px;
}
@media (max-width: 480px) {
  font-size: 10px;
}
@media (max-width: 320px) {
  font-size: 9px;
}

`


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


  return (
    <main>
    <TVWrapper>
      {modalType === "" && (
        <Grid
        className={styles.titleContainer}
          container
          justifyContent="center"
          style={{
            position: "fixed",
            top: "50%",
            left: "47.4%",
            transform: "translate(-50%, -50%)",
            zIndex: '1001',
          }}
        >
          <Grid>
            <h1 className={styles.appTitle}>
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
            <h1 className={styles.appTitle}>streamHub</h1>
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
        {/* <Grid> */}
          <Grid>
            <div
              className={styles.tvScreen}
              style={{
                background: tvOn
                  ? "linear-gradient(315deg, #43cea2 0%, #185a9d 75%)"
                  : "#262424",
              }}
            ></div>
          </Grid>
        {/* </Grid> */}
        <Grid>
          <img
            // className="landing_page_tv"
            src={Tv}
            alt="tv"
            style={{ height: "32em", width: "auto" }}
            // style={{ width: "100%", height: "auto", maxWidth: "32rem", minWidth: "24rem" }}
          />
        </Grid>
      </Grid>

      <Grid
        direction={"column"}
        spacing={2}
        className={styles.tvButtonContainer}
        container
        justifyContent="center"
        style={{
          marginTop: "0",
          marginRight: "0",
          zIndex: 1000,
          position: "fixed",
          top: "52%",
          right: "33.25%",
          transform: "translate(-50%, -50%)",
        }}
      >
        <>
          <Grid xs={4}>
            <TVButton modalType={modalType} setModal={setModal} type="login">
              Log In
            </TVButton>
          </Grid>

          <Grid xs={4}>
            <TVButton modalType={modalType} setModal={setModal} type="signup">
              Sign Up
            </TVButton>
          </Grid>

          <Grid xs={4}>
            <TVButton modalType={modalType} setModal={setModal} type="">
              <img
                src={tvIcon}
                style={{ width: "auto", height: "3rem" }}
                alt="tv icon"
              />
            </TVButton>
          </Grid>
        </>
      </Grid>

      {modalType === "login" && (
        <section
          className={styles.landingPageModal}
          style={{
            position: "fixed",
            top: "50%",
            left: "47.35%",
            transform: "translate(-50%, -50%)",
            zIndex: 1000,
          }}
        >
          <LoginForm />
        </section>
      )}
      {modalType === "signup" && (
        <section
          className={styles.landingPageModal}
          style={{
            position: "fixed",
            top: "51.2%",
            left: "47.35%",
            transform: "translate(-50%, -50%)",
            zIndex: 1000,
          }}
        >
          <SignupForm />
        </section>
      )}
    </TVWrapper>
    </main>
  );
};

export default TV;
