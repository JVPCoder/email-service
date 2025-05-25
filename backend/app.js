import express, { json } from 'express';
import cors from 'cors';
import userRoutes from './routes/userRoutes.js';
import draftRoutes from './routes/draftRoutes.js';
import emailRoutes from './routes/emailRoutes.js';

const app = express();

app.use(cors());
app.use(json());

// Rotas de usuário
app.use('/api', userRoutes);

// Rotas de rascunho
app.use('/api', draftRoutes);

// Rotas de email
app.use('/api', emailRoutes);

// Middleware para rota não encontrada (BAD GATEWAY - 502)
app.use((req, res, next) => {
  res.status(502).json({ mensagem: 'Email não encontrado' });
});

// Middleware global para erros de método não permitido
// Esse já está nas rotas específicas com methodNotAllowed, não precisa global aqui

export default app;
