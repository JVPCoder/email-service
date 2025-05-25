const express = require('express');
const router = express.Router();
const userController = require('../controllers/UserController');
const auth = require('../middlewares/auth');
const bcrypt = require('bcryptjs');
const User = require('../models/User');
const methodNotAllowed = require('../middlewares/methodNotAllowed');

// Cadastro de usuário
router.post('/usuarios', userController.register);

// Login de usuário
router.post('/login', userController.login);

// Obter perfil do usuário autenticado
router.get('/me', auth, async (req, res) => {
  try {
    const user = await User.findById(req.userId).select('-senha');

    if (!user) {
      return res.status(404).json({ mensagem: 'Usuario não encontrado' });
    }

    res.status(200).json({
      mensagem: 'Sucesso ao buscar usuario',
      usuario: {
        nome: user.nome,
        email: user.email
      }
    });
  } catch (err) {
    res.status(500).json({
      mensagem: 'Erro interno do servidor',
      erro: err.message
    });
  }
});

// Logout de usuário
router.post('/logout', auth, (req, res) => {
  console.log(`Usuário ${req.userId} fez logout.`);
  res.status(200).json({
    mensagem: 'Logout realizado com suscesso'
  });
});

// Atualizar usuário
router.put('/usuarios', auth, async (req, res) => {
  const { nome, senha } = req.body;

  if (!nome || !senha) {
    return res.status(400).json({
      mensagem: 'Erro na requisição',
      erro: 'Campos obrigatórios faltando'
    });
  }

  try {
    const user = await User.findById(req.userId);
    if (!user) {
      return res.status(404).json({ mensagem: 'Usuario não encontrado' });
    }

    user.nome = nome;
    user.senha = await bcrypt.hash(senha, 10);
    await user.save();

    res.status(200).json({
      mensagem: 'Sucesso ao salvar o usuario',
      usuario: {
        nome: user.nome,
        email: user.email
      }
    });
  } catch (err) {
    res.status(500).json({
      mensagem: 'Erro interno do servidor',
      erro: err.message
    });
  }
});

// Deletar usuário
router.delete('/usuarios', auth, async (req, res) => {
  try {
    const user = await User.findByIdAndDelete(req.userId);

    if (!user) {
      return res.status(404).json({ mensagem: 'Usuario não encontrado' });
    }

    res.status(200).json({
      mensagem: 'Sucesso ao excluir o usuario'
    });
  } catch (err) {
    res.status(500).json({
      mensagem: 'Erro interno do servidor',
      erro: err.message
    });
  }
});

// Proteção para métodos não permitidos
router.all('/usuarios', methodNotAllowed(['POST', 'PUT', 'DELETE', 'GET']));
router.all('/login', methodNotAllowed(['POST']));
router.all('/logout', methodNotAllowed(['POST']));
router.all('/me', methodNotAllowed(['GET']));

module.exports = router;
