var express = require('express');
var router = express.Router();
var Contrato = require('../controllers/contrato');

/* GET contratos. */
router.get('/', function(req, res, next) {
  if(req.query.entidade) {
    Contrato.getContratosByEntidade(req.query.entidade)
      .then(dados => res.jsonp(dados)) //default status 200
      .catch(erro => res.status(500).jsonp(erro));
  }
  else if(req.query.tipo){
    Contrato.getContratosByTipo(req.query.tipo)
      .then(dados => res.jsonp(dados)) //default status 200
      .catch(erro => res.status(500).jsonp(erro));
  }
  else{
    Contrato.getContratos()
      .then(dados => res.jsonp(dados)) //default status 200
      .catch(erro => res.status(500).jsonp(erro));
  }
});

//GET entidades por ordem alfabetica
router.get('/entidades', function(req, res, next) {
  Contrato.getEntidades()
    .then(dados => res.jsonp(dados)) 
    .catch(erro => res.status(500).jsonp(erro));
});

//GET tipos por ordem alfabetica
router.get('/tipos', function(req, res, next) {
  Contrato.getTipos()
    .then(dados => res.jsonp(dados)) 
    .catch(erro => res.status(500).jsonp(erro));
});

//GET contratos by id
router.get('/:id', function(req, res, next) {
  Contrato.getContratoById(req.params.id)
    .then(dados => res.jsonp(dados)) 
    .catch(erro => res.status(500).jsonp(erro));
});


//POST inserir novo contrato
router.post('/', function(req, res, next) {
  Contrato.insert(req.body)
    .then(dados => res.status(201).jsonp(dados)) 
    .catch(erro => res.status(500).jsonp(erro));
});

//PUT atualizar info contrato
router.put('/:id', function(req, res, next) {
  Contrato.insert(req.body, req.params.id)
    .then(dados => res.jsonp(dados)) 
    .catch(erro => res.status(500).jsonp(erro));
});

//DELETE contrato
router.delete('/:id', function(req, res, next) {
  Contrato.delete(req.params.id)
    .then(dados => res.jsonp(dados)) 
    .catch(erro => res.status(500).jsonp(erro));
});

module.exports = router;
