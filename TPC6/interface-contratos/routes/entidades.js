var express = require('express');
const axios = require('axios');
var router = express.Router();

/* GET users listing. */
router.get('/:nipc', function(req, res, next) {
  axios.get('http://localhost:16000/contratos?entidade=' + req.params.nipc)
    .then(resp => {
      let soma = 0;
      if (resp.data.length > 0) {
        soma = resp.data.reduce((acc, { precoContratual }) => acc + precoContratual, 0).toFixed(2);
      }
      
      res.render('entidade', { title: 'Página da Entidade',
        listaContratos: resp.data,
        nipc: req.params.nipc,
        nome_entidade: resp.data[0].entidade_comunicante || 'Entidade não encontrada',
        somatorioContratos: soma
      });
    })
    .catch(error => {
      console.error('Error fetching data from API:', error);
    });
});

module.exports = router;
