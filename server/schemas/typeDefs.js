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

type Auth {
    token: ID!
    user: User
  }

type Query {
    me: User
    allUsers: [User]
}

type Mutation {
    signUp(email: String!, username: String!, password: String!, bio: String, propic: String): Auth
    login(email: String!, password: String!): Auth
    online: User
    offline: User
}

`;

module.exports = typeDefs;