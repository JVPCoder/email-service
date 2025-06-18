import { useEffect, useState } from 'react';
import api from '../services/api';
import { Link } from 'react-router-dom';
import Loader from '../components/Loader';
import Toast from '../components/Toast';

function DraftListPage() {
  const [drafts, setDrafts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [toastMessage, setToastMessage] = useState('');
  const [toastType, setToastType] = useState('success');

  const showToast = (msg, type = 'success') => {
    setToastMessage(msg);
    setToastType(type);
    setTimeout(() => setToastMessage(''), 1000);
  };

  useEffect(() => {
    const fetchDrafts = async () => {
      try {
        const token = localStorage.getItem('token');
        const res = await api.get('../api/rascunhos', {
          headers: { Authorization: `Bearer ${token}` },
        });
        setDrafts(res.data.rascunhos);
      } catch (err) {
        showToast('Erro ao buscar rascunhos.', 'error');
      } finally {
        setLoading(false);
      }
    };

    fetchDrafts();
  }, []);

  if (loading) return <Loader />;

  return (
    <div className="min-h-screen bg-gray-100 p-8">
      {toastMessage && <Toast message={toastMessage} type={toastType} />}
      <h2 className="text-3xl font-bold mb-6 text-gray-900">Rascunhos</h2>

      {drafts.length === 0 ? (
        <p className="text-gray-600">Nenhum rascunho encontrado.</p>
      ) : (
        <div className="grid gap-4">
          {drafts.map(draft => (
            <Link
                  key={draft.draftId}
                  to={`/draft/${draft.draftId}`}
                  className="block bg-white p-6 rounded-lg shadow-md hover:shadow-lg hover:scale-95 transition"
                >
              <h3 className="text-xl font-semibold text-gray-800">{draft.assunto || '(Sem assunto)'}</h3>
              <p className="text-gray-600">Para: <span className="font-medium">{draft.emailDestinatario || '(Sem destinatário)'}</span></p>
              <p className="text-gray-400 text-xs mt-2">{draft.corpo.slice(0, 50)}...</p>
            </Link>
          ))}
        </div>
      )}
    </div>
  );
}

export default DraftListPage;
