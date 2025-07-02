# 📧 Serviço de E-mail RESTful

Este é um projeto acadêmico desenvolvido para a disciplina de **Tecnologia Cliente-Servidor**, com o objetivo de implementar um **serviço de e-mail completo** baseado na arquitetura **RESTful**.

---

## 📦 Tecnologias Utilizadas

### 🔹 [Back-End](./backend/README.md)

O back-end, construído com **Node.js** e **Express.js**, é responsável por toda a lógica de negócio, incluindo:

- **API RESTful** para gestão de usuários, rascunhos e e-mails.
- **Autenticação** com JSON Web Tokens (JWT).
- **Persistência de dados** com MongoDB.

➡️ **[Clique aqui para ver os detalhes do Back-End](./backend/README.md)**

### 🔹 [Front-End](./frontend/README.md)

O front-end, desenvolvido com **React.js** e **Vite**, consome a API do back-end para fornecer uma interface de usuário interativa.

- **Interface reativa** para uma experiência de usuário fluida.
- **Comunicação assíncrona** com o servidor.
- **Gerenciamento de estado** para autenticação e dados.

➡️ **[Clique aqui para ver os detalhes do Front-End](./frontend/README.md)**

---

## 🎯 Objetivos do Projeto

✅ Implementar um sistema de e-mails com:

- **Gestão de Usuários:** cadastro, login, atualização, deleção e autenticação via JWT.
- **Gestão de Rascunhos:** CRUD completo, incluindo vinculação ao envio de e-mails.
- **Gestão de E-mails:** envio, listagem e alteração de status (lido).

✅ Seguir rigorosamente o **protocolo de comunicação** fornecido pela disciplina, garantindo compatibilidade com sistemas de outros alunos.

✅ Aplicar boas práticas de organização: **model-view-controller (MVC)**, middlewares e modularização.

---

## 🚀 Como Rodar o Projeto Completo

Para rodar a aplicação completa, você precisará iniciar tanto o **back-end** quanto o **front-end** em terminais separados.

1. **Siga as instruções** no `README.md` do [back-end](./backend/README.md) para iniciar o servidor.
2. **Siga as instruções** no `README.md` do [front-end](./frontend/README.md) para iniciar a interface do usuário.

O servidor back-end estará em `http://localhost:8080` e o front-end em `http://localhost:5173` (ou outra porta designada).