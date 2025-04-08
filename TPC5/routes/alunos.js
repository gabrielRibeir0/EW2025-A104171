var express = require('express');
var router = express.Router();
var Aluno = require('../controllers/alunos');

router.get('/', function(req, res, next) {
  res.render('index', 
    { title: 'Engenharia Web 2025', 
      docente: 'jcr',
      instituicao: 'UMinho'
    });
});

router.get('/alunos', function(req, res, next) {
  Aluno.list()
  .then(dados => {
    res.render('listaAlunos', {alunos: dados});
  })
  .catch(erro => {  
    res.status(500).jsonp(erro) 
  })
});

router.get('/alunos/edit/:id', function(req, res, next) {
  Aluno.findbyId(req.params.id)
  .then(dados => {
    res.render('editAluno', {aluno: dados});
  })
  .catch(erro => {  
    res.status(500).jsonp(erro) 
  })
});

router.post('/alunos/edit/:id', function(req, res, next) {
  Aluno.update(req.params.id, req.body)
  .then(res.redirect('/alunos'))
  .catch(erro => {  
    res.status(500).jsonp(erro) 
  })
});

router.get('/alunos/registo', function(req, res, next) {
  res.render('registerForm');
});

router.post('/alunos/registo', function(req, res, next) {
  Aluno.insert(req.body)
  .then(res.redirect('/alunos'))
  .catch(erro => {  
    res.status(500).jsonp(erro) 
  })
});


router.get('/alunos/delete/:id', function(req, res, next) {
  Aluno.delete(req.params.id)
  .then(res.redirect('/alunos'))
  .catch(erro => {  
    res.status(500).jsonp(erro) 
  })
});

module.exports = router;
