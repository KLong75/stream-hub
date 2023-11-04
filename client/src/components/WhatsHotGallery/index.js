// import from utils
import { genreList } from "../../utils/utils";
// import components
import VerticalCardSwipeGallery from "../VerticalCardSwipeGallery";
// import context
import { TopRatedTvContext } from "../../context/TopRatedTvContext";
import { TrendingTvContext } from "../../context/TrendingTvContext";
import { TrendingMoviesContext } from "../../context/TrendingMoviesContext";
import { TopRatedMoviesContext } from "../../context/TopRatedMoviesContext";
import { ComingSoonContext } from "../../context/ComingSoonContext";

const WhatsHotGallery = () => {
  const galleryData = [
    { context: TrendingMoviesContext, categoryTitle: "Trending Movies" },
    { context: TopRatedMoviesContext, categoryTitle: "Top Rated Movies" },
    { context: TrendingTvContext, categoryTitle: "Trending TV Shows" },
    { context: TopRatedTvContext, categoryTitle: "Top Rated TV Shows" },
    { context: ComingSoonContext, categoryTitle: "Coming Soon" },
  ];


  return (
    <>
      {galleryData.map(({ context, categoryTitle }, index) => (
        <VerticalCardSwipeGallery
          key={index}
          context={context}
          categoryTitle={categoryTitle}
          genreList={genreList}
        />
      ))}
    </>
  );
};

export default WhatsHotGallery;
