// import from react
import { useContext } from "react";
// import from context
import { TopRatedTvContext } from "../../context/TopRatedTvContext";
// import from utils
import { useTitleSelectionTMDBId } from "../../utils/useTitleSelectionTMDBId";
// import Swiper core and required modules
import { Swiper, SwiperSlide } from "swiper/react";
import { EffectCoverflow, Navigation } from "swiper/modules";
// Import Swiper styles
import "swiper/css";
import "swiper/css/effect-coverflow";
import "swiper/css/pagination";
// import css module
import styles from "./TopRatedTV.module.css";


const TopRatedTV = () => {
  const topRatedTv = useContext(TopRatedTvContext);

  console.log('top rated tv: ', topRatedTv);

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
      <h3 className={styles.category}>Top Rated TV</h3>
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
        modules={[EffectCoverflow, Navigation]}
        className={styles.swiper}
      >
        {topRatedTv.map((tvShow) => (
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
            </SwiperSlide>
        ))}
      </Swiper>
    </>
  );
};

export default TopRatedTV;