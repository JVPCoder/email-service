import { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import api from '../services/api';
import Loader from '../components/Loader';
import Toast from '../components/Toast';

function DraftDetailPage() {
  const { id } = useParams();
  const navigate = useNavigate();

  const [assunto, setAssunto] = useState('');
  const [emailDestinatario, setEmailDestinatario] = useState('');
  const [corpo, setCorpo] = useState('');

  const [loading, setLoading] = useState(true);
  const [toastMessage, setToastMessage] = useState('');
  const [toastType, setToastType] = useState('success');

  const showToast = (msg, type = 'success') => {
    setToastMessage(msg);
    setToastType(type);
    setTimeout(() => setToastMessage(''), 3000);
  };

  useEffect(() => {
    const fetchDraft = async () => {
      try {
        const res = await api.get(`../api/rascunhos/${id}`);
        const rascunho = res.data.rascunho;
        setAssunto(rascunho.assunto);
        setEmailDestinatario(rascunho.emailDestinatario);
        setCorpo(rascunho.corpo);
      } catch (err) {
        showToast('Erro ao carregar rascunho.', 'error');
      } finally {
        setLoading(false);
      }
    };

    fetchDraft();
  }, [id]);

  const handleSalvar = async (e) => {
    e.preventDefault();
    try {
      await api.put(`../api/rascunhos/${id}`, {
        assunto,
        emailDestinatario,
        corpo
      });
      showToast('Rascunho atualizado com sucesso!');
    } catch {
      showToast('Erro ao salvar rascunho.', 'error');
    }
  };

  const handleEnviar = async (e) => {
    e.preventDefault();
    try {
      await api.post('../api/emails', {
        assunto,
        emailDestinatario,
        corpo
      });
      showToast('Email enviado com sucesso!');
      navigate('/'); // volta para inbox após enviar
    } catch {
      showToast('Erro ao enviar email.', 'error');
    }
  };

  const handleDeletar = async () => {
    const confirmar = window.confirm('Tem certeza que deseja deletar este rascunho?');
    if (!confirmar) return;

    try {
      await api.delete(`../api/rascunhos/${id}`);
      showToast('Rascunho deletado com sucesso!');
      navigate('/drafts');
    } catch {
      showToast('Erro ao deletar rascunho.', 'error');
    }
  };

  if (loading) return <Loader />;

  return (
    <div className="min-h-screen bg-gray-100 flex items-center justify-center p-8">
      {toastMessage && <Toast message={toastMessage} type={toastType} />}
      <div className="bg-white p-10 rounded-lg shadow-lg w-full max-w-2xl">
        <h2 className="text-4xl font-bold mb-6 text-gray-900">Editar Rascunho</h2>

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
              className="bg-gray-700 hover:bg-gray-800 text-white px-6 py-3 rounded text-lg font-semibold transition transform hover:scale-95"
            >
              Salvar Rascunho
            </button>

            <button
              onClick={handleEnviar}
              className="bg-green-700 hover:bg-green-800 text-white px-6 py-3 rounded text-lg font-semibold transition transform hover:scale-95"
            >
              Enviar Email
            </button>

            <button
              type="button"
              onClick={handleDeletar}
              className="bg-red-700 hover:bg-red-600 text-white w-12 h-12 rounded-full flex items-center justify-center transition transform hover:scale-95 ml-auto"
              title="Deletar rascunho"
            >
              🗑️
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default DraftDetailPage;
