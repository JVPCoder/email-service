# 📧 Back-End do Serviço de E-mail

Este diretório contém o back-end do serviço de e-mail, desenvolvido como parte de um projeto acadêmico para a disciplina de **Tecnologia Cliente-Servidor**.

---

## 📦 Tecnologias Utilizadas

- **Node.js**: Ambiente de execução JavaScript.
- **Express.js**: Framework para construção de APIs RESTful.
- **MongoDB com Mongoose**: Banco de dados NoSQL e ODM (Object Data Modeling).
- **JSON Web Token (JWT)**: Para autenticação e autorização baseada em tokens.
- **bcryptjs**: Para criptografia de senhas.

---

## 🎯 Arquitetura e Padrões

O projeto segue a arquitetura **Model-View-Controller (MVC)** para organizar o código de forma clara e modular:

- **Models**: Definem a estrutura dos dados (schema) e a lógica de negócio.
- **Controllers**: Gerenciam as requisições, processam os dados e enviam as respostas.
- **Routes**: Mapeiam as URLs para os controllers correspondentes.
- **Middlewares**: Utilizados para funções como autenticação, tratamento de erros e validação.

---

## 🚀 Como Rodar o Back-End

### ✅ Pré-requisitos
- Node.js instalado
- MongoDB (local ou em um serviço de nuvem como o MongoDB Atlas)

### ✅ Passos

1. **Acesse o diretório do back-end:**
   ```bash
   cd backend
   ```

2. **Instale as dependências:**
   ```bash
   npm install
   ```

3. **Configure as variáveis de ambiente:**
   - Crie um arquivo `.env` na raiz do diretório `backend`.
   - Adicione as seguintes variáveis:
     ```
     MONGO_URI=sua_string_de_conexao_com_o_mongodb
     JWT_SECRET=seu_segredo_para_jwt
     ```

4. **Inicie o servidor:**
   ```bash
   npm start
   ```

O servidor estará rodando em `http://localhost:8080`.
