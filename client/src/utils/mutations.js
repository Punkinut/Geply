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
  mutation signUp ( $username: String!, $email: String!, $password: String!, $bio: String, $propic: String) {
    signUp( username: $username, email: $email, password: $password, bio: $bio, propic: $propic) {
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

export const s3SignMutation = gql`
  mutation($filename: String!, $filetype: String!) {
    signS3(filename: $filename, filetype: $filetype) {
      url
      signedRequest
    }
  }
`;

export const updateIcon = gql `
  mutation updateIcon ($url: String!) {
    updateIcon(url: $url) {
      _id
      username
      propic
    }
  }
`;