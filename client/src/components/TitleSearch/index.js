import React, { useState, useEffect } from "react";

import TextField from "@mui/material/TextField";
import FormControl from "@mui/material/FormControl";
import Button from "@mui/material/Button";
// import FormLabel from '@mui/material/FormLabel';
import Autocomplete, { createFilterOptions } from "@mui/material/Autocomplete";

import {
  searchByTitle,
  fetchTopMoviesPageOne,
  fetchTopMoviesPageTwo,
  fetchTopMoviesPageThree,
  fetchTopMoviesPageFour,
  fetchTopMoviesPageFive,
  fetchTopTvPageOne,
  fetchTopTvPageTwo,
  fetchTopTvPageThree,
  fetchTopTvPageFour,
  fetchTopTvPageFive,
  fetchTrendingMoviesPageOne,
  fetchTrendingMoviesPageTwo,
  fetchTrendingMoviesPageThree,
  fetchTrendingMoviesPageFour,
  fetchTrendingMoviesPageFive,
  fetchTrendingTvPageOne,
  fetchTrendingTvPageTwo,
  fetchTrendingTvPageThree,
  fetchTrendingTvPageFour,
  fetchTrendingTvPageFive,
} from "../../utils/apiCalls";

import { CACHE_DURATION } from "../../utils/utils";
const TITLE_LIST_CACHE_DURATION = 1000 * 60 * 60 * 24 * 1; // 1 day
const filter = createFilterOptions();

