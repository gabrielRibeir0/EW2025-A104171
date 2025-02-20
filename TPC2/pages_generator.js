export function genMainPage(data){
    var pagHTML = `
    <!DOCTYPE html>
    <html>
        <head>
            <meta charset="UTF-8"/>
            <title>Escola de Música</title>
            <link rel="stylesheet" type="text/css" href="w3.css"/>
        </head>
        <body>
            <div class="w3-card-4">
                <header class="w3-container w3-teal">
                    <h1>Consultas</h1>
                </header>

                <div class="w3-container">
                    <ul class="w3-ul">
                        <li>
                            <a href="/alunos">Listar alunos</a>
                        </li>
                        <li>
                            <a href="/cursos">Listar Cursos</a>
                        </li>
                        <li>
                            <a href="/instrumentos">Lista Instrumentos</a>
                        </li>
                    </ul>
                </div>
                
                <footer class="w3-container w3-teal">
                    <h5>Generated in EngWeb2025 ${data}</h5>
                </footer>
            </div>
        </body>
    </html>
    `
    return pagHTML
}

export function genAlunosPage(lalunos, data){
    var pagHTML = `
    <!DOCTYPE html>
    <html>
        <head>
            <meta charset="UTF-8"/>
            <title>Escola de Música</title>
            <link rel="stylesheet" type="text/css" href="w3.css"/>
        </head>
        <body>
            <div class="w3-card-4">
                <header class="w3-container w3-teal">
                    <h1>Lista de Alunos</h1>
                </header>

                <div class="w3-container">
                    <table class="w3-table-all">
                        <tr>
                            <th>Id</th>
                            <th>Nome</th>
                            <th>Data Nascimento</th>
                            <th>Curso</th>
                            <th>Ano Curso</th>
                            <th>Instrumento</th>
                        </tr>`
    lalunos.forEach(a => {
        pagHTML += `
        <tr>
            <td><a href="/alunos/${a.id}">${a.id}</a></td>
            <td><a href="/alunos/${a.id}">${a.nome}</a></td>
            <td><a href="/alunos/${a.id}">${a.dataNasc}</a></td>
            <td><a href="/alunos/${a.id}">${a.curso}</a></td>
            <td><a href="/alunos/${a.id}">${a.anoCurso}</a></td>
            <td><a href="/alunos/${a.id}">${a.instrumento}</a></td>
        </tr>
        `
    });

    pagHTML += `  
                    </table>
                </div>
                
                <footer class="w3-container w3-teal">
                    <h5>Generated in EngWeb2025 ${data}</h5>
                </footer>
            </div>
        </body>
    </html>
    `
    return pagHTML
}

export function genCursosPage(lcursos, data){
    var pagHTML = `
    <!DOCTYPE html>
    <html>
        <head>
            <meta charset="UTF-8"/>
            <title>Escola de Música</title>
            <link rel="stylesheet" type="text/css" href="w3.css"/>
        </head>
        <body>
            <div class="w3-card-4">
                <header class="w3-container w3-teal">
                    <h1>Lista de Cursos</h1>
                </header>

                <div class="w3-container">
                    <table class="w3-table-all">
                        <tr>
                            <th>Id</th>
                            <th>Designação</th>
                            <th>Duração</th>
                            <th>Instrumento</th>
                        </tr>`
    lcursos.forEach(c => {
        pagHTML += `
        <tr>
            <td><a href="/cursos/${c.id}">${c.id}</a></td>
            <td><a href="/cursos/${c.id}">${c.designacao}</a></td>
            <td><a href="/cursos/${c.id}">${c.duracao}</a></td>
            <td><a href="/cursos/${c.id}">${c.instrumento['#text']}</a></td>
        </tr>
        `
    });

    pagHTML += `  
                    </table>
                </div>
                
                <footer class="w3-container w3-teal">
                    <h5>Generated in EngWeb2025 ${data}</h5>
                </footer>
            </div>
        </body>
    </html>
    `
    return pagHTML
}

