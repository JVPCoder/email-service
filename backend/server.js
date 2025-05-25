import path from 'path';
import { fileURLToPath } from 'url';

import dotenv from 'dotenv';

// ✅ Ajuste para pegar o diretório atual no ESModules
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// ✅ Carrega o .env que está dentro da pasta backend
dotenv.config({ path: path.resolve(__dirname, '.env') });

import mongoose from 'mongoose';
import app from './app.js';

// ✅ Teste: veja se carregou corretamente
console.log('MONGO_URI:', process.env.MONGO_URI);

const PORT = process.env.PORT || 8080;

mongoose.connect(process.env.MONGO_URI)
  .then(() => {
    console.log('✅ Conectado ao MongoDB');
    app.listen(PORT, () => {
      console.log(`🚀 Servidor rodando em http://localhost:${PORT}`);
    });
  })
  .catch(err => {
    console.error('❌ Erro ao conectar ao MongoDB:', err.message);
  });
