# TPC6

26-03-2025

![](../images/author.png)

## Identificação

- **Nome:** Gabriel Pereira Ribeiro
- **Número:** A104171

## Descrição Trabalho

O TPC6 consiste na construção de 2 serviços.

O primeiro é uma API de dados que responde aos seguintes pedidos:

- **GET /contratos**: devolve uma lista com todos os registos;
- **GET /contratos/:id**: devolve o registo com identificador id (corresponde ao idcontrato);
- **GET /contratos?entidade=EEEE**: devolve a lista dos contratos correspondentes à entidade EEEE;
- **GET /contratos?tipo=AAA**: devolve a lista dos contratos com tipo de procedimento igual a AAA ;
- **GET /contratos/entidades**: devolve a lista de entidades comunicantes ordenada alfabeticamente e sem repetições;
- **GET /contratos/tipos**: devolve a lista dos tipos de procedimento ordenada alfabeticamente esem repetições;
- **POST /contratos**: acrescenta um registo novo à BD;
- **DELETE /contratos/:id**: elimina da BD o registo com o identificador id;
- **PUT /contratos/:id**: altera o registo com o identificador id.

Utiliza uma base de dados em MongoDB que foi inicializada num container Docker
onde está carregado o dataset (Lista de contratos registados no Portal dos Contratos Públicos para o projeto Portal da Transparência até 9 de Maio de 2024)

O segundo serviço é uma interface que utilize a API realizada em primeiro lugar.

Deve fornecer as seguintes páginas:

- Página principal (*http://localhost:16001*) constituída por:
    - Um cabeçalho com metainformação;
    - Uma tabela contendo a lista de registos, um por linha, com os campos: idcontrato,objectoContrato, dataCelebracaoContrato, precoContratual, NIPC_entidade_comunicante, entidade_comunicante;
    - O campo idcontrato deverá ser um link para a página do contrato com esse identificador;
    - O campo NIPC_entidade_comunicante deverá ser um link para a página dessa entidade.
- Página de um contrato (*http://localhost:16001/:id*):
    - Deverá conter todos os campos do contrato e um link para voltar à página principal.
- Página de uma entidade (*http://localhost:16001/entidades/:nipc*):
    - Deverá constar o identificador e o respetivo nome da entidade;
    - Uma tabela com a lista de contratos dessa entidade (tabela com estrutura semelhante à da página principal);
    - O somatório do valor dos contratos;
    - Um link para voltar à página principal.

## Resultados

- API de dados [api-contratos/](https://github.com/gabrielRibeir0/EW2025-A104171/blob/main/TPC6/api-contratos/)
- Interface [interface-contratos/](https://github.com/gabrielRibeir0/EW2025-A104171/blob/main/TPC6/interface-contratos/)
