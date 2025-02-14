# TPC1

10-02-2025

![](../images/author.png)

## Identificação

- **Nome:** Gabriel Pereira Ribeiro
- **Número:** A104171

## Descrição Trabalho

O TPC1 consiste no desenvolvimento de um serviço em *nodejs* que, usando a API do *json-server*, consultasse o dataset da oficina de reparações e apresentasse as informações em páginas web.

### Normalização do dataset

O primeiro passo é normalizar o dataset fornecido. Originalmente apenas existe uma lista com as reparações, estas que contém 2 objetos: as viaturas e as intervenções.

Para normalizar os dados, for necessário mover estes objetos para as suas próprias listas, deixando nas reparações apenas os identificadores (matrícula e código).
Para além disto, foi necessário remover as intervenções repetidas, já que no passo anterior todas as ocorreências de uma intervenção foram guardadas como uma intervenção própria.

### Páginas Web apresentadas

O servidor inicialmente apresenta uma página inicial com os links das listas das reparações, viaturas e intervenções.

#### Reparações

Ao consultar a lista das reparações, estas aparecem por ordem alfabética do nome do cliente apresentando o NIF para além do seu nome.
Cada reparação tem uma página individual onde aparece as suas informações:

- Nome
- NIF
- Data
- Matrícula da viatura (com link para a página da viatura)
- Nº de intervenções
- Lista dos códigos das intervenções realizadas na reparação (com link para a página da respetiva intervenção)

#### Viaturas

Na lista das viaturas são apresentados os links a lista de marcas e a lista de modelos existentes.

Na lista de marcas, estas são apresentadas por ordem alfabética juntamente com a quantidade de viaturas existentes desta marca. Contém um link para a página individual de cada marca.

Na lista de modelos, a lógica é parecida. Ordem alfabética das marcas, indicando o modelo e a que marca pertence com um link para a página do modelo.

A página de cada marca mostra todas as viaturas dessa marca e o seu modelo. A página de cada modelo também apresenta todas as viaturas desse modelo.
Estas páginas contém os links para as páginas individuais das viaturas.

Nas páginas das viaturas é apresentada toda a informação relativa a ela:

- Matrícula
- Marca
- Modelo
- Lista das reparações em que está presente
- Lista das intervenções a que foi sujeita

#### Intervenções

Por último, a lista das intervenções apresenta os códigos de todas as intervenções por ordem alfabética que redireciona para a página da intervenção.

A página da intervenção apresenta a informação relativa a esta:

- Código
- Nome
- Descrição
- Lista das reparações em que está presente

## Resultados

- Dataset original das reparações: [dataset_reparacoes.json](https://github.com/gabrielRibeir0/EW2025-A104171/blob/main/TPC1/dataset_reparacoes.json)
- Dataset resultante após normalização: [reparacoes_normalized.json](https://github.com/gabrielRibeir0/EW2025-A104171/blob/main/TPC1/reparacoes_normalized.json)
- Script em *python* para normalizar o dataset original: [normalizer.py](https://github.com/gabrielRibeir0/EW2025-A104171/blob/main/TPC1/normalizer.py)
- Servidor prestador do serviço em *nodejs*: [server.js](https://github.com/gabrielRibeir0/EW2025-A104171/blob/main/TPC1/server.js)

Assim, o servidor apresenta um conjunto de páginas Web que apresentam a informação do dataset de forma organizada e navegável entre si.
