// import from react
import { useState } from "react";
// import from react-router-dom
import { Link, useParams } from "react-router-dom";
// import from @apollo/client
import { useQuery, useMutation } from "@apollo/client";
// import from mui
import { Button, Box } from "@mui/material";
import Grid from "@mui/material/Unstable_Grid2/Grid2";
// import from utils
import { QUERY_ME } from "../../utils/queries";
import { REMOVE_TITLE } from "../../utils/mutations";
import Auth from "../../utils/auth";
import { useTitleSelection } from "../../utils/useTitleSelection";
// import swiper.js
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/navigation";
import { Parallax, Navigation } from "swiper/modules";
// import components
import Heading from "../Heading";
import SearchDrawerIconButton from "../SearchDrawerIconButton";
import FilterTitles from "../FilterTitles";
// import styles
import styles from "./Watchlist.module.css";

const WatchList = () => {
  const loggedIn = Auth.loggedIn();
  const { username: userParam } = useParams();
  const { loading, data } = useQuery(userParam ? QUERY_ME : QUERY_ME, {
    variables: { username: userParam },
  });
  const userData = data?.me || {};
  // console.log(userData)
  const handleTitleSelected = useTitleSelection();
  const [removeTitle] = useMutation(REMOVE_TITLE);

  const handleDeleteTitle = async (id) => {
    console.log(id);
    const token = Auth.loggedIn() ? Auth.getToken() : null;
    if (!token) {
      return false;
    }
    try {
      await removeTitle({
        variables: { id: id },
        update: (cache) => {
          const data = cache.readQuery({ query: QUERY_ME });
          // Create a deep copy of the data
          const newData = JSON.parse(JSON.stringify(data));
          // Update the copy, not the original data
          newData.me.savedTitles = newData.me.savedTitles.filter(
            (title) => title.id !== id
          );
          // Write the updated data back to the cache
          cache.writeQuery({ query: QUERY_ME, data: newData });
        },
      });
    } catch (err) {
      console.error(err);
    }
  };

  const [filters, setFilters] = useState({
    type: [],
    source: [],
    genre: [],
  });
  console.log("filters.type", filters.type);
  console.log("filters.source", filters.source);
  console.log("filters.genre", filters.genre);

  const filteredTitles = userData.savedTitles?.filter((title) => {
    if (filters.type.length) {
      const typeFilter = filters.type
        .map((type) => {
          if (type === "Movie") return ["movie", "short_film"];
          if (type === "TV") return ["tv_series", "tv_miniseries"];
          return [type];
        })
        .flat();

      if (!typeFilter.includes(title.type)) {
        return false;
      }
    }

    if (filters.source.length) {
      const sourceFilter = filters.source
        .map((source) => {
          if (source === "AmazonPrime") return "Amazon Prime";
          if (source === "AppleTV") return "AppleTV+";
          if (source === "DisneyPlus") return "Disney+";
          if (source === "Hulu") return "Hulu";
          if (source === "Max") return "Max";
          if (source === "Netflix") return "Netflix";
          if (source === "ParamountPlus") return "Paramount+";
          if (source === "Peacock") return "Peacock Premium";
          if (source === "Starz") return "STARZ";
          return source;
        })
        .flat();

      const titleSources = title.sources.map((source) => source.name);
      if (!sourceFilter.some((filter) => titleSources.includes(filter))) {
        return false;
      }
    }

    if (
      filters.genre.length &&
      !title.genre_names.some((genre) => filters.genre.includes(genre))
    ) {
      return false;
    }

    return true;
  });

  if (loading) {
    return <div>Loading...</div>;
  }
  console.log("savedTitles", userData.savedTitles);
  console.log("filteredTitles", filteredTitles);

  return (
    <>
      {loggedIn ? (
        <>
          <Heading
            variant="h3"
            heading={
              userData.savedTitles.length ? (
                `You have ${userData.savedTitles.length} saved ${
                  userData.savedTitles.length === 1 ? "title." : "titles."
                }`
              ) : (
                <>
                  You have no saved titles!
                  <br />
                  {/* <Link
                    to="/search"
                    style={{ textDecoration: "none", color: "black" }}
                  > */}
                  Find Something To Watch!
                  <SearchDrawerIconButton />
                  {/* <SearchIcon
                      fontSize="large"
                      style={{ color: "black", marginBottom: "-.25rem" }}
                    /> */}
                  {/* </Link> */}
                </>
              )
            }
          />
          {userData.savedTitles.length > 0 && (
            <Box sx={{ marginTop: "-1rem" }}>
              <FilterTitles setFilters={setFilters} />
            </Box>
          )}
          {filters.type.length ||
          filters.source.length ||
          filters.genre.length ? (
            <p>
              You have {filteredTitles.length} saved titles that meet this
              criteria.
            </p>
          ) : null}

          <Swiper
            style={{
              "--swiper-navigation-color": "#000000",
            }}
            speed={600}
            parallax={true}
            navigation={true}
            modules={[Parallax, Navigation]}
            className={styles.swiper}>
            {filteredTitles?.map((title) => (
              <SwiperSlide
                className={styles.swiperSlide}
                key={title.id}
                // style={{
                //   backgroundImage: `url(${title.backdrop})`,
                //   backgroundSize: "cover",
                //   backgroundPosition: "center",
                //   backgroundRepeat: "no-repeat",
                // }}
              >
                <Box
                  className={styles.backdropBox}
                  style={{
                    backgroundImage: `url(${title.backdrop})`,
                    backgroundSize: "cover",
                    backgroundPosition: "center",
                    backgroundRepeat: "no-repeat",
          
                    position: "absolute", // make it absolute
                    top: 0, // stick it to the top
                    left: 0, // stick it to the left
                    right: 0, // stretch it to the right
                    zIndex: -1,
                  }}></Box>
                <Grid
                  container
                  spacing={2}
                  justifyContent="center"
                  alignItems="center"
                  textAlign="center">
                  <Grid xs={12}>
                    <h5 className={styles.title} data-swiper-parallax="-300">
                      {title.title}
                    </h5>
                  </Grid>
                  <Grid xs={12}>
                    <div
                      className={styles.subtitle}
                      data-swiper-parallax="-200">
                      {title.year}
                    </div>
                  </Grid>
                  <Grid xs={12}>
                    <img src={title.poster} alt={title.title} />
                  </Grid>
                </Grid>
                <div className={styles.text} data-swiper-parallax="-100">
                  <p>
                    <strong>Genres: </strong> {title.genre_names.join(", ")}
                  </p>
                  {title.type && (
                    <p>
                      <strong>Type: </strong>
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
                  {/* <p>
                    <strong>Plot Overview: </strong>
                    {title.plot_overview}
                  </p> */}
                  <div>
                    {title.sources && title.sources.length > 0 && (
                      <>
                        <p>
                          <strong>Watch On:</strong>
                        </p>
                        {title.sources.map((source) => {
                          return (
                            <div key={`${title.id}-${source.source_id}`}>
                              <a
                                href={source.web_url}
                                target="_blank"
                                rel="noreferrer">
                                <p>{source.name}</p>
                              </a>
                            </div>
                          );
                        })}
                      </>
                    )}
                  </div>
                  <div>
                    {title.buy_sources && title.buy_sources.length > 0 && (
                      <>
                        <p>
                          <strong>Rent or buy on:</strong>
                        </p>
                        {title.buy_sources.map((buy_source) => {
                          return (
                            <div key={`${title.id}-${buy_source.source_id}`}>
                              <a
                                href={buy_source.web_url}
                                target="_blank"
                                rel="noreferrer">
                                <p>{buy_source.name}</p>
                              </a>
                            </div>
                          );
                        })}
                      </>
                    )}
                  </div>
                  <div className="watchlist-item-buttons">
                    <Button
                      variant="contained"
                      onClick={() => handleDeleteTitle(title.id)}>
                      Remove
                    </Button>
                    <Button
                      variant="contained"
                      value={title.id}
                      onClick={handleTitleSelected}>
                      More Details
                    </Button>
                  </div>
                </div>
              </SwiperSlide>
            ))}
          </Swiper>
        </>
      ) : (
        <>
          <h2>Welcome to streamHub</h2>
          <p>Please</p>
          <Link to="/login">
            <Button>Login</Button>
          </Link>
          <br />
          <p>Or</p>
          <Link to="/signup">
            <Button>Sign Up</Button>
          </Link>
        </>
      )}
    </>
  );
};

export default WatchList;
