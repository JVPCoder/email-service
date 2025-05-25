const express = require('express');
const router = express.Router();
const emailController = require('../controllers/EmailController');
const auth = require('../middlewares/auth');
const methodNotAllowed = require('../middlewares/methodNotAllowed');

// Enviar email (via objeto JSON)
router.post('/emails', auth, emailController.sendEmail);

// Enviar email a partir de rascunho
router.post('/emails/:id', auth, emailController.sendEmailFromDraft);

// Marcar email como lido
router.put('/emails/:id', auth, emailController.markAsRead);

// Listar emails
router.get('/emails', auth, emailController.getAllEmails);

// Proteção contra métodos não permitidos
router.all('/emails', methodNotAllowed(['POST', 'GET']));
router.all('/emails/:id', methodNotAllowed(['POST', 'PUT']));

module.exports = router;
