import { useState, useEffect } from 'react';
import api from '../services/api';
import { useNavigate, Link } from 'react-router-dom';

const EmailListPage = () => {
  const [emails, setEmails] = useState([]);
  const [error, setError] = useState('');

  const navigate = useNavigate();

  useEffect(() => {
    const fetchEmails = async () => {
      try {
        const response = await api.get('/emails');
        setEmails(response.data.emails);
      } catch (err) {
        setError('Erro ao carregar e-mails');
      }
    };

    fetchEmails();
  }, []);

  const handleLogout = () => {
    localStorage.removeItem('token');
    navigate('/login');
  };

  const handleNewDraft = () => {
    navigate('/draft');
  };

  const handleViewDrafts = () => {
    navigate('/drafts');
  };

  return (
    <div>
      <h2>Caixa de Entrada</h2>

      <button onClick={handleLogout}>Logout</button>
      <button onClick={handleNewDraft}>Novo Rascunho</button>
      <button onClick={handleViewDrafts}>Meus Rascunhos</button>

      {error && <p style={{ color: 'red' }}>{error}</p>}

      {emails.length === 0 ? (
        <p>Nenhum e-mail encontrado.</p>
      ) : (
        <ul>
          {emails.map(email => (
            <li key={email.emailId}>
              <Link to={`/emails/${email.emailId}`}>
                <strong>Assunto:</strong> {email.assunto}<br />
                <strong>De:</strong> {email.emailRemetente}<br />
                <strong>Status:</strong> {email.status}<br />
                <strong>Data:</strong> {email.dataEnvio}
              </Link>
              <hr />
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default EmailListPage;
