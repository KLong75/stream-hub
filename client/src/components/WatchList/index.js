// import from react
import { useState, useContext } from "react";
// import from react-router-dom
import { Link, useParams } from "react-router-dom";
// import context

// import from @apollo/client
import { useQuery, useMutation } from "@apollo/client";
// import from mui
import { Button, Box } from "@mui/material";
import HighlightOffIcon from "@mui/icons-material/HighlightOff";
import IconButton from "@mui/material/IconButton";
// import from utils
import { QUERY_ME } from "../../utils/queries";
import { REMOVE_TITLE } from "../../utils/mutations";
import Auth from "../../utils/auth";
import { useTitleSelection } from "../../utils/useTitleSelection";
import { formatDate } from "../../utils/utils";
// import swiper.js
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/navigation";
import { Navigation, EffectCoverflow } from "swiper/modules";
// import components
import SearchDrawerIconButton from "../SearchDrawerIconButton";
import FilterTitles from "../FilterTitles";
// import styles
import styles from "./Watchlist.module.css";


const WatchList = () => {
  const loggedIn = Auth.loggedIn();
  const { username: userParam } = useParams();
  const { data } = useQuery(userParam ? QUERY_ME : QUERY_ME, {
    variables: { username: userParam },
  });
  const userData = data?.me || {};
  // console.log(userData)
  const handleTitleSelected = useTitleSelection();

  const [removeTitle] = useMutation(REMOVE_TITLE);

  const handleDeleteTitle = async (id) => {
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
      // console.log(typeFilter);

      if (!typeFilter.includes(title.type)) {
        return false;
      }
    }

    if (filters.source.length) {
      const sourceFilter = filters.source
        .map((source) => {
          if (source === "Prime Video") return "Prime Video";
          if (source === "AppleTV") return "AppleTV+";
          if (source === "DisneyPlus") return "Disney+";
          if (source === "Hulu") return "Hulu";
          if (source === "Max") return "Max";
          if (source === "Netflix") return "Netflix";
          if (source === "Paramount") return "Paramount+";
          if (source === "Peacock") return "Peacock";
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

  // if (loading) {
  //   return <div>Loading...</div>;
  // }
  // console.log("savedTitles", userData.savedTitles);
  // console.log("filteredTitles", filteredTitles);
  // console.log("userData", userData);

  return (
    <>
      {loggedIn ? (
        <>
          <h3 className={styles.yourWatchlist}>
            {userData.username}'s Watchlist
          </h3>
          <h4 className={styles.savedTitleCountDisplay}>
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
          </h4>
          {userData.savedTitles.length > 0 && (
            <Box sx={{ marginBottom: ".45rem" }}>
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

          {/* <h3 className={styles.category}>{userData.username}'s Watchlist</h3> */}
          <Swiper
            // loop={true}
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
            className={styles.swiper}>
            {filteredTitles?.map((title) => (
              <SwiperSlide
                className={styles.slide}
                key={title.id}
                style={{
                  backgroundImage: ` linear-gradient(315deg, #43cea2 0%,  #185a9d 85%)`,
                  backgroundRepeat: "no-repeat",
                  backgroundPosition: "center",
                }}
                // onClick={() => handleTitleSelected(title.id)}
              >
                <h4 className={styles.savedTitle}>{title.title}</h4>
                <div>
                  <img
                    className={styles.watchlistPoster}
                    onClick={() => handleTitleSelected(title.id)}
                    src={title.poster}
                    alt={title.title}
                    style={{
                      width: "200px",
                      height: "300px",
                      marginLeft: "28px",
                      marginTop: "10px",
                    }}
                  />
                </div>
                <h5 className={styles.genres}>
                  {title.genre_names.map((genre, index) => (
                    <span key={genre}>
                      {genre}
                      {index < title.genre_names.length - 1 && ", "}
                    </span>
                  ))}
                </h5>
                <h6 className={styles.releaseDate}>
                  {title.type.includes("tv") ? "First aired on" : "Released on"}{" "}
                  {formatDate(title.release_date)}
                </h6>
                <IconButton
                  sx={{
                    color: "black",
                    marginLeft: "14.15rem",
                    padding: ".25rem",
                    marginTop: "-4.25rem",
                    zIndex: "1000",
                  }}
                  data-swiper-parallax="-100"
                  variant="contained"
                  onClick={() => handleDeleteTitle(title.id)}>
                  <HighlightOffIcon
                    sx={{ zIndex: "1000" }}
                    className={styles.removeButton}
                  />
                </IconButton>
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
