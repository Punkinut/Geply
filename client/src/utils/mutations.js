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

export const updateBio = gql `
  mutation updateBio ($bio: String!) {
    updateBio(bio: $bio) {
      _id
      username
      bio
    }
  }
`;

export const addFollowing = gql `
  mutation addFollowing ($id: String!) {
    addFollowing(id: $id) {
      _id
      username
      followers {
        _id
        username
      }
      following {
        _id
        username
      }
    }
  }`
;

export const removeFollowing = gql `
  mutation removeFollowing ($id: String!) {
    removeFollowing(id: $id) {
      _id
      username
      followers {
        _id
        username
      }
      following {
        _id
        username
      }
    }
  }`
;

export const createPost = gql `
  mutation createPost ($url: String!, $caption: String!) {
    createPost(url: $url, caption: $caption) {
      id
      photo
      username
      caption
      likes
      comments {
        commentText
      }
    }
  }
`;
