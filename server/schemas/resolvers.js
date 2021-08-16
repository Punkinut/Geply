const { AuthenticationError } = require('apollo-server-express');
const { User, Post, Conversation, Message } = require('../models');
const { signToken } = require('../utils/auth');
const aws = require('aws-sdk')
require('dotenv').config()

const s3Bucket = 'geply-bucket';

const resolvers = {
    Query: {
        me: async (parent, args, context) => {
          if (context.user) {
            return User.findOne({ _id: context.user._id }).populate('followers').populate('following')
          }
          throw new AuthenticationError('Cannot find a user with this id!');
        },
        allUsers: async () => {
          return User.find().populate('followers').populate('following')
        },
        allPosts: async () => {
          return Post.find().sort({"_id": -1 })
        },
        userPosts: async (_, {id}) => {
          return Post.find({id}).sort({"_id": -1 })
        },
        onePost: async (_, {postId}) => {
          return Post.findOne({ _id: postId})
        },
        singleUser: async (_, { id }) => {
          return User.findOne({_id: id}).populate('followers').populate('following');
        },
        searchUsers: async (_, { username }) => {
          return User.find({ username: {$regex: username, $options: 'i'} }).populate('followers').populate('following')
        },
        getConversations: async (_, args, context) => {
          return Conversation.find( { members: context.user._id}).populate('members')
        },
        oneConversation: async(_, { id }) => {
          return Conversation.findOne({ _id: id }).populate('members')
        },
        getMessages: async (_, {conversationId}) => {
          return Message.find({ conversationId }).populate('sender')
        },
        allMessages: async () => {
          return Message.find()
        }
      },
    Mutation: {
        createConversation: async (_, {id}, context) => {
          return Conversation.create({members: [id, context.user._id]})
        },
        createMessage: async (_, {conversationId, text}, context) => {
          return Message.create({conversationId: conversationId, sender: context.user._id, text: text})
        },
        createPost: async (_, { url, caption, propic }, context) => {
          return Post.create({ photo: url, caption: caption, username: context.user.username, id: context.user._id, propic: propic })
        },
        addLike: async (_, { postId }, context) => {
          return Post.findOneAndUpdate({_id: postId}, {$push: {likes: context.user._id}}, {new: true});
        },
        removeLike: async (_, { postId }, context) => {
          return Post.findOneAndUpdate({_id: postId}, {$pull: {likes: context.user._id}}, {new: true});
        },
        addComment: async (_, {postId, propic, comment}) => {
          return Post.findOneAndUpdate({_id: postId}, {$addToSet: { comments: {commentText: comment, propic: propic}}}, {new: true})
        },
        addFollowing: async (_, { id }, context) => {
          const user1 = await User.findOneAndUpdate({ _id: context.user._id }, { $push: {following: id } }, {new: true}).populate('followers').populate('following');
          const user2 = await User.findOneAndUpdate({ _id: id }, { $push: {followers: context.user._id } }, {new: true}).populate('followers').populate('following');
          return [user1, user2]
        },
        removeFollowing: async (_, { id }, context) => {
          const user1 = await User.findOneAndUpdate({ _id: context.user._id }, { $pull: {following: id } }, {new: true}).populate('followers').populate('following');
          const user2 = await User.findOneAndUpdate({ _id: id }, { $pull: {followers: context.user._id } }, {new: true}).populate('followers').populate('following');
          return [user1, user2]
        },
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
        signUp: async (parent, { email, username, password, online, bio, propic, followers, following }) => {
            const user = await User.create({ email, username, password, online, bio, propic, followers, following });
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

            await User.updateOne({ email }, { online: true }, {new: true});
      
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