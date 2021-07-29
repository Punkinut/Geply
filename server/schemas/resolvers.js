const { AuthenticationError } = require('apollo-server-express');
const { User } = require('../models');
const { signToken } = require('../utils/auth');

const resolvers = {
    allUsers: async () => {
        return await User.find()
    }
};

  module.exports = resolvers;