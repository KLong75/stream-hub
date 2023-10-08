import { useState, useEffect } from "react";

import IconButton from "@mui/material/IconButton";
import ArrowUpwardIcon from "@mui/icons-material/ArrowUpward";

const ScrollToTopButton = () => {
  const [isVisible, setIsVisible] = useState(false);

  // Show button when page is scrolled up to given distance
  const toggleVisibility = () => {
    if (window.pageYOffset > 300) {
      setIsVisible(true);
    } else {
      setIsVisible(false);
    }
  };

  // Scroll smoothly to the top
  const scrollToTop = () => {
    console.log("scroll up clicked");
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  };

  useEffect(() => {
    window.addEventListener("scroll", toggleVisibility);
    return () => window.removeEventListener("scroll", toggleVisibility);
  }, []);

  return (
    isVisible && (
      <IconButton
        aria-label="scroll to top"
        onClick={scrollToTop}
        sx={{
          opacity: 0.8,
          position: "fixed",
          bottom: "2%",
          right: "2%",
          zIndex: 1000,
          backgroundImage: "linear-gradient(315deg, #43cea2 0%, #185a9d 75%)",
          color: "black", // Since you wanted the icon color to be black
          "&:hover": {
            opacity: 1,
            transform: "scale(1.05)",
            backgroundImage: "linear-gradient(315deg, #3bb77a 0%, #144874 75%)",
          },
        }}>
        <ArrowUpwardIcon sx={{ color: "black" }} fontSize="large" />
      </IconButton>
    )
  );
};

export default ScrollToTopButton;
