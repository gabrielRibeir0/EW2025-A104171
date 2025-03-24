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
  
  const updateOps = { $set: {}, $unset: {} };
  let hasUnset = false;
  
  updateOps.$set.nome = aluno.nome;
  updateOps.$set.gitlink = aluno.gitlink;
  
  for (let i = 1; i <= 8; i++) {
    const tpc = `tpc${i}`;
    if (tpc in aluno) {
      updateOps.$set[tpc] = aluno[tpc];
    } else {
      updateOps.$unset[tpc] = "";
      hasUnset = true;
    }
  }
  
  if (!hasUnset) {
    delete updateOps.$unset;
  }
  
  return Aluno.findByIdAndUpdate(id, updateOps).exec();

}

module.exports.delete = id => {
    return Aluno.findByIdAndDelete(id).exec();
}