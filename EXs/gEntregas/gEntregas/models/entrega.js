var mongoose = require('mongoose');

var entregaSchema = new mongoose.Schema({
    _id : String, 
    data : Date,
    uc : String,
    projeto : String,
    titulo : String,
    id_equipa : String,
    desc_equipa : String,
    file : String,
    obs : String,
}, {versionKey: false});

module.exports = mongoose.model('entrega', entregaSchema);