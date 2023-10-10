// import from react
import React, { useEffect, useContext } from "react";
import { Link, useLocation } from "react-router-dom";
// import context
import { SearchResultsContext } from "../../context/SearchResultsContext";
// import from mui
import Grid from "@mui/material/Unstable_Grid2/Grid2";
import Paper from "@mui/material/Paper";
import { ButtonBase } from "@mui/material";
// import from utils
import { useTitleSelection } from "../../utils/useTitleSelection";
import Auth from "../../utils/auth";

const GenreSearchResults = () => {
  const location = useLocation();
  const loggedIn = Auth.loggedIn();
  const searchedGenreLabel = location.state?.genre;
  const { genreSearchResults } = useContext(SearchResultsContext); // Get the data from context
  useEffect(() => {}, [genreSearchResults]);
  console.log(genreSearchResults);
  const handleTitleSelected = useTitleSelection();

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
        <Grid container textAlign="center">
          <Grid xs={12}>
            <h3>Genre Search Results</h3>
            <h4>{searchedGenreLabel}</h4>
          </Grid>
          <Grid
            container
            justifyContent="center"
            alignItems="center"
            textAlign="center">
            {genreSearchResults.map((result) => (
              <Grid
                container
                justifyContent="center"
                xs={6}
                md={4}
                lg={3}
                key={result.id}
                alignItems="center">
                <ButtonBase
                  onClick={(event) => handleTitleSelected(result.id, event)}>
                  <Paper
                    
                    elevation={12}
                    sx={{
                      p: 2,
                      marginBottom: "4rem",
                      width: "12rem",
                      height: "12rem",
                      borderRadius: "20%",
                    }}>
                    <Grid spacing={2} container alignItems='center' justifyContent='center' textAlign='center' >
                      <Grid xs={12}>
                      <p style={{marginBottom: '0'}}>{`${result.title}`}</p>
                      </Grid>
                      {result.type && (
                        <Grid xs={12}>
                        <p style={{margin: '0'}} >
                          {result.type === "movie"
                            ? "Movie"
                            : result.type === "tv_series"
                            ? "TV Series"
                            : result.type === "tv_miniseries"
                            ? "TV Miniseries"
                            : result.type === "short_film"
                            ? "Short Film"
                            : "Unknown Type"}
                        </p>
                        </Grid>
                      )}
                      <Grid xs={12}>
                      <p style={{marginTop: '0'}}>{`${result.year}`}</p>
                      </Grid>
                    </Grid>
                    {/* <Button
                  variant="contained"
                  value={result.id}
                  onClick={handleTitleSelected}
                >
                  More Details
                </Button> */}
                  </Paper>
                </ButtonBase>
              </Grid>
            ))}
          </Grid>
        </Grid>
      )}
    </>
  );
};

export default GenreSearchResults;
