// import from react router
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
// import pages
import HomePage from "./pages/HomePage/HomePage";
import LandingPage from "./pages/LandingPage/LandingPage";
// import Search from "./pages/SearchPage/SearchPage";
import GenreSearchResults from "./pages/GenreSearchResults/GenreSearchResults";
import MixedGenreSearchSearchResults from "./pages/MixedGenreSearchResults/MixedGenreSearchResults";
import TitleSearchResults from "./pages/TitleSearchResults/TitleSearchResults";
import TitleDetails from "./pages/TitleDetails/TitleDetails";
// import components
import Header from "./components/Header";
import Footer from "./components/Footer";
import GenreSourceTypeResults from "./pages/GenreSourceTypeSearchResults/GenreSourceTypeSearchResults";
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
  typography: {
    fontFamily: [
      // 'Playfair Display',
      // 'Bebas Neue',
      // 'Railway',
      // 'sans-serif',
    ].join(","),
  },
  palette: {
    formOutline: {
      main: "#000000",
    },
    background: {
      // default: '#000000',
    },
    text: {
      // primary: '#ffffff',
    },
  },
  components: {
    MuiButton: {
      styleOverrides: {
        root: {
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
                                <Route
                                  path="/home_page"
                                  element={<HomePage />}
                                />
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
