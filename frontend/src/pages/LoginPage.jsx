import { useState, useContext } from 'react';
import { AuthContext } from '../context/AuthContext.jsx';
import api from '../services/api.js';
import { useNavigate } from 'react-router-dom';

const LoginPage = () => {
  const [email, setEmail] = useState('');
  const [senha, setSenha] = useState('');
  const [error, setError] = useState('');

  const { login } = useContext(AuthContext);
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await api.post('/login', { email, senha });
      login(response.data.token);
      navigate('/');
    } catch (err) {
      setError('Credenciais inválidas');
    }
  };

  return (
    <div>
      <h2>Login</h2>
      {error && <p style={{ color: 'red' }}>{error}</p>}
      <form onSubmit={handleSubmit}>
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
        <button type="submit">Entrar</button>
      </form>
    </div>
  );
};

export default LoginPage;
