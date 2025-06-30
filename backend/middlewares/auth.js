import jwt from 'jsonwebtoken';
import db from '../db.js';

const auth = async (req, res, next) => {
  const authHeader = req.headers.authorization;

  if (!authHeader) {
    return res.status(401).json({ mensagem: 'Acesso negado. Token não fornecido.' });
  }

  const token = authHeader.split(' ')[1];

  if (!token) {
    return res.status(401).json({ mensagem: 'Acesso negado. Token mal formatado.' });
  }

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);

    req.user = {
      id: decoded.id,
      email: decoded.email,
    };

    await db('sessions')
      .insert({
        user_id: req.user.id,
        last_active: new Date(),
      })
      .onConflict('user_id')
      .merge();

    next();
  } catch (err) {
    console.error('Erro na autenticação:', err.message);
    res.status(401).json({ mensagem: 'Token inválido ou expirado.' });
  }
};

export default auth;
