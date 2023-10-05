import { createContext, useState, useEffect } from "react";

import { fetchMoviesComingSoon, fetchMoviesComingSoonPageTwo, fetchMoviesComingSoonPageThree, fetchMoviesComingSoonPageFour, fetchMoviesComingSoonPageFive  } from "../utils/apiCalls";
import { CACHE_DURATION_ONE_WEEK, formatDate } from "../utils/utils";

export const ComingSoonContext = createContext();

export const ComingSoonProvider = ({ children }) => {
  const [comingSoon, setComingSoon] = useState([]);
  
  useEffect(() => {
    const getMoviesComingSoon = async () => {
      const cachedMoviesComingSoon = localStorage.getItem("comingSoon");

      if (cachedMoviesComingSoon) {
        const { data, timestamp } = JSON.parse(cachedMoviesComingSoon);
        console.log("Cached Data Retrieved: cachedMoviesComingSoon", data);
        const now = Date.now();
        if (now - timestamp < CACHE_DURATION_ONE_WEEK) {
          setComingSoon(data);
          return;
        } else {
          localStorage.removeItem("comingSoon");
          // console.log("Cached Data Expired and Removed");
        }
      }
      if (!cachedMoviesComingSoon) {
        try {
          const responseOne = await fetchMoviesComingSoon();
          const comingSoonDataOne = await responseOne.json();
          console.log(comingSoonDataOne);

          const responseTwo = await fetchMoviesComingSoonPageTwo();
          const comingSoonDataTwo = await responseTwo.json();
          
          const responseThree = await fetchMoviesComingSoonPageThree();
          const comingSoonDataThree = await responseThree.json();
          
          const responseFour = await fetchMoviesComingSoonPageFour();
          const comingSoonDataFour = await responseFour.json();
        
          const responseFive = await fetchMoviesComingSoonPageFive();
          const comingSoonDataFive = await responseFive.json();
          
          const combinedData = [...comingSoonDataOne.results, ...comingSoonDataTwo.results, ...comingSoonDataThree.results, ...comingSoonDataFour.results, ...comingSoonDataFive.results];
          const currentDate = new Date();
          currentDate.setHours(0,0,0,0)
          console.log(currentDate);

          const moviesComingSoon = combinedData
          // .filter(movie => new Date(movie.release_date) > currentDate)
          .filter(movie => {
            const movieReleaseDate = new Date(movie.release_date);
            movieReleaseDate.setHours(0, 0, 0, 0);
            return movieReleaseDate > currentDate;
        })
          .map((movie) => ({
            id: movie.id,
            title: movie.title,
            poster_path: movie.poster_path,
            backdrop_path: movie.backdrop_path,
            overview: movie.overview,
            release_date: formatDate(movie.release_date),
            genre: movie.genre_ids,
          }));

          console.log(moviesComingSoon)

          setComingSoon(moviesComingSoon);

          const cacheData = {
            data: moviesComingSoon,
            timestamp: Date.now(),
          };
          localStorage.setItem("comingSoon", JSON.stringify(cacheData));
        } catch (error) {
          console.log(error);
        }
      }
    };
    getMoviesComingSoon() 
  }, []);
  
  return (
    <ComingSoonContext.Provider value={comingSoon}>
      {children}
    </ComingSoonContext.Provider>
  );
};