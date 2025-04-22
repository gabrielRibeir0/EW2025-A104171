const mongoose = require('mongoose')
const passportLocalMongoose = require('passport-local-mongoose')

var userSchema = new mongoose.Schema({
    username: String,
    password: String,
    name: String,
    level: String,
    active: Boolean,
    creationDate: Date
}, {versionKey: false})

userSchema.plugin(passportLocalMongoose)

module.exports = mongoose.model('user', userSchema)