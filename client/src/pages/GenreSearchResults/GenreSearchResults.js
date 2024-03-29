// import from react
import { useContext } from "react";
import { Link, useLocation } from "react-router-dom";
// import context
import { SearchResultsContext } from "../../context/SearchResultsContext";
// import from mui
import Grid from "@mui/material/Unstable_Grid2/Grid2";
import Paper from "@mui/material/Paper";
import { ButtonBase } from "@mui/material";
import { styled } from "@mui/material/styles";
// import from utils
import { useTitleSelection } from "../../utils/useTitleSelection";
import Auth from "../../utils/auth";
// import styles
import styles from "./GenreSearchResults.module.css";

const GenreSearchResults = () => {
  const location = useLocation();
  const loggedIn = Auth.loggedIn();
  const searchedGenreLabel = location.state?.genre;
  const { genreSearchResults } = useContext(SearchResultsContext); // Get the data from context
  // useEffect(() => {}, [genreSearchResults]);
  // console.log(genreSearchResults);
  const handleTitleSelected = useTitleSelection();

  const TitleBox = styled(Paper)(({ theme }) => ({
    display: "flex", // make TitleBox a flex container
    flexDirection: "column", // stack children vertically
    alignItems: "center", // center children horizontally
    justifyContent: "center", // center children vertically
    padding: theme.spacing(4),
    margin: theme.spacing(4),
    width: "14rem",
    height: "14rem",
    borderRadius: "20%",
    fontWeight: "bold",
    backgroundImage: "linear-gradient(315deg, #185a9d 0%, #43cea2 100%)",
    "&:hover": {
      backgroundImage: "linear-gradient(315deg, #43cea2 0%,  #185a9d 75%)",
      transform: "scale(1.05)",
    },
  }));

  return (
    <>
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
        <main className="gradientBackground">
          <Grid container style={{ textAlign: "center" }}>
            <Grid xs={12}>
              <h3
                style={{
                  color: "black",
                  fontFamily: "Raleway",
                  fontWeight: "700",
                  letterSpacing: ".2rem",
                  fontSize: "2rem",
                  marginTop: "1rem",
                  marginBottom: "1rem",
                  padding: ".5rem",
                }}>
                Genre Search Results
              </h3>
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
                {searchedGenreLabel}
              </h4>
            </Grid>
            <Grid container justifyContent="center" alignItems="center">
              {genreSearchResults.map((result) => (
                <Grid
                  container
                  justifyContent="center"
                  xs={12}
                  sm={6}
                  md={4}
                  lg={3}
                  key={result.id}
                  alignItems="center">
                  <ButtonBase
                    onClick={(event) => handleTitleSelected(result.id, event)}>
                    <TitleBox elevation={12}>
                      <Grid
                        spacing={2}
                        container
                        alignItems="center"
                        justifyContent="center">
                        <Grid xs={12}>
                          <h4
                            className={
                              styles.resultTitle
                            }>{`${result.title}`}</h4>
                        </Grid>
                        {result.type && (
                          <Grid xs={12}>
                            <h5 className={styles.resultType}>
                              {result.type === "movie"
                                ? "Movie"
                                : result.type === "tv_series"
                                ? "TV Series"
                                : result.type === "tv_miniseries"
                                ? "TV Miniseries"
                                : result.type === "short_film"
                                ? "Short Film"
                                : "Unknown Type"}
                            </h5>
                          </Grid>
                        )}
                        <Grid xs={12}>
                          <h6
                            className={
                              styles.resultYear
                            }>{`${result.year}`}</h6>
                        </Grid>
                      </Grid>
                      {/* <Button
                  variant="contained"
                  value={result.id}
                  onClick={handleTitleSelected}
                >
                  More Details
                </Button> */}
                    </TitleBox>
                  </ButtonBase>
                </Grid>
              ))}
            </Grid>
          </Grid>
        </main>
      )}
    </>
  );
};

export default GenreSearchResults;
