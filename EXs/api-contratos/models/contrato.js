var mongoose = require('mongoose');

var contratosSchema = new mongoose.Schema({
    _id: {type : String, required: true},
    nAnuncio: String,
    tipoprocedimento: String,
    objectoContrato: String,
    dataPublicacao: String,
    dataCelebracaoContrato: String,
    precoContratual: Number,
    prazoExecucao: String,
    NIPC_entidade_comunicante: String,
    entidade_comunicante: String,
    fundamentacao: String,
}, {versionKey: false});

module.exports = mongoose.model('contrato', contratosSchema);
