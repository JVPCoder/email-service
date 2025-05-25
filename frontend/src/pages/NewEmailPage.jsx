import { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import Toast from '../components/Toast';
import Loader from '../components/Loader';

function NewEmailPage() {
  const [assunto, setAssunto] = useState('');
  const [emailDestinatario, setEmailDestinatario] = useState('');
  const [corpo, setCorpo] = useState('');
  const [loading, setLoading] = useState(false);
  const [toastMessage, setToastMessage] = useState('');
  const [toastType, setToastType] = useState('success');

  const navigate = useNavigate();

  const showToast = (msg, type = 'success') => {
    setToastMessage(msg);
    setToastType(type);
    setTimeout(() => setToastMessage(''), 3000);
  };

  const enviarEmail = async () => {
    setLoading(true);
    try {
      const token = localStorage.getItem('token');
      await axios.post('http://localhost:8080/api/emails', { assunto, emailDestinatario, corpo }, {
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
    try {
      const token = localStorage.getItem('token');
      await axios.post('http://localhost:8080/api/rascunhos', { assunto, emailDestinatario, corpo }, {
        headers: { Authorization: `Bearer ${token}` },
      });
      showToast('Rascunho salvo!');
    } catch {
      showToast('Erro ao salvar rascunho.', 'error');
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

  useEffect(() => {
    const autoSalvar = () => {
      if (assunto || emailDestinatario || corpo) {
        salvarRascunho();
      }
    };

    window.addEventListener('beforeunload', autoSalvar);

    return () => {
      autoSalvar();
      window.removeEventListener('beforeunload', autoSalvar);
    };
  }, []);


  return (
    <div className="min-h-screen bg-gray-100 flex items-center justify-center p-8">
      {toastMessage && <Toast message={toastMessage} type={toastType} />}
      {loading ? <Loader /> : (
        <div className="bg-white p-10 rounded-lg shadow-lg w-full max-w">
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
                className="bg-gray-700 hover:bg-gray-800 text-white px-6 py-3 rounded text-lg font-semibold transition w-full transition hover:scale-99"
              >
                Salvar como Rascunho
              </button>

              <button
                onClick={handleEnviar}
                className="bg-red-700 hover:bg-red-800 text-white px-6 py-3 rounded text-lg font-semibold transition w-full hover:scale-99"
              >
                Enviar Email
              </button>
            </div>
          </form>
        </div>
      )}
    </div>
  );
}

export default NewEmailPage;
