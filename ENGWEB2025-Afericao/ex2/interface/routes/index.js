var express = require('express');
var router = express.Router();
var axios = require('axios');
/* GET home page. */
router.get('/', function(req, res, next) {
  axios.get('http://localhost:17000/books')
  .then(response => {
    res.render('index', { title: 'Livros', livros:response.data });
  })
  .catch(error => {
    console.error('Error fetching data:', error);
    res.status(500).send('Error fetching data');
  });
  
});

router.get('/:id', function(req, res, next) {
  const id = req.params.id;
  axios.get(`http://localhost:17000/books/${id}`)
  .then(response => {
    res.render('livro', { title: 'Livro', livro:response.data });
  })
  .catch(error => {
    console.error('Error fetching data:', error);
    res.status(500).send('Error fetching data');
  });
});

router.get('/autores/:idAutor', function(req, res, next) {
  const idAutor = req.params.idAutor;
  axios.get(`http://localhost:17000/books?author=${idAutor}`)
  .then(response => {
    res.render('autor', { title: 'Autor', livros:response.data });
  })
  .catch(error => {
    console.error('Error fetching data:', error);
    res.status(500).send('Error fetching data');
  });
});

module.exports = router;
