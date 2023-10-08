// import from react
import { useState } from "react";
// import from react-router-dom
import { Link, useParams } from "react-router-dom";
// import from @apollo/client
import { useQuery, useMutation } from "@apollo/client";
// import from mui
import { Button, Box } from "@mui/material";
import Grid from "@mui/material/Unstable_Grid2/Grid2";
// import RemoveIcon from '@mui/icons-material/Remove';
// import InfoIcon from '@mui/icons-material/Info';
import ButtonBase from '@mui/material/ButtonBase';
// import DeleteIcon from '@mui/icons-material/Delete';
import HighlightOffIcon from '@mui/icons-material/HighlightOff';
import IconButton from '@mui/material/IconButton';
// import from utils
import { QUERY_ME } from "../../utils/queries";
import { REMOVE_TITLE } from "../../utils/mutations";
import Auth from "../../utils/auth";
import { useTitleSelection } from "../../utils/useTitleSelection";
import { sourceLogos } from "../../utils/sourceLogos";
import { buySourceLogos } from "../../utils/buySourceLogos";
// import swiper.js
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/navigation";
import { Parallax, Navigation } from "swiper/modules";
// import components
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

  const filteredTitles = userData.savedTitles?.filter((title) => {
    if (filters.type.length) {
      const typeFilter = filters.type
        .map((type) => {
          if (type === "Movie") return ["movie", "short_film"];
          if (type === "TV") return ["tv_series", "tv_miniseries"];
          return [type];
        })
        .flat();
      console.log(typeFilter);

      if (!typeFilter.includes(title.type)) {
        return false;
      }
    }

    if (filters.source.length) {
      const sourceFilter = filters.source
        .map((source) => {
          if (source === "AmazonPrime") return "Prime Video";
          if (source === "AppleTV+") return "Apple TV+";
          if (source === "Disney+") return "Disney+";
          if (source === "Hulu") return "Hulu";
          if (source === "Max") return "Max";
          if (source === "Netflix") return "Netflix";
          if (source === "ParamountPlus") return "Paramount+";
          if (source === "Peacock Premium") return "Peacock";
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
          <h3 className={styles.savedTitleCountDisplay}>
            {userData.savedTitles.length ? (
              `You have ${userData.savedTitles.length} saved ${
                userData.savedTitles.length === 1 ? "title." : "titles."
              }`
            ) : (
              <>
                You have no saved titles!
                <br />
                Find Something To Watch!
                <br />
                <SearchDrawerIconButton />
              </>
            )}
          </h3>
          {userData.savedTitles.length > 0 && (
            <Box sx={{ marginTop: "0rem" }}>
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
                style={{ height: "100%", width: "auto" }}>
                <Grid
                  container
                  spacing={1}
                  justifyContent="center"
                  alignItems="end"
                  textAlign="center">
                  <Grid xs={3}></Grid>
                  <Grid container xs={12}>
                    <Grid
                      xs={12}
                      sx={{
                        marginTop: "",
                        // top: "2%",
                        // position: "fixed",
                        padding: ".35rem",
                      }}>

                      <h5 className={styles.title} data-swiper-parallax="-300">
                        {title.title}
                      </h5>
                    </Grid>
                    <Grid
                      xs={12}
                      sx={{
                        marginTop: "-.25rem",
                        padding: ".35rem",
                      }}>
                      <h6 data-swiper-parallax="-200" className={styles.genre}>
                        {title.genre_names.join(", ")}
                      </h6>
                    </Grid>
                    {/* {title.type && (
                      <Grid xs={12}>
                        <h6 className={styles.type}>
                          {title.type === "movie"
                            ? "Movie"
                            : title.type === "tv_series"
                            ? "TV Series"
                            : title.type === "tv_miniseries"
                            ? "TV Miniseries"
                            : title.type === "short_film"
                            ? "Short Film"
                            : "Unknown Type"}
                        </h6>
                      </Grid>
                    )}
                    <Grid xs={12}>
                      <h6 className={styles.year} data-swiper-parallax="-200">
                        {title.year}
                      </h6>
                    </Grid> */}
                  </Grid>

                  <Grid xs={12} md={2} sx={{ position: "relative", marginTop: '.25rem' }}>
                  <ButtonBase onClick={(event) => handleTitleSelected(title.id, event)} >
                    <img
                      className={styles.poster}
                      src={title.poster}
                      alt={title.title}
                      data-swiper-parallax="-100"
                    />
                    </ButtonBase>
                  </Grid> 

                  {title.sources && title.sources.length > 0 && (
                    <>
                      <Grid
                        sx={{ padding: ".25rem" }}
                        container
                        spacing={0}
                        xs={12}
                        md={2}>
                        <Grid xs={12}>
                          <h6
                            style={{ fontSize: "1rem" }}
                            data-swiper-parallax="-300">
                            Click to watch:
                          </h6>
                        </Grid>
                        {title.sources.map((source) => (
                          <Grid
                            xs={12}
                            key={`${title.id}-${source.source_id}`}
                            style={{
                              height: "3.5rem",
                              overflow: "hidden",
                              zIndex: "100",
                              padding: "0",
                            }}>
                            <a
                              href={source.web_url}
                              target="_blank"
                              rel="noreferrer">
                              <img
                                className={styles.sourceLogos}
                                data-swiper-parallax="-200"
                                src={sourceLogos[source.name]}
                                alt={source.name}
                                style={{
                                  maxWidth: "6rem",
                                  maxHeight: "auto",
                                  display: "block",
                                  margin: "0 auto",
                                }}
                              />
                            </a>
                          </Grid>
                        ))}
                        {/* Render placeholders */}
                        {Array(4 - title.sources.length)
                          .fill()
                          .map((_, index) => (
                            <Grid
                              item
                              xs={12}
                              key={`placeholder-${index}`}
                              style={{
                                height: "3.5rem",
                                overflow: "hidden",
                                zIndex: "100",
                                padding: "0",
                              }}>
                              <div
                                style={{
                                  maxWidth: "6rem",
                                  height: "2.5rem",
                                  display: "block",
                                  margin: "0 auto",
                                  // border: "1px dashed #ccc",
                                }}
                              />
                            </Grid>
                          ))}
                      </Grid>
                    </>
                  )}

                  {title.buy_sources && title.buy_sources.length > 0 && (
                    <Grid
                      sx={{ padding: ".25rem",  }}
                      container
                      spacing={0}
                      xs={12}
                      md={2}>
                      <Grid xs={12}>
                        <h6
                          style={{ fontSize: "1rem" }}
                          data-swiper-parallax="-300">
                          Click to rent or buy:
                        </h6>
                      </Grid>
                      {title.buy_sources.map((buy_source) => (
                        <Grid
                          xs={12}
                          key={`${title.id}-${buy_source.source_id}`}
                          style={{
                            height: "3.5rem",
                            overflow: "hidden",
                            zIndex: "100",
                            padding: "0",
                          }}>
                          <a
                            href={buy_source.web_url}
                            target="_blank"
                            rel="noreferrer">
                            <img
                              className={styles.buySourceLogos}
                              data-swiper-parallax="-200"
                              src={buySourceLogos[buy_source.name]}
                              alt={buy_source.name}
                              style={{
                                maxWidth: "6rem",
                                maxHeight: "auto",
                                display: "block",
                                margin: "0 auto",
                              }}
                            />
                          </a>
                        </Grid>
                      ))}
                    </Grid>
                  )}

                  <Grid container xs={12} >  
                    <Grid xs={0} md={3}></Grid>                 
                    <Grid xs={0} md={4}></Grid>
                    <Grid xs={12} md={4}>
                      <IconButton
                        sx={{color: 'black'}}
                        data-swiper-parallax="-200"
                        variant="contained"
                        onClick={() => handleDeleteTitle(title.id)}>
                        <HighlightOffIcon fontSize="large"/>
                      </IconButton>
                    </Grid>
                    <Grid xs={0} md={1}></Grid> 
                  </Grid>

                  {title.backdrop && (
                    <Grid xs={12} sx={{ marginTop: "-39rem", zIndex: "-1" }}>
                      <Grid container justifyContent="center">
                        <Grid xs={12}>
                          <img
                            data-swiper-parallax="-400"
                            src={title.backdrop}
                            alt={title.title}
                            className={styles.backdrop}
                          />
                        </Grid>
                      </Grid>
                    </Grid>
                  )}

                  <Grid container xs={12} >
                    <Grid xs={12} md={6}>
                      <Button
                        data-swiper-parallax="-200"
                        variant="contained"
                        value={title.id}
                        onClick={handleTitleSelected}>
                        Details
                      </Button>
                    </Grid>

                    <Grid xs={12} md={6}>
                      <Button
                        data-swiper-parallax="-200"
                        variant="contained"
                        onClick={() => handleDeleteTitle(title.id)}>
                        Remove
                      </Button>
                    </Grid>
                  </Grid>
                </Grid>
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

{
  /* {title.sources && title.sources.length > 0 && (
                    <>
                      <Grid container xs={12}>
                      <Grid xs={12}>
                        <h6 style={{ fontSize: "1rem" }}>Watch On:</h6>
                      </Grid>
                      {title.sources.map((source) => {
                        return (
                          <Grid
                            xs={12}
                            key={`${title.id}-${source.source_id}`}
                            style={{
                              // width: "6rem",
                              height: "auto",
                              overflow: "hidden",
                              marginLeft: "1rem",
                              marginRight: "1rem",
                            }}>
                            <a
                              href={source.web_url}
                              target="_blank"
                              rel="noreferrer">
                              <img
                                src={sourceLogos[source.name]}
                                alt={source.name}
                                style={{ 
                                   maxWidth: "100%",
                                   maxHeight: "100%",
                                   maxWidth: "6rem",
                                  maxHeight: "auto",
                                  display: "block",
                                  margin: "0 auto",
                                }}
                              /> */
}
{
  /* <p>{source.name}</p> */
}
{
  /* </a>
                          </Grid>
                        );
                      })}
                      </Grid>
                    </>
                  )}

                  {title.buy_sources && title.buy_sources.length > 0 && (
                    <>
                      <Grid container xs={12}>
                      <Grid xs={12}>
                        <h6 style={{ fontSize: "1rem" }}>
                          <strong>Rent or buy on:</strong>
                        </h6>
                      </Grid>
                      {title.buy_sources.map((buy_source) => {
                        return (
                          <Grid
                            xs={12}
                            key={`${title.id}-${buy_source.source_id}`}
                            style={{ 
                               width: "6rem",
                               height: "auto",
                              overflow: "hidden",
                              marginLeft: "1rem",
                              marginRight: "1rem",
                            }}>
                            <a
                              href={buy_source.web_url}
                              target="_blank"
                              rel="noreferrer">
                              <img
                                src={buySourceLogos[buy_source.name]}
                                alt={buy_source.name}
                                style={{ 
                                   maxWidth: "100%",
                                   maxHeight: "100%",
                                   maxWidth: "6rem",
                                  maxHeight: "auto",
                                  display: "block",
                                  margin: "0 auto",
                                }}
                              /> */
}
{
  /* <p>{buy_source.name}</p> */
}
{
  /* </a>
                          </Grid>
                        );
                      })}
                      </Grid>
                    </>
                  )} */
}

{
  /* <Grid xs={12}>
                    <Grid
                      container
                      justifyContent="center"
                      sx={{ marginTop: "", zIndex: "100" }}>  */
}

{
  /* </Grid>
                  </Grid> */
}
{
  /* <Grid xs={12}>
                    <Grid
                      container
                      justifyContent="center"
                      sx={{ marginTop: "", zIndex: "100" }}> */
}
