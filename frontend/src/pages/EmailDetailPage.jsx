import { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import axios from 'axios';
import Loader from '../components/Loader';
import Toast from '../components/Toast';

function EmailDetailPage() {
  const { id } = useParams();
  const [email, setEmail] = useState(null);
  const [loading, setLoading] = useState(true);
  const [toastMessage, setToastMessage] = useState('');
  const [toastType, setToastType] = useState('success');

  const navigate = useNavigate();

  const showToast = (msg, type = 'success') => {
    setToastMessage(msg);
    setToastType(type);
    setTimeout(() => setToastMessage(''), 3000);
  };

  useEffect(() => {
    const fetchEmail = async () => {
      try {
        const token = localStorage.getItem('token');
        const res = await axios.put(`http://localhost:8080/api/emails/${id}`, {}, {
          headers: { Authorization: `Bearer ${token}` },
        });
        setEmail(res.data.email);
      } catch {
        showToast('Erro ao carregar email.', 'error');
      } finally {
        setLoading(false);
      }
    };

    fetchEmail();
  }, [id]);

  const handleResponder = () => {
    navigate('/newEmail', {
      state: {
        assunto: `Re: ${email.assunto}`,
        emailDestinatario: email.emailRemetente,
        corpo: `\n\n--- Mensagem original ---\n${email.corpo}`
      }
    });
  };

  if (loading) return <Loader />;

  return (
  <div className="min-h-screen bg-gray-100 flex items-center justify-center p-8">
    {toastMessage && <Toast message={toastMessage} type={toastType} />}
    <div className="bg-white shadow-lg rounded-lg p-10 w-full max-w">
      <h1 className="text-3xl font-bold text-red-700 mb-6">Detalhes do Email</h1>

      <div className="space-y-4">
        <div>
          <span className="text-gray-600 font-semibold">Assunto:</span>
          <p className="text-lg text-gray-900">{email.assunto}</p>
        </div>

        <div className="flex gap-50">
          <div>
            <span className="text-gray-600 font-semibold">De:</span>
            <p className="text-gray-800">{email.emailRemetente}</p>
          </div>
          <div>
            <span className="text-gray-600 font-semibold">Para:</span>
            <p className="text-gray-800">{email.emailDestinatario}</p>
          </div>
        </div>

        <div className="flex gap-55">
          <div>
            <span className="text-gray-600 font-semibold">Status:</span>
            <span className={`ml-2 px-3 py-1 rounded-full text-sm font-semibold
              ${email.status === 'lido' ? 'bg-green-100 text-green-700' : 'bg-yellow-100 text-yellow-700'}`}>
              {email.status}
            </span>
          </div>
          <div>
            <span className="text-gray-600 font-semibold">Data de Envio:</span>
            <p className="text-gray-800">{email.dataEnvio}</p>
          </div>
        </div>

        <div>
          <span className="text-gray-600 font-semibold">Mensagem:</span>
          <p className="text-gray-800 whitespace-pre-line border-t pt-4">{email.corpo}</p>
        </div>

        <button
            onClick={handleResponder}
            className="mt-6 ml-auto bg-red-700 hover:bg-red-800 text-white px-6 py-3 rounded text-lg font-semibold transition transform hover:scale-98"
        >
          Responder
        </button>
      </div>
    </div>
  </div>

  );
}

export default EmailDetailPage;
