import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import GenreSearch from "../../components/GenreSearch";
import TitleSearch from "../../components/TitleSearch";
import ActorSearch from "../../components/ActorSearch";
import SearchByGenreSourceType from "../../components/SearchByGenreSourceType";
import MixedGenreMovieSearch from "../../components/MixedGenreMovieSearch";
import MixedGenreTVSearch from "../../components/MixedGenreTVSearch";
import Heading from "../../components/Heading";
import Auth from "../../utils/auth";
// import styles from './SearchPage.module.css';

const SearchPage = () => {
  const loggedIn = Auth.loggedIn();
  const navigate = useNavigate();

  useEffect(() => {
    if (!loggedIn) {
      navigate("/");
    }
  }, [loggedIn, navigate]);

  return (
    <main>
      <Heading heading='Find Something to Watch !' variant='h2' />
      <GenreSearch />
      <TitleSearch />
      <ActorSearch />
      <MixedGenreMovieSearch />
      <MixedGenreTVSearch />
      <SearchByGenreSourceType />
    </main>
  );
};

export default SearchPage;
