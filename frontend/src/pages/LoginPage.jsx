import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

function LoginPage() {
  const [email, setEmail] = useState('');
  const [senha, setSenha] = useState('');
  const [nome, setNome] = useState('');
  const [isRegistering, setIsRegistering] = useState(false);

  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.post('http://localhost:8080/api/login', { email, senha });
      localStorage.setItem('token', res.data.token);
      navigate('/');
    } catch (err) {
      alert('Erro ao fazer login');
    }
  };

  const handleRegister = async (e) => {
    e.preventDefault();
    try {
      await axios.post('http://localhost:8080/api/usuarios', { nome, email, senha });
      alert('Cadastro realizado com sucesso! Faça login.');
      setIsRegistering(false);
      setNome('');
      setEmail('');
      setSenha('');
    } catch (err) {
      alert('Erro ao realizar cadastro');
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      <form
        onSubmit={isRegistering ? handleRegister : handleLogin}
        className="bg-white p-8 rounded shadow-md space-y-4 w-80"
      >
        <h2 className="text-2xl font-bold mb-4">
          {isRegistering ? 'Registrar-se' : 'Login'}
        </h2>

        {isRegistering && (
          <input
            type="text"
            placeholder="Nome"
            value={nome}
            onChange={(e) => setNome(e.target.value)}
            className="border rounded px-3 py-2 w-full"
          />
        )}

        <input
          type="email"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          className="border rounded px-3 py-2 w-full"
        />

        <input
          type="password"
          placeholder="Senha"
          value={senha}
          onChange={(e) => setSenha(e.target.value)}
          className="border rounded px-3 py-2 w-full"
        />

        <button
          type="submit"
          className="bg-blue-500 text-white px-4 py-2 rounded w-full"
        >
          {isRegistering ? 'Cadastrar' : 'Entrar'}
        </button>

        <button
          type="button"
          onClick={() => setIsRegistering(!isRegistering)}
          className="text-blue-500 hover:underline block text-center"
        >
          {isRegistering ? 'Fazer Login' : 'Não tem conta ? Registre-se'}
        </button>
      </form>
    </div>
  );
}

export default LoginPage;
