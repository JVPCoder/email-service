import { useState } from 'react';
import api from '../services/api.js';
import { useNavigate } from 'react-router-dom';

const RegisterPage = () => {
  const [nome, setNome] = useState('');
  const [email, setEmail] = useState('');
  const [senha, setSenha] = useState('');
  const [error, setError] = useState('');

  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      await api.post('/usuarios', { nome, email, senha });
      navigate('/login');
    } catch (err) {
      setError('Erro ao cadastrar usuário');
    }
  };

  return (
    <div>
      <h2>Cadastro</h2>
      {error && <p style={{ color: 'red' }}>{error}</p>}
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          placeholder="Nome"
          value={nome}
          onChange={e => setNome(e.target.value)}
          required
        />
        <input
          type="email"
          placeholder="E-mail"
          value={email}
          onChange={e => setEmail(e.target.value)}
          required
        />
        <input
          type="password"
          placeholder="Senha"
          value={senha}
          onChange={e => setSenha(e.target.value)}
          required
        />
        <button type="submit">Cadastrar</button>
      </form>
    </div>
  );
};

export default RegisterPage;
