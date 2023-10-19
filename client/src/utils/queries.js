import { gql } from "@apollo/client";

export const QUERY_ME = gql`
  {
    me {
      _id
      username
      email
      titleCount
      savedTitles {
        id
        title
        type
        year
        backdrop
        genre_names
        plot_overview
        poster
        trailer
        trailer_thumbnail
        release_date
        us_rating
        sources {
          source_id
          name
          web_url
        }
        buy_sources {
          source_id
          name
          web_url
          type
        }
        similar_titles {
          id
          title
          type
          poster
        }

      }
    }
  }
`;

export const QUERY_ME_BASIC = gql`
  {
    me {
      _id
      username
      email
    }
  }
`;

export const QUERY_USER = gql`
  query getUser($username: String!) {
    user(username: $username) {
      _id
      username
      email
    }
  }
`;

export const QUERY_USER_BASIC = gql`
  query getUser($username: String!) {
    user(username: $username) {
      _id
      username
      email
    }
  }
`;
