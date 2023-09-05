const { gql } = require("apollo-server-express");

const typeDefs = gql`
  type User {
    _id: ID
    username: String
    email: String
    titleCount: Int
    savedTitles: [Title]
    actorCount: Int
    savedActors: [Actor]
  }

  type Title {
    id: Int
    title: String
    type: String
    year: Int
    backdrop: String
    genre_names: [String]
    plot_overview: String
    poster: String
    trailer: String
    trailer_thumbnail: String
    release_date: String
    us_rating: String
    sources: [Source]
    buy_sources: [BuySource]
    similar_titles: [Int]
  }

  type Actor {
    actorId: String
    name: String
    image: String
  }

  type Auth {
    token: ID!
    user: User
  }

  type Query {
    me: User
    user(username: String): User
    users: [User]
  }

  type Source {
    source_id: Int
    name: String
    web_url: String
    type: String
  }

  type BuySource {
    source_id: Int
    name: String
    web_url: String
    type: String
  }

  input SourceInput {
    source_id: Int
    name: String
    web_url: String
  }

  input BuySourceInput {
    source_id: Int
    name: String
    web_url: String
    type: String
  }

  input TitleInput {
    id: Int!
    title: String!
    plot_overview: String
    poster: String
    backdrop: String
    release_date: String
    us_rating: String
    genre_names: [String]
    type: String
    year: Int
    trailer: String
    trailer_thumbnail: String
    sources: [SourceInput]
    buy_sources: [BuySourceInput]
    similar_titles: [Int]
  }

  type Mutation {
    login(email: String!, password: String!): Auth
    addUser(username: String!, email: String!, password: String!): Auth
    saveTitle(input: TitleInput): User
    removeTitle(titleId: String!): User
  }
`;

module.exports = typeDefs;
