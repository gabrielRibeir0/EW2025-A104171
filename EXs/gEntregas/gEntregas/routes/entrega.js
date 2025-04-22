var express = require('express');
var router = express.Router();
var Entrega = require('../controllers/entrega');
var multer = require('multer');
var upload = multer({ dest: 'uploads/' });
var fs = require('fs');
var jszip = require('jszip');
var xml2js = require('xml2js');


router.get('/', (req, res) => {
  Entrega.findAll().then((data) => {
    res.status(200).json(data);
  })
  .catch((err) => {
    console.log(err);
    res.status(500).jsonp(err);
  });

  //TODO: GET /entrega?projeto=id: 
});

router.get('/:id', (req, res) => {
  Entrega.findById(req.params.id).then((data) => {
    res.status(200).json(data);
  })
  .catch((err) => {
    res.status(500).jsonp(err);
  });
});

router.post('/', upload.single('file'), (req, res) => {
    var oldPath = __dirname + '/../' + req.file.path;
    var zipData = fs.readFileSync(oldPath);

    jszip.loadAsync(zipData).
        then( (zip) => {
            zip.file('PR.xml').async('string').then( (data) => {
                var parser = xml2js.Parser();
                parser.parseString(data, (err, result) => {
                    if (err) {
                        res.status(500).jsonp(err);
                    }

                    var newPath = __dirname + '/../oublic/fireStore/' + result.pr.metadata.projeto[0] + '/' + req.file.originalname;
                    fs.rename(oldPath, newPath, (err) => {
                        if (err) {
                            throw err;
                        }
                    });

                    var entrega = {
                        _id: result.pr.metadata.id[0],
                        data: new Date(),
                        uc: result.pr.metadata.uc[0],
                        projeto: result.pr.metadata.projeto[0],
                        titulo: result.pr.metadata.titulo[0],
                        id_equipa: result.pr.equipa.id[0],
                        desc_equipa: result.pr.equipa.nome[0],
                        file: newPath,
                        obs: result.pr.obs[0]
                    };

                    Entrega.save(entrega).then((data) => {
                        res.status(201).jsonp(data);
                    })
                    .catch((err) => {
                        res.status(500).jsonp(err);
                    });
                });
            })
            .catch((err) => {
                res.status(500).jsonp(err);
            });
        })
        .catch((err) => {
            res.status(500).jsonp(err);
        });
});

module.exports = router;