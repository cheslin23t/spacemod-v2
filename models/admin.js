const mongoose = require('mongoose');

const userSchema = mongoose.Schema({
    _id: mongoose.Schema.Types.ObjectId,
    name: String,
    userID: String,
    level: String
});

module.exports = mongoose.model('Admin', userSchema, 'admins');