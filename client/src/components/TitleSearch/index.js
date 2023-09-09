// import from react
import React, { useState, useEffect, useContext } from "react";
// import from react-router-dom
import { useNavigate } from "react-router-dom";
// import context
import { SearchResultsContext } from "../../context/SearchResultsContext"; // <- import the context
// import from material-ui
import TextField from "@mui/material/TextField";
import FormControl from "@mui/material/FormControl";
import Button from "@mui/material/Button";
// import FormLabel from '@mui/material/FormLabel';
import Autocomplete, { createFilterOptions } from "@mui/material/Autocomplete";
// import from utils
import {
  searchByTitle,
  fetchTopMoviesPageOne,
  fetchTopMoviesPageTwo,
  fetchTopMoviesPageThree,
  fetchTopMoviesPageFour,
  fetchTopMoviesPageFive,
  fetchTrendingMoviesPageOne,
  fetchTrendingMoviesPageTwo,
  fetchTrendingMoviesPageThree,
  fetchTrendingMoviesPageFour,
  fetchTrendingMoviesPageFive,
  fetchPopularMoviesPageOne,
  fetchPopularMoviesPageTwo,
  fetchPopularMoviesPageThree,
  fetchPopularMoviesPageFour,
  fetchPopularMoviesPageFive,
  fetchTopTvPageOne,
  fetchTopTvPageTwo,
  fetchTopTvPageThree,
  fetchTopTvPageFour,
  fetchTopTvPageFive,
  fetchTrendingTvPageOne,
  fetchTrendingTvPageTwo,
  fetchTrendingTvPageThree,
  fetchTrendingTvPageFour,
  fetchTrendingTvPageFive,
  fetchPopularTvPageOne,
  fetchPopularTvPageTwo,
  fetchPopularTvPageThree,
  fetchPopularTvPageFour,
  fetchPopularTvPageFive,
} from "../../utils/apiCalls";

import { CACHE_DURATION, CACHE_DURATION_ONE_DAY } from "../../utils/utils";

const filter = createFilterOptions();

