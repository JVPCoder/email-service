import { Router } from 'express';
const router = Router();
import { sendEmail, sendEmailFromDraft, markAsRead, getAllEmails } from '../controllers/EmailController.js';
import auth from '../middlewares/auth.js';
import methodNotAllowed from '../middlewares/methodNotAllowed.js';

// Enviar email (via objeto JSON)
router.post('/emails', auth, sendEmail);

// Enviar email a partir de rascunho
router.post('/emails/:id', auth, sendEmailFromDraft);

// Marcar email como lido
router.put('/emails/:id', auth, markAsRead);

// Listar emails
router.get('/emails', auth, getAllEmails);

// Proteção contra métodos não permitidos
router.all('/emails', methodNotAllowed(['POST', 'GET']));
router.all('/emails/:id', methodNotAllowed(['POST', 'PUT']));

export default router;
