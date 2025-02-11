exports.myDateTime = () => {
    return new Date().toISOString().substring(0,16)
}

exports.myName = function(){
    return 'Gabriel Ribeiro'
}

exports.turma = "EngWeb2025::TP3"