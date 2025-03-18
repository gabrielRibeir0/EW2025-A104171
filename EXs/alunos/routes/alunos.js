var express = require('express');
var router = express.Router();
var Aluno = require('../controllers/alunos');

/* GET home page. */
router.get('/', function(req, res, next) {
  Aluno.list()
  .then(dados => {
    res.jsonp(dados);
  })
  .catch(erro => {  
    res.status(500).jsonp(erro) 
  })
});

router.get('/:id', function(req, res, next) {
  Aluno.findbyId(req.params.id)
  .then(dados => {
    res.jsonp(dados);
  })
  .catch(erro => {  
    res.status(500).jsonp(erro) 
  })
});

router.post('/', function(req, res, next) {
  Aluno.insert(req.body)
  .then(dados => {
    res.jsonp(dados);
  })
  .catch(erro => {  
    res.status(500).jsonp(erro) 
  })
});

router.put('/:id', function(req, res, next) {
  Aluno.update(req.params.id, req.body)
  .then(dados => {
    res.jsonp(dados);
  })
  .catch(erro => {  
    res.status(500).jsonp(erro) 
  })
});

router.delete('/:id', function(req, res, next) {
  Aluno.delete(req.params.id)
  .then(dados => {
    res.jsonp(dados);
  })
  .catch(erro => {  
    res.status(500).jsonp(erro) 
  })
});


router.put('/:id/tpc/:idTpc', function(req, res, next) {
  Aluno.inverteTpc(req.params.id, req.params.idTpc)
  .then(dados => {
    res.jsonp(dados);
  })
  .catch(erro => {  
    res.status(500).jsonp(erro) 
  })
});

module.exports = router;
