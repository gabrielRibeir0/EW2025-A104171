const   axios = require('axios'),
        FormData = require( "form-data" ),
        fs = require('fs')

const form = new FormData();
var filepath = "../ficheiros-cartoons/coyotte.png"; 
form.append( "imagens", fs.createReadStream( filepath ) );
form.append( "descImg", "Imagem do coyoto" );

filepath = "../ficheiros-cartoons/bugs-bunny.jpg"; 
form.append( "imagens", fs.createReadStream( filepath ) );
form.append( "descImg", "Imagem do bugsini bugguini" );

filepath = "../fpessoa/alma.txt";
form.append( "textos", fs.createReadStream( filepath ) );
form.append( "descTxt", "Texto da alma" );

filepath = "../fpessoa/arte.txt"; 
form.append( "textos", fs.createReadStream( filepath ) );
form.append( "descTxt", "Texto de arte" );

axios.post( "http://localhost:15002/ficheiros", form )
    .then(resposta => {
        console.log("Enviado com sucesso.")
        console.log(JSON.stringify(resposta.data))
    })
    .catch(erro => {
        console.log(JSON.stringify(erro))
    })

  


