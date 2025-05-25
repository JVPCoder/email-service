import User, { findOne } from '../models/User';
import { hash, compare } from 'bcryptjs';
import { sign } from 'jsonwebtoken';

export async function register(req, res) {
  const { nome, email, senha } = req.body;

  try {
    const usuarioExistente = await findOne({ email });
    if (usuarioExistente) return res.status(400).json({ erro: 'Email já cadastrado' });

    const senhaCriptografada = await hash(senha, 10);
    const novoUsuario = new User({ nome, email, senha: senhaCriptografada });
    await novoUsuario.save();

    res.status(201).json({ mensagem: 'Usuário criado com sucesso' });
  } catch (err) {
    res.status(500).json({ erro: 'Erro ao criar usuário' });
  }
}

export async function login(req, res) {
  const { email, senha } = req.body;

  try {
    const usuario = await findOne({ email });
    if (!usuario) return res.status(401).json({ erro: 'Credenciais inválidas' });

    const senhaValida = await compare(senha, usuario.senha);
    if (!senhaValida) return res.status(401).json({ erro: 'Credenciais inválidas' });

    const token = sign({ id: usuario._id }, process.env.JWT_SECRET, { expiresIn: '2h' });

    res.json({ token, usuario: { id: usuario._id, nome: usuario.nome, email: usuario.email } });
  } catch (err) {
    res.status(500).json({ erro: 'Erro ao fazer login' });
  }
}
