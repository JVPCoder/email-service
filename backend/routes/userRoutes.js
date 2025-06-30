import { Router } from 'express';
const router = Router();
import { register, login, getUser, updateUser, deleteUser, getActiveUsers} from '../controllers/UserController.js';
import auth from '../middlewares/auth.js';
import bcrypt from 'bcryptjs';
const { hash, compare } = bcrypt;
import methodNotAllowed from '../middlewares/methodNotAllowed.js';

// Usuarios Endpoints
router.post('/usuarios', register);
router.get('/usuarios', auth, getUser);
router.put('/usuarios', auth, updateUser);
router.delete('/usuarios', auth, deleteUser);

// Login/Logout de usuário
router.post('/login', login);
router.post('/logout', auth, async (req, res) => {
  try {
    await db('sessions').where('user_id', req.user.id).del();

    res.status(200).json({
      mensagem: 'Logout realizado com sucesso',
    });
  } catch (err) {
    console.error('Erro no logout:', err.message);
    res.status(500).json({ mensagem: 'Erro interno no logout', erro: err.message });
  }
});

// Obter perfil do usuário autenticado
router.get('/me', auth, async (req, res) => {
  try {
    const user = await findById(req.userId).select('-senha');

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

// Online Usuários
router.get('/usuarios-ativos', getActiveUsers);


// Proteção para métodos não permitidos
router.all('/usuarios', methodNotAllowed(['POST', 'PUT', 'DELETE', 'GET']));
router.all('/login', methodNotAllowed(['POST']));
router.all('/logout', methodNotAllowed(['POST']));
router.all('/me', methodNotAllowed(['GET']));

export default router;
