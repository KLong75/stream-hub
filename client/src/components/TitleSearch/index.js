// import from react
import { useState, useEffect, useContext } from "react";
// import from react-router-dom
import { useNavigate } from "react-router-dom";
// import context
import { SearchResultsContext } from "../../context/SearchResultsContext";
import { TopRatedMoviesContext } from "../../context/TopRatedMoviesContext";
import { TrendingMoviesContext } from "../../context/TrendingMoviesContext";
import { PopularMoviesContext } from "../../context/PopularMoviesContext";
import { TopRatedTvContext } from "../../context/TopRatedTvContext";
import { TrendingTvContext } from "../../context/TrendingTvContext";
import { PopularTvContext } from "../../context/PopularTvContext";
// import from material-ui
import SearchIcon from "@mui/icons-material/Search";
import TextField from "@mui/material/TextField";
import FormControl from "@mui/material/FormControl";
import Button from "@mui/material/Button";
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
} from "@mui/material";
// import FormLabel from '@mui/material/FormLabel';
import Autocomplete, { createFilterOptions } from "@mui/material/Autocomplete";
import Snackbar from "@mui/material/Snackbar";
import IconButton from "@mui/material/IconButton";
import CloseIcon from "@mui/icons-material/Close";
// import from utils
import { searchByTitle } from "../../utils/apiCalls";

import { CACHE_DURATION } from "../../utils/utils";

const filter = createFilterOptions();

