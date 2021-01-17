const mongoose = require('mongoose');

const suggestionSchema = mongoose.Schema({
    _id: mongoose.Schema.Types.ObjectId,
    guildID: String,
    userID: String,
    message: String
});

module.exports = mongoose.model('Suggestions', suggestionSchema, 'suggestions');