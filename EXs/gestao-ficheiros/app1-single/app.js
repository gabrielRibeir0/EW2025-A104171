const express = require('express')
const multer  = require('multer')
const upload = multer({ dest: 'uploads/' })

const app = express()
const port = 15000

app.post('/ficheiro', upload.single('myFile'), (req, res) => {
    console.log('Info sobre o ficheiro recebido:')
    console.log(JSON.stringify(req.file))
    console.log('Info sobre o pedido recebido:')
    console.log(JSON.stringify(req.body))
    res.send(`<p>Recebi o ficheiro ${JSON.stringify(req.file)}</p>`)
})

app.listen(port, () => {
    console.log(`Servidor à escuta na porta ${port}...`)
})



