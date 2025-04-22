var Entrega = require('../models/entrega');
var HEntrega = require('../models/hentrega');

module.exports.findAll = () => {
    return Entrega.find().exec();
}

module.exports.findById = (id) => {
    return Entrega.findById(id).exec();
}

module.exports.save = (entrega) => {
    if ((Entrega.find({_id : entrega._id}).exec().length) < 1) {
        var entregaDb = new Entrega(entrega);
        entregaDb.save();
    }
}