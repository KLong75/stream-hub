import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

import HomePage from './pages/HomePage';
import LandingPage from './pages/LandingPage';
import Login from './pages/Login';
import Search from './pages/SearchPage';
import GenreSearchResults from './pages/GenreSearchResults';
import MixedGenreSearchSearchResults from './pages/MixedGenreSearchResults';
import TitleSearchResults from './pages/TitleSearchResults';
import ActorSearchResults from './pages/ActorSearchResults';
import SignUp from './pages/SignUp';
import TitleDetails from './pages/TitleDetails';
import NowTrending from './pages/NowTrending';

import Header from './components/Header';
import Footer from './components/Footer';
import GenreSourceTypeResults from './pages/GenreSourceTypeResults';

import { SearchResultsProvider } from './context/SearchResultsContext';
import { TitleDetailsProvider } from './context/TitleDetailsContext';

const App = () => {

  return (
    <>
    <SearchResultsProvider>
      <TitleDetailsProvider>
        <Router>
          <Header/>
          <Routes>
            <Route
              path='/'
              element={<LandingPage />}
            />
            <Route
              path='/signup'
              element={<SignUp />}
            />
            <Route
              path='/login'
              element={<Login />}
            />
            <Route
              path='/home_page'
              element={<HomePage />}
            />
            <Route
              path='/search'
              element={<Search />}
            />
            <Route
              path='/now_trending'
              element={<NowTrending/>}
            />
            <Route
              path='/search_results'
              element={<GenreSearchResults />}
            />
            <Route
              path='/mixed_genre_search_results'
              element={<MixedGenreSearchSearchResults />}
            />
            <Route 
              path='/genre_source_type_search_results'
              element={<GenreSourceTypeResults/>}
            />
            <Route
              path='/title_search_results'
              element={<TitleSearchResults />}
            />
            <Route
              path='/actor_search_results'
              element={<ActorSearchResults />}
            />
            <Route
              path='/title_details'
              element={<TitleDetails />}
            />
          </Routes>
          <Footer/>
        </Router>
      </TitleDetailsProvider>
    </SearchResultsProvider>
    </>
  );
}

export default App;
