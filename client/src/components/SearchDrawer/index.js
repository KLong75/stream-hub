import { useState, useEffect } from "react";

import { useNavigate } from "react-router-dom";

import Box from "@mui/material/Box";
import Drawer from "@mui/material/Drawer";
import List from "@mui/material/List";
import Divider from "@mui/material/Divider";
import ListItem from "@mui/material/ListItem";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";
import SearchIcon from "@mui/icons-material/Search";
// import from utils
import Auth from "../../utils/auth";
// import components
import GenreSearch from "../../components/GenreSearch";
import TitleSearch from "../../components/TitleSearch";
import ActorSearch from "../../components/ActorSearch";
import SearchByGenreSourceType from "../../components/SearchByGenreSourceType";
import MixedGenreMovieSearch from "../../components/MixedGenreMovieSearch";
import MixedGenreTVSearch from "../../components/MixedGenreTVSearch";
import Heading from "../../components/Heading";

const SearchDrawer = ({ isOpen, onClose }) => {
  const loggedIn = Auth.loggedIn();
  const navigate = useNavigate();

  useEffect(() => {
    if (!loggedIn) {
      navigate("/");
    }
  }, [loggedIn, navigate]);

  const [isAuthenticated, setIsAuthenticated] = useState(Auth.loggedIn());

  const [showRedirectMessage, setShowRedirectMessage] = useState(false);

  useEffect(() => {
    if (!isAuthenticated) {
      setShowRedirectMessage(true);
      setTimeout(() => {
        navigate("/");
      }, 3000);
    }
  }, [navigate, isAuthenticated]);

  useEffect(() => {
    setIsAuthenticated(Auth.loggedIn());
  }, []);

  const [modalType, setModalType] = useState("");

  if (showRedirectMessage) {
    return <div>Please login or signup</div>;
  }

  return (
    <Drawer anchor="top" open={isOpen} onClose={onClose}>
      <Box
        sx={{
          height: "100%",
          backgroundColor: "#f5f5f5",
        }}
        // className={styles.settingsDrawer}
      >
        <List>
          <Heading heading={"Search Titles"} variant="h2" />
          <Divider />
          <ListItem>
            <ListItemButton >
              <ListItemIcon>
                <SearchIcon />
                <GenreSearch />
              </ListItemIcon>
              <ListItemText primary="Search by Genre" />
            </ListItemButton>
          </ListItem>
          <Divider />

          <ListItem>
            <ListItemButton onClick={() => setModalType("title-search")}>
              <ListItemIcon>
                <SearchIcon />
              </ListItemIcon>
              <ListItemText primary="Search By Title" />
            </ListItemButton>
          </ListItem>
          <Divider />
          <ListItem>
            <ListItemButton onClick={() => setModalType("actor-search")}>
              <ListItemIcon>
                <SearchIcon />
              </ListItemIcon>
              <ListItemText primary="Search Actors by Name" />
            </ListItemButton>
          </ListItem>
          <Divider />
          <ListItem>
            <ListItemButton
              onClick={() => setModalType("mixed-genre-movie-search")}
            >
              <ListItemIcon>
                <SearchIcon />
              </ListItemIcon>
              <ListItemText primary="Search Movies by Mixed Genres" />
            </ListItemButton>
          </ListItem>
          <Divider />
        
        <Divider />
        <ListItem>
          <ListItemButton onClick={() => setModalType("mixed-genre-tv-search")}>
            <ListItemIcon>
              <SearchIcon />
            </ListItemIcon>
            <ListItemText primary="Search TV Shows by Mixed Genres" />
          </ListItemButton>
        </ListItem>
        <Divider />
        <Divider />
        <ListItem>
          <ListItemButton
            onClick={() => setModalType("combo-search")}
          >
            <ListItemIcon>
              <SearchIcon />
            </ListItemIcon>
            <ListItemText primary="Search by Genre, Source, & Type" />
          </ListItemButton>
        </ListItem>
        <Divider />
        </List>

        {modalType === "genre-search" && (
          <GenreSearch onClose={() => setModalType("")} />
        )}
        {modalType === "title-search" && (
          <TitleSearch onClose={() => setModalType("")}/>
        )}
        {modalType === "actor-search" && (
          <ActorSearch
            onClose={() => setModalType("")}
          />
        )}
        {modalType === "mixed-genre-movie-search" && (
          <MixedGenreMovieSearch
            onClose={() => setModalType("")}
          />
        )}
        {modalType === "mixed-genre-tv-search" && (
          <MixedGenreTVSearch
            onClose={() => setModalType("")}
          />
        )}
        {modalType === "combo-search" && (
          <SearchByGenreSourceType
            onClose={() => setModalType("")}
          />
        )}
      </Box>
    </Drawer>
  );
};

export default SearchDrawer;
