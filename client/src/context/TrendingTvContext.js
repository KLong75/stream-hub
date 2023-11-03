import { createContext, useState, useEffect } from "react";

import {
  fetchTrendingTvPageOne,
  fetchTrendingTvPageTwo,
  fetchTrendingTvPageThree,
  fetchTrendingTvPageFour,
  fetchTrendingTvPageFive,
  fetchTrendingTvPageSix,
  fetchTrendingTvPageSeven,
  fetchTrendingTvPageEight,
  fetchTrendingTvPageNine,
  fetchTrendingTvPageTen,
  fetchTrendingTvPageEleven,
  fetchTrendingTvPageTwelve,
  fetchTrendingTvPageThirteen,
  fetchTrendingTvPageFourteen,
  fetchTrendingTvPageFifteen,
} from "../utils/apiCalls";
import {
  fetchPopularTvPageOne,
  fetchPopularTvPageTwo,
  fetchPopularTvPageThree,
  fetchPopularTvPageFour,
  fetchPopularTvPageFive,
  fetchPopularTvPageSix,
  fetchPopularTvPageSeven,
  fetchPopularTvPageEight,
  fetchPopularTvPageNine,
  fetchPopularTvPageTen,
  fetchPopularTvPageEleven,
  fetchPopularTvPageTwelve,
  fetchPopularTvPageThirteen,
  fetchPopularTvPageFourteen,
  fetchPopularTvPageFifteen,
} from "../utils/apiCalls";
import { CACHE_DURATION_ONE_DAY, formatDate } from "../utils/utils";

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
        if (now - timestamp < CACHE_DURATION_ONE_DAY) {
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
          const responseTwo = await fetchTrendingTvPageTwo();
          const dataTwo = await responseTwo.json();
          const responseThree = await fetchTrendingTvPageThree();
          const dataThree = await responseThree.json();
          const responseFour = await fetchTrendingTvPageFour();
          const dataFour = await responseFour.json();
          const responseFive = await fetchTrendingTvPageFive();
          const dataFive = await responseFive.json();
          const responseSix = await fetchTrendingTvPageSix();
          const dataSix = await responseSix.json();
          const responseSeven = await fetchTrendingTvPageSeven();
          const dataSeven = await responseSeven.json();
          const responseEight = await fetchTrendingTvPageEight();
          const dataEight = await responseEight.json();
          const responseNine = await fetchTrendingTvPageNine();
          const dataNine = await responseNine.json();
          const responseTen = await fetchTrendingTvPageTen();
          const dataTen = await responseTen.json();
          const responseEleven = await fetchTrendingTvPageEleven();
          const dataEleven = await responseEleven.json();
          const responseTwelve = await fetchTrendingTvPageTwelve();
          const dataTwelve = await responseTwelve.json();
          const responseThirteen = await fetchTrendingTvPageThirteen();
          const dataThirteen = await responseThirteen.json();
          const responseFourteen = await fetchTrendingTvPageFourteen();
          const dataFourteen = await responseFourteen.json();
          const responseFifteen = await fetchTrendingTvPageFifteen();
          const dataFifteen = await responseFifteen.json();

          const combinedData = [
            ...dataOne.results,
            ...dataTwo.results,
            ...dataThree.results,
            ...dataFour.results,
            ...dataFive.results,
            ...dataSix.results,
            ...dataSeven.results,
            ...dataEight.results,
            ...dataNine.results,
            ...dataTen.results,
            ...dataEleven.results,
            ...dataTwelve.results,
            ...dataThirteen.results,
            ...dataFourteen.results,
            ...dataFifteen.results,
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
        if (now - timestamp < CACHE_DURATION_ONE_DAY) {
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
          const responseTwo = await fetchPopularTvPageTwo();
          const dataTwo = await responseTwo.json();
          const responseThree = await fetchPopularTvPageThree();
          const dataThree = await responseThree.json();
          const responseFour = await fetchPopularTvPageFour();
          const dataFour = await responseFour.json();
          const responseFive = await fetchPopularTvPageFive();
          const dataFive = await responseFive.json();
          const responseSix = await fetchPopularTvPageSix();
          const dataSix = await responseSix.json();
          const responseSeven = await fetchPopularTvPageSeven();
          const dataSeven = await responseSeven.json();
          const responseEight = await fetchPopularTvPageEight();
          const dataEight = await responseEight.json();
          const responseNine = await fetchPopularTvPageNine();
          const dataNine = await responseNine.json();
          const responseTen = await fetchPopularTvPageTen();
          const dataTen = await responseTen.json();
          const responseEleven = await fetchPopularTvPageEleven();
          const dataEleven = await responseEleven.json();
          const responseTwelve = await fetchPopularTvPageTwelve();
          const dataTwelve = await responseTwelve.json();
          const responseThirteen = await fetchPopularTvPageThirteen();
          const dataThirteen = await responseThirteen.json();
          const responseFourteen = await fetchPopularTvPageFourteen();
          const dataFourteen = await responseFourteen.json();
          const responseFifteen = await fetchPopularTvPageFifteen();
          const dataFifteen = await responseFifteen.json();

          const combinedData = [
            ...dataOne.results,
            ...dataTwo.results,
            ...dataThree.results,
            ...dataFour.results,
            ...dataFive.results,
            ...dataSix.results,
            ...dataSeven.results,
            ...dataEight.results,
            ...dataNine.results,
            ...dataTen.results,
            ...dataEleven.results,
            ...dataTwelve.results,
            ...dataThirteen.results,
            ...dataFourteen.results,
            ...dataFifteen.results,
          ];

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
  // console.log(popularTrendingTvCombined)

  return (
    <TrendingTvContext.Provider value={popularTrendingTvCombined}>
      {children}
    </TrendingTvContext.Provider>
  );
};
