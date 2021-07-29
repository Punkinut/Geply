const { AuthenticationError } = require('apollo-server-express');
const { User } = require('../models');
const { signToken } = require('../utils/auth');

const resolvers = {
    Query: {
        me: async (parent, args, context) => {
          if (context.user) {
            return User.findOne({ _id: context.user._id })
          }
          throw new AuthenticationError('Cannot find a user with this id!');
        },
      },
    Mutation: {
        signUp: async (parent, { email, username, password, birthday }) => {
            const user = await User.create({ email, username, password, birthday });
            const token = signToken(user)
            return { token, user}
        }
    },
};

  module.exports = resolvers;