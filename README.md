# 💜 Gerenciador de Tarefas

> Uma API RESTful robusta e moderna para gerenciamento de tarefas, construída com foco em performance, tipagem estática e boas práticas.

<div align="center">

![TypeScript](https://img.shields.io/badge/typescript-%23007ACC.svg?style=for-the-badge&logo=typescript&logoColor=white)
![Express.js](https://img.shields.io/badge/express.js-%23404d59.svg?style=for-the-badge&logo=express&logoColor=%2361DAFB)
![Prisma](https://img.shields.io/badge/Prisma-3982CE?style=for-the-badge&logo=Prisma&logoColor=white)
![Postgres](https://img.shields.io/badge/postgres-%23316192.svg?style=for-the-badge&logo=postgresql&logoColor=white)
![Docker](https://img.shields.io/badge/docker-%230db7ed.svg?style=for-the-badge&logo=docker&logoColor=white)
![Jest](https://img.shields.io/badge/-jest-%23C21325?style=for-the-badge&logo=jest&logoColor=white)

</div>

---

## 🔮 Sobre o Projeto

Este projeto é um backend completo para gerenciamento de tarefas. Ele oferece funcionalidades essenciais como autenticação de usuários, criação, listagem, atualização e exclusão de tarefas, tudo validado e testado.

O design do código foca em **Clean Code** e arquitetura modular, facilitando a manutenção e escalabilidade. A aplicação utiliza **Express v5** para alta performance e **Prisma** para uma interação segura e tipada com o banco de dados.

---

## 🚀 Tecnologias Utilizadas

O projeto foi desenvolvido utilizando as seguintes tecnologias de ponta:

| Tecnologia | Descrição |
| :--- | :--- |
| **Node.js** | Ambiente de execução JavaScript server-side. |
| **TypeScript** | Superset do JavaScript que adiciona tipagem estática. |
| **Express v5** | Framework web rápido e minimalista para Node.js. |
| **Prisma ORM** | ORM moderno para Node.js e TypeScript. |
| **PostgreSQL** | Sistema gerenciador de banco de dados relacional robusto. |
| **Docker** | Plataforma para desenvolvimento e execução de containers. |
| **Zod** | Biblioteca de declaração e validação de esquemas TypeScript-first. |
| **Jest** | Framework de testes em JavaScript com foco na simplicidade. |
| **JWT & Bcrypt** | Segurança e autenticação robusta. |

---

## 🛠️ Pré-requisitos

Antes de começar, certifique-se de ter instalado em sua máquina:

*   [Node.js](https://nodejs.org/en/) (v18 ou superior)
*   [Docker](https://www.docker.com/) & Docker Compose
*   Gerenciador de pacotes (NPM, Yarn ou PNPM)

---

## 💜 Instalação e Configuração

Siga os passos abaixo para rodar o projeto localmente:

### 1. Clone o repositório

```bash
git clone https://github.com/EvelynnBR/Task-manager
cd gerenciador-de-tarefas
```

### 2. Instale as dependências

```bash
npm install
```

### 3. Configuração de Variáveis de Ambiente

Crie um arquivo `.env` na raiz do projeto baseando-se no `.env-example`.

```bash
cp .env-example .env
```

Preencha as variáveis no arquivo `.env` com suas credenciais (ou use as padrões do Docker abaixo):

```env
POSTGRES_USER=user
POSTGRES_PASSWORD=password
JWT_SECRET=seu_segredo_super_secreto
DATABASE_URL="postgresql://user:password@localhost:5432/postgres_gt?schema=public"
```

### 4. Suba o Banco de Dados com Docker

Utilize o Docker Compose para subir o container do PostgreSQL automaticamente:

```bash
docker-compose up -d
```

### 5. Execute as Migrations do Prisma

Para criar as tabelas no banco de dados:

```bash
npx prisma migrate dev
```

---

## ⚡ Executando o Projeto

Para iniciar o servidor em modo de desenvolvimento (com watch mode):

```bash
npm run dev
```

O servidor iniciará e estará pronto para receber requisições.

---

## 🧪 Rodando os Testes

Para garantir que tudo está funcionando como esperado, execute os testes automatizados com Jest:

```bash
npm run test:dev
```

---

## 📂 Estrutura de Pastas

A estrutura do projeto segue o padrão MVC/Layered para melhor organização:

```
src/
├── config/         # Configurações gerais
├── controllers/    # Controladores (Lógica de entrada e resposta)
├── database/       # Conexão e configurações do Prisma
├── middlewares/    # Middlewares (Auth, Validação, Error Handling)
├── routes/         # Definição das rotas da API
├── tests/          # Testes unitários e de integração
├── types/          # Definições de tipos TypeScript globais
├── utils/          # Funções utilitárias e helpers
├── app.ts          # Configuração do App Express
└── server.ts       # Ponto de entrada do servidor
```

---

## 🤝 Contribuição

Contribuições são sempre bem-vindas! Sinta-se à vontade para abrir uma issue ou enviar um pull request.

---

<div align="center">
  Feito com 💜
</div>
