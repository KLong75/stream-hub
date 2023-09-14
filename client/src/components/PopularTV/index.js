// import from react
import { useState, useEffect } from "react";
// import fetch calls
import { fetchPopularTvPageOne } from "../../utils/apiCalls";
// import from material-ui
import Button from "@mui/material/Button";
import { Dialog, DialogTitle, DialogContent } from "@mui/material";
// import from utils
import { formatDate, CACHE_DURATION_ONE_WEEK } from "../../utils/utils";
import { useTitleSelectionTMDBId } from "../../utils/useTitleSelectionTMDBId";
// import Swiper core and required modules
import { Swiper, SwiperSlide } from "swiper/react";
import { EffectCoverflow, Pagination, Navigation } from "swiper/modules";
// Import Swiper styles
import "swiper/css";
import "swiper/css/effect-coverflow";
import "swiper/css/pagination";
// import css module
import styles from "./PopularTV.module.css";

const PopularTV = () => {
  const [isModalOpen, setModalOpen] = useState(false);
  const [currentOverview, setCurrentOverview] = useState("");
  const [currentTitle, setCurrentTitle] = useState("");
  const [currentTitleId, setCurrentTitleId] = useState("");
  const [currentTitlePoster, setCurrentTitlePoster] = useState("");

  const handleOverviewClick = (overview, title, id, poster_path) => {
    setCurrentOverview(overview);
    setCurrentTitle(title);
    setCurrentTitleId(id);
    setCurrentTitlePoster(poster_path);
    setModalOpen(true);
  };

  const handleCloseModal = () => {
    setModalOpen(false);
    setCurrentOverview("");
  };
  const [popularTV, setPopularTV] = useState([]);
  console.log(popularTV);

  useEffect(() => {
    const getPopularTV = async () => {
      const cachedPopularTV = localStorage.getItem("popularTV");

      if (cachedPopularTV) {
        const { data, timestamp } = JSON.parse(cachedPopularTV);
        console.log("Cached Data Retrieved: cachedPopularTV", data);
        const now = Date.now();
        if (now - timestamp < CACHE_DURATION_ONE_WEEK) {
          setPopularTV(data);
          return;
        } else {
          localStorage.removeItem("popularTV");
          console.log("Cached Data Expired and Removed");
        }
      }

      if (!cachedPopularTV) {
        try {
          const response = await fetchPopularTvPageOne();
          const data = await response.json();
          // console.log(data);
          const popTV = data.results.map((tvShow) => ({
            id: tvShow.id,
            title: tvShow.name,
            poster_path: tvShow.poster_path,
            backdrop_path: tvShow.backdrop_path,
            overview: tvShow.overview,
            first_air_date: formatDate(tvShow.first_air_date),
            genre: tvShow.genre_ids,
          }));

          console.log("popTV: ", popTV);

          setPopularTV(popTV);

          const cacheData = {
            data: popTV,
            timestamp: Date.now(),
          };
          localStorage.setItem("popularTV", JSON.stringify(cacheData));
        } catch (error) {
          console.log(error);
        }
      }
    };

    getPopularTV();
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
      <h3 style={{ marginBottom: "0" }}>Popular TV</h3>
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
        {popularTV.map((tvShow) => (
          <SwiperSlide className={styles.slide} key={tvShow.id}>
            <p>
              <strong>{tvShow.title}</strong>
            </p>
            <p>
              <strong>
                {tvShow.genre.map((id) => genreList[id]).slice(0,2).join(", ")}
              </strong>
            </p>
            <img
              src={`https://image.tmdb.org/t/p/w200/${tvShow.poster_path}`}
              alt={tvShow.title}
              className={styles.img}
            />
            <p>
              <strong>First aired on {tvShow.first_air_date}</strong>
            </p>
            <Button
              variant="contained"
              onClick={() =>
                handleOverviewClick(tvShow.overview, tvShow.title, tvShow.id, tvShow.poster_path)
              }
            >
              Overview
            </Button>
            <Button
              variant="contained"
              value={`tv-${tvShow.id}`}
              onClick={handleTitleSelected}
            >
              More Details
            </Button>
          </SwiperSlide>
        ))}
      </Swiper>
      {/* Modal for showing overview */}
      <Dialog open={isModalOpen} onClose={handleCloseModal}>
      <DialogTitle className={styles.overviewTitle}>{currentTitle}</DialogTitle>
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
      </Dialog>
    </>
  );
};

export default PopularTV;
