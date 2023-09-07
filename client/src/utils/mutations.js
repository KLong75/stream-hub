import { gql } from "@apollo/client";

export const LOGIN_USER = gql`
  mutation login($email: String!, $password: String!) {
    login(email: $email, password: $password) {
      token
      user {
        _id
        username
      }
    }
  }
`;

export const ADD_USER = gql`
  mutation addUser($username: String!, $email: String!, $password: String!) {
    addUser(username: $username, email: $email, password: $password) {
      token
      user {
        _id
        username
        email
      }
    }
  }
`;

export const UPDATE_USER = gql`
mutation updateUser($username: String, $email: String, $password: String) {
  updateUser(username: $username, email: $email, password: $password) {
    _id
    username
    email
  }
}
`;

export const DELETE_USER = gql`
  mutation deleteUser {
    deleteUser {
      _id
      username
      email
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
        similar_titles
      }
    }
  }
`;

export const SAVE_TITLE = gql`
  mutation saveTitle($input: TitleInput!) {
    saveTitle(input: $input) {
      _id
      username
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
        similar_titles
      }
    }
  }
`;

export const REMOVE_TITLE = gql`
  mutation removeTitle($id: Int!) {
    removeTitle(id: $id) {
      _id
      username
      email
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
        similar_titles
      }
    }
  }
`;
