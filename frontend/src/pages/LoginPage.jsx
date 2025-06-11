import { useState, useContext, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import Toast from '../components/Toast';
import Loader from '../components/Loader';
import { AuthContext } from '../context/AuthContext';

function LoginPage() {
  const [email, setEmail] = useState('');
  const [senha, setSenha] = useState('');
  const [nome, setNome] = useState('');
  const [isRegistering, setIsRegistering] = useState(false);
  const [loading, setLoading] = useState(false);
  const [toastMessage, setToastMessage] = useState('');
  const [toastType, setToastType] = useState('success');

  const { login, token } = useContext(AuthContext);
  const navigate = useNavigate();

  useEffect(() => {
    if (token) {
      navigate('/');
    }
  }, [token, navigate]);

  const showToast = (msg, type = 'success') => {
    setToastMessage(msg);
    setToastType(type);
    setTimeout(() => setToastMessage(''), 3000);
  };

  const handleLogin = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      const res = await axios.post('http://localhost:8080/api/login', { email, senha });
      login(res.data.token, res.data.usuario);
      showToast('Login realizado com sucesso!');
      navigate('/');
    } catch {
      showToast('Erro ao fazer login.', 'error');
    } finally {
      setLoading(false);
    }
  };

  const handleRegister = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      await axios.post('http://localhost:8080/api/usuarios', { nome, email, senha });
      showToast('Cadastro realizado com sucesso! Faça login.');
      setIsRegistering(false);
      setNome('');
      setEmail('');
      setSenha('');
    } catch {
      showToast('Erro ao realizar cadastro.', 'error');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      {toastMessage && <Toast message={toastMessage} type={toastType} />}
      {loading ? <Loader /> : (
        <form
          onSubmit={isRegistering ? handleRegister : handleLogin}
          className="bg-white p-8 rounded shadow-md space-y-4 w-80"
        >
          <h2 className="text-2xl font-bold mb-4 text-gray-900">
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
            className="bg-red-700 hover:bg-red-800 text-white px-4 py-2 rounded w-full transition"
          >
            {isRegistering ? 'Cadastrar' : 'Entrar'}
          </button>

          <button
            type="button"
            onClick={() => setIsRegistering(!isRegistering)}
            className="text-red-700 hover:text-red-800 underline block text-center transition"
          >
            {isRegistering ? 'Já tenho conta. Fazer Login' : 'Não tem conta? Registre-se'}
          </button>
        </form>
      )}
    </div>
  );
}

export default LoginPage;
