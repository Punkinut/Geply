import { gql } from '@apollo/client';

export const GET_ME = gql`
    query me {
        me {
        _id
        username
        online
        bio
        propic
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
      }
    }
`;

export const singleUser = gql `
  query singleUser ($id: String!) {
    singleUser(id: $id) {
      username
      online
      bio
      propic
    }
  }
`;