# 🎨 Front-End do Serviço de E-mail

Este diretório contém o front-end do serviço de e-mail, desenvolvido com o objetivo de consumir a API RESTful do back-end e fornecer uma interface de usuário para interagir com o sistema.

**⚠️ Atenção: Este front-end ainda está em desenvolvimento (Work in Progress).**

---

## 📦 Tecnologias Utilizadas

- **React.js**: Biblioteca JavaScript para construção de interfaces de usuário.
- **Vite**: Ferramenta de build moderna e rápida para projetos web.
- **Axios**: Cliente HTTP para realizar requisições à API do back-end.
- **React Router**: Para gerenciamento de rotas e navegação na aplicação.
- **Context API**: Para gerenciamento de estado global (ex: autenticação).

---

## 🚀 Como Rodar o Front-End

### ✅ Pré-requisitos
- Node.js instalado

### ✅ Passos

1. **Acesse o diretório do front-end:**
   ```bash
   cd frontend
   ```

2. **Instale as dependências:**
   ```bash
   npm install
   ```

3. **Configure as variáveis de ambiente:**
   - Crie um arquivo `.env` na raiz do diretório `frontend`.
   - Adicione a seguinte variável, apontando para a URL da sua API back-end:
     ```
     VITE_API_URL=http://localhost:8080/api
     ```

4. **Inicie a aplicação:**
   ```bash
   npm run dev
   ```

O front-end estará acessível em `http://localhost:5173` (ou outra porta indicada pelo Vite).