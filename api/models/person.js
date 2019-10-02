const mongoose = require('mongoose');

const personSchema = mongoose.Schema({
    _id: mongoose.Schema.Types.ObjectId,
    name: {type : String, required: true},
    createdAt : {type : Date, default :Date.now() }
});

module.exports = mongoose.model('Person', personSchema);