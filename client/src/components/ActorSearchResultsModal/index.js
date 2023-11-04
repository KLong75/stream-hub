// import from react
import { useContext } from "react";
// import context
import { SearchResultsContext } from "../../context/SearchResultsContext";
// import from mui
import Button from "@mui/material/Button";
import { Dialog, DialogContent } from "@mui/material";
import Grid from "@mui/material/Unstable_Grid2/Grid2";
// import from swiper.js
import { Swiper, SwiperSlide } from "swiper/react";
import { EffectCoverflow, Navigation } from "swiper/modules";
import "swiper/css";
import "swiper/css/effect-coverflow";
import "swiper/css/pagination";
// import images
import imageNotAvailable from "../../assets/images/no_image_available.jpg";
// import from utils
import { genreList } from "../../utils/utils";
import { useTitleSelectionTMDBId } from "../../utils/useTitleSelectionTMDB";
import { formatDate } from "../../utils/utils";
// import styles
import styles from "./ActorSearchResultsModal.module.css";

const ActorSearchResultsModal = ({ open, onClose }) => {
  const { actorSearchResults } = useContext(SearchResultsContext);
  const handleTitleSelected = useTitleSelectionTMDBId();

  console.log("actorSearchResults: ", actorSearchResults);

  return (
    <Dialog open={open} onClose={onClose}>
      <DialogContent className="gradientBackground">
        <Grid
          container
          justifyContent="center"
          textAlign={"center"}
          sx={{ marginTop: "-2em" }}>
          {actorSearchResults
            .filter((result) => result.known_for.length > 0)
            .map((result) => (
              <Grid xs={12} key={result.id} className={styles.actorSlide}>
                <h2 className={styles.actorName}>{`${result.name}`}</h2>
                {/* <p>{`${result.job}`}</p> */}
                {result.image_url ? (
                  <img
                    src={result.image_url}
                    alt={result.name}
                    onError={(e) => {
                      e.target.style.display = "none";
                    }}
                  />
                ) : (
                  <div>
                    <p>No image available</p>
                    <img src={imageNotAvailable} alt="Unavailable" />
                  </div>
                )}

                <Grid xs={12}>
                  <Swiper
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
                    className={styles.knownForSwiper}>
                    {result.known_for.map((titleKnownFor) => (
                      <SwiperSlide
                        key={titleKnownFor.id}
                        className={styles.knownForSlide}
                        style={{
                          backgroundImage: ` linear-gradient(315deg, #43cea2 0%,  #185a9d 85%)`,
                          backgroundPosition: "center",
                          backgroundRepeat: "no-repeat",
                        }}
                        // onClick={() =>
                        //   onClose() &
                        //   handleTitleSelected(
                        //     titleKnownFor.media_type.includes("tv")
                        //       ? `tv-${titleKnownFor.id}`
                        //       : `movie-${titleKnownFor.id}`
                        //   )}
                        >
                        <h4 className={styles.knownForTitle}>
                          {titleKnownFor.title}
                        </h4>
                        <div>
                          <img
                            className={styles.titleKnownForPoster}
                            onClick={() =>
                              handleTitleSelected(titleKnownFor.id)
                            }
                            src={`https://image.tmdb.org/t/p/w200/${titleKnownFor.poster_path}`}
                            alt={titleKnownFor.title}
                            style={{
                              width: "200px",
                              height: "300px",
                              // marginLeft: "28px",
                              marginTop: "10px",
                            }}
                          />
                        </div>
                        <h5 className={styles.genres}>
                          {titleKnownFor.genre_ids
                            .map((id) => genreList[id])
                            .slice(0, 3)
                            .join(", ")}
                        </h5>
                        <h6 className={styles.releaseDate}>
                          {titleKnownFor.media_type.includes("tv")
                            ? "First aired on"
                            : "Released on"}{" "}
                          {formatDate(titleKnownFor.release_date)}
                        </h6>
                      </SwiperSlide>
                    ))}
                  </Swiper>
                </Grid>
              </Grid>
            ))}
        </Grid>
      </DialogContent>
      <Button onClick={onClose}>Close</Button>
    </Dialog>
  );
};
export default ActorSearchResultsModal;
