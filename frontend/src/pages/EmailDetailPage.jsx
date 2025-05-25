import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import Loader from '../components/Loader';
import Toast from '../components/Toast';

function EmailDetailPage() {
  const { id } = useParams();
  const [email, setEmail] = useState(null);
  const [loading, setLoading] = useState(true);
  const [toastMessage, setToastMessage] = useState('');
  const [toastType, setToastType] = useState('success');

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
      } catch (err) {
        showToast('Erro ao buscar email.', 'error');
      } finally {
        setLoading(false);
      }
    };

    fetchEmail();
  }, [id]);

  if (loading) return <Loader />;

  if (!email) return <p>Email não encontrado.</p>;

  return (
    <div className="min-h-screen bg-gray-100 p-8">
      {toastMessage && <Toast message={toastMessage} type={toastType} />}
      <h2 className="text-3xl font-bold mb-4 text-gray-900">{email.assunto}</h2>
      <p className="text-gray-600 mb-2">De: {email.emailRemetente}</p>
      <p className="text-gray-600 mb-2">Para: {email.emailDestinatario}</p>
      <p className="text-gray-500">{email.corpo}</p>
      <p className="text-gray-400 text-sm mt-4">{email.dataEnvio}</p>
    </div>
  );
}

export default EmailDetailPage;
