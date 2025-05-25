require('dotenv').config();

import { listen } from './app';
import { connect } from 'mongoose';

const PORT = process.env.PORT || 8080;

connect(process.env.MONGO_URI)
  .then(() => {
    listen(PORT, () => {
      console.log(`Servidor rodando na porta ${PORT}`);
    });
  })
  .catch(err => console.error('Erro ao conectar ao MongoDB:', err));
