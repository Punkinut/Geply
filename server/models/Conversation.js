const { Schema, model } = require('mongoose');

const ConversationSchema = new Schema({

});

const Conversation = model('Conversation', ConversationSchema);

module.exports = Conversation;
