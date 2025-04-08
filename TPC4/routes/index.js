var express = require('express');
var router = express.Router();
var axios = require('axios');

/* GET home page. */
router.get('/', function(req, res, next) {
	res.render('index', 
	{title: 'Engenharia das Webs 2025', 
		docente: 'jcr',
		instituicao: 'UMinho'
	});
});

router.get('/movies', function(req, res) {
  axios.get('http://localhost:3000/movies')
    .then(resp => {
      	res.render('filmes', { lfilmes: resp.data, title: 'Lista de Filmes' });
    })
    .catch(error => {
      	console.log(error)
      	res.render('error', {error: error});
    });
});

router.get('/movies/edit/:movie_id', (req, res) => {
	axios.get('http://localhost:3000/movies/' + req.params.movie_id)
	.then(resp => {
		res.render('editFilme', {filme: resp.data, title: 'Editar Filme'});
	})
	.catch(error => {
		console.log(error);
		res.render('error', {error: error});
	});
});

router.get('/movies/delete/:movie_id', (req, res) => {
	axios.delete('http://localhost:3000/movies/' + req.params.movie_id)
    .then(resp => {
      	res.redirect('/movies');
    })
    .catch(error => {
		console.log(error)
		res.render('error', {error: error});
    });
});

router.post('/movies/edit/:movie_id', (req, res) => {
	const existingCast = Array.isArray(req.body.cast) ? req.body.cast : [req.body.cast].filter(Boolean);
	const existingGenres = Array.isArray(req.body.genres) ? req.body.genres : [req.body.genres].filter(Boolean);
	
	const newCast = req.body.newCast ? req.body.newCast.split(',').map(item => item.trim()).filter(Boolean) : [];
	const newGenres = req.body.newGenres ? req.body.newGenres.split(',').map(item => item.trim()).filter(Boolean) : [];
	
	const allCast = [...existingCast, ...newCast];
	const allGenres = [...existingGenres, ...newGenres];
	 
	axios.put('http://localhost:3000/movies/' + req.params.movie_id, {
		title: req.body.title,
		year: req.body.year,
		cast: allCast,
		genres: allGenres
	})
	.then(resp => {
		res.redirect('/movies');
	})
	.catch(error => {
		console.log(error);
		res.render('error', {error: error});
	});
});

module.exports = router;