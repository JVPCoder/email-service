import { Router } from 'express';
const router = Router();
import { createDraft, updateDraft, getDraft, getAllDrafts, deleteDraft } from '../controllers/DraftController.js';
import auth from '../middlewares/auth.js';
import methodNotAllowed from '../middlewares/methodNotAllowed.js';

// Criar rascunho
router.post('/rascunhos', auth, createDraft);

// Atualizar rascunho
router.put('/rascunhos', auth, updateDraft);

// Encontrar rascunho por ID
router.get('/rascunhos/:id', auth, getDraft);

// Listar todos os rascunhos
router.get('/rascunhos', auth, getAllDrafts);

// Deletar rascunho
router.delete('/rascunhos/:id', auth, deleteDraft);

// Proteção contra métodos não permitidos
router.all('/rascunhos', methodNotAllowed(['POST', 'PUT', 'GET']));
router.all('/rascunhos/:id', methodNotAllowed(['GET', 'DELETE']));

export default router;
