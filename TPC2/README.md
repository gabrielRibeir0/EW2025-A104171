# TPC2

20-02-2025

![](../images/author.png)

## Identificação

- **Nome:** Gabriel Pereira Ribeiro
- **Número:** A104171

## Descrição Trabalho

O TPC2 consiste em construir um serviço que com base no dataset da escola de música, crie um website com as seguintes páginas:

- **Página principal**: Listar alunos, Listar Cursos, Listar Instrumentos;
- **Página de alunos**: Tabela com a informação dos alunos (clicando numa linha deve saltar-se para a página de aluno);
- **Página de cursos**: Tabela com a informação dos cursos (clicando numa linha deve saltar-se para a página do curso onde deverá aparecer a lista de alunos a frequentá-lo);
- **Página de instrumentos**: Tabela com a informação dos instrumentos (clicando numa linha deve saltar-se para a página do instrumento onde deverá aparecer a lista de alunos que o tocam).

O servidor gere os pedidos e consome a API do json-server para obter os dados necessários.
Depois a respetiva função geradora da página pretendida cria o texto HTML usando os dados fornecidos.
Essa página é depois enviada e apresentada ao utilizador.

## Resultados

- Servidor [server.js](https://github.com/gabrielRibeir0/EW2025-A104171/blob/main/TPC2/server.js)
- Funções geradoras das páginas HTML [pages_generator.js](https://github.com/gabrielRibeir0/EW2025-A104171/blob/main/TPC2/pages_generator.js)
- Dataset da escola de música [db.json](https://github.com/gabrielRibeir0/EW2025-A104171/blob/main/TPC2/db.json)
- Folha de estilos [w3schools](https://www.w3schools.com/) [w3.css](https://github.com/gabrielRibeir0/EW2025-A104171/blob/main/TPC2/w3.css)
