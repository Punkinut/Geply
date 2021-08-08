import { gql } from '@apollo/client';

export const GET_ME = gql`
    query me {
        me {
        _id
        username
        online
        bio
        propic
        followers {
          _id
          username
          online
          bio
          propic
        }
        following {
          _id
          username
          online
          bio
          propic
          followers {
            _id
          }
        }
        }
    }
`;

export const SEARCH_USERS = gql `
    query searchUsers ($username: String!) {
      searchUsers(username: $username) {
        _id
        username
        online
        propic
        followers {
          _id
          username
          online
          bio
          propic
        }
        following {
          _id
          username
          online
          bio
          propic
        }
      }
    }
`;

export const singleUser = gql `
  query singleUser ($id: String!) {
    singleUser(id: $id) {
      _id
      username
      online
      bio
      propic
      followers {
        _id
        username
        online
        bio
        propic
      }
      following {
        _id
        username
        online
        bio
        propic
      }
    }
  }
`;

export const allPosts = gql`
  query allPosts {
    allPosts {
      _id
      photo
      propic
      username
      caption
      likes {
        _id
      }
      comments {
        _id
        commentText
        propic
      }
    }
  }
`;