export function genInstPage(linst, data){
    var pagHTML = `
    <!DOCTYPE html>
    <html>
        <head>
            <meta charset="UTF-8"/>
            <title>Escola de Música</title>
            <link rel="stylesheet" type="text/css" href="w3.css"/>
        </head>
        <body>
            <div class="w3-card-4">
                <header class="w3-container w3-teal">
                    <h1>Lista de Marcas</h1>
                </header>

                <div class="w3-container">
                    <table class="w3-table-all">
                        <tr>
                            <th>Id</th>
                            <th>Nome</th>
                        </tr>`
    linst.forEach(i => {
        pagHTML += `
        <tr>
            <td><a href="/instrumentos/${i.id}">${i.id}</a></td>
            <td><a href="/instrumentos/${i.id}">${i['#text']}</a></td>
        </tr>
        `
    });

    pagHTML += `  
                    </table>
                </div>
                
                <footer class="w3-container w3-teal">
                    <h5>Generated in EngWeb2025 ${data}</h5>
                </footer>
            </div>
        </body>
    </html>
    `
    return pagHTML
}

export function genAlunoIndPage(aluno, data){
    var pagHTML = `
    <!DOCTYPE html>
    <html>
        <head>
            <meta charset="UTF-8"/>
            <title>Escola de Música</title>
            <link rel="stylesheet" type="text/css" href="w3.css"/>
        </head>
        <body>
            <div class="w3-card-4">
                <header class="w3-container w3-teal">
                    <h1>Página do aluno ${aluno.id}</h1>
                </header>

                <div class="w3-container">
                    <ul>
                        <li>Id: ${aluno.id}</li>
                        <li>Nome: ${aluno.nome}</li>
                        <li>Data Nascimento: ${aluno.dataNasc}</li>
                        <li>Curso: ${aluno.curso}</li>
                        <li>Ano Curso: ${aluno.anoCurso}</li>
                        <li>Instrumento: ${aluno.instrumento}</li>
                    </ul>
                </div>
                
                <footer class="w3-container w3-teal">
                    <h5>Generated in EngWeb2025 ${data}</h5>
                </footer>
            </div>
        </body>
    </html>
    `
    return pagHTML
}

export function genCursoIndPage(cursoNome, lalunos, data){
    var pagHTML = `
    <!DOCTYPE html>
    <html>
        <head>
            <meta charset="UTF-8"/>
            <title>Escola de Música</title>
            <link rel="stylesheet" type="text/css" href="w3.css"/>
        </head>
        <body>
            <div class="w3-card-4">
                <header class="w3-container w3-teal">
                    <h1>Página do curso ${cursoNome}</h1>
                </header>
                <h2>Alunos a frequentar o curso</h2>
                <div class="w3-container">
                    <table class="w3-table-all">
                        <tr>
                            <th>Id</th>
                            <th>Nome</th>
                        </tr>`
    lalunos.forEach(a => {
        pagHTML += `
        <tr>
            <td>${a.id}</td>
            <td>${a.nome}</td>
        </tr>
        `
    });

    pagHTML += `  
                    </table>
                </div>
                
                <footer class="w3-container w3-teal">
                    <h5>Generated in EngWeb2025 ${data}</h5>
                </footer>
            </div>
        </body>
    </html>
    `
    return pagHTML
}

export function genInstIndPage(instNome, lalunos, data){
    var pagHTML = `
    <!DOCTYPE html>
    <html>
        <head>
            <meta charset="UTF-8"/>
            <title>Escola de Música</title>
            <link rel="stylesheet" type="text/css" href="w3.css"/>
        </head>
        <body>
            <div class="w3-card-4">
                <header class="w3-container w3-teal">
                    <h1>Página do instrumento ${instNome}</h1>
                </header>
                <h2>Alunos a utilizar o instrumento</h2>
                <div class="w3-container">
                    <table class="w3-table-all">
                        <tr>
                            <th>Id</th>
                            <th>Nome</th>
                        </tr>`
    lalunos.forEach(a => {
        pagHTML += `
        <tr>
            <td>${a.id}</td>
            <td>${a.nome}</td>
        </tr>
        `
    });

    pagHTML += `  
                    </table>
                </div>
                
                <footer class="w3-container w3-teal">
                    <h5>Generated in EngWeb2025 ${data}</h5>
                </footer>
            </div>
        </body>
    </html>
    `
    return pagHTML
}