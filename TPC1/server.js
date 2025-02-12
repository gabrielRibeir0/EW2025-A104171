const http = require('http')
const axios = require('axios')

http.createServer((req, res) => {
    console.log("METHOD:" + req.method)
    console.log("URL:" + req.url)

    if(req.method === "GET"){
        if (req.url === "/"){
            res.writeHead(200, {'Content-Type' : 'text/html;charset=utf-8'})
            res.write("<h1>Reparações</h1>")
            res.write("<ul>")
            res.write("<li><a href='/reparacoes'>Lista de Reparações</a></li>")
            res.write("<li><a href='/viaturas'>Lista de Viaturas</a></li>")
            res.write("<li><a href='/intervencoes'>Lista de Intervenções</a></li>")
            res.write("</ul>")
            res.end()
        }
        else if(req.url === "/reparacoes"){
            axios.get('http://localhost:3000/reparacoes?_sort=nome')
                .then(resp => {
                    var cidades = resp.data
                    res.writeHead(200, {'Content-Type' : 'text/html;charset=utf-8'})
                    res.write("<h1>Reparações</h1>")
                    res.write("<ul>")
                    cidades.forEach(r => {
                        res.write(`<li><a href='/reparacoes?nif=${r.nif}'>${r.nome}</a></li>`)
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
        else if (req.url.match(/\/reparacoes\?nif=\d+/)){
            var nif = req.url.split("=")[1]
            console.log(nif)
            axios.get(`http://localhost:3000/reparacoes?nif=${nif}`)
                .then(resp => {
                    if(resp.data.length == 0){
                        res.writeHead(404, {'Content-Type' : 'text/html;charset=utf-8'})
                        res.end()
                        return;
                    }
                    else{
                        var reparacao = resp.data[0]
                    }
                    console.log("COISO")
                    console.log(reparacao)
                    res.writeHead(200, {'Content-Type' : 'text/html;charset=utf-8'})
                    res.write("<p><b>Nome:</b> " + reparacao.nome + "</p>")
                    res.write("<p><b>Nif:</b> " + reparacao.nif + "</p>")
                    res.write("<p><b>Data:</b> " + reparacao.data + "</p>")
                    res.write("<p><b>Viatura:</b> <a href='/viaturas?matricula=${reparacao.viatura}'>" + reparacao.viatura + "</a></p>")
                    res.write("<p><b>Nº intervenções:</b> " + reparacao.nr_intervencoes + "</p>")
                    res.write("<p><b>Intervencoes:</b></p>")
                    res.write("<ul>")
                    reparacao.intervencoes.forEach(i => {
                        res.write(`<li><a href='/intervencoes?nome=${i}'>${i}</a></li>`)
                    });
                    res.write("</ul>")
                    res.write("<h6><a href='/reparacoes'>Voltar</a></h6>")
                    res.end()
                })
                .catch(err => {
                    res.writeHead(500, {'Content-Type' : 'text/html;charset=utf-8'})
                    console.log(err)
                    res.end()
                }) 
        }  
        else if (req.url === "/viaturas"){
            res.writeHead(501, {'Content-Type' : 'text/html;charset=utf-8'})
            res.end()
        }
        else if (req.url === "/intervencoes"){
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
}).listen(1234)

console.log("Servidor aberto em http://localhost:1234...")