var http = require('http')
var axios = require('axios')
const { parse } = require('querystring');
var templates = require('./templates')
var static = require('./static.js')

function collectRequestBodyData(request, callback) {
    if(request.headers['content-type'] === 'application/x-www-form-urlencoded') {
        let body = '';
        request.on('data', chunk => {
            body += chunk.toString();
        });
        request.on('end', () => {
            callback(parse(body));
        });
    }
    else {
        callback(null);
    }
}


var alunosServer = http.createServer((req, res) => {
    // Logger: what was requested and when it was requested
    var d = new Date().toISOString().substring(0, 16)
    console.log(req.method + " " + req.url + " " + d)

    // Handling request
    if(static.staticResource(req)){
        static.serveStaticResource(req, res)
    }
    else{
        switch(req.method){
            case "GET": 
                // GET /alunos --------------------------------------------------------------------
                if(req.url == '/' || req.url == 'alunos'){
                    res.writeHead(405, {'Content-Type': 'text/html; charset=utf-8'})

                }
                // GET /alunos/:id --------------------------------------------------------------------
                else if(req.url.match(/\alunos\/[A|PG]\d+$/)){
                    res.writeHead(405, {'Content-Type': 'text/html; charset=utf-8'})
                }
                // GET /alunos/registo --------------------------------------------------------------------
                else if(req.url == '/alunos/registo'){
                    res.writeHead(405, {'Content-Type': 'text/html; charset=utf-8'})
                    res.write(templates.studentFormPage(d))
                    res.end()
                }
                else if(req.url.match(/\alunos\/edit\/[A|PG]\d+$/)){
                    id = req.url.split("/")[3]
                    axios.get('http://localhost:3000/alunos/' + id)
                        .then(resp => {
                            aluno = resp.data
                            res.writeHead(405, {'Content-Type': 'text/html; charset=utf-8'})
                            res.write(templates.studentFormEditPage(aluno,d))
                            res.end()
                        })
                        .catch(erro => {
                            console.log(erro)
                            res.writeHead(500, {'Content-Type': 'text/html; charset=utf-8'})
                            res.write("<p>Erro: " + erro + "</p>")
                            res.end()
                        })

                    res.writeHead(405, {'Content-Type': 'text/html; charset=utf-8'})

                }
                else if(req.url.match(/\alunos\/delete\/[A|PG]\d+$/)){
                    res.writeHead(405, {'Content-Type': 'text/html; charset=utf-8'})
                }
                else{
                    res.writeHead(404, {'Content-Type': 'text/html; charset=utf-8'})
                    res.end()
                }

                // GET /alunos/:id --------------------------------------------------------------------
                
                // GET /alunos/registo --------------------------------------------------------------------
               
                // GET /alunos/edit/:id --------------------------------------------------------------------
               
                // GET /alunos/delete/:id --------------------------------------------------------------------
                
                // GET ? -> Lancar um erro
                break
            case "POST":
                // POST /alunos/registo --------------------------------------------------------------------
                if(req.url === '/alunos/registo'){
                    collectRequestBodyData(req, result => {
                       if(result){
                            axios.post('http://localhost:3000/alunos', result)
                                .then(resp => {
                                    res.writeHead(201, {'Content-Type': 'text/html; charset=utf-8'})
                                    res.write(`<p>Registo Inserido: ${JSON.stringify(resp.data)}</p>`)
                                    res.end()
                                })
                                .catch(erro => {
                                    console.log(erro)
                                    res.writeHead(500, {'Content-Type': 'text/html; charset=utf-8'})
                                    res.write("<p>Erro: " + erro + "</p>")
                                    res.end()
                                })
                       }else{ //em caso de nao ter resultado
                            console.log(erro)
                            res.writeHead(500, {'Content-Type': 'text/html; charset=utf-8'})
                            res.end()
                       }
                    })
                } else if(req.url.match(/\alunos\/edit\/[A|PG]\d+$/)){
                    collectRequestBodyData(req, result => {
                        if(result){
                            axios.put('http://localhost:3000/alunos/' + result.id, result)
                                .then(resp => {
                                    res.writeHead(200, {'Content-Type': 'text/html; charset=utf-8'})
                                    res.write(`<p>Registo Atualizado: ${JSON.stringify(resp.data)}</p>`)
                                    res.end()
                                })
                                .catch(erro => {
                                    console.log(erro)
                                    res.writeHead(500, {'Content-Type': 'text/html; charset=utf-8'})
                                    res.write("<p>Erro: " + erro + "</p>")
                                    res.end()
                                })
                        }else{ //em caso de nao ter resultado
                            console.log(erro)
                            res.writeHead(500, {'Content-Type': 'text/html; charset=utf-8'})
                            res.end()
                        }
                    })
                } 
                else if(req.url.match(/\alunos\/delete\/[A|PG]\d+$/)){
                    id = req.url.split("/")[3]
                    axios.delete('http://localhost:3000/alunos/' + id)
                                .then(resp => {
                                    res.writeHead(200, {'Content-Type': 'text/html; charset=utf-8'})
                                    res.write(`<p>Registo Eliminado</p>`)
                                    res.end()
                                })
                                .catch(error => {
                                    console.log(erro)
                                    res.writeHead(500, {'Content-Type': 'text/html; charset=utf-8'})
                                    res.write("<p>Erro: " + error + "</p>")
                                    res.end()
                                })
                }else{
                    res.writeHead(500, {'Content-Type': 'text/html; charset=utf-8'})
                    res.end()
                }
                break;
                
                // POST /alunos/edit/:id --------------------------------------------------------------------

                // POST ? -> Lancar um erro
            case "PUT":
                if(req.url.match(/\alunos\/edit\/[A|PG]\d+$/)){
                    collectRequestBodyData(req, result => {
                        if(result){
                            axios.put('http://localhost:3000/alunos/' + result.id, result)
                                .then(resp => {
                                    res.writeHead(200, {'Content-Type': 'text/html; charset=utf-8'})
                                    res.write(`<p>Registo Atualizado: ${JSON.stringify(resp.data)}</p>`)
                                    res.end()
                                })
                                .catch(error => {
                                    console.log(erro)
                                    res.writeHead(500, {'Content-Type': 'text/html; charset=utf-8'})
                                    res.write("<p>Erro: " + error + "</p>")
                                    res.end()
                                })
                        }else{ //em caso de nao ter resultado
                            console.log(erro)
                            res.writeHead(500, {'Content-Type': 'text/html; charset=utf-8'})
                            res.end()
                        }
                    })
                }else{
                    res.writeHead(404, {'Content-Type': 'text/html; charset=utf-8'})
                    res.end()
                }
            case "DELETE":
            default: 
                // Outros metodos nao sao suportados
                res.writeHead(500, {'Content-Type': 'text/html; charset=utf-8'})
                res.write("<p>Erro: Metodo nao suportado</p>")
                res.end()
        }
    }
})

alunosServer.listen(7777, ()=>{
    console.log("Servidor à escuta na porta 7777...")
})



