// import from utils
import { genreList } from "../../utils/utils";
import { useTitleSelectionTMDBId } from "../../utils/useTitleSelectionTMDBId";
// import components
import VerticalCardSwipeGallery from "../VerticalCardSwipeGallery";
// import context
import { TopRatedTvContext } from "../../context/TopRatedTvContext";
import { TrendingTvContext } from "../../context/TrendingTvContext";
import { TrendingMoviesContext } from "../../context/TrendingMoviesContext";
// import { PopularTvContext } from "../../context/PopularTvContext";
import { TopRatedMoviesContext } from "../../context/TopRatedMoviesContext";
import { ComingSoonContext } from "../../context/ComingSoonContext";

const WhatsHotGallery = () => {
  const galleryData = [
    { context: TrendingMoviesContext, categoryTitle: "Trending Movies" },
    // { context: PopularMoviesContext, categoryTitle: "Popular Movies" },
    { context: TopRatedMoviesContext, categoryTitle: "Top Rated Movies" },
    { context: TrendingTvContext, categoryTitle: "Trending TV Shows" },
    // { context: PopularTvContext, categoryTitle: "Popular TV Shows" },
    { context: TopRatedTvContext, categoryTitle: "Top Rated TV Shows" },
    { context: ComingSoonContext, categoryTitle: "Coming Soon" },
  ];

  const titleSelectionHandler = useTitleSelectionTMDBId();

  const handleTitleSelected = (id) => {
    const customEvent = {
      preventDefault: () => {},
      target: { value: id },
    };
    titleSelectionHandler(customEvent);
  };

  return (
    <>
      {galleryData.map(({ context, categoryTitle }, index) => (
        <VerticalCardSwipeGallery
          key={index}
          context={context}
          categoryTitle={categoryTitle}
          handleTitleSelected={handleTitleSelected}
          genreList={genreList}
        />
      ))}
    </>
  );
};

export default WhatsHotGallery;
