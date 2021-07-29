const { gql } = require('apollo-server-express');

// typeDefs below
const typeDefs = gql`
type allUsers {
    _id: ID!
    email: String!
    username: String!
    birthday: String!
}

type Query {
    allUsers: allUsers
}

`;

module.exports = typeDefs;