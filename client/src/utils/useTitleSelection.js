import { useContext } from "react";
import { TitleDetailsContext } from "../context/TitleDetailsContext";
import { fetchTitleDetails } from "./apiCalls";
import { CACHE_DURATION } from "./utils";
import { useNavigate } from "react-router-dom";

export const useTitleSelection = () => {
  const navigate = useNavigate();
  const { setSelectedTitleDetails } = useContext(TitleDetailsContext);

  const handleTitleSelected = async (id, event) => {
    if (event) event.preventDefault();
    // const selectedTitleId = event.target.value;
    const selectedTitleId = id;
    // console.log(selectedTitleId);
    const cachedTitleDetails = localStorage.getItem(
      `titleDetails_${selectedTitleId}`
    );
    // console.log(
    //   "Cached Data Retrieved: cachedTitleDetails",
    //   cachedTitleDetails
    // );
    if (cachedTitleDetails) {
      const { data, timestamp } = JSON.parse(cachedTitleDetails);
      // console.log(CACHE_DURATION);
      const now = Date.now();
      // console.log(now - timestamp);
      if (now - timestamp < CACHE_DURATION) {
        setSelectedTitleDetails(data);
        // console.log("cached data retrieved, parsed, time checked", data);
        // window.scrollTo(0, 0);
        navigate("/title_details");
        window.scrollTo(0, 0);
      } else {
        localStorage.removeItem(`titleDetails_${selectedTitleId}`);
        // console.log("Cached Data Expired and Removed");
      }
    }
    if (!cachedTitleDetails) {
      try {
        const response = await fetchTitleDetails(selectedTitleId);
        if (!response.ok) {
          throw new Error("Something went wrong");
        }
        const titleDetails = await response.json();
        // console.log("New Data Retrieved:", titleDetails);
        const rentBuySourceNamesToInclude = [
          "iTunes",
          "Google Play",
          "Amazon",
          "YouTube",
        ];
        const uniqueBuySources = [];
        const buySourceNames = new Set();
        titleDetails.sources.forEach((source) => {
          if (
            source.type === "buy" &&
            rentBuySourceNamesToInclude.some((name) => name === source.name)
          ) {
            if (!buySourceNames.has(source.name)) {
              buySourceNames.add(source.name);
              uniqueBuySources.push(source);
            }
          }
        });
        const titleDetailsData = {
          id: titleDetails.id,
          title: titleDetails.title,
          type: titleDetails.type,
          year: titleDetails.year,
          backdrop: titleDetails.backdrop,
          critic_score: titleDetails.critic_score,
          genre_names: titleDetails.genre_names,
          network_names: titleDetails.network_names,
          plot_overview: titleDetails.plot_overview,
          poster: titleDetails.poster,
          release_date: titleDetails.release_date,
          runtime: titleDetails.runtime,
          similar_titles: titleDetails.similar_titles
            ? titleDetails.similar_titles.slice(0, 3)
            : [],
          sources: titleDetails.sources.filter(
            (source) => source.type === "sub"
          ),
          buy_sources: uniqueBuySources,
          trailer:
            titleDetails.trailer && titleDetails.trailer.includes("youtube")
              ? titleDetails.trailer.replace(/watch\?v=/, "embed/")
              : titleDetails.trailer,
          trailer_thumbnail: titleDetails.trailer_thumbnail,
          us_rating: titleDetails.us_rating,
          user_rating: titleDetails.user_rating,
          imdb_id: titleDetails.imdb_id,
        };
        // console.log(titleDetailsData);
        setSelectedTitleDetails(titleDetailsData);
        const cacheData = {
          data: titleDetailsData,
          timestamp: Date.now(),
        };
        localStorage.setItem(
          `titleDetails_${selectedTitleId}`,
          JSON.stringify(cacheData)
        );
        // window.scrollTo(0, 0);
        navigate("/title_details");
        window.scrollTo(0, 0);
      } catch (error) {
        console.log(error);
      }
    }
  };
  return handleTitleSelected;
};
