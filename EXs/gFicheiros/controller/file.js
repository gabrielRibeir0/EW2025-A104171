var File = require('../model/file');

module.exports.findFiles = () => {
    return File.find().exec();
}

module.exports.save = (file, name, path) => {
    var fileDb = new File({
        _id: file.originalname,
        name: name,
        originalName: file.originalname,
        date: new Date().toISOString().substring(0, 19),
        mimetype: file.mimetype,
        size: file.size,
        path: path
    })

    return fileDb.save()
}

/*module.exports.findbyId = id => {
    return Aluno.findOne({_id:id}).exec();
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
}*/