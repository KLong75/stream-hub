const { Schema } = require('mongoose');

// This is a subdocument schema, it won't become its own model but we'll use it as the schema for the User's `savedTitles` array in User.js
const titleSchema = new Schema({
  // saved title id
  titleId: {
    type: String,
    required: true,
  },
  title: {
    type: String,
    required: true,
  },
  type: {
    type: String,
  },
  year: {
    type: String,
  },
  backdrop: {
    type: String,
  },
  genre_names: [
    {
      type: String 
    }
  ],
  plot_overview: {
    type: String,
  },
  poster: {
    type: String,
  },
  trailer: {
    type: String,
  },
  trailer_thumbnail: {
    type: String,
  },
  release_date: {
    type: String,
  },
  us_rating: {
    type: String,
  },
  cast: [
    {
      type: String 
    }
  ],
  director: [
    {
      type: String 
    }
  ],
  sources: [
    {
      type: String 
    }
  ],
  similar_titles: [
    {
      type: String 
    }
  ],
  }
);

module.exports = titleSchema;