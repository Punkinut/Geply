const { Schema, model } = require('mongoose');
const bcrypt = require('bcrypt');

const userSchema = new Schema(
    {
    email: {
        type: String,
        required: true,
        unique: true,
        match: [/.+@.+\..+/, 'Must use a valid email address'],
      },
      username: {
        type: String,
        required: true,
        unique: true,
      },
      password: {
        type: String,
        required: true,
      },
      online: {
        type: Boolean,
        default: false,
      },
      bio : {
        type: String,
        default: 'No bio yet '
      },
      propic : {
        type: String,
        default: '#'
      },
      followers: [{ type: Schema.Types.ObjectId, ref: 'User' }],
      following: [{ type: Schema.Types.ObjectId, ref: 'User' }]
    },
  );

userSchema.pre('save', async function (next) {
    if (this.isNew || this.isModified('password')) {
      const saltRounds = 10;
      this.password = await bcrypt.hash(this.password, saltRounds);
    }
  
    next();
  });
  
  userSchema.methods.isCorrectPassword = async function (password) {
    return bcrypt.compare(password, this.password);
  };

  const User = model('User', userSchema);

  module.exports = User;