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

No diretório raiz do projeto altere o arquivo `ormconfig.example.json` para `ormconfig.json` e informe as credenciais do seu banco de dados (host, porta, usuário, senha e nome do banco de dados). Depois disso e ainda no diretório raiz, execute o comando abaixo para criar as tabelas de banco de dados:

`yarn typeorm migration:run`

#### Executar o projeto em ambiente de desenvolvimento

`yarn dev:server`

## Principais tecnologias

- Node.js;
- Express.js;
- Typescript;
- Jest;

## Uso

#### Usuário

- Para utilizar a API é preciso primeiramente criar um usuário com as seguintes informações:

  - [POST] `<url>/users` - (exemplo de corpo da requisição no formato JSON):

    ```
    {
    	"name": "Heverton Oliveira",
    	"email": "heverton.ogs@gmail.com",
    	"phone": "67 9999-8888",
    	"password": "123456"
    }
    ```

- Para realizar o login:

  - [POST] `<url>/session`  - (exemplo de corpo da requisição no formato JSON):

    ```
    {
    	"email": "heverton.ogs@gmail.com",
    	"password": "123456"
    }
    ```

- Para ver os dados:

  - [GET] `<url>/profile` - autenticação *Bearer* com JWT Token gerado no *login* (exemplo de corpo da requisição no formato JSON):

    ```
    {
    	"id": "eb80e0f5-cfab-4415-b247-42449f7807e0"
    }
    ```

  

- Para atualizar os dados:
  - [PUT] `<url>/profile` - autenticação *Bearer* com JWT Token gerado no *login* (exemplo de corpo da requisição no formato JSON):

    ```
    {
    	"name": "Héverton Oliveira",
    	"email": "heverton.ogs@gmail.com",
    	"phone": "67 99988-4018",
    	"old_password": "123456",
    	"password": "123123",
    	"password_confirmation": "123123"
    }
    ```

- Para excluir os dados:
  - [DELETE] `<url>/profile` - autenticação *Bearer* com JWT Token gerado no *login*.

#### Endereço

- Para criar um endereço (necessário estar logado):

  - [POST] `<url>/user/address` - (exemplo de corpo da requisição no formato JSON):

    ```
    {
    	"address": "João Vicente Ferreira, 100 - Jardim Climax",
    	"city": "Campo Grande",
    	"state": "MS",
    	"country": "BR",
    	"postal_code": "79823-010",
    	"user_id": "eb80e0f5-cfab-4415-b247-42449f7807e0"
    }
    ```

- Para ver um endereço:
  - [GET] `<url>/user/address/:address_id` - autenticação *Bearer* com JWT Token gerado no *login*.

- Para ver todos os endereços de um usuário:
  - [GET] `<url>/user/address` - autenticação *Bearer* com JWT Token gerado no *login*.

- Para atualizar os dados:

  - [PUT] `<url>/user/address/:address_id` - autenticação *Bearer* com JWT Token gerado no *login* (exemplo de corpo da requisição no formato JSON):

    ```
    {
    	"address": "João Ferreira, 100 - Jardim Climax",
    	"city": "Dourados",
    	"state": "MS",
    	"country": "BR",
    	"postal_code": "73823-012"
    }
    ```

- Para excluir os dados:
  - [DELETE] `<url>/user/address/:address_id` - autenticação *Bearer* com JWT Token gerado no *login*.

## Comandos úteis

#### Executar testes

`yarn test`

#### Executar TypeORM

`yarn typeorm <commands>`
