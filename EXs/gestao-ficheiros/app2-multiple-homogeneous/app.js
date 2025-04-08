const express = require('express')
const multer  = require('multer')
const upload = multer({ dest: 'uploads/' })

const app = express()
const port = 15001

// Tratar o pedido ...
app.post('/ficheiros', upload.array('myFile'), (req, res) => {
    console.log('Info sobre o ficheiro recebido:')
    console.log(JSON.stringify(req.files))
    console.log('Info sobre o pedido recebido:')
    console.log(JSON.stringify(req.body))
    res.send(`<p>Recebi ${req.files.length} ficheiros</p>`)
})

app.listen(port, () => {
    console.log(`Servidor à escuta na porta ${port}...`)
})



