import { useEffect } from "react";
import { useNavigate } from "react-router-dom";

import Auth from "../../utils/auth";

import TrendingMovies from "../../components/TrendingMovies";
import PopularMovies from "../../components/PopularMovies";
import TopRatedMovies from "../../components/TopRatedMovies";
import PopularTV from "../../components/PopularTV";
import TrendingTV from "../../components/TrendingTV";
import TopRatedTV from "../../components/TopRatedTV";

import styles from "./NowTrending.module.css";

const NowTrending = () => {
  const navigate = useNavigate();
  const loggedIn = Auth.loggedIn();

  useEffect(() => {
    if (!loggedIn) {
      navigate("/");
    }
  }, [loggedIn, navigate]);
  return (
    <main className={styles.trendingContainer}>
      <h2 className={styles.pageTitle}>What People Are Watching</h2>
      <TrendingMovies />
      <PopularMovies />
      <TopRatedMovies />
      <TrendingTV />
      <PopularTV />
      <TopRatedTV />
    </main>
  );
};

export default NowTrending;
