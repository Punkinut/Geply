const { gql } = require('apollo-server-express');

// typeDefs below
const typeDefs = gql`
type User {
    _id: ID!
    email: String!
    username: String!
    online: Boolean
    bio: String
    propic: String
}

type S3Payload {
    signedRequest: String!,
    url: String!,
}

type Auth {
    token: ID!
    user: User
  }

type Query {
    me: User
    allUsers: [User]
    searchUsers(username: String!): [User]
}

type Mutation {
    signS3(filename: String!, filetype: String!): S3Payload!
    signUp(email: String!, username: String!, password: String!, bio: String, propic: String): Auth
    login(email: String!, password: String!): Auth
    online: User
    offline: User
    updateIcon(url: String!): User
    updateBio(bio: String!): User
}

`;

module.exports = typeDefs;