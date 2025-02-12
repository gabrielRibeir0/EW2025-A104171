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
                    var reparacoes = resp.data
                    res.writeHead(200, {'Content-Type' : 'text/html;charset=utf-8'})
                    res.write("<h1>Reparações</h1>")
                    res.write("<ul>")
                    reparacoes.forEach(r => {
                        res.write(`<li><a href='/reparacoes/${r.nif}'>${r.nome} (NIF:${r.nif})</a></li>`)
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
        else if (req.url.match(/\/reparacoes\/.+/)){
            var nif = req.url.split("/")[2]
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

                    res.writeHead(200, {'Content-Type' : 'text/html;charset=utf-8'})
                    res.write("<p><b>Nome:</b> " + reparacao.nome + "</p>")
                    res.write("<p><b>Nif:</b> " + reparacao.nif + "</p>")
                    res.write("<p><b>Data:</b> " + reparacao.data + "</p>")
                    res.write("<p><b>Viatura:</b> <a href='/viaturas?matricula=${reparacao.viatura}'>" + reparacao.viatura + "</a></p>")
                    res.write("<p><b>Nº intervenções:</b> " + reparacao.nr_intervencoes + "</p>")
                    res.write("<p><b>Intervencoes:</b></p>")
                    res.write("<ul>")
                    reparacao.intervencoes.forEach(i => {
                        res.write(`<li><a href='/intervencoes/${i}'>${i}</a></li>`)
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
            axios.get('http://localhost:3000/intervencoes?_sort=codigo')
                .then(resp => {
                    var intervencoes = resp.data
                    res.writeHead(200, {'Content-Type' : 'text/html;charset=utf-8'})
                    res.write("<h1>Intervenções</h1>")
                    res.write("<ul>")
                    intervencoes.forEach(i => {
                        res.write(`<li><a href='/intervencoes/${i.codigo}'>${i.codigo}</a></li>`)
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
        else if (req.url.match(/\/intervencoes\/.+/)){
            var codigo = req.url.split("/")[2]
            console.log(codigo)
            axios.get(`http://localhost:3000/intervencoes?codigo=${codigo}`)
                .then(resp => {
                    if(resp.data.length == 0){
                        res.writeHead(404, {'Content-Type' : 'text/html;charset=utf-8'})
                        res.end()
                        return;
                    }
                    else{
                        var intervencao = resp.data[0]
                    }
                    axios.get(`http://localhost:3000/reparacoes?q=${codigo}`)
                        .then(resp2 => {
                            if(resp2.data.length == 0){
                                var reparacoes = []
                            }
                            else{
                                var reparacoes = resp2.data
                            }
                            console.log(reparacoes)
                            res.writeHead(200, {'Content-Type' : 'text/html;charset=utf-8'})
                            res.write(`<h1>Intervenção ${codigo}</h1>`)
                            res.write("<ul>")
                            res.write(`<li><b>Código:</b> ${intervencao.codigo}</li>`)
                            res.write(`<li><b>Nome:</b> ${intervencao.nome}</li>`)
                            res.write(`<li><b>Descrição:</b> ${intervencao.descricao}</li>`)
                            res.write(`<li><b>Reparações em que está presente:</b>`)
                            res.write("<ul>")
                            reparacoes.forEach(r => {
                                res.write(`<li><a href='/reparacoes/${r.nif}'>${r.nome} (NIF:${r.nif})</a></li>`)
                            });
                            res.write("</ul></li></ul>")
                            res.write("<h6><a href='/'>Voltar ao início</a></h6>")
                            res.end()
                        })
                        .catch(err => {
                            res.writeHead(500, {'Content-Type' : 'text/html;charset=utf-8'})
                            console.log(err)
                            res.end()
                        })
                })
                .catch(err => {
                    res.writeHead(500, {'Content-Type' : 'text/html;charset=utf-8'})
                    console.log(err)
                    res.end()
                })
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