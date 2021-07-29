const { gql } = require('apollo-server-express');

// typeDefs below
const typeDefs = gql`
type User {
    _id: ID!
    email: String!
    username: String!
    birthday: String!
}

type Auth {
    token: ID!
    user: User
  }

type Query {
    me: User
}

type Mutation {
    signUp(email: String!, username: String!, password: String!, birthday: String!): Auth
}

`;

module.exports = typeDefs;