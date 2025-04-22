var Projeto = require('../models/projeto')

module.exports.findAll = () => {
    Projeto.find().exec()
}

module.exports.findByUC = (uc) => {
    Projeto.find({uc: uc}).exec()
}

module.exports.findById = (id) => {
    Projeto.findById(id).exec()
}