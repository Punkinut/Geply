const { AuthenticationError } = require('apollo-server-express');
const { User } = require('../models');
const { signToken } = require('../utils/auth');
const aws = require('aws-sdk')
require('dotenv').config()

const s3Bucket = 'geply-bucket';

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
        },
        singleUser: async (_, { id }) => {
          return User.findOne({_id: id})
        },
        searchUsers: async (_, { username }) => {
          return User.find({ username: {$regex: username, $options: 'i'} })
        }
      },
    Mutation: {
        signS3: async (parent, { filename, filetype, }) => {
          const s3 = new aws.S3({
            signatureVersion: 'v4',
            region: 'ap-southeast-2',
            accessKeyId: process.env.ACCESS,
            secretAccessKey: process.env.SECRET
          });

          const s3Params = {
            Bucket: s3Bucket,
            Key: filename,
            Expires: 60,
            ContentType: filetype,
            ACL: 'public-read'
          }

          const signedRequest = await s3.getSignedUrl('putObject', s3Params);
          const url = `https://${s3Bucket}.s3.amazonaws.com/${filename}`

          return {
            signedRequest,
            url
          };
        },
        signUp: async (parent, { email, username, password, online, bio, propic }) => {
            const user = await User.create({ email, username, password, online, bio, propic });
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
          },
          updateIcon: async (_, { url }, context) => {
            return User.findOneAndUpdate({ _id: context.user._id }, {propic: url}, {new: true});
          },
          updateBio: async (_, { bio }, context) => {
            return User.findOneAndUpdate({ _id: context.user._id }, {bio: bio}, {new: true});
          }
    },
};

  module.exports = resolvers;