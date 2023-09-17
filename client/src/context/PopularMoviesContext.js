import { createContext, useState, useEffect } from "react";

import { fetchPopularMoviesPageOne, fetchPopularMoviesPageTwo, fetchPopularMoviesPageThree, fetchPopularMoviesPageFour, fetchPopularMoviesPageFive  } from "../utils/apiCalls";
import { CACHE_DURATION_ONE_WEEK, formatDate } from "../utils/utils";

export const PopularMoviesContext = createContext();

export const PopularMoviesProvider = ({ children }) => {
  const [popularMovies, setPopularMovies] = useState([]);
  
  useEffect(() => {
    const getPopularMovies = async () => {
      const cachedPopularMovies = localStorage.getItem("popularMovies");

      if (cachedPopularMovies) {
        const { data, timestamp } = JSON.parse(cachedPopularMovies);
        // console.log("Cached Data Retrieved: cachedPopularMovies", data);
        const now = Date.now();
        if (now - timestamp < CACHE_DURATION_ONE_WEEK) {
          setPopularMovies(data);
          return;
        } else {
          localStorage.removeItem("popularMovies");
          // console.log("Cached Data Expired and Removed");
        }
      }
      if (!cachedPopularMovies) {
        try {
          const responseOne = await fetchPopularMoviesPageOne();
          const dataOne = await responseOne.json();
          // console.log(dataOne);
          const responseTwo = await fetchPopularMoviesPageTwo();
          const dataTwo = await responseTwo.json();
          // console.log(dataTwo);
          const responseThree = await fetchPopularMoviesPageThree();
          const dataThree = await responseThree.json();
          // console.log(dataThree);
          const responseFour = await fetchPopularMoviesPageFour();
          const dataFour = await responseFour.json();
          // console.log(dataFour);
          const responseFive = await fetchPopularMoviesPageFive();
          const dataFive = await responseFive.json();
          // console.log(dataFive);
          const combinedData = [...dataOne.results, ...dataTwo.results, ...dataThree.results, ...dataFour.results, ...dataFive.results];
          // console.log(combinedData);

          const popMovies = combinedData.map((movie) => ({
            id: movie.id,
            title: movie.title,
            poster_path: movie.poster_path,
            backdrop_path: movie.backdrop_path,
            overview: movie.overview,
            release_date: formatDate(movie.release_date),
            genre: movie.genre_ids,
          }));

          setPopularMovies(popMovies);

          const cacheData = {
            data: popMovies,
            timestamp: Date.now(),
          };
          localStorage.setItem("popularMovies", JSON.stringify(cacheData));
        } catch (error) {
          console.log(error);
        }
      }
    };
    getPopularMovies() 
  }, []);
  
  return (
    <PopularMoviesContext.Provider value={popularMovies}>
      {children}
    </PopularMoviesContext.Provider>
  );
};