// import from react
import React, { useState, useEffect } from "react";
// import fetch calls
import { fetchTrendingMoviesPageOne } from "../../utils/apiCalls";
// import from material-ui
import Button from "@mui/material/Button";
import { Dialog, DialogTitle, DialogContent } from "@mui/material";
// import from utils
import { CACHE_DURATION_ONE_WEEK, formatDate } from "../../utils/utils";
import { useTitleSelectionTMDBId } from "../../utils/useTitleSelectionTMDBId";
// import Swiper core and required modules
import { Swiper, SwiperSlide } from "swiper/react";
import { EffectCoverflow, Pagination, Navigation } from "swiper/modules";
// Import Swiper styles
import "swiper/css";
import "swiper/css/effect-coverflow";
import "swiper/css/pagination";
// import css module
import styles from "./TrendingMovies.module.css";

const TrendingMovies = () => {
  const [isModalOpen, setModalOpen] = useState(false);
  const [currentOverview, setCurrentOverview] = useState("");
  const [currentTitle, setCurrentTitle] = useState("");
  const [currentTitleId, setCurrentTitleId] = useState("");

  const handleOverviewClick = (overview, title, id) => {
    setCurrentOverview(overview);
    setCurrentTitle(title);
    setCurrentTitleId(id);
    setModalOpen(true);
  };

  const handleCloseModal = () => {
    setModalOpen(false);
    setCurrentOverview("");
  };
  const [trendingMovies, setTrendingMovies] = useState([]);
  console.log(trendingMovies);

  useEffect(() => {
    const getTrendingMovies = async () => {
      const cachedTrendingMovies = localStorage.getItem("trendingMovies");

      if (cachedTrendingMovies) {
        const { data, timestamp } = JSON.parse(cachedTrendingMovies);
        console.log("Cached Data Retrieved: cachedTrendingMovies", data);
        const now = Date.now();
        if (now - timestamp < CACHE_DURATION_ONE_WEEK) {
          setTrendingMovies(data);
          return;
        } else {
          localStorage.removeItem("trendingMovies");
          console.log("Cached Data Expired and Removed");
        }
      }

      if (!cachedTrendingMovies) {
        try {
          const response = await fetchTrendingMoviesPageOne();
          const data = await response.json();
          console.log(data);
          const topMovies = data.results.map((movie) => ({
            id: movie.id,
            title: movie.title,
            poster_path: movie.poster_path,
            backdrop_path: movie.backdrop_path,
            overview: movie.overview,
            release_date: formatDate(movie.release_date),
            genre: movie.genre_ids,
          }));

          setTrendingMovies(topMovies);

          const cacheData = {
            data: topMovies,
            timestamp: Date.now(),
          };
          localStorage.setItem("trendingMovies", JSON.stringify(cacheData));
        } catch (error) {
          console.log(error);
        }
      }
    };

    getTrendingMovies();
  }, []);

  const handleTitleSelected = useTitleSelectionTMDBId();

  const genreList = {
    28: "Action",
    12: "Adventure",
    16: "Animation",
    35: "Comedy",
    80: "Crime",
    99: "Documentary",
    18: "Drama",
    10751: "Family",
    14: "Fantasy",
    36: "History",
    27: "Horror",
    10402: "Music",
    9648: "Mystery",
    10749: "Romance",
    878: "Science Fiction",
    53: "Thriller",
    10752: "War",
    37: "Western",
    10759: "Action & Adventure",
    10762: "Kids",
    10763: "News",
    10764: "Reality",
    10765: "Sci-Fi & Fantasy",
    10766: "Soap",
    10767: "Talk",
    10768: "War & Politics",
  };

  return (
    <>
      <h3 style={{ marginBottom: "0" }}>Trending Movies</h3>
      <Swiper
        style={{
          "--swiper-navigation-color": "#000000",
          "--swiper-pagination-color": "#000000",
        }}
        effect={"coverflow"}
        grabCursor={true}
        centeredSlides={true}
        slidesPerView={"auto"}
        coverflowEffect={{
          rotate: 50,
          stretch: 0,
          depth: 100,
          modifier: 1,
          slideShadows: true,
        }}
        navigation={true}
        pagination={{
          clickable: true,
        }}
        modules={[EffectCoverflow, Pagination, Navigation]}
        className={styles.swiper}
      >
        {trendingMovies.map((movie) => (
          <SwiperSlide
            className={styles.slide}
            key={movie.id}
            // style={{
            //   backgroundImage: `url(https://image.tmdb.org/t/p/w200/${movie.poster_path})`,
            // }}
          >
            <p>
              <strong>{movie.title}</strong>
            </p>
            <p>
              <strong>
                {movie.genre
                  .map((id) => genreList[id])
                  .filter(Boolean)
                  .slice(0,2)
                  .join(", ")}
              </strong>
            </p>
            <img
              src={`https://image.tmdb.org/t/p/w200/${movie.poster_path}`}
              alt={movie.title}
              className={styles.img}
            />
            <p>
              <strong>Released on {movie.release_date}</strong>
            </p>
            <Button 
              variant="contained"
              onClick={() => handleOverviewClick(movie.overview, movie.title, movie.id)}>
              Overview
            </Button>
            <Button
              variant="contained"
              value={`movie-${movie.id}`}
              onClick={handleTitleSelected}
            >
              More Details
            </Button>
          </SwiperSlide>
        ))}
      </Swiper>
      {/* Modal for showing overview */}
      <Dialog open={isModalOpen} onClose={handleCloseModal}>
        <DialogTitle>{currentTitle}: Overview</DialogTitle>
        <DialogContent>
          <p>{currentOverview}</p>
        </DialogContent>
        <Button
              variant="contained"
              value={`movie-${currentTitleId}`}
              onClick={handleTitleSelected}
            >
              More Details
            </Button>
      </Dialog>
    </>
  );
};

export default TrendingMovies;
