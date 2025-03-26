var Contrato = require('../models/contrato');

module.exports.getContratos = () => {
    return Contrato.find()
            .sort({precoContratual  : -1}) // extra opcional ordenar por preço descrescente
            .exec();
}

module.exports.getContratoById = (id) => {
    return Contrato.findById(id).exec();
    //Outra opção (como sabemos que é só 1 resultado findOne em vez de find)
    //return Contrato.findOne({_id: id}).exec();
}

module.exports.getContratosByEntidade = (entidade) => {
    //find devolve lista (findOne devolve objeto)
    return Contrato.find({NIPC_entidade_comunicante: entidade}).exec();
}

module.exports.getContratosByTipo = (tipo) => {
    return Contrato.find({tipoprocedimento: tipo}).exec();
}

module.exports.getEntidades = () => {
    return Contrato
        .distinct("entidade_comunicante")
        .sort({entidade_comunicante : 1})
        .exec();
}

module.exports.getTipos = () => {
    return Contrato
        .distinct("tipoprocedimento")
        .sort({tipoprocedimento  : 1})
        .exec();
}

module.exports.insert = (contr) => {
    var contrToSave = new Contrato(contr);
    return contrToSave.save();
}

module.exports.update = (contr, id) => {
    //por default dá return ao objeto antes de ser atualizado
    //com {new: true} dá return ao objeto atual
    return Contrato.findByIdAndUpdate(id, contr, {new: true}).exec();
}

module.exports.delete = (id) => {
    return Contrato.findByIdAndDelete(id, {new: true}).exec();
}