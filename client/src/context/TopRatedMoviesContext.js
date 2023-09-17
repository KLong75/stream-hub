import { createContext, useState, useEffect } from "react";

import { fetchTopMoviesPageOne, fetchTopMoviesPageTwo, fetchTopMoviesPageThree, fetchTopMoviesPageFour, fetchTopMoviesPageFive  } from "../utils/apiCalls";
import { CACHE_DURATION_ONE_WEEK, formatDate } from "../utils/utils";

export const TopRatedMoviesContext = createContext();

export const TopRatedMoviesProvider = ({ children }) => {
  const [topRatedMovies, setTopRatedMovies] = useState([]);
  
  useEffect(() => {
    const getTopRatedMovies = async () => {
      const cachedTopRatedMovies = localStorage.getItem("topRatedMovies");

      if (cachedTopRatedMovies) {
        const { data, timestamp } = JSON.parse(cachedTopRatedMovies);
        // console.log("Cached Data Retrieved: cachedTopRatedMovies", data);
        const now = Date.now();
        if (now - timestamp < CACHE_DURATION_ONE_WEEK) {
          setTopRatedMovies(data);
          return;
        } else {
          localStorage.removeItem("topRatedMovies");
          // console.log("Cached Data Expired and Removed");
        }
      }
      if (!cachedTopRatedMovies) {
        try {
          const responseOne = await fetchTopMoviesPageOne();
          const dataOne = await responseOne.json();
          // console.log(dataOne);
          const responseTwo = await fetchTopMoviesPageTwo();
          const dataTwo = await responseTwo.json();
          // console.log(dataTwo);
          const responseThree = await fetchTopMoviesPageThree();
          const dataThree = await responseThree.json();
          // console.log(dataThree);
          const responseFour = await fetchTopMoviesPageFour();
          const dataFour = await responseFour.json();
          // console.log(dataFour);
          const responseFive = await fetchTopMoviesPageFive();
          const dataFive = await responseFive.json();
          // console.log(dataFive);
          const combinedData = [...dataOne.results, ...dataTwo.results, ...dataThree.results, ...dataFour.results, ...dataFive.results];
          // console.log(combinedData);

          const topRatedMovies = combinedData.map((movie) => ({
            id: movie.id,
            title: movie.title,
            poster_path: movie.poster_path,
            backdrop_path: movie.backdrop_path,
            overview: movie.overview,
            release_date: formatDate(movie.release_date),
            genre: movie.genre_ids,
          }));

          setTopRatedMovies(topRatedMovies);

          const cacheData = {
            data: topRatedMovies,
            timestamp: Date.now(),
          };
          localStorage.setItem("topRatedMovies", JSON.stringify(cacheData));
        } catch (error) {
          console.log(error);
        }
      }


    };
    getTopRatedMovies() 
  }, []);
  
  return (
    <TopRatedMoviesContext.Provider value={topRatedMovies}>
      {children}
    </TopRatedMoviesContext.Provider>
  );
};