import db from '../db.js';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';

const { hash, compare } = bcrypt;
const { sign } = jwt;

// Registrar
export async function register(req, res) {
  const { nome, email, senha } = req.body;

  try {
    // Verifica se já existe um usuário com o mesmo email
    const usuarioExistente = await db('users').where({ email }).first();
    if (usuarioExistente) {
      return res.status(400).json({
        mensagem: 'Erro na requisição',
        erro: 'Email já cadastrado'
      });
    }

    const senhaCriptografada = await hash(senha, 10);

    // Insere o novo usuário
    const [novoUsuario] = await db('users')
      .insert({
        nome,
        email,
        senha: senhaCriptografada
      })
      .returning(['id', 'nome', 'email']);

    res.status(201).json({ mensagem: 'Sucesso ao cadastrar usuario', usuario: novoUsuario });
  } catch (err) {
    console.error('Erro no registro:', err.message);
    res.status(500).json({ mensagem: 'Erro interno do servidor', erro: err.message });
  }
}

// Login
export async function login(req, res) {
  const { email, senha } = req.body;

  try {
    const usuario = await db('users').where({ email }).first();
    if (!usuario) {
      return res.status(401).json({ mensagem: 'Credenciais Incorretas' });
    }

    const senhaValida = await compare(senha, usuario.senha);
    if (!senhaValida) {
      return res.status(401).json({ mensagem: 'Credenciais Incorretas' });
    }

    const token = sign(
      { id: usuario.id, email: usuario.email },
      process.env.JWT_SECRET,
      { expiresIn: '2h' }
    );

    res.status(200).json({
      token,
    });
  } catch (err) {
    console.error('Erro no login:', err.message);
    res.status(500).json({ mensagem: 'Erro interno do servidor', erro: err.message });
  }
}

// GET
export async function getUser(req, res) {
  try {
    const usuario = await db('users')
      .where({ id: req.user.id })
      .select('nome', 'email')
      .first();

    if (!usuario) {
      return res.status(404).json({ mensagem: 'Usuario não encontrado' });
    }

    res.status(200).json({ mensagem: 'Sucesso ao buscar usuario', usuario });
  } catch (err) {
    console.error('Erro ao buscar usuário:', err.message);
    res.status(500).json({ mensagem: 'Erro interno do servidor', erro: err.message });
  }
}

// PUT
export async function updateUser(req, res) {
  const { nome, senha } = req.body;

  if (!nome || !senha) {
    return res.status(400).json({
      mensagem: 'Erro na requisição',
      erro: 'Nome e senha são obrigatórios'
    });
  }

  try {
    const usuario = await db('users').where({ id: req.user.id }).first();
    if (!usuario) {
      return res.status(404).json({ mensagem: 'Usuario não encontrado' });
    }

    const senhaCriptografada = await hash(senha, 10);

    await db('users')
      .where({ id: req.user.id })
      .update({
        nome,
        senha: senhaCriptografada
      });

    res.status(200).json({
      mensagem: 'Sucesso ao salvar o usuario',
      usuario: { nome, email: usuario.email }
    });
  } catch (err) {
    console.error('Erro ao atualizar usuário:', err.message);
    res.status(500).json({ mensagem: 'Erro interno do servidor', erro: err.message });
  }
}

// DELETE
export async function deleteUser(req, res) {
  try {
    const usuario = await db('users').where({ id: req.user.id }).first();
    if (!usuario) {
      return res.status(404).json({ mensagem: 'Usuario não encontrado' });
    }

    await db('users').where({ id: req.user.id }).del();

    res.status(200).json({ mensagem: 'Sucesso ao excluir o usuario' });
  } catch (err) {
    console.error('Erro ao deletar usuário:', err.message);
    res.status(500).json({ mensagem: 'Erro interno do servidor', erro: err.message });
  }
}


// GET ALL USERS ADMIN

export async function getActiveUsers(req, res) {
  const FIVE_MINUTES_AGO = new Date(Date.now() - 5 * 60 * 1000); // últimos 5 minutos

  try {
    const ativos = await db('sessions')
      .join('users', 'users.id', '=', 'sessions.user_id')
      .where('last_active', '>=', FIVE_MINUTES_AGO)
      .select('users.id', 'users.nome', 'users.email', 'sessions.last_active');

    res.status(200).json({ usuarios: ativos });
  } catch (err) {
    console.error('Erro ao buscar usuários ativos:', err.message);
    res.status(500).json({ mensagem: "Erro interno", erro: err.message });
  }
}

