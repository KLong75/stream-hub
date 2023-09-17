import { createContext, useState, useEffect } from "react";

import { fetchTopTvPageOne, fetchTopTvPageTwo, fetchTopTvPageThree, fetchTopTvPageFour, fetchTopTvPageFive  } from "../utils/apiCalls";
import { CACHE_DURATION_ONE_WEEK, formatDate } from "../utils/utils";

export const TopRatedTvContext = createContext();

export const TopRatedTvProvider = ({ children }) => {
  const [topRatedTv, setTopRatedTv] = useState([]);
  
  useEffect(() => {
    const getTopRatedTv = async () => {
      const cachedTopRatedTv = localStorage.getItem("topRatedTv");

      if (cachedTopRatedTv) {
        const { data, timestamp } = JSON.parse(cachedTopRatedTv);
        // console.log("Cached Data Retrieved: cachedTopRAtedTv", data);
        const now = Date.now();
        if (now - timestamp < CACHE_DURATION_ONE_WEEK) {
          setTopRatedTv(data);
          return;
        } else {
          localStorage.removeItem("topRatedTv");
          // console.log("Cached Data Expired and Removed");
        }
      }
      if (!cachedTopRatedTv) {
        try {
          const responseOne = await fetchTopTvPageOne();
          const dataOne = await responseOne.json();
          // console.log(dataOne);
          const responseTwo = await fetchTopTvPageTwo();
          const dataTwo = await responseTwo.json();
          // console.log(dataTwo);
          const responseThree = await fetchTopTvPageThree();
          const dataThree = await responseThree.json();
          console.log(dataThree);
          const responseFour = await fetchTopTvPageFour();
          const dataFour = await responseFour.json();
          // console.log(dataFour);
          const responseFive = await fetchTopTvPageFive();
          const dataFive = await responseFive.json();
          // console.log(dataFive);
          const combinedData = [...dataOne.results, ...dataTwo.results, ...dataThree.results, ...dataFour.results, ...dataFive.results];
          // console.log(combinedData);

          const topTvShows = combinedData.map((tvShow) => ({
            id: tvShow.id,
            title: tvShow.name,
            poster_path: tvShow.poster_path,
            backdrop_path: tvShow.backdrop_path,
            overview: tvShow.overview,
            first_air_date: formatDate(tvShow.first_air_date),
            genre: tvShow.genre_ids,
          }));

          setTopRatedTv(topTvShows);

          const cacheData = {
            data: topTvShows,
            timestamp: Date.now(),
          };
          localStorage.setItem("topRatedTv", JSON.stringify(cacheData));
        } catch (error) {
          console.log(error);
        }
      }
    };
    getTopRatedTv() 
  }, []);
  
  return (
    <TopRatedTvContext.Provider value={topRatedTv}>
      {children}
    </TopRatedTvContext.Provider>
  );
};