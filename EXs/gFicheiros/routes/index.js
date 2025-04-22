var express = require('express');
var router = express.Router();
var multer = require('multer')
var jsonfile = require('jsonfile')
var fs = require('fs')
var File = require('../controller/file')


var upload = multer({dest : 'uploads'})

/* GET home page. */
router.get('/', function(req, res, next) {
  var date = new Date().toISOString().substring(0,16);
  File.findFiles().then(filelist => {
    res.render('index', { files: filelist, date: date });
  })
  .catch(err => {
    res.render('error', { error: err });
  })
});

router.post('/files', upload.array('myFile') ,(req, res)=> {
  req.files.forEach( (file, i) => {
    console.log('cdir: ', __dirname);
    var oldPath = __dirname + '/../' + file.path
    console.log('old: ', oldPath)
    var newPath = __dirname + '/../public/fileStore/' + file.originalname
    console.log('new: ', newPath)

    fs.rename(oldPath, newPath, err => {
      if(err) throw err;
    })

    File.save(file, req.body.name[i], newPath).then(() => {
      res.redirect('/')
    }).catch(err => {
      res.render('error', { error: err });
    })
  })
})

router.get('/fileContent/:name', (req, res) => {
  console.log(__dirname + '/../public/fileStore/' + req.params.name)
  var content = fs.readFileSync(__dirname + '/../public/fileStore/' + req.params.name)
  res.send(content)
})

router.get('/download/:name', (req, res) => {
  console.log(__dirname + '/../public/fileStore/' + req.params.name)
  res.download(__dirname + '/../public/fileStore/' + req.params.name)
})

module.exports = router;
