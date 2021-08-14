const { Schema, model } = require('mongoose');

const MessageSchema = new Schema({
    conversationId: {
        type: String
    },
    sender: {
        type: String
    },
    text: {
        type: String
    },
});

const Message = model('Message', MessageSchema);

module.exports = Message;