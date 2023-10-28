import { createContext, useState, useEffect } from "react";

import {
  fetchTrendingTvPageOne,
  fetchTrendingTvPageTwo,
  fetchTrendingTvPageThree,
  fetchTrendingTvPageFour,
  fetchTrendingTvPageFive,
} from "../utils/apiCalls";
import {
  fetchPopularTvPageOne,
  fetchPopularTvPageTwo,
  fetchPopularTvPageThree,
  fetchPopularTvPageFour,
  fetchPopularTvPageFive,
} from "../utils/apiCalls";
import { CACHE_DURATION_ONE_WEEK, formatDate } from "../utils/utils";

export const TrendingTvContext = createContext();

export const TrendingTvProvider = ({ children }) => {
  const [trendingTv, setTrendingTv] = useState([]);
  const [popularTv, setPopularTv] = useState([]);

  useEffect(() => {
    const getTrendingTv = async () => {
      const cachedTrendingTv = localStorage.getItem("trendingTv");

      if (cachedTrendingTv) {
        const { data, timestamp } = JSON.parse(cachedTrendingTv);
        // console.log("Cached Data Retrieved: cachedTrendingTv", data);
        const now = Date.now();
        if (now - timestamp < CACHE_DURATION_ONE_WEEK) {
          setTrendingTv(data);
          return;
        } else {
          localStorage.removeItem("trendingTv");
          // console.log("Cached Data Expired and Removed");
        }
      }
      if (!cachedTrendingTv) {
        try {
          const responseOne = await fetchTrendingTvPageOne();
          const dataOne = await responseOne.json();
          // console.log(dataOne);
          const responseTwo = await fetchTrendingTvPageTwo();
          const dataTwo = await responseTwo.json();
          // console.log(dataTwo);
          const responseThree = await fetchTrendingTvPageThree();
          const dataThree = await responseThree.json();
          // console.log(dataThree);
          const responseFour = await fetchTrendingTvPageFour();
          const dataFour = await responseFour.json();
          // console.log(dataFour);
          const responseFive = await fetchTrendingTvPageFive();
          const dataFive = await responseFive.json();
          // console.log(dataFive);
          const combinedData = [
            ...dataOne.results,
            ...dataTwo.results,
            ...dataThree.results,
            ...dataFour.results,
            ...dataFive.results,
          ];
          // console.log(combinedData);

          const trendingTvShows = combinedData.map((tvShow) => ({
            id: tvShow.id,
            title: tvShow.name,
            poster_path: tvShow.poster_path,
            backdrop_path: tvShow.backdrop_path,
            overview: tvShow.overview,
            release_date: formatDate(tvShow.first_air_date),
            genre: tvShow.genre_ids,
          }));

          setTrendingTv(trendingTvShows);

          const cacheData = {
            data: trendingTvShows,
            timestamp: Date.now(),
          };
          localStorage.setItem("trendingTv", JSON.stringify(cacheData));
        } catch (error) {
          console.log(error);
        }
      }
    };
    const getPopularTv = async () => {
      const cachedPopularTv = localStorage.getItem("popularTv");

      if (cachedPopularTv) {
        const { data, timestamp } = JSON.parse(cachedPopularTv);
        // console.log("Cached Data Retrieved: cachedPopularTv", data);
        const now = Date.now();
        if (now - timestamp < CACHE_DURATION_ONE_WEEK) {
          setPopularTv(data);
          return;
        } else {
          localStorage.removeItem("popularTv");
          // console.log("Cached Data Expired and Removed");
        }
      }
      if (!cachedPopularTv) {
        try {
          const responseOne = await fetchPopularTvPageOne();
          const dataOne = await responseOne.json();
          // console.log(dataOne);
          const responseTwo = await fetchPopularTvPageTwo();
          const dataTwo = await responseTwo.json();
          // console.log(dataTwo);
          const responseThree = await fetchPopularTvPageThree();
          const dataThree = await responseThree.json();
          // console.log(dataThree);
          const responseFour = await fetchPopularTvPageFour();
          const dataFour = await responseFour.json();
          // console.log(dataFour);
          const responseFive = await fetchPopularTvPageFive();
          const dataFive = await responseFive.json();
          // console.log(dataFive);
          const combinedData = [
            ...dataOne.results,
            ...dataTwo.results,
            ...dataThree.results,
            ...dataFour.results,
            ...dataFive.results,
          ];
          // console.log(combinedData);

          const popularTvShows = combinedData.map((tvShow) => ({
            id: tvShow.id,
            title: tvShow.name,
            poster_path: tvShow.poster_path,
            backdrop_path: tvShow.backdrop_path,
            overview: tvShow.overview,
            release_date: formatDate(tvShow.first_air_date),
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
    getTrendingTv();
    getPopularTv();
  }, []);

  const uniqueTvIds = new Set(
    [...popularTv, ...trendingTv].map((tvShow) => tvShow.id)
  );
  const popularTrendingTvCombined = [...popularTv, ...trendingTv].filter(
    (tvShow) => {
      if (uniqueTvIds.has(tvShow.id)) {
        uniqueTvIds.delete(tvShow.id);
        return true;
      }
      return false;
    }
  );

  return (
    <TrendingTvContext.Provider value={popularTrendingTvCombined}>
      {children}
    </TrendingTvContext.Provider>
  );
};
