import { useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
// import components
import Grid from "@mui/material/Unstable_Grid2/Grid2";
import WatchListBackdropScroll from "../../components/WatchListBackdropScroll";
import WatchList from "../../components/WatchList";
import LoadingClapboard from "../../components/LoadingClapBoard";
import WhatsHotGallery from "../../components/WhatsHotGallery";
import TrendingCategoryLinks from "../../components/TrendingCategoryLinks";
// import from utils
import Auth from "../../utils/auth";
import { QUERY_ME } from "../../utils/queries";
import { useQuery } from "@apollo/client";

import styles from "./HomePage.module.css";

const HomePage = () => {
  const loggedIn = Auth.loggedIn();
  const navigate = useNavigate();

  const { username: userParam } = useParams();

  const { loading } = useQuery(userParam ? QUERY_ME : QUERY_ME, {
    variables: { username: userParam },
  });
  // const user = data?.me || {};

  useEffect(() => {
    if (!loggedIn) {
      navigate("/");
    }
  }, [loggedIn, navigate]);

  if (loading) {
    return (
      <div>
        Loading...
        <LoadingClapboard />
      </div>
    );
  }

  return (
    <main className="gradientBackground">
      <section style={{ marginBottom: ".5rem" }}>
        <TrendingCategoryLinks />
      </section>
      
      {/* <h2 className={styles.greeting}>What do you want to watch?</h2> */}
      {/* <h2 className={styles.subGreeting}>What should we watch?</h2> */}
      <Grid container justifyContent="center" alignItems="center" sx={{marginTop: '.65rem'}}>
        <Grid xs={12}>
          <WatchListBackdropScroll />
        </Grid>
      </Grid>
      <section style={{ marginTop: "2rem", marginBottom: "-3rem" }}>
        <WatchList />
      </section>
      <section className={styles.gallerySection}>
        <WhatsHotGallery />
      </section>
    </main>
  );
};

export default HomePage;