const TitleSearch = () => {
  const navigate = useNavigate();
  const { setTitleSearchResults } = useContext(SearchResultsContext); // <- get the context 
  const [value, setValue] = useState(null);
  const [topTitlesMovieAndTv, setTopTitlesMovieAndTv] = useState([]);

  useEffect(() => {
    const cachedTopTitlesMovieAndTv =
      localStorage.getItem(`topTitlesMovieAndTv`);

    if (cachedTopTitlesMovieAndTv) {
      const { data, timestamp } = JSON.parse(cachedTopTitlesMovieAndTv);
      console.log("Stored data found in cache", data);

      const now = Date.now();
      if (now - timestamp < CACHE_DURATION_ONE_DAY) {
        setTopTitlesMovieAndTv(data);
        console.log("Using data from cache", data);
        return;
      } else {
        localStorage.removeItem(`topTitlesMovieAndTv`);
        console.log("Cached topTitlesMovieAndTv Expired and Removed");
      }
    }

    // do i need an (!cachedTopTitlesMovieAndTv) here?

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
  
    const getPopularMoviesPageOne = async () => {
      try {
        const response = await fetchPopularMoviesPageOne();
        const data = await response.json();
        console.log(data)
        return data.results.map((movie) => ({ title: movie.title }));
      } catch (error) {
        console.log(error);
      }
    };
  
    const getPopularMoviesPageTwo = async () => {
      try {
        const response = await fetchPopularMoviesPageTwo();
        const data = await response.json();
        console.log(data)
        return data.results.map((movie) => ({ title: movie.title }));
      } catch (error) {
        console.log(error);
      }
    };
  
    const getPopularMoviesPageThree = async () => {
      try {
        const response = await fetchPopularMoviesPageThree();
        const data = await response.json();
        console.log(data)
        return data.results.map((movie) => ({ title: movie.title }));
      } catch (error) {
        console.log(error);
      }
    };
  
    const getPopularMoviesPageFour = async () => {
      try {
        const response = await fetchPopularMoviesPageFour();
        const data = await response.json();
        console.log(data)
        return data.results.map((movie) => ({ title: movie.title }));
      } catch (error) {
        console.log(error);
      }
    };
  
    const getPopularMoviesPageFive = async () => {
      try {
        const response = await fetchPopularMoviesPageFive();
        const data = await response.json();
        console.log(data)
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
  
    const getPopularTvPageOne = async () => {
      try {
        const response = await fetchPopularTvPageOne();
        const data = await response.json();
        console.log(data)
        return data.results.map((tvShow) => ({ title: tvShow.name }));
      } catch (error) {
        console.log(error);
      }
    };
  
    const getPopularTvPageTwo = async () => {
      try {
        const response = await fetchPopularTvPageTwo();
        const data = await response.json();
        console.log(data)
        return data.results.map((tvShow) => ({ title: tvShow.name }));
      } catch (error) {
        console.log(error);
      }
    };
  
    const getPopularTvPageThree = async () => {
      try {
        const response = await fetchPopularTvPageThree();
        const data = await response.json();
        console.log(data)
        return data.results.map((tvShow) => ({ title: tvShow.name }));
      } catch (error) {
        console.log(error);
      }
    };
  
    const getPopularTvPageFour = async () => {
      try {
        const response = await fetchPopularTvPageFour();
        const data = await response.json();
        console.log(data)
        return data.results.map((tvShow) => ({ title: tvShow.name }));
      } catch (error) {
        console.log(error);
      }
    };
  
    const getPopularTvPageFive = async () => {
      try {
        const response = await fetchPopularTvPageFive();
        const data = await response.json();
        console.log(data)
        return data.results.map((tvShow) => ({ title: tvShow.name }));
      } catch (error) {
        console.log(error);
      }
    };

    const fetchData = async () => {
      try {
        const fetchFunctions = [
          getTopMovieTitlesPageOne, 
          getTopMovieTitlesPageTwo, 
          getTopMovieTitlesPageThree, 
          getTopMovieTitlesPageFour,
          getTopMovieTitlesPageFive,
          getTopTvTitlesPageOne,
          getTopTvTitlesPageTwo,
          getTopTvTitlesPageThree,
          getTopTvTitlesPageFour,
          getTopTvTitlesPageFive,
          getTrendingMoviesPageOne,
          getTrendingMoviesPageTwo,
          getTrendingMoviesPageThree,
          getTrendingMoviesPageFour,
          getTrendingMoviesPageFive,
          getPopularMoviesPageOne,
          getPopularMoviesPageTwo,
          getPopularMoviesPageThree,
          getPopularMoviesPageFour,
          getPopularMoviesPageFive,
          getTrendingTvPageOne,
          getTrendingTvPageTwo,
          getTrendingTvPageThree,
          getTrendingTvPageFour,
          getTrendingTvPageFive,
          getPopularTvPageOne,
          getPopularTvPageTwo,
          getPopularTvPageThree,
          getPopularTvPageFour,
          getPopularTvPageFive,
        ];
        
        const allFetchedData = await Promise.all(fetchFunctions.map(func => func()));
    
        // Flatten the arrays
        const allTitles = allFetchedData.flat();
    
        if (allTitles.every(title => title)) {
          let uniqueTitles = Array.from(new Set(allTitles.map(title => title.title)))
            .map(title => {
              return allTitles.find(t => t.title === title);
            })
            .filter(title => title && title.title)
            .sort((a, b) => a.title.localeCompare(b.title));
    
          setTopTitlesMovieAndTv(uniqueTitles);
    
          const cacheData = {
            data: uniqueTitles,
            timestamp: Date.now(),
          };
    
          localStorage.setItem(`topTitlesMovieAndTv`, JSON.stringify(cacheData));
          console.log(topTitlesMovieAndTv);
        }
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };
    fetchData();
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const searchByUserInput = async (event) => {
    event.preventDefault();
    console.log(value.title);
    const userInput = value.title;
    setValue(userInput);

    const cachedTitleSearchResults = localStorage.getItem(
      `titleSearchResults_${userInput}`
    );

    if (cachedTitleSearchResults) {
      const { data, timestamp } = JSON.parse(cachedTitleSearchResults);
      console.log(data);
      const now = Date.now();
      if (now - timestamp < CACHE_DURATION) {
        setTitleSearchResults(data);
        console.log("Using Cached Data:", data);
        navigate("/title_search_results", { state: { data },});
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

        navigate("/title_search_results", { state: { data: titleSearchData, searchedTitle: userInput},});
      } catch (err) {
        console.log(err);
      }
    }
  };

  return (
    <div>
      <h4>Search Movies and TV Shows by Title</h4>
      <h5>Don't see your title in the menu? Enter it anyway! If it exists, we'll find it.</h5>
      <form onSubmit={searchByUserInput}
       
      >
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
            renderOption={(props, option) => <li {...props}>{option.title}</li>}
            sx={{ width: 300 }}
            freeSolo
            renderInput={(params) => (
              <TextField {...params} 
                required
                label="Enter Title of Movie or TV Show" />
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
