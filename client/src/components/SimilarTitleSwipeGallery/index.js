
import { Swiper, SwiperSlide } from "swiper/react";
import { EffectCoverflow, Navigation } from "swiper/modules";
import "swiper/css";
import "swiper/css/effect-coverflow";
import "swiper/css/pagination";
import styles from "./VerticalCardSwipeGallery.module.css";
import { useTitleSelectionTMDBId } from "../../utils/useTitleSelectionTMDBId";

const SimilarTitleSwipeGallery = ({
  categoryTitle,
  genreList,
  similarTitles,
}) => {
  const handleTitleSelected = useTitleSelectionTMDBId();

  return (
    <>
      <h3 id={categoryTitle} className={styles.category}>
        {categoryTitle}
      </h3>
      <Swiper
        style={{ "--swiper-navigation-color": "#000000" }}
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
        {similarTitles.map((similarTitle) => (
          <SwiperSlide
            className={styles.slide}
            key={similarTitle.id}
            style={{
              backgroundImage: `url(https://image.tmdb.org/t/p/w200/${similarTitle.poster_path}), linear-gradient(315deg, #43cea2 0%,  #185a9d 85%)`,
              backgroundRepeat: "no-repeat",
              backgroundPosition: "center",
            }}
            onClick={() =>
              handleTitleSelected(
                categoryTitle.includes("TV")
                  ? `tv-${similarTitle.id}`
                  : `movie-${similarTitle.id}`
              )
            }
          >
            <h4 className={styles.title}>{similarTitle.title}</h4>
            <h5 className={styles.genres}>
              {similarTitle.genre
                .map((id) => genreList[id])
                .slice(0, 3)
                .join(", ")}
            </h5>
            <h6 className={styles.releaseDate}>
              {categoryTitle.includes("TV") ? "First aired on" : "Released on"}{" "}
              {similarTitle.release_date}
            </h6>
          </SwiperSlide>
        ))}
      </Swiper>
    </>
  );
};

export default SimilarTitleSwipeGallery;