const TitleSearch = ({ onSubmit }) => {
  const [openSnackbar, setOpenSnackbar] = useState(false);
  const [snackbarMessage, setSnackbarMessage] = useState("");
  const [modalOpen, setModalOpen] = useState(false);
  const navigate = useNavigate();
  const { setTitleSearchResults } = useContext(SearchResultsContext); // <- get the context
  const [value, setValue] = useState(null);
  const [topTitlesMovieAndTv, setTopTitlesMovieAndTv] = useState([]);

  const topRatedMovies = useContext(TopRatedMoviesContext);
  const trendingMovies = useContext(TrendingMoviesContext);
  const popularMovies = useContext(PopularMoviesContext);
  const topRatedTv = useContext(TopRatedTvContext);
  const trendingTv = useContext(TrendingTvContext);
  const popularTv = useContext(PopularTvContext);

  const handleTitleSearchClick = () => {
    setModalOpen(true);
  };

  const handleCloseModal = () => {
    setModalOpen(false);
  };

  useEffect(() => {
    const allTitles = [
      ...topRatedMovies,
      ...trendingMovies,
      ...popularMovies,
      ...topRatedTv,
      ...trendingTv,
      ...popularTv,
    ].flat();

    if (allTitles.every((title) => title)) {
      const uniqueTitles = Array.from(
        new Set(allTitles.map((title) => title.title))
      )
        .map((title) => {
          return allTitles.find((t) => t.title === title);
        })
        .filter((title) => title && title.title)
        .sort((a, b) => a.title.localeCompare(b.title));

      setTopTitlesMovieAndTv(uniqueTitles);
    }
  }, [
    topRatedMovies,
    trendingMovies,
    popularMovies,
    topRatedTv,
    trendingTv,
    popularTv,
  ]);

  const searchByUserInput = async (event) => {
    event.preventDefault();
    // console.log(value.title);
    const userInput = value.title;
    setValue(userInput);

    const cachedTitleSearchResults = localStorage.getItem(
      `titleSearchResults_${userInput}`
    );

    if (cachedTitleSearchResults) {
      const { data, timestamp } = JSON.parse(cachedTitleSearchResults);
      // console.log(data);
      const now = Date.now();
      if (now - timestamp < CACHE_DURATION) {
        setTitleSearchResults(data);
        // console.log("Using Cached Data:", data);
        navigate("/title_search_results", {
          state: { data, searchedTitle: userInput },
        });
        setModalOpen(false);
        onSubmit();
        // return;
      } else {
        localStorage.removeItem(`titleSearchResults_${userInput}`);
        // console.log("Cached Data Expired and Removed");
      }
    }

    if (!cachedTitleSearchResults) {
      try {
        const response = await searchByTitle(userInput);
        // console.log(response);

        if (!response.ok) {
          const errorMessage =
            "We were unable to find your title. Please try again.";
          setSnackbarMessage(errorMessage);
          setOpenSnackbar(true);
          alert("Something went wrong. Please try again.");
        }

        const data = await response.json();
        // console.log(data);

        const titleSearchData = data.results.map((titles) => ({
          id: titles.id,
          title: titles.name,
          year: titles.year,
          type: titles.type,
          image_url: titles.image_url,
        }));

        console.log(titleSearchData);
        setTitleSearchResults(titleSearchData);

        const cacheData = {
          data: titleSearchData,
          timestamp: Date.now(),
        };
        localStorage.setItem(
          `titleSearchResults_${userInput}`,
          JSON.stringify(cacheData)
        );
        navigate("/title_search_results", {
          state: { data: titleSearchData, searchedTitle: userInput },
        });
        setModalOpen(false);
        onSubmit();
      } catch (err) {
        console.log(err);
      }
    }
  };

  const handleCloseSnackbar = () => {
    setOpenSnackbar(false);
  };

  const snackBarAction = (
    <>
      <IconButton
        size="small"
        aria-label="close"
        color="inherit"
        onClick={handleCloseSnackbar}
      >
        <CloseIcon fontSize="small" />
      </IconButton>
    </>
  );



  return (
    <>
      <h3
        style={{ fontSize: "1.1rem", color: "black" }}
        onClick={() => handleTitleSearchClick()}>
        Search Movies and TV Shows
        <br />
        by Title
        <br />
        From All Available Sources
      </h3>
      <Dialog open={modalOpen} onClose={handleCloseModal}>
        <DialogTitle>
          Search Movies and TV Shows by Title From All Available Sources
        </DialogTitle>
        <DialogContent>
          <p style={{ fontSize: "1rem", padding: "1.5" }}>
            Don't see your title in the menu? Enter it anyway! We'll find it!
          </p>
          <form onSubmit={searchByUserInput} style={{ overflowX: "hidden" }}>
            <FormControl>
              <Autocomplete
                size="small"
                value={value}
                onChange={(event, newValue) => {
                  if (typeof newValue === "string") {
                    setValue({
                      title: newValue,
                    });
                  } else if (newValue && newValue.inputValue) {
                    // Create a new value from the user input
                    setValue({
                      title: newValue.inputValue,
                    });
                  } else {
                    setValue(newValue);
                  }
                }}
                filterOptions={(options, params) => {
                  const filtered = filter(options, params);
                  const { inputValue } = params;
                  // Suggest the creation of a new value
                  const isExisting = options.some(
                    (option) => inputValue === option.title
                  );
                  if (inputValue !== "" && !isExisting) {
                    filtered.push({
                      inputValue,
                      title: `Search for "${inputValue}"`,
                    });
                  }
                  // console.log(filtered)
                  return filtered;
                }}
                selectOnFocus
                clearOnBlur
                handleHomeEndKeys
                id=""
                options={topTitlesMovieAndTv}
                getOptionLabel={(option) => {
                  // Value selected with enter, right from the input
                  if (typeof option === "string") {
                    return option;
                  }
                  // Add "xxx" option created dynamically
                  if (option.inputValue) {
                    return option.inputValue;
                  }
                  // Regular option
                  return option.title;
                }}
                renderOption={(props, option) => (
                  <li {...props}>{option.title}</li>
                )}
                freeSolo
                renderInput={(params) => (
                  <TextField
                    color="formOutline"
                    sx={{ width: "16rem", marginTop: "1rem" }}
                    {...params}
                    required
                    label="Enter Title"
                  />
                )}
              />
              <DialogActions>
                <Button
                  type="submit"
                  sx={{ borderRadius: "4px" }}
                  variant="contained">
                  <SearchIcon />
                </Button>
              </DialogActions>
            </FormControl>
          </form>
        </DialogContent>
        <Button
          variant="contained"
          onClick={handleCloseModal}
          sx={{ borderRadius: "4px" }}>
          Close
        </Button>
      </Dialog>
      <Snackbar
        open={openSnackbar}
        autoHideDuration={6000}
        onClose={handleCloseSnackbar}
        message={snackbarMessage}
        action={snackBarAction}
        />
    </>
  );
};

export default TitleSearch;
