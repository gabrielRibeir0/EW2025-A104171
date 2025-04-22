const mongoose = require('mongoose');

const fileSchema = new mongoose.Schema({
    _id: String, //nome
    name: String,
    originalName: String,
    date: Date,
    mimetype: String,
    size: Number,
    path: String,
}, {versionKey: false});

module.exports = mongoose.model('files', fileSchema);