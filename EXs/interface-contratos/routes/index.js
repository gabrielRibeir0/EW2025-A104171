var express = require('express');
const axios = require('axios');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
  axios.get('http://localhost:16000/contratos')
    .then(resp => {
      res.render('index', { title: 'Lista de Contratos', data: new Date().toLocaleDateString(), listaContratos: resp.data });
    })
    .catch(error => {
      console.error('Error fetching data from API:', error);
    });
});

router.get('/:id', function(req, res, next) {
  axios.get('http://localhost:16000/contratos/' + req.params.id)
    .then(resp => {
      res.render('contrato', { title: 'Página do Contrato', contrato: resp.data });
    })
    .catch(error => {
      console.error('Error fetching data from API:', error);
    });
});

module.exports = router;
