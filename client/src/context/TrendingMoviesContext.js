import { createContext, useState, useEffect } from "react";

import { fetchTrendingMoviesPageOne, fetchTrendingMoviesPageTwo, fetchTrendingMoviesPageThree, fetchTrendingMoviesPageFour, fetchTrendingMoviesPageFive  } from "../utils/apiCalls";
import { CACHE_DURATION_ONE_WEEK, formatDate } from "../utils/utils";

export const TrendingMoviesContext = createContext();

export const TrendingMoviesProvider = ({ children }) => {
  const [trendingMovies, setTrendingMovies] = useState([]);
  
  useEffect(() => {
    const getTrendingMovies = async () => {
      const cachedTrendingMovies = localStorage.getItem("trendingMovies");

      if (cachedTrendingMovies) {
        const { data, timestamp } = JSON.parse(cachedTrendingMovies);
        // console.log("Cached Data Retrieved: cachedTrendingMovies", data);
        const now = Date.now();
        if (now - timestamp < CACHE_DURATION_ONE_WEEK) {
          setTrendingMovies(data);
          return;
        } else {
          localStorage.removeItem("trendingMovies");
          // console.log("Cached Data Expired and Removed");
        }
      }
      if (!cachedTrendingMovies) {
        try {
          const responseOne = await fetchTrendingMoviesPageOne();
          const dataOne = await responseOne.json();
          // console.log(dataOne);
          const responseTwo = await fetchTrendingMoviesPageTwo();
          const dataTwo = await responseTwo.json();
          // console.log(dataTwo);
          const responseThree = await fetchTrendingMoviesPageThree();
          const dataThree = await responseThree.json();
          // console.log(dataThree);
          const responseFour = await fetchTrendingMoviesPageFour();
          const dataFour = await responseFour.json();
          // console.log(dataFour);
          const responseFive = await fetchTrendingMoviesPageFive();
          const dataFive = await responseFive.json();
          // console.log(dataFive);
          const combinedData = [...dataOne.results, ...dataTwo.results, ...dataThree.results, ...dataFour.results, ...dataFive.results];
          // console.log(combinedData);

          const topMovies = combinedData.map((movie) => ({
            id: movie.id,
            title: movie.title,
            poster_path: movie.poster_path,
            backdrop_path: movie.backdrop_path,
            overview: movie.overview,
            release_date: formatDate(movie.release_date),
            genre: movie.genre_ids,
          }));

          setTrendingMovies(topMovies);

          const cacheData = {
            data: topMovies,
            timestamp: Date.now(),
          };
          localStorage.setItem("trendingMovies", JSON.stringify(cacheData));
        } catch (error) {
          console.log(error);
        }
      }


    };
    getTrendingMovies() 
  }, []);
  
  return (
    <TrendingMoviesContext.Provider value={trendingMovies}>
      {children}
    </TrendingMoviesContext.Provider>
  );
};

