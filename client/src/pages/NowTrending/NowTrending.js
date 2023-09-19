// import from react
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
// import context
import { TopRatedTvContext } from "../../context/TopRatedTvContext";
import { TrendingTvContext } from "../../context/TrendingTvContext";
import { TrendingMoviesContext } from "../../context/TrendingMoviesContext";
import { PopularMoviesContext } from "../../context/PopularMoviesContext";
import { PopularTvContext } from "../../context/PopularTvContext";
import { TopRatedMoviesContext } from "../../context/TopRatedMoviesContext";
// import from utils
import { useTitleSelectionTMDBId } from "../../utils/useTitleSelectionTMDBId";
import VerticalCardSwipeGallery from "../../components/VerticalCardSwipeGallery";
import { genreList } from "../../utils/utils";
import Auth from "../../utils/auth";
// import styles
import styles from "./NowTrending.module.css";



const NowTrending = () => {
  const titleSelectionHandler = useTitleSelectionTMDBId();

  const handleTitleSelected = (id) => {
    const customEvent = {
      preventDefault: () => {},
      target: { value: id },
    };
    titleSelectionHandler(customEvent);
  };

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

      <VerticalCardSwipeGallery
        context={TrendingMoviesContext}
        categoryTitle="Trending Movies"
        handleTitleSelected={handleTitleSelected}
        genreList={genreList}
      />

      <VerticalCardSwipeGallery
        context={PopularMoviesContext}
        categoryTitle="Popular Movies"
        handleTitleSelected={handleTitleSelected}
        genreList={genreList}
      />

      <VerticalCardSwipeGallery
        context={TopRatedMoviesContext}
        categoryTitle="Top Rated Movies"
        handleTitleSelected={handleTitleSelected}
        genreList={genreList}
      />

      <VerticalCardSwipeGallery
        context={TrendingTvContext}
        categoryTitle="Trending TV Shows"
        handleTitleSelected={handleTitleSelected}
        genreList={genreList}
      />

      <VerticalCardSwipeGallery
        context={PopularTvContext}
        categoryTitle="Popular TV Shows"
        handleTitleSelected={handleTitleSelected}
        genreList={genreList}
      />

      <VerticalCardSwipeGallery
        context={TopRatedTvContext}
        categoryTitle="Top Rated TV Shows"
        handleTitleSelected={handleTitleSelected}
        genreList={genreList}
      />
    </main>
  );
};

export default NowTrending;
