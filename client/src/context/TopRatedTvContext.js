import { createContext, useState, useEffect } from "react";

import {
  fetchTopTvPageOne,
  fetchTopTvPageTwo,
  fetchTopTvPageThree,
  fetchTopTvPageFour,
  fetchTopTvPageFive,
  fetchTopTvPageSix,
  fetchTopTvPageSeven,
  fetchTopTvPageEight,
  fetchTopTvPageNine,
  fetchTopTvPageTen,
  fetchTopTvPageEleven,
  fetchTopTvPageTwelve,
  fetchTopTvPageThirteen,
  fetchTopTvPageFourteen,
  fetchTopTvPageFifteen,
} from "../utils/apiCalls";
import { CACHE_DURATION_ONE_DAY, formatDate } from "../utils/utils";

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
        if (now - timestamp < CACHE_DURATION_ONE_DAY) {
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
          const responseTwo = await fetchTopTvPageTwo();
          const dataTwo = await responseTwo.json();;
          const responseThree = await fetchTopTvPageThree();
          const dataThree = await responseThree.json();
          const responseFour = await fetchTopTvPageFour();
          const dataFour = await responseFour.json();
          const responseFive = await fetchTopTvPageFive();
          const dataFive = await responseFive.json();
          const responseSix = await fetchTopTvPageSix();
          const dataSix = await responseSix.json();
          const responseSeven = await fetchTopTvPageSeven();
          const dataSeven = await responseSeven.json();
          const responseEight = await fetchTopTvPageEight();
          const dataEight = await responseEight.json();
          const responseNine = await fetchTopTvPageNine();
          const dataNine = await responseNine.json();
          const responseTen = await fetchTopTvPageTen();
          const dataTen = await responseTen.json();
          const responseEleven = await fetchTopTvPageEleven();
          const dataEleven = await responseEleven.json();
          const responseTwelve = await fetchTopTvPageTwelve();
          const dataTwelve = await responseTwelve.json();
          const responseThirteen = await fetchTopTvPageThirteen();
          const dataThirteen = await responseThirteen.json();
          const responseFourteen = await fetchTopTvPageFourteen();
          const dataFourteen = await responseFourteen.json();
          const responseFifteen = await fetchTopTvPageFifteen();
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

          const topTvShows = combinedData.map((tvShow) => ({
            id: tvShow.id,
            title: tvShow.name,
            poster_path: tvShow.poster_path,
            backdrop_path: tvShow.backdrop_path,
            overview: tvShow.overview,
            release_date: formatDate(tvShow.first_air_date),
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
    getTopRatedTv();
  }, []);

  return (
    <TopRatedTvContext.Provider value={topRatedTv}>
      {children}
    </TopRatedTvContext.Provider>
  );
};
