// import from react
import { useEffect, useState, useContext } from "react";
import { Link, useLocation } from "react-router-dom";
// import context
import { SearchResultsContext } from "../../context/SearchResultsContext";
// import from mui
// import Paper from "@mui/material/Paper";
import { ButtonBase } from "@mui/material";
// import { styled } from '@mui/material/styles';
import Grid from "@mui/material/Unstable_Grid2/Grid2";
// import from swiper.js
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Pagination, Parallax } from "swiper/modules";
import "swiper/css";
import "swiper/css/effect-coverflow";
import "swiper/css/pagination";
// import from utils
import { useTitleSelectionTMDBId } from "../../utils/useTitleSelectionTMDBId";
import Auth from "../../utils/auth";
import { genreList } from "../../utils/utils";
// import styles
import styles from "./MixedGenreSearchResults.module.css";


const MixedGenreSearchResults = () => {
  const loggedIn = Auth.loggedIn();
  const location = useLocation();
  const searchedGenresFromRouter = location.state?.genres || [];
  const { mixedGenreSearchResults } = useContext(SearchResultsContext);
  const [searchedGenres] = useState(searchedGenresFromRouter);

  useEffect(() => {}, [mixedGenreSearchResults]);
  console.log(mixedGenreSearchResults);

  const handleTitleSelected = useTitleSelectionTMDBId();

  return (
    <main className={styles.mixedGenreSearchResultsMain}>
      {!loggedIn ? (
        <div>
          <h2>Welcome to streamHub</h2>
          <p>Please</p>
          <Link to="/login">
            <button>Login</button>
          </Link>
          <p>Or</p>
          <Link to="/signup">
            <button>Sign Up</button>
          </Link>
        </div>
      ) : (
        <>
          <Grid container sx={{ textAlign: "center" }}>
            <Grid xs={12}>
              <h3
                style={{
                  background:
                    "linear-gradient(315deg, #185a9d 0%, #43cea2 85%)",
                  backgroundClip: "text",
                  WebkitBackgroundClip: "text",
                  color: "transparent",
                  fontFamily: "monospace",
                  fontWeight: "700",
                  letterSpacing: ".2rem",
                  fontSize: "2rem",
                  marginTop: "0",
                  marginBottom: "0",
                  padding: ".5rem",
                }}>
                Mixed Genre Search Results
              </h3>
              <h4
                style={{
                  fontSize: "1.75rem",
                  margin: "0",
                  padding: ".5rem",
                  background:
                    "linear-gradient(315deg, #185a9d 0%, #43cea2 85%)",
                  backgroundClip: "text",
                  WebkitBackgroundClip: "text",
                  color: "transparent",
                  fontFamily: "monospace",
                  fontWeight: "700",
                  letterSpacing: ".2rem",
                }}>
                {searchedGenres
                  .map((id) => genreList[id])
                  .filter(Boolean)
                  .join(", ")}
              </h4>
            </Grid>
          </Grid>
          <div>
            <Swiper
              style={{
                "--swiper-navigation-color": "#000000",
                "--swiper-pagination-color": "#000000",
                marginBottom: "6rem",
                marginTop: "3rem",
              }}
              speed={600}
              parallax={true}
              navigation={true}
              pagination={true}
              modules={[Parallax, Navigation, Pagination]}>
              {mixedGenreSearchResults.map((title) => (
                <SwiperSlide
                  key={title.id}
                  style={{
                    marginBottom: "4rem",
                    display: "flex",
                    flexDirection: "column",
                    justifyContent: "center",
                    alignItems: "center",
                  }}>
                 
                  <div
                    style={{
                      width: "55%", // or any width you find appropriate
                      height: "100%",
                      marginBottom: '-36rem'
                    }}>
                    {title.backdrop_url && (
                      <img
                        className={styles.backdrop}
                        src={title.backdrop_url}
                        alt={title.title}
                        // style={{
                        //   width: "100%",
                        //   height: "auto", 
                        //   objectFit: "cover",
                        //   opacity: '.4',
                        //   zIndex: '-100',
                        //   position: 'relative',
                        //   marginBottom: '8rem'
                        // }}
                      />
                    )}
                  </div>

                  <Grid
                    className={styles.titleDetailsContainer}
                    sx={{
                      // marginBottom: "2rem",
                      // marginTop: "2rem",
                      // backgroundImage: `url(${title.backdrop_url})`,
                      // backgroundSize: "cover",
                      // backgroundPosition: "center",
                      // backgroundRepeat: "no-repeat",
                    }}
                    container
                    spacing={1}
                    justifyContent="center"
                    alignItems="end"
                    textAlign="center">
                    
                    {title.title && (
                      <Grid xs={12}>
                        <h4 position='relative' style={{ fontSize: "1.5rem", margin: "0", fontWeight: 'bold', zIndex: '100' }}
                         data-swiper-parallax="-300">
                          {title.title}
                        </h4>
                      </Grid>
                    )}
                    {title.genres && (
                      <Grid xs={12}>
                        <h5 style={{ fontSize: "1.25rem", margin: "0" }}
                         data-swiper-parallax="-200"
                        >
                          {title.genres
                            .map((id) => genreList[id])
                            .filter(Boolean)
                            .join(", ")}
                        </h5>
                      </Grid>
                    )}

                    {title.poster_url && (
                      <Grid xs={12}>
                        <ButtonBase                
                          onClick={() =>
                            handleTitleSelected(
                              `${title.type + "-" + title.id}`
                            )
                          }>
                          <img  data-swiper-parallax="-100" className={styles.poster}  src={title.poster_url} alt={title.title} />
                        </ButtonBase>
                      </Grid>
                    )}

                    {title.type && (
                      <Grid xs={12}>
                        <h6  data-swiper-parallax="-200" style={{ fontSize: "1.2rem", margin: "0" }}>
                          {title.type.charAt(0).toUpperCase() +
                            title.type.slice(1)}
                        </h6>
                      </Grid>
                    )}
                    {title.year && (
                      <Grid xs={12} sx={{marginBottom: '6rem'}}>
                        <h6  data-swiper-parallax="-300" style={{ fontSize: "1.1rem", margin: "0" }}>
                          {title.year}
                        </h6>
                      </Grid>
                    )}
                    {/* {title.backdrop_url && (
                      <Grid xs={12}>
                        <Grid container justifyContent="center">
                          <Grid xs={12}>
                            <img src={title.backdrop_url} alt={title.title} />
                          </Grid>
                        </Grid>
                      </Grid>
                    )} */}
                    
                  </Grid>
                  
                </SwiperSlide>
              ))}
            </Swiper>
          </div>
        </>
      )}
    </main>
  );
};

export default MixedGenreSearchResults;
