// import from react
import { useContext } from "react";
// import context
import { TrendingMoviesContext } from "../../context/TrendingMoviesContext";
// import from utils
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
  const trendingMovies = useContext(TrendingMoviesContext);
 
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
      <h3 className={styles.category}>Trending Movies</h3>
      <Swiper
        style={{
          "--swiper-navigation-color": "#000000",
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
        // pagination={{
        //   clickable: true,
        // }}
        modules={[EffectCoverflow, Pagination, Navigation]}
        className={styles.swiper}
      >
        {trendingMovies.map((movie) => (
          <SwiperSlide
            className={styles.slide}
            key={movie.id}
            style={{
              backgroundImage: `url(https://image.tmdb.org/t/p/w200/${movie.poster_path}), linear-gradient(315deg, #43cea2 0%,  #185a9d 85%)`,
              backgroundRepeat: "no-repeat",
              backgroundPosition: "center",
              // backgroundSize: "cover",
              // backgroundColor: "",
            }}
            onClick={() => {
              const customEvent = {
                preventDefault: () => {},
                target: { value: `movie-${movie.id}` },
              };
              handleTitleSelected(customEvent);
            }}
          >
            <h4 className={styles.movieTitle}>
              {movie.title}
            </h4>

            {/* <img
              src={`https://image.tmdb.org/t/p/w200/${movie.poster_path}`}
              alt={movie.title}
              className={styles.img}
            /> */}
            <h5 className={styles.movieGenres}>
                {movie.genre
                  .map((id) => genreList[id])
                  .filter(Boolean)
                  .slice(0, 2)
                  .join(", ")}
            </h5>
            <h6 className={styles.releaseDate}>
              Released on {movie.release_date}
            </h6>
          </SwiperSlide>
        ))}
      </Swiper>

      {/* Modal for showing overview */}
      {/* <Dialog open={isModalOpen} onClose={handleCloseModal}>
        <DialogTitle className={styles.overviewTitle}>
          {currentTitle}
        </DialogTitle>
        <DialogContent>
          <img
            src={`https://image.tmdb.org/t/p/w200/${currentTitlePoster}`}
            alt={currentTitle}
            className={styles.img}
          />
          <p className={styles.overviewText}>{currentOverview}</p>
        </DialogContent>
        <Button
          variant="contained"
          value={`movie-${currentTitleId}`}
          onClick={handleTitleSelected}
        >
          More Details
        </Button>
      </Dialog> */}
    </>
  );
};

export default TrendingMovies;
