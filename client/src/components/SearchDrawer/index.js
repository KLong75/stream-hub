import { useState, useEffect } from "react";

import { useNavigate } from "react-router-dom";
// import from mui
import Box from "@mui/material/Box";
import Drawer from "@mui/material/Drawer";
import List from "@mui/material/List";
import Divider from "@mui/material/Divider";
import ListItem from "@mui/material/ListItem";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";
import SearchIcon from "@mui/icons-material/Search";
import CloseIcon from "@mui/icons-material/Close";
// import from utils
import Auth from "../../utils/auth";
// import components
import GenreSearch from "../../components/GenreSearch";
import TitleSearch from "../../components/TitleSearch";
// import ActorSearch from "../../components/ActorSearch";
import SearchByGenreSourceType from "../../components/SearchByGenreSourceType";
import MixedGenreMovieSearch from "../../components/MixedGenreMovieSearch";
import MixedGenreTVSearch from "../../components/MixedGenreTVSearch";
// import styles
import styles from "./SearchDrawer.module.css";

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

  const handleSearchSubmit = () => {
    onClose();
  };

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

  if (showRedirectMessage) {
    return <div>Please login or signup</div>;
  }

  return (
    <Drawer anchor="top" open={isOpen} onClose={onClose}>
      <Box className={styles.searchDrawer}>
      <List className={styles.searchDrawer}>
        <CloseIcon className={styles.closeIcon} onClick={onClose} />
        <h2 style={{fontSize: '1.5rem', textAlign: 'center'}}  >Search Options:</h2>
        <Divider />
        <ListItem>
          <ListItemButton>
            <ListItemIcon>
              <SearchIcon />
              <TitleSearch onSubmit={handleSearchSubmit} />
            </ListItemIcon>
            <ListItemText />
          </ListItemButton>
        </ListItem>
        <Divider />
        <ListItem>
          <ListItemButton>
            <ListItemIcon>
              <SearchIcon />
              <MixedGenreMovieSearch onSubmit={handleSearchSubmit} />
            </ListItemIcon>
            <ListItemText />
          </ListItemButton>
        </ListItem>
        <Divider />
        <ListItem>
          <ListItemButton>
            <ListItemIcon>
              <SearchIcon />
              <MixedGenreTVSearch onSubmit={handleSearchSubmit} />
            </ListItemIcon>
            <ListItemText />
          </ListItemButton>
        </ListItem>
        <Divider />
        <ListItem>
          <ListItemButton>
            <ListItemIcon>
              <SearchIcon />
              <SearchByGenreSourceType onSubmit={handleSearchSubmit} />
            </ListItemIcon>
            <ListItemText />
          </ListItemButton>
        </ListItem>
        <Divider />
        <ListItem>
          <ListItemButton>
            <ListItemIcon>
              <SearchIcon />
              <GenreSearch onSubmit={handleSearchSubmit} />
            </ListItemIcon>
            <ListItemText />
          </ListItemButton>
        </ListItem>
        <Divider />
        {/* <ListItem>
          <ListItemButton>
            <ListItemIcon>
              <SearchIcon />
              <ActorSearch onSubmit={handleSearchSubmit} />
            </ListItemIcon>
            <ListItemText />
          </ListItemButton>
        </ListItem>
        <Divider /> */}
      </List>
      </Box>
    </Drawer>
  );
};

export default SearchDrawer;
