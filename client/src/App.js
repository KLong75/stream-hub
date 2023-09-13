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
import AccountSettings from './pages/AccountSettings';

import Header from './components/Header';
import Footer from './components/Footer';
import GenreSourceTypeResults from './pages/GenreSourceTypeResults';
import ScrollToTop from './components/ScrollToTop.js';

import { SearchResultsProvider } from './context/SearchResultsContext';
import { TitleDetailsProvider } from './context/TitleDetailsContext';

import { ApolloProvider, ApolloClient, InMemoryCache, createHttpLink } from '@apollo/client';
import { setContext } from '@apollo/client/link/context';

// import from MUI
import { createTheme, ThemeProvider } from '@mui/material/styles';
import CssBaseline from '@mui/material/CssBaseline';

const httpLink = createHttpLink({
  uri: '/graphql',
});

const authLink = setContext((_, { headers }) => {
  const token = localStorage.getItem('id_token');
  return {
    headers: {
      ...headers,
      authorization: token ? `Bearer ${token}` : '',
    },
  };
});

const client = new ApolloClient({
  link: authLink.concat(httpLink),
  cache: new InMemoryCache(),
});

const theme = createTheme({
  components: {
    MuiButton: {
      styleOverrides: {
        
        root: {
          backgroundImage: 'linear-gradient(315deg, #43cea2 0%,  #185a9d 75%)',
          '&:hover': {
            backgroundImage: 'linear-gradient(315deg, #185a9d 0%, #43cea2 100%)',
            color: 'black'
          }
        }
      }
    }
  }
});




const App = () => {

  return (
    <>
    <ThemeProvider theme={theme}>
    <ApolloProvider client={client}>
    <SearchResultsProvider>
      <TitleDetailsProvider>
        <CssBaseline />
        <Router>
          <ScrollToTop/>
          <Header/>
          <main className='app-main'>
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
            <Route
              path='/account_settings'
              element={<AccountSettings />}
            />
          </Routes>
          </main>
          <Footer />
        </Router>
      </TitleDetailsProvider>
    </SearchResultsProvider>
    </ApolloProvider>
    </ThemeProvider>
    </>
  );
}

export default App;
