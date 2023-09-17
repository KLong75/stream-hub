// TrendingCategory.js
import { useContext } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { EffectCoverflow, Navigation } from "swiper/modules";
import "swiper/css";
import "swiper/css/effect-coverflow";
import "swiper/css/pagination";
import styles from "./VerticalCardSwipeGallery.module.css";

const VerticalCardSwipeGallery = ({
  context,
  categoryTitle,
  handleTitleSelected,
  genreList,
}) => {
  const trendingData = useContext(context);

  console.log(`${categoryTitle}: `, trendingData);

  return (
    <>
      <h3 className={styles.category}>{categoryTitle}</h3>
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
        {trendingData.map((item) => (
          <SwiperSlide
            className={styles.slide}
            key={item.id}
            style={{
              backgroundImage: `url(https://image.tmdb.org/t/p/w200/${item.poster_path}), linear-gradient(315deg, #43cea2 0%,  #185a9d 85%)`,
              backgroundRepeat: "no-repeat",
              backgroundPosition: "center",
            }}
            // onClick={() => handleTitleSelected(`tv-${item.id}`)}
            onClick={() =>
              handleTitleSelected(
                categoryTitle.includes("TV")
                  ? `tv-${item.id}`
                  : `movie-${item.id}`
              )
            }
          >
            <h4 className={styles.title}>{item.title}</h4>
            <h5 className={styles.genres}>
              {item.genre
                .map((id) => genreList[id])
                .slice(0, 2)
                .join(", ")}
            </h5>
            <h6 className={styles.releaseDate}>
              First aired on {item.first_air_date}
            </h6>
          </SwiperSlide>
        ))}
      </Swiper>
    </>
  );
};

export default VerticalCardSwipeGallery;