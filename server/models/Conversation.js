const { Schema, model } = require('mongoose');

const ConversationSchema = new Schema({
    members: {
        type: [{ type: Schema.Types.ObjectId, ref: 'User' }],
    },
});

const Conversation = model('Conversation', ConversationSchema);

module.exports = Conversation;
