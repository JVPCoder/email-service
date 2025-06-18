import { useState, useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import api from '../services/api';
import { motion } from 'framer-motion';
import Toast from '../components/Toast';
import Loader from '../components/Loader';

function NewEmailPage() {
  const location = useLocation();
  const navigate = useNavigate();

  const [assunto, setAssunto] = useState('');
  const [emailDestinatario, setEmailDestinatario] = useState('');
  const [corpo, setCorpo] = useState('');
  const [loading, setLoading] = useState(false);
  const [toastMessage, setToastMessage] = useState('');
  const [toastType, setToastType] = useState('success');

  const showToast = (msg, type = 'success') => {
    setToastMessage(msg);
    setToastType(type);
    setTimeout(() => setToastMessage(''), 1000);
  };

  useEffect(() => {
    if (location.state) {
      setAssunto(location.state.assunto || '');
      setEmailDestinatario(location.state.emailDestinatario || '');
      setCorpo(location.state.corpo || '');
    }
  }, [location.state]);

  const enviarEmail = async () => {
    setLoading(true);
    try {
      const token = localStorage.getItem('token');
      await api.post('../api/emails', { assunto, emailDestinatario, corpo }, {
        headers: { Authorization: `Bearer ${token}` },
      });
      showToast('Email enviado com sucesso!');
      navigate('/');
    } catch {
      showToast('Erro ao enviar email.', 'error');
    } finally {
      setLoading(false);
    }
  };

  const salvarRascunho = async () => {
    if (!assunto && !emailDestinatario && !corpo) return;
    setLoading(true);
    try {
      const token = localStorage.getItem('token');
      await api.post('../api/rascunhos', { assunto, emailDestinatario, corpo }, {
        headers: { Authorization: `Bearer ${token}` },
      });
      showToast('Rascunho salvo!');
    } catch {
      showToast('Erro ao salvar rascunho.', 'error');
    } finally {
      setLoading(false);
    }
  };

  const handleEnviar = async (e) => {
    e.preventDefault();
    await enviarEmail();
  };

  const handleSalvar = async (e) => {
    e.preventDefault();
    await salvarRascunho();
  };

  return (
    <motion.div
      className="min-h-screen bg-gray-100 flex items-center justify-center p-8"
      initial={{ opacity: 0, y: 30 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, ease: 'easeOut' }}
    >
      {toastMessage && <Toast message={toastMessage} type={toastType} />}
      {loading ? <Loader /> : (
        <motion.div
          className="bg-white p-10 rounded-lg shadow-lg w-full max-w"
          initial={{ scale: 0.95, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ duration: 0.4, ease: 'easeOut' }}
        >
          <h2 className="text-4xl font-bold mb-6 text-gray-900">Novo Email</h2>

          <form className="space-y-6">
            <div>
              <label className="block text-gray-700 mb-1">Assunto</label>
              <input
                type="text"
                value={assunto}
                onChange={(e) => setAssunto(e.target.value)}
                className="border rounded px-3 py-2 w-full"
                placeholder="Digite o assunto..."
              />
            </div>

            <div>
              <label className="block text-gray-700 mb-1">Destinatário</label>
              <input
                type="email"
                value={emailDestinatario}
                onChange={(e) => setEmailDestinatario(e.target.value)}
                className="border rounded px-3 py-2 w-full"
                placeholder="Digite o email do destinatário..."
              />
            </div>

            <div>
              <label className="block text-gray-700 mb-1">Corpo do Email</label>
              <textarea
                value={corpo}
                onChange={(e) => setCorpo(e.target.value)}
                className="border rounded px-3 py-2 w-full h-48"
                placeholder="Escreva sua mensagem..."
              />
            </div>

            <div className="flex space-x-4">
              <button
                onClick={handleSalvar}
                className="bg-gray-700 hover:bg-gray-800 text-white px-6 py-3 rounded text-lg font-semibold transition transform hover:scale-98 w-full"
              >
                Salvar como Rascunho
              </button>

              <button
                onClick={handleEnviar}
                className="bg-green-700 hover:bg-green-800 text-white px-6 py-3 rounded text-lg font-semibold transition transform hover:scale-98 w-full"
              >
                Enviar Email
              </button>
            </div>
          </form>
        </motion.div>
      )}
    </motion.div>
  );
}

export default NewEmailPage;
