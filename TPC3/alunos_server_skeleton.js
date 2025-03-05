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
                // GET / or /alunos --------------------------------------------------------------------
                if(req.url == '/' || req.url == 'alunos'){
                    axios.get('http://localhost:3000/alunos')
                        .then(resp => {
                            res.writeHead(200, {'Content-Type': 'text/html; charset=utf-8'})
                            res.write(templates.studentsListPage(resp.data, d))
                            res.end()
                        })
                        .catch(erro => {
                            console.log(erro)
                            res.writeHead(500, {'Content-Type': 'text/html; charset=utf-8'})
                            res.end(templates.errorPage(erro, d))
                        })
                }
                // GET /alunos/:id --------------------------------------------------------------------
                else if(req.url.match(/\alunos\/[A|PG]\d+$/)){
                    id = req.url.split("/")[2]
                    axios.get('http://localhost:3000/alunos/' + id)
                        .then(resp => {
                            aluno = resp.data
                            res.writeHead(200, {'Content-Type': 'text/html; charset=utf-8'})
                            res.write(templates.studentPage(aluno,d))
                            res.end()
                        })
                        .catch(erro => {
                            console.log(erro)
                            res.writeHead(500, {'Content-Type': 'text/html; charset=utf-8'})
                            res.end(templates.errorPage(erro, d))
                        })
                }
                // GET /alunos/registo --------------------------------------------------------------------
                else if(req.url == '/alunos/registo'){
                    res.writeHead(405, {'Content-Type': 'text/html; charset=utf-8'})
                    res.write(templates.studentFormPage(d))
                    res.end()
                }
                // GET /alunos/edit/:id --------------------------------------------------------------------
                else if(req.url.match(/\/alunos\/edit\/[A|PG]\d+$/)){
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
                            res.write(templates.errorPage(erro, d))
                            res.end()
                        })
                }
                // GET ? -> Lancar um erro
                else{
                    res.writeHead(404, {'Content-Type': 'text/html; charset=utf-8'})
                    res.write(templates.errorPage("Resource not found: " + req.url, d))
                    res.end()
                }
                break
            case "POST":
                // POST /alunos/registo --------------------------------------------------------------------
                if(req.url === '/alunos/registo'){
                    collectRequestBodyData(req, result => {
                       if (result) {
                            axios.post('http://localhost:3000/alunos', result)
                                .then(resp => {
                                    res.writeHead(201, {'Content-Type': 'text/html; charset=utf-8'})
                                    res.write(templates.confirmationPage(`Registo Inserido: ${JSON.stringify(resp.data)}`))
                                    res.end()
                                })
                                .catch(erro => {
                                    console.log(erro)
                                    res.writeHead(500, {'Content-Type': 'text/html; charset=utf-8'})
                                    res.write(templates.errorPage(erro, d))
                                    res.end()
                                })
                        } else { //em caso de nao ter resultado
                            res.writeHead(500, {'Content-Type': 'text/html; charset=utf-8'})
                            res.write(templates.errorPage("Error collecting form data", d))
                            res.end()
                        }
                    })
                } 
                // POST /alunos/edit/:id --------------------------------------------------------------------
                else if (req.url.match(/\/alunos\/edit\/[A|PG]\d+$/)) {
                    collectRequestBodyData(req, result => {
                        if (result) {
                            axios.put('http://localhost:3000/alunos/' + result.id, result)
                                .then(resp => {
                                    res.writeHead(200, {'Content-Type': 'text/html; charset=utf-8'})
                                    res.write(templates.confirmationPage(`Registo Atualizado: ${JSON.stringify(resp.data)}`))
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
                // POST /alunos/delete/:id --------------------------------------------------------------------
                else if (req.url.match(/\/alunos\/delete\/[A|PG]\d+$/)) {
                    id = req.url.split("/")[3]
                    axios.delete('http://localhost:3000/alunos/' + id)
                                .then(resp => {
                                    res.writeHead(200, {'Content-Type': 'text/html; charset=utf-8'})
                                    res.write(templates.confirmationPage(`Registo Eliminado`))
                                    res.end()
                                })
                                .catch(error => {
                                    console.log(erro)
                                    res.writeHead(500, {'Content-Type': 'text/html; charset=utf-8'})
                                    res.write(templates.errorPage(erro, d))
                                    res.end()
                                })
                }
                // POST ? -> Lancar um erro
                else {
                    res.writeHead(404, {'Content-Type': 'text/html; charset=utf-8'})
                    res.write(templates.errorPage("Resource not found: " + req.url, d))
                    res.end()
                }
                break
                
            case "PUT":
                if(req.url.match(/\/alunos\/edit\/[A|PG]\d+$/)){
                    collectRequestBodyData(req, result => {
                        if (result) {
                            axios.put('http://localhost:3000/alunos/' + result.id, result)
                                .then(resp => {
                                    res.writeHead(200, {'Content-Type': 'text/html; charset=utf-8'})
                                    res.write(templates.confirmationPage(`Registo Atualizado: ${JSON.stringify(resp.data)}`))
                                    res.end()
                                })
                                .catch(error => {
                                    console.log(erro)
                                    res.writeHead(500, {'Content-Type': 'text/html; charset=utf-8'})
                                    res.write(templates.errorPage("Error collecting form data", d))
                                    res.end()
                                })
                        } else { //em caso de nao ter resultado
                            console.log(erro)
                            res.writeHead(500, {'Content-Type': 'text/html; charset=utf-8'})
                            res.end()
                        }
                    })
                } else {
                    res.writeHead(404, {'Content-Type': 'text/html; charset=utf-8'})
                    res.write(templates.errorPage("Resource not found: " + req.url, d))
                    res.end()
                }
                break
            default: 
                // Outros metodos nao sao suportados
                res.writeHead(500, {'Content-Type': 'text/html; charset=utf-8'})
                res.write(templates.errorPage("Method not supported: " + req.method, d))
                res.end()
        }
    }
})

alunosServer.listen(7777, ()=>{
    console.log("Servidor à escuta em http://localhost:7777...")
})


