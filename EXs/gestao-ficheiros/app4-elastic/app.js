const express = require('express')
const multer  = require('multer')
const upload = multer({ dest: 'uploads/' })
const fs = require('fs')

const app = express()
const port = 15001

// Tratar o pedido ...
app.post('/ficheiros', upload.array('myFile'), (req, res) => {
    console.log('Info sobre o ficheiro recebido:')
    console.log(JSON.stringify(req.files))
    console.log('Info sobre o pedido recebido:')
    console.log(JSON.stringify(req.body))
    
    // coiso extra - guardar coisas no filesystem em vez da cache (uploads) com os nomes originais
    // depois a meta informação dos ficheiros também é preciso ser guardada numa base de dados
    req.files.forEach((file) => {
        //para experimentar o __dirname
        const oldPath = __dirname + '/' + file.path
        const newPath = __dirname +  `/public/fireStore/${file.originalname}`
        fs.rename(oldPath, newPath, (err) => {
            if (err) throw err
        })
    })
    
    res.send(`<p>Recebi ${req.files.length} ficheiros</p>`)
})


app.listen(port, () => {
    console.log(`Servidor à escuta na porta ${port}...`)
})



