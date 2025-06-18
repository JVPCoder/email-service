import { Router } from 'express';
const router = Router();

import {
  createDraft,
  updateDraft,
  getDraft,
  getAllDrafts,
  deleteDraft
} from '../controllers/DraftController.js';

import auth from '../middlewares/auth.js';
import methodNotAllowed from '../middlewares/methodNotAllowed.js';

// ➕ Criar rascunho
router.post('/rascunhos', auth, createDraft);

// ✏️ Atualizar rascunho por ID
router.put('/rascunhos/:id', auth, updateDraft);

// 🔍 Buscar rascunho por ID
router.get('/rascunhos/:id', auth, getDraft);

// 📄 Listar todos os rascunhos
router.get('/rascunhos', auth, getAllDrafts);

// 🗑️ Deletar rascunho
router.delete('/rascunhos/:id', auth, deleteDraft);

// 🚫 Proteger contra métodos não permitidos
router.all('/rascunhos', methodNotAllowed(['POST', 'GET']));
router.all('/rascunhos/:id', methodNotAllowed(['GET', 'PUT', 'DELETE']));

export default router;
