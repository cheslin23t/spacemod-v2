const mongoose = require('mongoose');

const userSchema = mongoose.Schema({
    _id: mongoose.Schema.Types.ObjectId,
    sent: String,
    Version: String,
    Description: String
});

module.exports = mongoose.model('Updates', userSchema, 'updates')