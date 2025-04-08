var express = require('express');
var router = express.Router();
var axios = require('axios');

router.get('/:name', (req, res) => {
  axios.get('http://localhost:3000/actors?name=' + req.params.name)
    .then(resp => {
        ator = resp.data[0];
        res.render('ator', { ator: ator, title: ator.name });
    })
    .catch(error => {
        console.log(error)
        res.render('error', {error: error});
    });
});

module.exports = router;
