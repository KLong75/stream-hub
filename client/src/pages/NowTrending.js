import React from 'react';



import TrendingMovies from '../components/TrendingMovies';
import PopularMovies from '../components/PopularMovies';
import TopRatedMovies from '../components/TopRatedMovies';
import PopularTV from '../components/PopularTV';
import TrendingTV from '../components/TrendingTV';
import TopRatedTV from '../components/TopRatedTV';



const NowTrending = () => {

  return (
    <>
    <h2>Currently Trending</h2>
      <TrendingMovies/> 
      <PopularMovies/>
      <TopRatedMovies/>
      <TrendingTV/>
      <PopularTV/>
      <TopRatedTV />
    </>
  );
};

export default NowTrending;