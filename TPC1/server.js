const http = require('http')
const axios = require('axios')

function countViaturas(marca, viaturas) {
    var count = 0
    for(var i = 0; i < viaturas.length; i++){
        if(viaturas[i].marca == marca){
            count++
        }
        else if (viaturas[i].marca > marca) {
            break
        }
    }

    return count
}

http.createServer((req, res) => {
    console.log("METHOD:" + req.method)
    console.log("URL:" + req.url)

    if(req.method === "GET") {
        if (req.url === "/") {
            res.writeHead(200, {'Content-Type' : 'text/html;charset=utf-8'})
            res.write("<h1>Reparações</h1>")
            res.write("<ul>")
            res.write("<li><a href='/reparacoes'>Lista de Reparações</a></li>")
            res.write("<li><a href='/viaturas'>Lista de Viaturas</a></li>")
            res.write("<li><a href='/intervencoes'>Lista de Intervenções</a></li>")
            res.write("</ul>")
            res.end()
        }
        else if(req.url === "/reparacoes") {
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
        else if (req.url.match(/\/reparacoes\/.+/)) {
            var nif = req.url.split("/")[2]
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
                    res.write(`<p><b>Viatura: </b> <a href='/viaturas/${reparacao.viatura}'>${reparacao.viatura}</a></p>`)
                    res.write("<p><b>Nº intervenções:</b> " + reparacao.nr_intervencoes + "</p>")
                    res.write("<p><b>Intervenções:</b></p>")
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
            res.writeHead(200, {'Content-Type' : 'text/html;charset=utf-8'})
            res.write("<h1>Viaturas</h1>")
            res.write("<ul>")
            res.write("<li><a href='/viaturas/marcas'>Lista de marcas</a></li>")
            res.write("<li><a href='/viaturas/modelos'>Lista de modelos</a></li>")
            res.write("</ul>")
            res.write("<h6><a href='/'>Voltar</a></h6>")
            res.end()
        }
        else if (req.url === "/viaturas/marcas") {
            //listar marcas das viaturas
            axios.get('http://localhost:3000/viaturas?_sort=marca')
                .then(resp => {
                    var viaturas = resp.data
                    var marcas = []
                    viaturas.forEach(v => {
                        if(!marcas.includes(v.marca)){
                            marcas.push(v.marca)
                        }
                    });
                    res.writeHead(200, {'Content-Type' : 'text/html;charset=utf-8'})
                    res.write("<h1>Marcas</h1>")
                    res.write("<ul>")
                    marcas.forEach(m => {
                        res.write(`<li><a href='/viaturas/marcas/${m.replace(" ", "%20")}'>${m}</a> - ${countViaturas(m, viaturas)} viaturas</li>`)
                    });
                    res.write("</ul>")
                    res.write("<h6><a href='/viaturas'>Voltar</a></h6>")
                    res.end()
                })
                .catch(err => {
                    res.writeHead(500, {'Content-Type' : 'text/html;charset=utf-8'})
                    console.log(err)
                    res.end()
                })
        }
        else if (req.url.match(/\/viaturas\/marcas\/.+/)) {
            var marca_original = req.url.split("/")[3].replace("%020", "%20")
            var marca = marca_original.replace("%20", " ")
            axios.get(`http://localhost:3000/viaturas?marca=${marca_original}&_sort=matricula`).then(resp => {
                var viaturas = resp.data
                res.writeHead(200, {'Content-Type' : 'text/html;charset=utf-8'})
                res.write(`<h1>Viaturas da marca ${marca}</h1>`)
                res.write("<ul>")
                viaturas.forEach(v => {
                    res.write(`<li><a href='/viaturas/${v.matricula}'>${v.matricula}</a>  - modelo <a href='/viaturas/${v.modelo.replace(" ", "%20")}'>${v.modelo}</a></li>`)
                });
                res.write("</ul>")
                res.write("<h6><a href='/viaturas/marcas'>Voltar</a></h6>")
                res.end()
            })
            .catch(err => {
                res.writeHead(500, {'Content-Type' : 'text/html;charset=utf-8'})
                console.log(err)
                res.end()
            })  
        }
        else if (req.url === "/viaturas/modelos") {
            //listar modelos das viaturas agrupados por marcas
            axios.get('http://localhost:3000/viaturas?_sort=marca')
                .then(resp => {
                    var modelos = []
                    resp.data.forEach(v => {
                        if(!modelos.includes({ marca: v.marca, modelo: v.modelo})){
                            modelos.push({ marca: v.marca, modelo: v.modelo })
                        }
                    });
                    res.writeHead(200, {'Content-Type' : 'text/html;charset=utf-8'})
                    res.write("<h1>Modelos</h1>")
                    res.write("<ul>")
                    modelos.forEach(m => {
                        res.write(`<li><a href='/viaturas/modelos/${m.modelo.replace(" ", "%20")}'>${m.modelo}</a> (marca : <a href='/viaturas/marcas/${m.marca.replace(" ", "%20")}'>${m.marca}</a>)</li>`)
                    });
                    res.write("</ul>")
                    res.write("<h6><a href='/viaturas'>Voltar</a></h6>")
                    res.end()
                })
                .catch(err => {
                    res.writeHead(500, {'Content-Type' : 'text/html;charset=utf-8'})
                    console.log(err)
                    res.end()
                })
        }
        else if (req.url.match(/\/viaturas\/modelos\/.+/)) {
            var modelo = req.url.split("/")[3]
            axios.get(`http://localhost:3000/viaturas?modelo=${modelo}&_sort=matricula`).then(resp => {
                var viaturas = resp.data
                res.writeHead(200, {'Content-Type' : 'text/html;charset=utf-8'})
                res.write(`<h1>Viaturas do modelo ${modelo.replace("%20", " ")}</h1>`)
                res.write("<ul>")
                viaturas.forEach(v => {
                    res.write(`<li><a href='/viaturas/${v.matricula}'>${v.matricula}</a></li>`)
                });
                res.write("</ul>")
                res.write("<h6><a href='/viaturas/modelos'>Voltar</a></h6>")
                res.end()
            })
            .catch(err => {
                res.writeHead(500, {'Content-Type' : 'text/html;charset=utf-8'})
                console.log(err)
                res.end()
            })  
        }
        else if (req.url.match(/\/viaturas\/.+/)) {
            var matricula = req.url.split("/")[2]
            axios.get(`http://localhost:3000/viaturas?matricula=${matricula}`).then(resp => {
                if(resp.data.length == 0){
                    res.writeHead(404, {'Content-Type' : 'text/html;charset=utf-8'})
                    res.end()
                    return;
                }
                else{
                    var viatura = resp.data[0]
                }

                axios.get(`http://localhost:3000/reparacoes?viatura=${matricula}`).then(resp2 => {
                    if(resp2.data.length == 0){
                        res.writeHead(404, {'Content-Type' : 'text/html;charset=utf-8'})
                        res.end()
                        return;
                    }
                    else{
                        var reparacoes = resp2.data
                    }

                    var intervencoes = []
                    reparacoes.forEach(r => {
                        r.intervencoes.forEach(i => {
                            if(!intervencoes.includes(i)){
                                intervencoes.push(i)
                            }
                        });
                    });
                    
                    res.writeHead(200, {'Content-Type' : 'text/html;charset=utf-8'})
                    res.write(`<h1>Viatura ${viatura.matricula}</h1>`)
                    res.write("<ul>")
                    res.write(`<li><b>Matrícula: </b>${viatura.matricula}</li>`)
                    res.write(`<li><b>Marca: </b><a href="/viaturas/marcas/${viatura.marca.replace(" ", "%20")}">${viatura.marca}</a></li>`)
                    res.write(`<li><b>Modelo: </b><a href="/viaturas/modelos/${viatura.modelo.replace(" ", "%20")}">${viatura.modelo}</a></li>`)
                    res.write(`<li><b>Reparações em que está presente:</b>`)
                    res.write("<ul>")
                    reparacoes.forEach(r => {
                        res.write(`<li><a href='/reparacoes/${r.nif}'>${r.nome} (NIF:${r.nif})</a></li>`)
                    });
                    res.write("</ul></li>")
                    res.write(`<li><b>Intervenções a que foi sujeita:</b>`)
                    res.write("<ul>")
                    intervencoes.forEach(i => {
                        res.write(`<li><a href='/intervencoes/${i}'>${i}</a></li>`)
                    });
                    res.write("</ul></li>")
                    res.write("</ul>")
                    res.write("<h6><a href='/viaturas'>Voltar</a></h6>")
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
        else if (req.url === "/intervencoes") {
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
        else if (req.url.match(/\/intervencoes\/.+/)) {
            var codigo = req.url.split("/")[2]
            axios.get(`http://localhost:3000/intervencoes?codigo=${codigo}`)
                .then(resp => {
                    if(resp.data.length == 0) {
                        res.writeHead(404, {'Content-Type' : 'text/html;charset=utf-8'})
                        res.end()
                        return;
                    }
                    else {
                        var intervencao = resp.data[0]
                    }
                    axios.get(`http://localhost:3000/reparacoes?intervencoes_like=${codigo}`)
                        .then(resp2 => {
                            if(resp2.data.length == 0){
                                var reparacoes = []
                            }
                            else{
                                var reparacoes = resp2.data
                            }
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
        else {
            res.writeHead(404, {'Content-Type' : 'text/html;charset=utf-8'})
            res.end()
        }
    }
    else {
        res.writeHead(405, {'Content-Type' : 'text/html;charset=utf-8'})
        res.end()
    }
}).listen(1234)

console.log("Servidor aberto em http://localhost:1234...")