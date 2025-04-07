const express = require('express')
const multer  = require('multer')
const upload = multer({ dest: 'uploads/' })

const app = express()
const port = 15002

// Tratar o pedido ...
app.post('/ficheiros', upload.fields([{name: 'imagens', maxCount: 2}, {name: 'textos', maxCount: 2}]), (req, res) => {
    console.log('Info sobre o ficheiro recebido:')
    console.log(JSON.stringify(req.files))
    console.log('Info sobre o pedido recebido:')
    console.log(JSON.stringify(req.body))
    res.send(`<p>Recebi ${req.files.imagens.length + req.files.textos.length} ficheiros</p>`)
})


app.listen(port, () => {
    console.log(`Servidor à escuta na porta ${port}...`)
})



