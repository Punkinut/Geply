const { Schema, model } = require('mongoose');

const MessageSchema = new Schema({

});

const Message = model('Message', MessageSchema);

module.exports = Message;