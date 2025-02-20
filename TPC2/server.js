import { createServer } from 'http'
import axios from 'axios';
import { readFile } from 'fs'
import { genMainPage, genAlunosPage, genCursosPage, genInstPage, genAlunoIndPage, genCursoIndPage, genInstIndPage } from './pages_generator.js';

createServer(function (req, res) {
    var d = new Date().toISOString().substring(0, 16)
    console.log(req.method + " " + req.url + " " + d)

    if(req.url == '/'){
        res.writeHead(200, {'Content-Type': 'text/html; charset=utf-8'})
        res.write(genMainPage(d))
        res.end()  
    }
    else if(req.url.match(/w3\.css$/)){
        readFile("w3.css", function(erro, dados){
            if(erro){
                res.writeHead(404, {'Content-Type': 'text/html; charset=utf-8'})
                res.end('<p>Erro na leitura do ficheiro: ' + erro + '</p>')
            }
            else{
                res.writeHead(200, {'Content-Type': 'text/css'})
                res.end(dados)
            }
        })
    }
    else if(req.url == '/alunos'){
        axios.get('http://localhost:3000/alunos?_sort=id')
            .then(function(resp){
                var alunos = resp.data
                res.writeHead(200, {'Content-Type': 'text/html; charset=utf-8'})
                res.write(genAlunosPage(alunos, d))
                res.end()
            })
            .catch(erro => {
                console.log("Erro: " + erro)
                res.writeHead(200, {'Content-Type': 'text/html; charset=utf-8'})
                res.end('<p>Erro na obtenção de dados: ' + erro + '</p>')
            })
    }
    else if (req.url.match(/\/alunos\/.+/)){
        var aluno_id = req.url.split("/")[2]
        axios.get('http://localhost:3000/alunos/' + aluno_id)
            .then(function(resp){
                var aluno = resp.data
                res.writeHead(200, {'Content-Type': 'text/html; charset=utf-8'})
                res.write(genAlunoIndPage(aluno, d))
                res.end()
            })
            .catch(erro => {
                console.log("Erro: " + erro)
                res.writeHead(200, {'Content-Type': 'text/html; charset=utf-8'})
                res.end('<p>Erro na obtenção de dados: ' + erro + '</p>')
            })
    }
    else if (req.url == '/cursos'){
        axios.get('http://localhost:3000/cursos?_sort=id')
            .then(function(resp){
                var cursos = resp.data
                res.writeHead(200, {'Content-Type': 'text/html; charset=utf-8'})
                res.write(genCursosPage(cursos, d))
                res.end()
            })
            .catch(erro => {
                console.log("Erro: " + erro)
                res.writeHead(200, {'Content-Type': 'text/html; charset=utf-8'})
                res.end('<p>Erro na obtenção de dados: ' + erro + '</p>')
            })
    }
    else if (req.url.match(/\/cursos\/.+/)){
        var curso_id = req.url.split("/")[2]
        axios.get('http://localhost:3000/cursos/' + curso_id)
            .then(function(resp){
                var curso = resp.data
                axios.get(`http://localhost:3000/alunos?curso=${curso_id}`)
                    .then(function(resp2){
                        var alunos = resp2.data
                        res.writeHead(200, {'Content-Type': 'text/html; charset=utf-8'})
                        res.write(genCursoIndPage(curso.designacao, alunos, d))
                        res.end()
                    })
                    .catch(erro => {
                        console.log("Erro: " + erro)
                        res.writeHead(200, {'Content-Type': 'text/html; charset=utf-8'})
                        res.end('<p>Erro na obtenção de dados: ' + erro + '</p>')
                    })
            })
            .catch(erro => {
                console.log("Erro: " + erro)
                res.writeHead(200, {'Content-Type': 'text/html; charset=utf-8'})
                res.end('<p>Erro na obtenção de dados: ' + erro + '</p>')
            })
    }
    else if (req.url == '/instrumentos'){
        axios.get('http://localhost:3000/instrumentos?_sort=id')
            .then(function(resp){
                var instrumentos = resp.data
                res.writeHead(200, {'Content-Type': 'text/html; charset=utf-8'})
                res.write(genInstPage(instrumentos, d))
                res.end()
            })
            .catch(erro => {
                console.log("Erro: " + erro)
                res.writeHead(200, {'Content-Type': 'text/html; charset=utf-8'})
                res.end('<p>Erro na obtenção de dados: ' + erro + '</p>')
            })
    }
    else if (req.url.match(/\/instrumentos\/.+/)){
        var inst_id = req.url.split("/")[2]
        axios.get('http://localhost:3000/instrumentos/' + inst_id)
            .then(function(resp){
                var inst = resp.data
                axios.get(`http://localhost:3000/alunos?instrumento=${inst['#text']}`)
                    .then(function(resp2){
                        var alunos = resp2.data
                        res.writeHead(200, {'Content-Type': 'text/html; charset=utf-8'})
                        res.write(genInstIndPage(inst['#text'], alunos, d))
                        res.end()
                    })
                    .catch(erro => {
                        console.log("Erro: " + erro)
                        res.writeHead(200, {'Content-Type': 'text/html; charset=utf-8'})
                        res.end('<p>Erro na obtenção de dados: ' + erro + '</p>')
                    })
            })
            .catch(erro => {
                console.log("Erro: " + erro)
                res.writeHead(200, {'Content-Type': 'text/html; charset=utf-8'})
                res.end('<p>Erro na obtenção de dados: ' + erro + '</p>')
            })
    }
    else{
        res.writeHead(404, {'Content-Type': 'text/html; charset=utf-8'})
        res.end('<p>Operação não suportada: ' + req.url + '</p>')
    }
}).listen(3017)

console.log('Servidor à escuta na porta http://localhost:3017...')

