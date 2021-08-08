const { Schema, model } = require('mongoose');

const PostSchema = new Schema({
  photo: {
    type: String,
    required: true,
  },
  id: {
    type: String,
    required: true,
  },
  propic: {
    type: String,
    required: true
  },
  caption : {
    type: String,
    required: true,
  },
  username: {
    type: String,
    required: true,
  },
  likes : [{ type: Schema.Types.ObjectId, ref: 'User' }],
  comments: [
    {
      propic: {
        type: String,
        required: true
      },
      commentText: {
        type: String,
        required: true,
      },
    },
  ],
});

const Post = model('Post', PostSchema);

module.exports = Post;
