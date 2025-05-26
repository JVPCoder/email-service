import User from '../models/User.js';
import bcrypt from 'bcryptjs';
const { hash, compare } = bcrypt;

import jwt from 'jsonwebtoken';
const { sign } = jwt;

export async function register(req, res) {
  const { nome, email, senha } = req.body;

  try {
    const usuarioExistente = await User.findOne({ email });
    if (usuarioExistente) {
      return res.status(400).json({ mensagem: 'Erro na requisição', erro: 'Email já cadastrado' });
    }

    const senhaCriptografada = await hash(senha, 10);
    const novoUsuario = new User({ nome, email, senha: senhaCriptografada });
    await novoUsuario.save();

    res.status(201).json({ mensagem: 'Sucesso ao cadastrar usuario' });
  } catch (err) {
    console.error('Erro no registro:', err.message);
    res.status(500).json({ mensagem: 'Erro interno do servidor', erro: err.message });
  }
}

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
      { id: usuario._id, email: usuario.email },
      process.env.JWT_SECRET,
      { expiresIn: '2h' }
    );

    res.status(200).json({
      token,
      usuario: {
        id: usuario._id,
        nome: usuario.nome,
        email: usuario.email
      }
    });
  } catch (err) {
    console.error('Erro no login:', err.message);
    res.status(500).json({ mensagem: 'Erro interno do servidor', erro: err.message });
  }
}
