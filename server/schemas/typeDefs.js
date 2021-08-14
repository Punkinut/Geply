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
    followers: [User]
    following: [User]
}

type Post {
    _id: ID!
    id: String!
    propic: String!
    photo: String!
    caption: String!
    username: String!
    likes: [User]
    comments: [Comment]
}

type Conversation {
    _id: ID!
    members: [User]
}

type Message {
    _id: ID!
    conversationId: String!
    sender: User
    text: String!
}

type Comment {
    _id: ID
    commentText: String
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
    allPosts: [Post]
    onePost(postId: String!): Post
    searchUsers(username: String!): [User]
    singleUser(id: String!): User
    userPosts(id: String!): [Post]
    getConversations: [Conversation]
}

type Mutation {
    signS3(filename: String!, filetype: String!): S3Payload!
    signUp(email: String!, username: String!, password: String!, bio: String, propic: String): Auth
    login(email: String!, password: String!): Auth
    online: User
    offline: User
    updateIcon(url: String!): User
    updateBio(bio: String!): User
    addFollowing(id: String!): [User]
    removeFollowing(id: String!): [User]
    createPost(url: String!, caption: String!, propic: String!): Post
    addLike(postId: String!): Post
    removeLike(postId: String!): Post
    addComment(postId: String!, propic: String!, comment: String!): Post
    createConversation(id: String!): Conversation
    createMessage(conversationId: String!, text: String!): Message
}

`;

module.exports = typeDefs;