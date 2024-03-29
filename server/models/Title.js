const { Schema } = require("mongoose");

// This is a subdocument schema, it won't become its own model but we'll use it as the schema for the User's `savedTitles` array in User.js
const titleSchema = new Schema({
  id: {
    type: Number,
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
    type: Number,
  },
  backdrop: {
    type: String,
  },
  genre_names: [
    {
      type: String,
    },
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
  imdb_id: {
    type: String,
  },
  tmdb_id: {
    type: Number
  },
  sources: [
    {
      type: Object,
    },
  ],
  buy_sources: [
    {
      type: Object,
    },
  ],
  similar_title_data: [
    {
      type: Object,
    },
  ],
  cast: [
    {
      type: Object,
    },
  ],
  crew: [
    {
      type: Object,
    },
  ],
});

module.exports = titleSchema;
