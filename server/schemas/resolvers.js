const { AuthenticationError } = require('apollo-server-express');
const { User } = require('../models');
const { signToken } = require('../utils/auth');

const resolvers = {
    Query : {
        allUsers: async () => {
            return await User.find()
        },
    },
    Mutation: {
        signUp: async (parent, { email, username, password }) => {
            const user = await User.create({ email, username, password });
            const token = signToken(user)
            return { token, user}
        }
    },
};

  module.exports = resolvers;