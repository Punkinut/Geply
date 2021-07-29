const { gql } = require('apollo-server-express');

// typeDefs below
const typeDefs = gql`
type User {
    _id: ID!
    email: String!
    username: String!
    birthday: String!
    online: Boolean
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
    signUp(email: String!, username: String!, password: String!, birthday: String!): Auth
    login(email: String!, password: String!): Auth
}

`;

module.exports = typeDefs;