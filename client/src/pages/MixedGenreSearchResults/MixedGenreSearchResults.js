// import from react
import { useState, useContext } from "react";
import { Link, useLocation } from "react-router-dom";
// import context
import { SearchResultsContext } from "../../context/SearchResultsContext";
// import from mui
import { ButtonBase } from "@mui/material";
import Grid from "@mui/material/Unstable_Grid2/Grid2";
// import from swiper.js
import "swiper/css";
import "swiper/css/effect-coverflow";
import "swiper/css/pagination";
// import from utils
import { useTitleSelectionTMDBId } from "../../utils/useTitleSelectionTMDB";
import Auth from "../../utils/auth";
import { genreList } from "../../utils/utils";
// import styles
import styles from "./MixedGenreSearchResults.module.css";
// import images
import notAvailable from "../../assets/images/no_image_available.jpg";


const MixedGenreSearchResults = () => {
  const loggedIn = Auth.loggedIn();
  const location = useLocation();
  const searchedGenresFromRouter = location.state?.genres || [];
  // console.log(searchedGenresFromRouter);
  const { mixedGenreSearchResults } = useContext(SearchResultsContext);
  const [searchedGenres] = useState(searchedGenresFromRouter);
  const handleTitleSelected = useTitleSelectionTMDBId();

  return (
    <main className="gradientBackground">
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
          <Grid container sx={{ textAlign: "center", marginBottom: "4rem" }}>
            <Grid xs={12}>
              <h3
                style={{
                  color: "black",
                  fontFamily: "Raleway",
                  fontWeight: "700",
                  letterSpacing: ".2rem",
                  fontSize: "2rem",
                  padding: ".75rem",
                }}>
                Genre Search Results
              </h3>
            </Grid>
            <Grid xs={12}>
              <h4
                style={{
                  fontSize: "1.75rem",
                  margin: "0",
                  padding: ".5rem",
                  color: "black",
                  fontFamily: "Raleway",
                  fontWeight: "700",
                  letterSpacing: ".2rem",
                }}>
                Searched For:
                <br />'
                {searchedGenres
                  .map((id) => genreList[id])
                  .filter(Boolean)
                  .join(", ")}
                '
              </h4>
            </Grid>
            <Grid xs={12} container sx={{ marginTop: "2rem" }}>
              {mixedGenreSearchResults.map((title) => (
                <Grid
                  xs={12}
                  sm={6}
                  md={4}
                  lg={3}
                  key={title.id}
                  sx={{ marginBottom: "4rem" }}>
                  {title.title && <p>{title.title}</p>}
                  {title.type && (
                    <p>
                      {title.type === "movie"
                        ? "Movie"
                        : title.type === "tv"
                        ? "TV Series"
                        : title.type === "tv_miniseries"
                        ? "TV Miniseries"
                        : title.type === "short_film"
                        ? "Short Film"
                        : "Unknown Type"}
                    </p>
                  )}
                  {title.year && <p>{title.year}</p>}
                  {title.poster_url && (
                    <ButtonBase
                      onClick={(event) => handleTitleSelected(title.id, event)}>
                      <img
                        className={styles.poster}
                        src={
                          title.poster_url.includes("null")
                            ? notAvailable
                            : title.poster_url
                        }
                        alt={title.title}
                      />
                    </ButtonBase>
                  )}
                </Grid>
              ))}
            </Grid>
          </Grid>
        </>
      )}
    </main>
  );
};

export default MixedGenreSearchResults;
