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


  if (showRedirectMessage) {
    return <div>Please login or signup</div>;
  }

  return (
    <Drawer anchor="right" open={isOpen} onClose={onClose}>
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
            <ListItemButton>
              <ListItemIcon>
                <SearchIcon />
                <GenreSearch />
              </ListItemIcon>
              <ListItemText />
            </ListItemButton>
          </ListItem>
          <Divider />
          <ListItem>
            <ListItemButton>
              <ListItemIcon>
                <SearchIcon />
                <TitleSearch />
              </ListItemIcon>
              <ListItemText />
            </ListItemButton>
          </ListItem>
          <Divider />
          <ListItem>
            <ListItemButton>
              <ListItemIcon>
                <SearchIcon />
                <MixedGenreMovieSearch />
              </ListItemIcon>
              <ListItemText />
            </ListItemButton>
          </ListItem>
          <Divider />
          <ListItem>
            <ListItemButton>
              <ListItemIcon>
                <SearchIcon />
                <MixedGenreTVSearch />
              </ListItemIcon>
              <ListItemText />
            </ListItemButton>
          </ListItem>
          <Divider />
          <ListItem>
            <ListItemButton>
              <ListItemIcon>
                <SearchIcon />
                <SearchByGenreSourceType />
              </ListItemIcon>
              <ListItemText />
            </ListItemButton>
          </ListItem>
          <Divider />
          <Divider />
          <ListItem>
            <ListItemButton >
              <ListItemIcon>
                <SearchIcon />
                <ActorSearch />
              </ListItemIcon>
              <ListItemText />
            </ListItemButton>
          </ListItem>
        </List>
      </Box>
    </Drawer>
  );
};

export default SearchDrawer;
