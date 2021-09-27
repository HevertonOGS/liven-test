# Liven (Teste)

## Visão geral

API HTTP de gerenciamento de usuários desenvolvida em Express.js (Typescript). Com esta API é possível gerenciar tanto os dados pessoais do usuário, quanto seus dados de endereços.

## Configurações do projeto

#### Antes

1. Baixe ou clone o repositório para uma máquina local.
2. Abra o diretório do projeto e copie `.env.example` para `.env`.

#### Instale as dependências

`yarn install`

#### Configuração do Docker e do banco de dados

O projeto utilizar um *Docker container* que roda um banco de dados PostgreSQL (O banco de dados pode ser utilizado sem a imagem do Docker). Para utilizar a imagem execute:

`docker run --name liven_test -e POSTGRES_PASSWORD=<SUA-SENHA-DO-BANCO-AQUI> -p 5432:5432 -d postgres`

Crie um banco de dados com o nome `user_management`.

No diretório raiz do projeto acesse o arquivo `ormconfig.json` e informe as credenciais do seu banco de dados (host, porta, usuário, senha e nome do banco de dados). Depois disso e ainda no diretório raiz, execute o comando abaixo para criar as tabelas de banco de dados:

`yarn typeorm migration:run`

#### Executar o projeto em ambiente de desenvolvimento

`yarn dev:server`

## Comandos úteis

#### Executar testes

`yarn test`

#### Executar TypeORM

`yarn typeorm <commands>`
