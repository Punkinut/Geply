const { Schema, model } = require('mongoose');

const PostSchema = new Schema({
  photo: {
    type: String,
    required: true,
  },
  caption : {
    type: String,
    required: true,
  },
  username: {
    type: String,
    required: true,
  },
  likes : {
      type: Number
  },
  comments: [
    {
      commentText: {
        type: String,
        required: true,
      },
    },
  ],
});

const Post = model('Post', PostSchema);

module.exports = Post;
