// import from react router
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
// import pages
import HomePage from "./pages/HomePage/HomePage";
import LandingPage from "./pages/LandingPage/LandingPage";
// import Search from "./pages/SearchPage/SearchPage";
import GenreSearchResults from "./pages/GenreSearchResults/GenreSearchResults";
import MixedGenreSearchSearchResults from "./pages/MixedGenreSearchResults/MixedGenreSearchResults";
import TitleSearchResults from "./pages/TitleSearchResults/TitleSearchResults";
import ActorSearchResults from "./pages/ActorSearchResults/ActorSearchResults";
import TitleDetails from "./pages/TitleDetails/TitleDetails";
// import NowTrending from "./pages/NowTrending/NowTrending";
// import AccountSettings from "./pages/AccountSettings";
// import components
import Header from "./components/Header";
import Footer from "./components/Footer";
import GenreSourceTypeResults from "./pages/GenreSourceTypeResults";
import ScrollToTop from "./components/ScrollToTop.js";
import ScrollToTopButton from "./components/ScrollToTopButton";
// import context providers
import { SearchResultsProvider } from "./context/SearchResultsContext";
import { TitleDetailsProvider } from "./context/TitleDetailsContext";
import { TrendingMoviesProvider } from "./context/TrendingMoviesContext";
import { PopularMoviesProvider } from "./context/PopularMoviesContext";
import { TopRatedMoviesProvider } from "./context/TopRatedMoviesContext";
import { TrendingTvProvider } from "./context/TrendingTvContext";
import { PopularTvProvider } from "./context/PopularTvContext";
import { TopRatedTvProvider } from "./context/TopRatedTvContext";
import { ComingSoonProvider } from "./context/ComingSoonContext";
// import from apollo
import {
  ApolloProvider,
  ApolloClient,
  InMemoryCache,
  createHttpLink,
} from "@apollo/client";
import { setContext } from "@apollo/client/link/context";
// import from MUI
import { createTheme, ThemeProvider } from "@mui/material/styles";
import CssBaseline from "@mui/material/CssBaseline";

const httpLink = createHttpLink({
  uri: "/graphql",
});

const authLink = setContext((_, { headers }) => {
  const token = localStorage.getItem("id_token");
  return {
    headers: {
      ...headers,
      authorization: token ? `Bearer ${token}` : "",
    },
  };
});

const client = new ApolloClient({
  link: authLink.concat(httpLink),
  cache: new InMemoryCache(),
});

const theme = createTheme({
  components: {
    MuiPaper: {
      styleOverrides: {
        root: {
          backgroundColor: 'rgba(0, 0, 0, 0.5)', // semi-transparent black
          color: '#fff', // white text for contrast
          padding: '.25rem', // inner spacing
          backdropFilter: 'blur(3px)', // Optional: frosted glass effect
          borderRadius: '.5rem', // rounded corners
          border: '1px solid #333', // thin border
          // optional: animate box growing and shrinking
          // transition: 'all 0.25s ease-in-out',
          // '&:hover': {
          //   transform: 'scale(1.05)',
          // },
        //  set width to follow content inside container but keep container centered
          width: 'fit-content',
          margin: 'auto',
          // set min width to prevent container from shrinking too small
          minWidth: '50%',
          // set max width to prevent container from growing too large
          maxWidth: '80%',
          // set min height to prevent container from shrinking too small
          minHeight: '50%',
          // set max height to prevent container from growing too large
          maxHeight: '80%',
          // center container horizontally and vertically
          justifyContent: 'center',
          alignItems: 'center',
          display: 'flex',
          textAlign: 'center',
        },
      },
    },
    MuiLink: {
    //   styleOverrides: {
    //     root: {
    //       color: 'black', '&:hover': {
    //         transform: 'scale(1.05)',
    //         backgroundImage: 'linear-gradient(315deg, #3bb77a 0%, #144874 75%)',
    //         "-webkit-background-clip": "text",
    //         "background-clip": "text",
    //         color: "transparent",
    //       }
    //     },
    // },
    },
    MuiButton: {
      styleOverrides: {
        root: {
          // backgroundImage: 'linear-gradient(315deg, #43cea2 0%,  #185a9d 75%)',
          // '&:hover': {
          //   backgroundImage: 'linear-gradient(315deg, #185a9d 0%, #43cea2 100%)',
          //   color: 'white'
          // },
          backgroundImage: "linear-gradient(315deg, #185a9d 0%, #43cea2 100%)",
          "&:hover": {
            backgroundImage:
              "linear-gradient(315deg, #43cea2 0%,  #185a9d 75%)",
            color: "white",
          },
          color: "black",
          border: "2px solid black",
        },
      },
    },
  },
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
                          <ComingSoonProvider>
                          <CssBaseline />
                          <Router>
                            <ScrollToTop />
                            <Header />
                            <Routes>
                              <Route path="/" element={<LandingPage />} />
                              <Route path="/home_page" element={<HomePage />} />
                              <Route
                                path="/search_results"
                                element={<GenreSearchResults />}
                              />
                              <Route
                                path="/mixed_genre_search_results"
                                element={<MixedGenreSearchSearchResults />}
                              />
                              <Route
                                path="/genre_source_type_search_results"
                                element={<GenreSourceTypeResults />}
                              />
                              <Route
                                path="/title_search_results"
                                element={<TitleSearchResults />}
                              />
                              <Route
                                path="/actor_search_results"
                                element={<ActorSearchResults />}
                              />
                              <Route
                                path="/title_details"
                                element={<TitleDetails />}
                              />
                              <Route path="*" element={<LandingPage />} />
                            </Routes>
                            <ScrollToTopButton />
                            <Footer />
                          </Router>
                          </ComingSoonProvider>
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
};

export default App;
