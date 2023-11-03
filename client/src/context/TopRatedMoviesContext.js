import { createContext, useState, useEffect } from "react";

import {
  fetchTopMoviesPageOne,
  fetchTopMoviesPageTwo,
  fetchTopMoviesPageThree,
  fetchTopMoviesPageFour,
  fetchTopMoviesPageFive,
  fetchTopMoviesPageSix,
  fetchTopMoviesPageSeven,
  fetchTopMoviesPageEight,
  fetchTopMoviesPageNine,
  fetchTopMoviesPageTen,
  fetchTopMoviesPageEleven,
  fetchTopMoviesPageTwelve,
  fetchTopMoviesPageThirteen,
  fetchTopMoviesPageFourteen,
  fetchTopMoviesPageFifteen,
} from "../utils/apiCalls";
import { CACHE_DURATION_ONE_DAY, formatDate } from "../utils/utils";

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
        if (now - timestamp < CACHE_DURATION_ONE_DAY) {
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
          const responseTwo = await fetchTopMoviesPageTwo();
          const dataTwo = await responseTwo.json();
          const responseThree = await fetchTopMoviesPageThree();
          const dataThree = await responseThree.json();
          const responseFour = await fetchTopMoviesPageFour();
          const dataFour = await responseFour.json();
          const responseFive = await fetchTopMoviesPageFive();
          const dataFive = await responseFive.json();
          const responseSix = await fetchTopMoviesPageSix();
          const dataSix = await responseSix.json();
          const responseSeven = await fetchTopMoviesPageSeven();
          const dataSeven = await responseSeven.json();
          const responseEight = await fetchTopMoviesPageEight();
          const dataEight = await responseEight.json();
          const responseNine = await fetchTopMoviesPageNine();
          const dataNine = await responseNine.json();
          const responseTen = await fetchTopMoviesPageTen();
          const dataTen = await responseTen.json();
          const responseEleven = await fetchTopMoviesPageEleven();
          const dataEleven = await responseEleven.json();
          const responseTwelve = await fetchTopMoviesPageTwelve();
          const dataTwelve = await responseTwelve.json();
          const responseThirteen = await fetchTopMoviesPageThirteen();
          const dataThirteen = await responseThirteen.json();
          const responseFourteen = await fetchTopMoviesPageFourteen();
          const dataFourteen = await responseFourteen.json();
          const responseFifteen = await fetchTopMoviesPageFifteen();
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
          console.log(combinedData);

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
    getTopRatedMovies();
  }, []);

  return (
    <TopRatedMoviesContext.Provider value={topRatedMovies}>
      {children}
    </TopRatedMoviesContext.Provider>
  );
};
