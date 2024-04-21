const mongoose = require('mongoose')
const Schema = mongoose.Schema;

const MessageFrom = new Schema({
    user_from: String,
    message: String,
    subject: String,
    time: String,
})

module.exports = MessageFrom;