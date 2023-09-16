// import from react router
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
// import pages
import HomePage from './pages/HomePage';
import LandingPage from './pages/LandingPage/LandingPage';
import Login from './pages/Login';
import Search from './pages/SearchPage/SearchPage';
import GenreSearchResults from './pages/GenreSearchResults';
import MixedGenreSearchSearchResults from './pages/MixedGenreSearchResults';
import TitleSearchResults from './pages/TitleSearchResults';
import ActorSearchResults from './pages/ActorSearchResults';
import SignUp from './pages/SignUp';
import TitleDetails from './pages/TitleDetails';
import NowTrending from './pages/NowTrending/NowTrending';
import AccountSettings from './pages/AccountSettings';
// import components
import Header from './components/Header';
import Footer from './components/Footer';
import GenreSourceTypeResults from './pages/GenreSourceTypeResults';
import ScrollToTop from './components/ScrollToTop.js';
// import context providers
import { SearchResultsProvider } from './context/SearchResultsContext';
import { TitleDetailsProvider } from './context/TitleDetailsContext';
import { TrendingMoviesProvider } from './context/TrendingMoviesContext';
import { PopularMoviesProvider } from './context/PopularMoviesContext';
import { TopRatedMoviesProvider } from './context/TopRatedMoviesContext';
import { TrendingTvProvider } from './context/TrendingTvContext';
import { PopularTvProvider } from './context/PopularTvContext';
import { TopRatedTvProvider } from './context/TopRatedTvContext';
// import from apollo
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
          // backgroundImage: 'linear-gradient(315deg, #43cea2 0%,  #185a9d 75%)',
          // '&:hover': {
          //   backgroundImage: 'linear-gradient(315deg, #185a9d 0%, #43cea2 100%)',
          //   color: 'white'
          // },
          backgroundImage: 'linear-gradient(315deg, #185a9d 0%, #43cea2 100%)',
          '&:hover': {
            backgroundImage: 'linear-gradient(315deg, #43cea2 0%,  #185a9d 75%)',
            color: 'white'
          },
          color: 'black',
          border: '1px solid black',
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
    <TrendingMoviesProvider>
    <PopularMoviesProvider>
    <TopRatedMoviesProvider>
    <TrendingTvProvider>
    <PopularTvProvider>
    <TopRatedTvProvider>
      <CssBaseline />
        <Router>
          <ScrollToTop/>
          <Header/>
          {/* <main className='app-main'> */}
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
          {/* </main> */}
          <Footer />
        </Router>
    </TopRatedTvProvider>
    </PopularTvProvider>
    </TrendingTvProvider>
    </TopRatedMoviesProvider>
    </PopularMoviesProvider>
    </TrendingMoviesProvider>
    </TitleDetailsProvider>
    </SearchResultsProvider>
    </ApolloProvider>
    </ThemeProvider>
    </>
  );
}

export default App;