const TitleSearch = () => {
  const [value, setValue] = useState(null);
  const [topTitlesMovieAndTv, setTopTitlesMovieAndTv] = useState([]);

  useEffect(() => {
    const cachedTopTitlesMovieAndTv =
      localStorage.getItem(`topTitlesMovieAndTv`);

    if (cachedTopTitlesMovieAndTv) {
      const { data, timestamp } = JSON.parse(cachedTopTitlesMovieAndTv);
      console.log("Stored data found in cache", data);

      const now = Date.now();
      if (now - timestamp < TITLE_LIST_CACHE_DURATION) {
        setTopTitlesMovieAndTv(data);
        console.log("Using data from cache", data);
        return;
      } else {
        localStorage.removeItem(`topTitlesMovieAndTv`);
        console.log("Cached topTitlesMovieAndTv Expired and Removed");
      }
    }

    const fetchData = async () => {
      const pageOneMovies = await getTopMovieTitlesPageOne();
      const pageTwoMovies = await getTopMovieTitlesPageTwo();
      const pageThreeMovies = await getTopMovieTitlesPageThree();
      const pageFourMovies = await getTopMovieTitlesPageFour();
      const pageFiveMovies = await getTopMovieTitlesPageFive();
      const pageOneTv = await getTopTvTitlesPageOne();
      const pageTwoTv = await getTopTvTitlesPageTwo();
      const pageThreeTv = await getTopTvTitlesPageThree();
      const pageFourTv = await getTopTvTitlesPageFour();
      const pageFiveTv = await getTopTvTitlesPageFive();
      const trendingMoviesPageOne = await getTrendingMoviesPageOne();
      const trendingMoviesPageTwo = await getTrendingMoviesPageTwo();
      const trendingMoviesPageThree = await getTrendingMoviesPageThree();
      const trendingMoviesPageFour = await getTrendingMoviesPageFour();
      const trendingMoviesPageFive = await getTrendingMoviesPageFive();
      const trendingTvPageOne = await getTrendingTvPageOne();
      const trendingTvPageTwo = await getTrendingTvPageTwo();
      const trendingTvPageThree = await getTrendingTvPageThree();
      const trendingTvPageFour = await getTrendingTvPageFour();
      const trendingTvPageFive = await getTrendingTvPageFive();

      const allFetchedData = [
        pageOneMovies,
        pageTwoMovies,
        pageThreeMovies,
        pageFourMovies,
        pageFiveMovies,
        pageOneTv,
        pageTwoTv,
        pageThreeTv,
        pageFourTv,
        pageFiveTv,
        trendingMoviesPageOne,
        trendingMoviesPageTwo,
        trendingMoviesPageThree,
        trendingMoviesPageFour,
        trendingMoviesPageFive,
        trendingTvPageOne,
        trendingTvPageTwo,
        trendingTvPageThree,
        trendingTvPageFour,
        trendingTvPageFive,
      ];

      if (allFetchedData.every((page) => page)) {
        const allTitles = [
          ...pageOneMovies,
          ...pageTwoMovies,
          ...pageThreeMovies,
          ...pageFourMovies,
          ...pageFiveMovies,
          ...pageOneTv,
          ...pageTwoTv,
          ...pageThreeTv,
          ...pageFourTv,
          ...pageFiveTv,
          ...trendingMoviesPageOne,
          ...trendingMoviesPageTwo,
          ...trendingMoviesPageThree,
          ...trendingMoviesPageFour,
          ...trendingMoviesPageFour,
          ...trendingTvPageOne,
          ...trendingTvPageTwo,
          ...trendingTvPageThree,
          ...trendingTvPageFour,
          ...trendingTvPageFive,
        ];

        if (allTitles.every((title) => title)) {
          let uniqueTitles = Array.from(
            new Set(allTitles.map((title) => title.title))
          ).map((title) => {
            return allTitles.find((t) => t.title === title);
          });

          uniqueTitles = uniqueTitles.filter((title) => {
            let filteredOutTitles = [];
            if (title && title.title) {
              return true;
            } else {
              filteredOutTitles.push(title);
              console.log(filteredOutTitles);
              return false;
            }
          });

          uniqueTitles = uniqueTitles.sort((a, b) =>
            a.title.localeCompare(b.title)
          );

          setTopTitlesMovieAndTv(uniqueTitles);
          console.log("titles retrieved:", uniqueTitles);
          const cacheData = {
            data: uniqueTitles,
            timestamp: Date.now(),
          };

          localStorage.setItem(
            `topTitlesMovieAndTv`,
            JSON.stringify(cacheData)
          );

          console.log(topTitlesMovieAndTv);
        }
      }
    };
    fetchData();
  }, []);

  const getTopMovieTitlesPageOne = async () => {
    try {
      const response = await fetchTopMoviesPageOne();
      const data = await response.json();
      return data.results.map((movie) => ({ title: movie.title }));
    } catch (error) {
      console.log(error);
    }
  };

  const getTopMovieTitlesPageTwo = async () => {
    try {
      const response = await fetchTopMoviesPageTwo();
      const data = await response.json();
      return data.results.map((movie) => ({ title: movie.title }));
    } catch (error) {
      console.log(error);
    }
  };

  const getTopMovieTitlesPageThree = async () => {
    try {
      const response = await fetchTopMoviesPageThree();
      const data = await response.json();
      return data.results.map((movie) => ({ title: movie.title }));
    } catch (error) {
      console.log(error);
    }
  };

  const getTopMovieTitlesPageFour = async () => {
    try {
      const response = await fetchTopMoviesPageFour();
      const data = await response.json();
      return data.results.map((movie) => ({ title: movie.title }));
    } catch (error) {
      console.log(error);
    }
  };

  const getTopMovieTitlesPageFive = async () => {
    try {
      const response = await fetchTopMoviesPageFive();
      const data = await response.json();
      console.log(data);
      return data.results.map((movie) => ({ title: movie.title }));
    } catch (error) {
      console.log(error);
    }
  };

  const getTopTvTitlesPageOne = async () => {
    try {
      const response = await fetchTopTvPageOne();
      const data = await response.json();
      return data.results.map((tvShow) => ({ title: tvShow.name }));
    } catch (error) {
      console.log(error);
    }
  };

  const getTopTvTitlesPageTwo = async () => {
    try {
      const response = await fetchTopTvPageTwo();
      const data = await response.json();
      return data.results.map((tvShow) => ({ title: tvShow.name }));
    } catch (error) {
      console.log(error);
    }
  };

  const getTopTvTitlesPageThree = async () => {
    try {
      const response = await fetchTopTvPageThree();
      const data = await response.json();
      return data.results.map((tvShow) => ({ title: tvShow.name }));
    } catch (error) {
      console.log(error);
    }
  };

  const getTopTvTitlesPageFour = async () => {
    try {
      const response = await fetchTopTvPageFour();
      const data = await response.json();
      return data.results.map((tvShow) => ({ title: tvShow.name }));
    } catch (error) {
      console.log(error);
    }
  };

  const getTopTvTitlesPageFive = async () => {
    try {
      const response = await fetchTopTvPageFive();
      const data = await response.json();
      console.log(data);
      return data.results.map((tvShow) => ({ title: tvShow.name }));
    } catch (error) {
      console.log(error);
    }
  };

  const getTrendingMoviesPageOne = async () => {
    try {
      const response = await fetchTrendingMoviesPageOne();
      const data = await response.json();
      return data.results.map((movie) => ({ title: movie.title }));
    } catch (error) {
      console.log(error);
    }
  };

  const getTrendingMoviesPageTwo = async () => {
    try {
      const response = await fetchTrendingMoviesPageTwo();
      const data = await response.json();
      return data.results.map((movie) => ({ title: movie.title }));
    } catch (error) {
      console.log(error);
    }
  };

  const getTrendingMoviesPageThree = async () => {
    try {
      const response = await fetchTrendingMoviesPageThree();
      const data = await response.json();
      return data.results.map((movie) => ({ title: movie.title }));
    } catch (error) {
      console.log(error);
    }
  };

  const getTrendingMoviesPageFour = async () => {
    try {
      const response = await fetchTrendingMoviesPageFour();
      const data = await response.json();
      return data.results.map((movie) => ({ title: movie.title }));
    } catch (error) {
      console.log(error);
    }
  };

  const getTrendingMoviesPageFive = async () => {
    try {
      const response = await fetchTrendingMoviesPageFive();
      const data = await response.json();
      console.log(data);
      return data.results.map((movie) => ({ title: movie.title }));
    } catch (error) {
      console.log(error);
    }
  };

  const getTrendingTvPageOne = async () => {
    try {
      const response = await fetchTrendingTvPageOne();
      const data = await response.json();
      return data.results.map((tvShow) => ({ title: tvShow.name }));
    } catch (error) {
      console.log(error);
    }
  };

  const getTrendingTvPageTwo = async () => {
    try {
      const response = await fetchTrendingTvPageTwo();
      const data = await response.json();
      return data.results.map((tvShow) => ({ title: tvShow.name }));
    } catch (error) {
      console.log(error);
    }
  };

  const getTrendingTvPageThree = async () => {
    try {
      const response = await fetchTrendingTvPageThree();
      const data = await response.json();
      return data.results.map((tvShow) => ({ title: tvShow.name }));
    } catch (error) {
      console.log(error);
    }
  };

  const getTrendingTvPageFour = async () => {
    try {
      const response = await fetchTrendingTvPageFour();
      const data = await response.json();
      return data.results.map((tvShow) => ({ title: tvShow.name }));
    } catch (error) {
      console.log(error);
    }
  };

  const getTrendingTvPageFive = async () => {
    try {
      const response = await fetchTrendingTvPageFive();
      const data = await response.json();
      console.log(data);
      return data.results.map((tvShow) => ({ title: tvShow.name }));
    } catch (error) {
      console.log(error);
    }
  };

  const searchByUserInput = async (event) => {
    event.preventDefault();
    console.log(value.title);
    const userInput = value.title;
    setValue(userInput);

    const cachedTitleSearchResults = localStorage.getItem(
      `titleSearchResults_${userInput}`
    );

    if (cachedTitleSearchResults) {
      console.log("found cached title search results");
      const { data, timestamp } = JSON.parse(cachedTitleSearchResults);
      console.log(data);
      const now = Date.now();
      if (now - timestamp < CACHE_DURATION) {
        // setValue(data);
        console.log("Using Cached Data:", data);
        window.location.href =
          "/title_search_results?titles=" +
          encodeURIComponent(JSON.stringify(data));
        return;
      } else {
        localStorage.removeItem(`titleSearchResults_${userInput}`);
        console.log("Cached Data Expired and Removed");
      }
    }

    if (!cachedTitleSearchResults) {
      try {
        const response = await searchByTitle(userInput);
        console.log(response);

        if (!response.ok) {
          throw new Error("something went wrong!");
        }

        const data = await response.json();
        console.log(data);

        const titleSearchResults = data.results.map((titles) => ({
          id: titles.id,
          title: titles.name,
          year: titles.year,
          type: titles.type,
          image_url: titles.image_url,
        }));

        console.log(titleSearchResults);

        const cacheData = {
          data: titleSearchResults,
          timestamp: Date.now(),
        };
        localStorage.setItem(
          `titleSearchResults_${userInput}`,
          JSON.stringify(cacheData)
        );

        window.location.href =
          "/title_search_results?titles=" +
          encodeURIComponent(JSON.stringify(titleSearchResults));
      } catch (err) {
        console.log(err);
      }
    }
  };

  return (
    <div>
      <h3>Title Search</h3>
      <form onSubmit={searchByUserInput}>
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
                  title: `Add "${inputValue}"`,
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
            renderOption={(props, option) => <li {...props}>{option.title}</li>}
            sx={{ width: 300 }}
            freeSolo
            renderInput={(params) => (
              <TextField {...params} label="Enter Title" />
            )}
          />
          <Button type="submit" style={{ width: "60%" }} variant="contained">
            Search By Title
          </Button>
        </FormControl>
      </form>
    </div>
  );
};

export default TitleSearch;
