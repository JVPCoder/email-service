# 📧 Serviço de E-mail RESTful

Este é um projeto acadêmico desenvolvido para a disciplina de **Tecnologia Cliente-Servidor**, com o objetivo de implementar um **serviço de e-mail completo** baseado na arquitetura **RESTful**.

---

## 📦 Tecnologias Utilizadas

### 🔹 Back-End
- Node.js
- Express.js
- MongoDB (via Mongoose)
- JSON Web Token (JWT) para autenticação
- bcryptjs para criptografia de senhas

### 🔹 Front-End
- React.js + Vite (⚠️ **Em desenvolvimento - WIP**)

---

## 🎯 Objetivos do Projeto

✅ Implementar um sistema de e-mails com:

- **Gestão de Usuários:** cadastro, login, atualização, deleção e autenticação via JWT.
- **Gestão de Rascunhos:** CRUD completo, incluindo vinculação ao envio de e-mails.
- **Gestão de E-mails:** envio, listagem e alteração de status (lido).

✅ Seguir rigorosamente o **protocolo de comunicação** fornecido pela disciplina, garantindo compatibilidade com sistemas de outros alunos.

✅ Aplicar boas práticas de organização: **model-view-controller (MVC)**, middlewares e modularização.

---

## 🛠️ Funcionalidades Implementadas

### ✅ Módulo de Usuários
- Cadastro (`POST /api/usuarios`)
- Login (`POST /api/login`)
- Obter dados (`GET /api/me`)
- Atualização (`PUT /api/usuarios`)
- Deleção (`DELETE /api/usuarios`)
- Logout (`POST /api/logout`)

---

### ✅ Módulo de Rascunhos
- Criar Rascunho (`POST /api/rascunhos`)
- Salvar Rascunho (`PUT /api/rascunhos`)
- Buscar Rascunho (`GET /api/rascunhos/:id`)
- Listar Rascunhos (`GET /api/rascunhos`)
- Deletar Rascunho (`DELETE /api/rascunhos/:id`)

---

### ✅ Módulo de E-mails
- Enviar E-mail via JSON (`POST /api/emails`)
- Enviar E-mail via Rascunho (`POST /api/emails/:id`)
- Marcar E-mail como lido (`PUT /api/emails/:id`)
- Listar E-mails (`GET /api/emails`)

---

## 🚨 Tratamento de Erros Padrão

- **401:** Acesso negado
- **400:** Erro na requisição
- **404:** Recurso não encontrado
- **502:** Endpoint não encontrado
- **405:** Método não permitido
- **500:** Erro interno do servidor

**Todas as mensagens seguem rigorosamente o protocolo oficial da disciplina.**

---

## 🚀 Como rodar o projeto

### ✅ Pré-requisitos:
- Node.js
- MongoDB local ou na nuvem

### ✅ Passos:

```bash
# Clone o repositório
git clone https://github.com/seu-usuario/seu-repo.git

# Acesse o backend
cd backend

# Instale as dependências
npm install

# Configure as variáveis de ambiente
cp .env.example .env
# Edite o arquivo .env com MONGO_URI e JWT_SECRET

# Rode a aplicação
npm start
```

O servidor estará rodando em:
```bash
http://localhost:8080
```
