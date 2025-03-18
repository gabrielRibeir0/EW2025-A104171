var Aluno = require('../models/aluno');

module.exports.list = () => {
    return Aluno.find().
    sort({nome:1}).
    exec();
}

module.exports.findbyId = id => {
    return Aluno.findOne({_id:id}).exec();
}   

module.exports.insert = aluno => {
    if(Aluno.find({_id:aluno.id}).exec().length != 1){
        var novo = new Aluno(aluno);
        novo._id = aluno.id
        return novo.save();
    }
}

module.exports.update = (id, aluno) => {
    Aluno.findByIdAndUpdate(id, aluno).exec();
}

module.exports.delete = id => {
    Aluno.findByIdAndDelete(id).exec();
}

module.exports.inverteTpc = (id, idTpc) => {    
    return Aluno.findOne
    ({_id:id}).exec().then(aluno => {
        var tpc = `tpc${idTpc}`

        if(aluno(tpc))
            aluno(tpc) = false;
        else
            aluno(tpc) = true;
        
            return Aluno.findByIdAndUpdate(id, aluno).exec();
    }
    )
}