// import from react
import { useContext } from "react";
// import context
import { PopularTvContext } from "../../context/PopularTvContext";
// import from material-ui
// import Button from "@mui/material/Button";
// import { Dialog, DialogTitle, DialogContent } from "@mui/material";
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
import styles from "./PopularTV.module.css";

const PopularTV = () => {
  const popularTV = useContext(PopularTvContext);

  // const [isModalOpen, setModalOpen] = useState(false);
  // const [currentOverview, setCurrentOverview] = useState("");
  // const [currentTitle, setCurrentTitle] = useState("");
  // const [currentTitleId, setCurrentTitleId] = useState("");
  // const [currentTitlePoster, setCurrentTitlePoster] = useState("");

  // const handleOverviewClick = (overview, title, id, poster_path) => {
  //   setCurrentOverview(overview);
  //   setCurrentTitle(title);
  //   setCurrentTitleId(id);
  //   setCurrentTitlePoster(poster_path);
  //   setModalOpen(true);
  // };

  // const handleCloseModal = () => {
  //   setModalOpen(false);
  //   setCurrentOverview("");
  // };

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
      <h3 className={styles.category}>Popular TV</h3>
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
        // pagination={{
        //   clickable: true,
        // }}
        modules={[EffectCoverflow, Pagination, Navigation]}
        className={styles.swiper}
      >
        {popularTV.map((tvShow) => (
          <SwiperSlide 
            className={styles.slide} 
            key={tvShow.id} 
              style={{
              backgroundImage: `url(https://image.tmdb.org/t/p/w200/${tvShow.poster_path}), linear-gradient(315deg, #43cea2 0%,  #185a9d 85%)`,
              backgroundRepeat: "no-repeat",
              backgroundPosition: "center",
              // backgroundSize: "cover",
              backgroundColor: "",
            }}
            onClick={() => {
              const customEvent = {
                preventDefault: () => {},
                target: { value: `tv-${tvShow.id}` },
              };
              handleTitleSelected(customEvent);
            }}>
            <h4 className={styles.tvShowTitle}>
              {tvShow.title}
            </h4>
            <h5 className={styles.tvShowGenres}>
                {tvShow.genre.map((id) => genreList[id]).slice(0,2).join(", ")}
            </h5>
            {/* <img
              src={`https://image.tmdb.org/t/p/w200/${tvShow.poster_path}`}
              alt={tvShow.title}
              className={styles.img}
            /> */}
            <h6 
              className={styles.releaseDate}>
                First aired on {tvShow.first_air_date}
            </h6>
            {/* <Button
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
            </Button> */}
          </SwiperSlide>
        ))}
      </Swiper>
      
    </>
  );
};

export default PopularTV;
