import { useEffect, useState } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import Loader from '../components/Loader';
import Toast from '../components/Toast';

function EmailListPage() {
  const [emails, setEmails] = useState([]);
  const [loading, setLoading] = useState(true);
  const [toastMessage, setToastMessage] = useState('');
  const [toastType, setToastType] = useState('success');

  const showToast = (msg, type = 'success') => {
    setToastMessage(msg);
    setToastType(type);
    setTimeout(() => setToastMessage(''), 1000);
  };

  useEffect(() => {
    const fetchEmails = async () => {
      try {
        const token = localStorage.getItem('token');
        const res = await axios.get('http://localhost:8080/api/emails', {
          headers: { Authorization: `Bearer ${token}` },
        });
        setEmails(res.data.emails);
      } catch {
        showToast('Erro ao buscar emails.', 'error');
      } finally {
        setLoading(false);
      }
    };

    fetchEmails();
  }, []);

  if (loading) return <Loader />;

  return (
    <div className="min-h-screen bg-gray-100 p-8">
      {toastMessage && <Toast message={toastMessage} type={toastType} />}
      <h2 className="text-3xl font-bold mb-6 text-gray-900">Caixa de Entrada</h2>

      <div className="grid gap-4">
        {emails.map(email => (
          <Link
            key={email.emailId}
            to={`/emails/${email.emailId}`}
            className="block bg-white p-6 rounded-lg shadow-md hover:shadow-lg hover:scale-[0.99] transition-transform"
          >
            <div className="flex justify-between items-center mb-2">
              <h3 className="text-xl font-semibold text-gray-800">{email.assunto}</h3>
              <span
                className={`text-xs px-2 py-1 rounded ${
                  email.status === 'lido' ? 'bg-green-200 text-green-700' : 'bg-red-200 text-red-700'
                }`}
              >
                {email.status}
              </span>
            </div>
            <p className="text-gray-600">De: {email.emailRemetente}</p>
            <p className="text-gray-600">Para: {email.emailDestinatario}</p>
            <p className="text-gray-400 text-sm mt-2">{email.dataEnvio}</p>
          </Link>
        ))}
      </div>
    </div>
  );
}

export default EmailListPage;
