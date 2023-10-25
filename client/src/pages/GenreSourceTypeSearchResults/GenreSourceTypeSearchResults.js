// import from react
import { useRef, useEffect, useState, useContext } from "react";
// import from react-router
import { useLocation, useNavigate } from "react-router-dom";
// import context
import { SearchResultsContext } from "../../context/SearchResultsContext";
// import from mui
import Grid from "@mui/material/Unstable_Grid2/Grid2";
import Paper from "@mui/material/Paper";
import { ButtonBase } from "@mui/material";
import { styled } from "@mui/material/styles";
// import from utils
import { useTitleSelectionTMDBId } from "../../utils/useTitleSelectionTMDB";

import Auth from "../../utils/auth";

const GenreSourceTypeResults = () => {
  const navigate = useNavigate();
  const loggedIn = Auth.loggedIn();
  const location = useLocation();
  const searchDataFromRouter = location.state || {};
  const locationStateRef = useRef(location.state);

  const { genreSourceTypeSearchResults } = useContext(SearchResultsContext);
  const [searchedGenres, setSearchedGenres] = useState(
    searchDataFromRouter.genres || ""
  );
  const [searchedTypes, setSearchedTypes] = useState(
    searchDataFromRouter.types || ""
  );
  const [searchedSources, setSearchedSources] = useState(
    searchDataFromRouter.sources || ""
  );
  const watchModeGenreList = {
    1: "Action",
    39: "Action & Adventure",
    2: "Adventure",
    3: "Animation",
    33: "Anime",
    31: "Biography",
    4: "Comedy",
    5: "Crime",
    6: "Documentary",
    7: "Drama",
    8: "Family",
    9: "Fantasy",
    28: "Game Show",
    10: "History",
    11: "Horror",
    21: "Kids",
    12: "Music",
    32: "Musical",
    13: "Mystery",
    22: "News",
    23: "Reality",
    14: "Romance",
    40: "Sci-Fi & Fantasy",
    15: "Science Fiction",
    25: "Soap",
    29: "Sports",
    26: "Talk",
    17: "Thriller",
    18: "War",
    41: "War & Politics",
    19: "Western",
  };

  const subStreamingSourceMap = {
    203: "Netflix",
    157: "Hulu",
    26: "Amazon Prime",
    387: "Max",
    372: "Disney+",
    371: "Apple TV",
    392: "Hayu",
    444: "Paramount+",
    248: "Showtime",
    393: "Crave",
    389: "Peacock",
    395: "Crave Starz",
    425: "Stan",
    323: "STARZ",
    424: "FoxtelNow",
    408: "Sky Go",
    108: "MGM+",
    406: "Now TV",
    423: "BINGE",
    419: "BritBox UK",
    367: "Kanopy",
    159: "Hulu with Showtime",
    368: "YouTube Premium",
    249: "Showtime with Amazon Prime",
  };

  const titleTypeMap = {
    movie: "Movie",
    tv_series: "TV Series",
    tv_miniseries: "TV Mini-Series",
    short_film: "Short Film",
  };

  useEffect(() => {
    if (locationStateRef.current !== location.state) {
      locationStateRef.current = location.state;
      const newSearchData = location.state || {};
      setSearchedGenres(newSearchData.genres || "");
      setSearchedTypes(newSearchData.types || "");
      setSearchedSources(newSearchData.sources || "");
    }
  }, [location.state]);
  console.log(genreSourceTypeSearchResults);
  const handleTitleSelected = useTitleSelectionTMDBId();
  console.log(searchDataFromRouter);
  console.log(searchedGenres, searchedTypes, searchedSources);

  const getGenreLabels = (searchedGenres) => {
    const genreArray = searchedGenres.split(",");
    const genreLabelsArray = genreArray.map(
      (genre) => watchModeGenreList[genre]
    );
    return genreLabelsArray.join(", ");
  };

  const getStreamingSourceLabels = (searchedSources) => {
    const selectedSourcesArray = searchedSources.split(",");
    const sourceLabelsArray = selectedSourcesArray.map(
      (source) => subStreamingSourceMap[source]
    );
    return sourceLabelsArray.join(", ");
  };

  const getTypeLabels = (searchedTypes) => {
    const typeArray = searchedTypes.split(",");
    const typeLabelsArray = typeArray.map((type) => titleTypeMap[type]);
    return typeLabelsArray.join(", ");
  };

  const TitleBox = styled(Paper)(({ theme }) => ({
    padding: theme.spacing(4),
    margin: theme.spacing(4),
    textAlign: "center",
    color: "black",
    marginBottom: "4rem",
    width: "12rem",
    height: "12rem",
    borderRadius: "20%",
    fontSize: "1rem",
    fontWeight: "bold",
    backgroundImage: "linear-gradient(315deg, #185a9d 0%, #43cea2 100%)",
    "&:hover": {
      backgroundImage: "linear-gradient(315deg, #43cea2 0%,  #185a9d 75%)",
      transform: "scale(1.05)",
    },
  }));

  return (
    <main className="gradientBackground">
      {!loggedIn ? (
        navigate("/")
      ) : (
        <Grid container style={{ textAlign: "center" }}>
          <Grid xs={12}>
            <h3
              style={{
                background: "linear-gradient(315deg, #185a9d 0%, #43cea2 85%)",
                backgroundClip: "text",
                WebkitBackgroundClip: "text",
                color: "black",
                fontFamily: "Raleway",
                fontWeight: "700",
                letterSpacing: ".2rem",
                fontSize: "1.5rem",
                marginTop: "0",
                marginBottom: "0",
                padding: ".5rem",
              }}>
              Genre | Source | Type
              <br />
              Search Results
            </h3>
            <h4
              style={{
                fontSize: "1.25rem",
                margin: "0",
                marginBottom: "-.5em",
                padding: ".5rem",
                background: "linear-gradient(315deg, #185a9d 0%, #43cea2 85%)",
                backgroundClip: "text",
                WebkitBackgroundClip: "text",
                color: "black",
                fontFamily: "Raleway",
                fontWeight: "700",
                letterSpacing: ".2rem",
              }}>
              Results For:
            </h4>
            <h5
              style={{
                fontSize: "1.25rem",
                margin: "0",
                marginBottom: "-.5em",
                padding: ".5rem",
                background: "linear-gradient(315deg, #185a9d 0%, #43cea2 85%)",
                backgroundClip: "text",
                WebkitBackgroundClip: "text",
                color: "black",
                fontFamily: "Raleway",
                fontWeight: "700",
                letterSpacing: ".2rem",
              }}>
              Genre(s):{" "}
              <span style={{ fontFamily: "Bebas Neue" }}>
                {getGenreLabels(searchedGenres) || "None Selected"}
              </span>
            </h5>
            <h5
              style={{
                fontSize: "1.25rem",
                margin: "0",
                marginBottom: "-.5em",
                padding: ".5rem",
                background: "linear-gradient(315deg, #185a9d 0%, #43cea2 85%)",
                backgroundClip: "text",
                WebkitBackgroundClip: "text",
                color: "black",
                fontFamily: "Raleway",
                fontWeight: "700",
                letterSpacing: ".2rem",
              }}>
              Source(s):{" "}
              <span style={{ fontFamily: "Bebas Neue" }}>
                {getStreamingSourceLabels(searchedSources) || "None Selected"}
              </span>
            </h5>
            <h5
              style={{
                fontSize: "1.25rem",
                margin: "0",
                marginBottom: "0em",
                padding: ".5rem",
                background: "linear-gradient(315deg, #185a9d 0%, #43cea2 85%)",
                backgroundClip: "text",
                WebkitBackgroundClip: "text",
                color: "black",
                fontFamily: "Raleway",
                fontWeight: "700",
                letterSpacing: ".2rem",
              }}>
              Type:{" "}
              <span style={{ fontFamily: "Bebas Neue" }}>
                {getTypeLabels(searchedTypes) || "None Selected"}
              </span>
            </h5>
          </Grid>
          <Grid container justifyContent="center" alignItems="center">
            {genreSourceTypeSearchResults.map((title) => (
              <Grid
                container
                justifyContent="center"
                xs={12}
                sm={6}
                md={4}
                lg={3}
                key={title.id}
                alignItems="center">
                <ButtonBase
                  onClick={(event) => handleTitleSelected(title.id, event)}
                  value={title.id}>
                  <TitleBox elevation={12}>
                    {title.title && <p>{title.title}</p>}
                    {title.genres && (
                      <p>
                        {title.genres
                          .map((id) => watchModeGenreList[id])
                          .filter(Boolean)
                          .join(", ")}
                      </p>
                    )}
                    {title.type && (
                      <p>
                        {title.type === "movie"
                          ? "Movie"
                          : title.type === "tv_series"
                          ? "TV Series"
                          : title.type === "tv_miniseries"
                          ? "TV Miniseries"
                          : title.type === "short_film"
                          ? "Short Film"
                          : "Unknown Type"}
                      </p>
                    )}
                    {title.year && <p>{title.year}</p>}
                    {/* <Button
                  variant="contained"
                  // value={title.type + '-' + title.id}
                  value={title.id}
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
      )}
    </main>
  );
};

export default GenreSourceTypeResults;
