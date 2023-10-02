// import from react
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
// import from mui
import Box from "@mui/material/Box";
import { Link } from "@mui/material";
import Typography from "@mui/material/Typography";
import Modal from "@mui/material/Modal";
import WhatshotIcon from "@mui/icons-material/Whatshot";
import CloseIcon from "@mui/icons-material/Close";
// import from utils
import { genreList } from "../../utils/utils";
import Auth from "../../utils/auth";
import { useTitleSelectionTMDBId } from "../../utils/useTitleSelectionTMDBId";
// import components
import VerticalCardSwipeGallery from "../VerticalCardSwipeGallery";
// import context
import { TopRatedTvContext } from "../../context/TopRatedTvContext";
import { TrendingTvContext } from "../../context/TrendingTvContext";
import { TrendingMoviesContext } from "../../context/TrendingMoviesContext";
import { PopularMoviesContext } from "../../context/PopularMoviesContext";
import { PopularTvContext } from "../../context/PopularTvContext";
import { TopRatedMoviesContext } from "../../context/TopRatedMoviesContext";
// import styles
import styles from "./WhatsHotModal.module.css";

const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: "80vw", // 80% of the viewport width
  maxHeight: "80vh",
  bgcolor: "lightgray",
  border: "2px solid #000",
  boxShadow: 24,
  p: 4,
  overflow: "scroll",
};

const WhatsHotModal = () => {
  const [open, setOpen] = useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  const titleSelectionHandler = useTitleSelectionTMDBId();

  const handleTitleSelected = (id) => {
    const customEvent = {
      preventDefault: () => {},
      target: { value: id },
    };
    titleSelectionHandler(customEvent);
    handleClose();
  };

  const navigate = useNavigate();
  const loggedIn = Auth.loggedIn();

  useEffect(() => {
    if (!loggedIn) {
      navigate("/");
    }
  }, [loggedIn, navigate]);

  const galleryData = [
    { context: TrendingMoviesContext, categoryTitle: "Trending Movies" },
    { context: PopularMoviesContext, categoryTitle: "Popular Movies" },
    { context: TopRatedMoviesContext, categoryTitle: "Top Rated Movies" },
    { context: TrendingTvContext, categoryTitle: "Trending TV Shows" },
    { context: PopularTvContext, categoryTitle: "Popular TV Shows" },
    { context: TopRatedTvContext, categoryTitle: "Top Rated TV Shows" },
  ];

  return (
    <div>
      <Link
        className={styles.hotButton}
        underline="none"
        component="button"
        onClick={handleOpen}
      >
        <WhatshotIcon sx={{ marginBottom: "-2rem" }} fontSize="large" />
        <h6>Trending</h6>
      </Link>

      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style}>
          <CloseIcon className={styles.closeIcon} onClick={handleClose} />
          <Typography
            id="modal-modal-title"
            variant="h6"
            component="h2"
            textAlign="center"
          >
            <WhatshotIcon fontSize="large" />
            What's Hot
          </Typography>

          {galleryData.map(({ context, categoryTitle }, index) => (
            <VerticalCardSwipeGallery
              key={index}
              context={context}
              categoryTitle={categoryTitle}
              handleTitleSelected={handleTitleSelected}
              genreList={genreList}
            />
          ))}
        </Box>
      </Modal>
    </div>
  );
};
export default WhatsHotModal;
