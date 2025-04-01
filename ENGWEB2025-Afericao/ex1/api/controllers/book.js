var Book = require('../models/book');

module.exports.getBooks = () => {
    return Book.find().exec();
}

module.exports.getBookById = (id) => {
    return Book.findById(id).exec();
    //Outra opção (como sabemos que é só 1 resultado findOne em vez de find)
    //return Contrato.findOne({_id: id}).exec();
}

module.exports.getBooksByCharater = (charater) => {
    //find devolve lista (findOne devolve objeto)
    return Book.find({characters: charater}).exec();
}

module.exports.getBooksByGenre = (genre) => {
    return Book.find({genres: genre}).exec();
}

module.exports.getCharaters = () => {
    return Book
        .distinct("characters")
        .sort({characters: 1})
        .exec();
}

module.exports.getGenres = () => {
    return Book
        .distinct("genres")
        .sort({genres : 1})
        .exec();
}

/*
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
*/