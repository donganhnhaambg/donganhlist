const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const Action = new Schema({
    column: [{type: Object}],
    listTask: [{type: Object}]
})

module.exports = Action;
