const http = require('http')
const axios = require('axios')

http.createServer((req, res) => {
    console.log("METHOD:" + req.method)
    console.log("URL:" + req.url)

    if(req.method === "GET"){
        if(req.url === "/cidades"){
            axios.get('http://localhost:3000/cidades?_sort=nome')
                .then(resp => {
                    var cidades = resp.data
                    res.writeHead(200, {'Content-Type' : 'text/html;charset=utf-8'})
                    res.write("<h1>Cidades</h1>")
                    res.write("<ul>")
                    cidades.forEach(c => {
                        res.write(`<li><a href='cidades/${c.id}'>${c.nome}</a></li>`)
                    });
                    res.write("</ul>")
                    res.end()
                })
                .catch(err => {
                    res.writeHead(500, {'Content-Type' : 'text/html;charset=utf-8'})
                    console.log(err)
                    res.end()
                })    
        } 
        else if (req.url.match(/\/cidades\/.+/)){
            var id = req.url.split("/")[2]
            axios.get(`http://localhost:3000/cidades/${id}`)
                .then(resp => {
                    var cidade = resp.data
                    res.writeHead(200, {'Content-Type' : 'text/html;charset=utf-8'})
                    res.write(`<h1>${cidade.nome}</h1>`)
                    res.write(`<pre>${JSON.stringify(cidade)}</pre>`)
                    res.write("<h6><a href='/cidades'>Voltar</a></h6>")
                    res.end()
                })
                .catch(err => {
                    res.writeHead(500, {'Content-Type' : 'text/html;charset=utf-8'})
                    console.log(err)
                    res.end()
                }) 
        }  
        else if (req.url === "/ligacoes"){
            res.writeHead(501, {'Content-Type' : 'text/html;charset=utf-8'})
            res.end()
        }
        else{
            res.writeHead(404, {'Content-Type' : 'text/html;charset=utf-8'})
            res.end()
        }
    }
    else{
        res.writeHead(405, {'Content-Type' : 'text/html;charset=utf-8'})
        res.end()
    }
}).listen(4321)

console.log("Servidor aberto em http://localhost:4321...")