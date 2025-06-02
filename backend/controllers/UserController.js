import User from '../models/User.js';
import { getNextId } from '../utils/getNextId.js';
import bcrypt from 'bcryptjs';
const { hash, compare } = bcrypt;
import jwt from 'jsonwebtoken';
const { sign } = jwt;

// Registrar
export async function register(req, res) {
  const { nome, email, senha } = req.body;

  try {
    const usuarioExistente = await User.findOne({ email });
    if (usuarioExistente) {
      return res.status(400).json({ mensagem: 'Erro na requisição', erro: 'Email já cadastrado' });
    }

    const userId = await getNextId('userId');
    const senhaCriptografada = await hash(senha, 10);

    const novoUsuario = new User({
      userId,
      nome,
      email,
      senha: senhaCriptografada
    });

    await novoUsuario.save();

    res.status(201).json({ mensagem: 'Sucesso ao cadastrar usuario' });
  } catch (err) {
    console.error('Erro no registro:', err.message);
    res.status(500).json({ mensagem: 'Erro interno do servidor', erro: err.message });
  }
}

// Login
export async function login(req, res) {
  const { email, senha } = req.body;

  try {
    const usuario = await User.findOne({ email });
    if (!usuario) {
      return res.status(401).json({ mensagem: 'Credenciais Incorretas' });
    }

    const senhaValida = await compare(senha, usuario.senha);
    if (!senhaValida) {
      return res.status(401).json({ mensagem: 'Credenciais Incorretas' });
    }

    const token = sign(
      { id: usuario.userId, email: usuario.email },
      process.env.JWT_SECRET,
      { expiresIn: '2h' }
    );

    res.status(200).json({
      mensagem: 'Login realizado com sucesso',
      token,
      usuario: { id: usuario.userId, nome: usuario.nome, email: usuario.email }
    });
  } catch (err) {
    console.error('Erro no login:', err.message);
    res.status(500).json({ mensagem: 'Erro interno do servidor', erro: err.message });
  }
}

// GET
export async function getUser(req, res) {
  try {
    const usuario = await User.findOne({ userId: req.user.id }).select('nome email');
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
    return res.status(400).json({ mensagem: 'Erro na requisição', erro: 'Nome e senha são obrigatórios' });
  }

  try {
    const usuario = await User.findOne({ userId: req.user.id });
    if (!usuario) return res.status(404).json({ mensagem: 'Usuario não encontrado' });

    usuario.nome = nome;
    usuario.senha = await hash(senha, 10);
    await usuario.save();

    res.status(200).json({ mensagem: 'Sucesso ao salvar o usuario', usuario: { nome, email: usuario.email } });
  } catch (err) {
    console.error('Erro ao atualizar usuário:', err.message);
    res.status(500).json({ mensagem: 'Erro interno do servidor', erro: err.message });
  }
}

// DELETE
export async function deleteUser(req, res) {
  try {
    const usuario = await User.findOneAndDelete({ userId: req.user.id });
    if (!usuario) return res.status(404).json({ mensagem: 'Usuario não encontrado' });
    res.status(200).json({ mensagem: 'Sucesso ao excluir o usuario' });
  } catch (err) {
    console.error('Erro ao deletar usuário:', err.message);
    res.status(500).json({ mensagem: 'Erro interno do servidor', erro: err.message });
  }
}
