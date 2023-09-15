import { createContext, useState, useEffect } from "react";

import { fetchPopularTvPageOne, fetchPopularTvPageTwo, fetchPopularTvPageThree, fetchPopularTvPageFour, fetchPopularTvPageFive  } from "../utils/apiCalls";
import { CACHE_DURATION_ONE_WEEK, formatDate } from "../utils/utils";

export const PopularTvContext = createContext();

export const PopularTvProvider = ({ children }) => {
  const [popularTv, setPopularTv] = useState([]);
  
  useEffect(() => {
    const getPopularTv = async () => {
      const cachedPopularTv = localStorage.getItem("popularTv");

      if (cachedPopularTv) {
        const { data, timestamp } = JSON.parse(cachedPopularTv);
        console.log("Cached Data Retrieved: cachedPopularTv", data);
        const now = Date.now();
        if (now - timestamp < CACHE_DURATION_ONE_WEEK) {
          setPopularTv(data);
          return;
        } else {
          localStorage.removeItem("popularTv");
          console.log("Cached Data Expired and Removed");
        }
      }
      if (!cachedPopularTv) {
        try {
          const responseOne = await fetchPopularTvPageOne();
          const dataOne = await responseOne.json();
          console.log(dataOne);
          const responseTwo = await fetchPopularTvPageTwo();
          const dataTwo = await responseTwo.json();
          console.log(dataTwo);
          const responseThree = await fetchPopularTvPageThree();
          const dataThree = await responseThree.json();
          console.log(dataThree);
          const responseFour = await fetchPopularTvPageFour();
          const dataFour = await responseFour.json();
          console.log(dataFour);
          const responseFive = await fetchPopularTvPageFive();
          const dataFive = await responseFive.json();
          console.log(dataFive);
          const combinedData = [...dataOne.results, ...dataTwo.results, ...dataThree.results, ...dataFour.results, ...dataFive.results];
          console.log(combinedData);

          const popularTvShows = combinedData.map((tvShow) => ({
            id: tvShow.id,
            title: tvShow.name,
            poster_path: tvShow.poster_path,
            backdrop_path: tvShow.backdrop_path,
            overview: tvShow.overview,
            first_air_date: formatDate(tvShow.first_air_date),
            genre: tvShow.genre_ids,
          }));

          setPopularTv(popularTvShows);

          const cacheData = {
            data: popularTvShows,
            timestamp: Date.now(),
          };
          localStorage.setItem("popularTv", JSON.stringify(cacheData));
        } catch (error) {
          console.log(error);
        }
      }
    };
    getPopularTv() 
  }, []);
  
  return (
    <PopularTvContext.Provider value={popularTv}>
      {children}
    </PopularTvContext.Provider>
  );
};