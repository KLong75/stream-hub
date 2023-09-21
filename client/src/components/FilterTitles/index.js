import { useState, useEffect } from "react";
import FormGroup from "@mui/material/FormGroup";
import FormControlLabel from "@mui/material/FormControlLabel";
import Checkbox from "@mui/material/Checkbox";

const FilterTitles = ({ setFilters }) => {
  const [typeFilter, setTypeFilter] = useState({
    Movie: false,
    TVShow: false,
  });

  const [sourceFilter, setSourceFilter] = useState({
    AppleTV: false,
    DisneyPlus: false,
    Hulu: false,
    Max: false,
    Netflix: false,
    ParamountPlus: false,
    Peacock: false,
    Starz: false,
  });

  const [genreFilter, setGenreFilter] = useState({
    Action: false,
    ActionAdventure: false,
    Adventure: false,
    Animation: false,
    Anime: false,
    Biography: false,
    Comedy: false,
    Crime: false,
    Documentary: false,
    Drama: false,
    Family: false,
    Fantasy: false,
    History: false,
    Horror: false,
    Kids: false,
    Music: false,
    Musical: false,
    Mystery: false,
    News: false,
    Reality: false,
    Romance: false,
    ScienceFiction: false,
    SciFiFantasy: false,
    Soap: false,
    Sports: false,
    Talk: false,
    Thriller: false,
    War: false,
    WarPolitics: false,
    Western: false,
  });

  const handleTypeChange = (event) => {
    setTypeFilter({ ...typeFilter, [event.target.name]: event.target.checked });
  };

  const handleSourceChange = (event) => {
    setSourceFilter({
      ...sourceFilter,
      [event.target.name]: event.target.checked,
    });
  };

  const handleGenreChange = (event) => {
    setGenreFilter({
      ...genreFilter,
      [event.target.name]: event.target.checked,
    });
  };

  useEffect(() => {
    setFilters({
      type: typeFilter,
      source: sourceFilter,
      genre: genreFilter,
    });
  }, [typeFilter, sourceFilter, genreFilter, setFilters]);

  return (
    <FormGroup>
      <h5>Type</h5>
      <FormControlLabel
        control={
          <Checkbox
            checked={typeFilter.Movie}
            onChange={handleTypeChange}
            name="Movie"
          />
        }
        label="Movie"
      />
      <FormControlLabel
        control={
          <Checkbox
            checked={typeFilter.TVShow}
            onChange={handleTypeChange}
            name="TVShow"
          />
        }
        label="TV Show"
      />

      <h5>Source</h5>
      <FormControlLabel 
        control={
          <Checkbox
            checked={sourceFilter.AppleTV}
            onChange={handleSourceChange}
            name="AppleTV" 
          />
        } 
        label="AppleTV"
      />
      <FormControlLabel 
        control={
        <Checkbox 
          checked={sourceFilter.DisneyPlus}
          onChange={handleSourceChange}
          name="DisneyPlus"
        />
        } label="Disney+" 

      />
      <FormControlLabel 
        control={
        <Checkbox 
          checked={sourceFilter.Hulu}
          onChange={handleSourceChange}
          name="Hulu"
        />} label="Hulu" 
      />
      <FormControlLabel
        control={ 
        <Checkbox
          checked={sourceFilter.Max}
          onChange={handleSourceChange}
          name="Max"
        />} label="Max"
      />
      <FormControlLabel
        control={
        <Checkbox
          checked={sourceFilter.Netflix}
          onChange={handleSourceChange}
          name="Netflix"
        />} label="Netflix"
      />
      <FormControlLabel
        control={
        <Checkbox
          checked={sourceFilter.ParamountPlus}
          onChange={handleSourceChange}
          name="ParamountPlus"
        />} label="Paramount+"
      />
      <FormControlLabel
        control={
        <Checkbox
          checked={sourceFilter.Peacock}
          onChange={handleSourceChange}
          name="Peacock"
        />} label="Peacock"
      />
      <FormControlLabel
        control={
        <Checkbox
          checked={sourceFilter.Starz}
          onChange={handleSourceChange}
          name="Starz"
        />} label="Starz"
      />
      <h5>Genre</h5>
      <FormControlLabel 
        control={
        <Checkbox 
          checked={genreFilter.Action}
          onChange={handleGenreChange}
          name="Action"
        />} 
        label="Action" 
      />
      <FormControlLabel
        control={
        <Checkbox
          checked={genreFilter.ActionAdventure}
          onChange={handleGenreChange}
          name="ActionAdventure"
        />} label="Action & Adventure"
      />
      <FormControlLabel
        control={
        <Checkbox
          checked={genreFilter.Adventure}
          onChange={handleGenreChange}
          name="Adventure"
        />} label="Adventure"
      />
      <FormControlLabel
        control={
        <Checkbox
          checked={genreFilter.Animation}
          onChange={handleGenreChange}
          name="Animation"
        />} label="Animation"
      />
      <FormControlLabel
        control={
        <Checkbox
          checked={genreFilter.Anime}
          onChange={handleGenreChange}
          name="Anime"
        />} label="Anime"
      />
      <FormControlLabel
        control={
        <Checkbox
          checked={genreFilter.Biography}
          onChange={handleGenreChange}
          name="Biography"
        />} label="Biography"
      />
      <FormControlLabel
        control={
        <Checkbox
          checked={genreFilter.Comedy}
          onChange={handleGenreChange}
          name="Comedy"
        />} label="Comedy"
      />
      <FormControlLabel
        control={
        <Checkbox
          checked={genreFilter.Crime}
          onChange={handleGenreChange}
          name="Crime"
        />} label="Crime"
      />  
      <FormControlLabel
        control={
        <Checkbox
          checked={genreFilter.Documentary}
          onChange={handleGenreChange}
          name="Documentary"
        />} label="Documentary"
      />
      <FormControlLabel
        control={
        <Checkbox
          checked={genreFilter.Drama}
          onChange={handleGenreChange}
          name="Drama"
        />} label="Drama"
      />
      <FormControlLabel
        control={
        <Checkbox
          checked={genreFilter.Family}
          onChange={handleGenreChange}
          name="Family"
        />} label="Family"
      />
      <FormControlLabel
        control={
        <Checkbox
          checked={genreFilter.Fantasy}
          onChange={handleGenreChange}  
          name="Fantasy"
        />} label="Fantasy"
      />
      <FormControlLabel
        control={
        <Checkbox
          
          checked={genreFilter.History}
          onChange={handleGenreChange}
          name="History"
        />} label="History"
      />
      <FormControlLabel
        control={
        <Checkbox
          checked={genreFilter.Horror}
          onChange={handleGenreChange}
          name="Horror"
        />} label="Horror"
      />
      <FormControlLabel
        control={
        <Checkbox
          checked={genreFilter.Kids}
          onChange={handleGenreChange}
          name="Kids"
        />} label="Kids"
      />
      <FormControlLabel
        control={
        <Checkbox
          checked={genreFilter.Music}
          onChange={handleGenreChange}
          name="Music"
        />} label="Music"
      />
      <FormControlLabel
        control={
        <Checkbox
          checked={genreFilter.Musical}
          onChange={handleGenreChange}
          name="Musical"
        />} label="Musical"
      />
      <FormControlLabel
        control={
        <Checkbox
          checked={genreFilter.Mystery}
          onChange={handleGenreChange}
          name="Mystery"
        />} label="Mystery"
      />
      <FormControlLabel
        control={
        <Checkbox
          checked={genreFilter.News}
          onChange={handleGenreChange}
          name="News"
        />} label="News"
      />
      <FormControlLabel
        control={
        <Checkbox
          checked={genreFilter.Reality}
          onChange={handleGenreChange}
          name="Reality"
        />} label="Reality"
      />
      <FormControlLabel

        control={
        <Checkbox
          checked={genreFilter.Romance}
          onChange={handleGenreChange}
          name="Romance"
        />} label="Romance"
      />
      <FormControlLabel
        control={
        <Checkbox
          checked={genreFilter.SciFi}
          onChange={handleGenreChange}
          name="Sci-Fi & Fantasy"
        />} label="Sci-Fi & Fantasy"
      />
      <FormControlLabel
        control={
        <Checkbox
          checked={genreFilter.Sport}
          onChange={handleGenreChange}
          name="Science Fiction"
        />} label="Science Fiction"
      />
      <FormControlLabel
        control={
        <Checkbox
          checked={genreFilter.Soap}
          onChange={handleGenreChange}
          name="Soap"
        />} label="Soap"
      />
      <FormControlLabel
        control={
        <Checkbox 
          checked={genreFilter.Sports}
          onChange={handleGenreChange}
          name="Sports"
        />} label="Sports"
      />
      <FormControlLabel
        control={
        <Checkbox
          checked={genreFilter.Talk}
          onChange={handleGenreChange}
          name="Talk"
        />} label="Talk"
      />
      <FormControlLabel
        control={
        <Checkbox
          checked={genreFilter.Thriller}
          onChange={handleGenreChange}
          name="Thriller"
        />} label="Thriller"
      />
      <FormControlLabel
        control={
        <Checkbox
          checked={genreFilter.War}
          onChange={handleGenreChange}
          name="War"
        />} label="War"
      />
      <FormControlLabel
        control={
        <Checkbox
          checked={genreFilter.Western}
          onChange={handleGenreChange}
          name="Western"
        />} label="Western"
      />
    </FormGroup>
  );
};

export default FilterTitles;
