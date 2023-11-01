// import from react
import { useState, useContext } from "react";
// import context
import { SearchResultsContext } from "../../context/SearchResultsContext";
// import from mui
import { TextField, MenuItem } from "@mui/material";
import Button from "@mui/material/Button";
import { Dialog, DialogTitle, DialogContent, DialogActions } from "@mui/material";
import Grid from "@mui/material/Unstable_Grid2/Grid2";
// import from swiper.js
import { Swiper, SwiperSlide } from "swiper/react";
import {
  EffectCoverflow,
  Navigation,
  // Pagination,
  // Parallax,
} from "swiper/modules";
import "swiper/css";
import "swiper/css/effect-coverflow";
import "swiper/css/pagination";
// import images
import imageNotAvailable from "../../assets/images/no_image_available.jpg";
// import from utils
import Auth from "../../utils/auth";
import { useTitleSelectionTMDBId } from "../../utils/useTitleSelectionTMDB";
// import styles



const ActorSearchResultsModal = () => {
  const [modalOpen, setModalOpen] = useState(false);
  const { actorSearchResults } = useContext(SearchResultsContext); // Get the data from context
  const handleTitleSelected = useTitleSelectionTMDBId();
  
  
};
export default ActorSearchResultsModal;