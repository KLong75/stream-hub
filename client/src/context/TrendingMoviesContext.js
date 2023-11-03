import { createContext, useState, useEffect } from "react";

import {
  fetchTrendingMoviesPageOne,
  fetchTrendingMoviesPageTwo,
  fetchTrendingMoviesPageThree,
  fetchTrendingMoviesPageFour,
  fetchTrendingMoviesPageFive,
  fetchTrendingMoviesPageSix,
  fetchTrendingMoviesPageSeven,
  fetchTrendingMoviesPageEight,
  fetchTrendingMoviesPageNine,
  fetchTrendingMoviesPageTen,
  fetchTrendingMoviesPageEleven,
  fetchTrendingMoviesPageTwelve,
  fetchTrendingMoviesPageThirteen,
  fetchTrendingMoviesPageFourteen,
  fetchTrendingMoviesPageFifteen,
} from "../utils/apiCalls";
import { CACHE_DURATION_ONE_DAY, formatDate } from "../utils/utils";
import {
  fetchPopularMoviesPageOne,
  fetchPopularMoviesPageTwo,
  fetchPopularMoviesPageThree,
  fetchPopularMoviesPageFour,
  fetchPopularMoviesPageFive,
  fetchPopularMoviesPageSix,
  fetchPopularMoviesPageSeven,
  fetchPopularMoviesPageEight,
  fetchPopularMoviesPageNine,
  fetchPopularMoviesPageTen,
  fetchPopularMoviesPageEleven,
  fetchPopularMoviesPageTwelve,
  fetchPopularMoviesPageThirteen,
  fetchPopularMoviesPageFourteen,
  fetchPopularMoviesPageFifteen,
} from "../utils/apiCalls";

export const TrendingMoviesContext = createContext();

export const TrendingMoviesProvider = ({ children }) => {
  const [trendingMovies, setTrendingMovies] = useState([]);
  const [popularMovies, setPopularMovies] = useState([]);

  useEffect(() => {
    const getTrendingMovies = async () => {
      const cachedTrendingMovies = localStorage.getItem("trendingMovies");

      if (cachedTrendingMovies) {
        const { data, timestamp } = JSON.parse(cachedTrendingMovies);
        // console.log("Cached Data Retrieved: cachedTrendingMovies", data);
        const now = Date.now();
        if (now - timestamp < CACHE_DURATION_ONE_DAY) {
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
          const responseTwo = await fetchTrendingMoviesPageTwo();
          const dataTwo = await responseTwo.json();
          const responseThree = await fetchTrendingMoviesPageThree();
          const dataThree = await responseThree.json();
          const responseFour = await fetchTrendingMoviesPageFour();
          const dataFour = await responseFour.json();
          const responseFive = await fetchTrendingMoviesPageFive();
          const dataFive = await responseFive.json();
          const responseSix = await fetchTrendingMoviesPageSix();
          const dataSix = await responseSix.json();
          const responseSeven = await fetchTrendingMoviesPageSeven();
          const dataSeven = await responseSeven.json();
          const responseEight = await fetchTrendingMoviesPageEight();
          const dataEight = await responseEight.json();
          const responseNine = await fetchTrendingMoviesPageNine();
          const dataNine = await responseNine.json();
          const responseTen = await fetchTrendingMoviesPageTen();
          const dataTen = await responseTen.json();
          const responseEleven = await fetchTrendingMoviesPageEleven();
          const dataEleven = await responseEleven.json();
          const responseTwelve = await fetchTrendingMoviesPageTwelve();
          const dataTwelve = await responseTwelve.json();
          const responseThirteen = await fetchTrendingMoviesPageThirteen();
          const dataThirteen = await responseThirteen.json();
          const responseFourteen = await fetchTrendingMoviesPageFourteen();
          const dataFourteen = await responseFourteen.json();
          const responseFifteen = await fetchTrendingMoviesPageFifteen();
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
    const getPopularMovies = async () => {
      const cachedPopularMovies = localStorage.getItem("popularMovies");

      if (cachedPopularMovies) {
        const { data, timestamp } = JSON.parse(cachedPopularMovies);
        // console.log("Cached Data Retrieved: cachedPopularMovies", data);
        const now = Date.now();
        if (now - timestamp < CACHE_DURATION_ONE_DAY) {
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
          const responseTwo = await fetchPopularMoviesPageTwo();
          const dataTwo = await responseTwo.json();
          const responseThree = await fetchPopularMoviesPageThree();
          const dataThree = await responseThree.json();
          const responseFour = await fetchPopularMoviesPageFour();
          const dataFour = await responseFour.json();
          const responseFive = await fetchPopularMoviesPageFive();
          const dataFive = await responseFive.json();
          const responseSix = await fetchPopularMoviesPageSix();
          const dataSix = await responseSix.json();
          const responseSeven = await fetchPopularMoviesPageSeven();
          const dataSeven = await responseSeven.json();
          const responseEight = await fetchPopularMoviesPageEight();
          const dataEight = await responseEight.json();
          const responseNine = await fetchPopularMoviesPageNine();
          const dataNine = await responseNine.json();
          const responseTen = await fetchPopularMoviesPageTen();
          const dataTen = await responseTen.json();
          const responseEleven = await fetchPopularMoviesPageEleven();
          const dataEleven = await responseEleven.json();
          const responseTwelve = await fetchPopularMoviesPageTwelve();
          const dataTwelve = await responseTwelve.json();
          const responseThirteen = await fetchPopularMoviesPageThirteen();
          const dataThirteen = await responseThirteen.json();
          const responseFourteen = await fetchPopularMoviesPageFourteen();
          const dataFourteen = await responseFourteen.json();
          const responseFifteen = await fetchPopularMoviesPageFifteen();
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
    getTrendingMovies();
    getPopularMovies();
  }, []);

  const uniqueMovieIds = new Set(
    [...popularMovies, ...trendingMovies].map((movie) => movie.id)
  );
  const popularTrendingCombined = [...popularMovies, ...trendingMovies].filter(
    (movie) => {
      if (uniqueMovieIds.has(movie.id)) {
        uniqueMovieIds.delete(movie.id);
        return true;
      }
      return false; 
    }
  );
  // console.log(popularTrendingCombined);

  return (
    <TrendingMoviesContext.Provider value={popularTrendingCombined}>
      {children}
    </TrendingMoviesContext.Provider>
  );
};
