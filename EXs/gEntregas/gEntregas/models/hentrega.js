//Entregas removidas
var mongoose = require('mongoose');

var hEntregaSchema = new mongoose.Schema({
    _id : String, 
    data : Date,
    uc : String,
    projeto: String,
    titulo : String,
    id_equipa : String,
    desc_equipa : String,
    file : String,
    obs : String,
    data_del : Date,
    justificacao : String,
}, {versionKey: false});

module.exports = mongoose.model('hEntrega', hEntregaSchema);