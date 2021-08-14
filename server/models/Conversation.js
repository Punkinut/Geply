const { Schema, model } = require('mongoose');

const ConversationSchema = new Schema({
    members: {
        type: Array,
    },
});

const Conversation = model('Conversation', ConversationSchema);

module.exports = Conversation;
