import { gql } from '@apollo/client';

export const LOGIN = gql`
    mutation login($email: String!, $password: String!) {
        login(email: $email, password: $password) {
          user {
            _id
            username
            email
            online
            bio
          }
          token
        }
      }
`;

export const SIGNUP = gql`
  mutation signUp ( $username: String!, $email: String!, $password: String!) {
    signUp( username: $username, email: $email, password: $password) {
      user {
        _id
        username
        email
        online
        bio
      }
      token
    }
  }
`;

export const OFFLINE = gql`
  mutation offline {
    offline {
      username
      online
    }
  }
`;

export const ONLINE = gql`
  mutation online {
    online {
      username
      online
    }
  }
`;