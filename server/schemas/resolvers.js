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
        allUsers: async () => {
          return User.find()
        }
      },
    Mutation: {
        signUp: async (parent, { email, username, password, online, bio }) => {
            const user = await User.create({ email, username, password, online, bio });
            const token = signToken(user)
            await User.updateOne({ email }, { online: true });
            return { token, user}
        },
        login: async (_, { email, password }) => {
            
            const user = await User.findOne({ email });
            
            if (!user) {
              throw new AuthenticationError('No user found with this email address');
            }
      
            const correctPw = await user.isCorrectPassword(password);
      
            if (!correctPw) {
              throw new AuthenticationError('Incorrect credentials');
            }
      
            const token = signToken(user);

            await User.updateOne({ email }, { online: true });
      
            return { token, user };
          },
          online: async (_, { email }, context) => {
            return User.findOneAndUpdate({ _id: context.user._id }, { online: true }, {new: true});
          },
          offline: async (_, { email }, context) => {
            return User.findOneAndUpdate({ _id: context.user._id }, { online: false }, {new: true});
          }
    },
};

  module.exports = resolvers;