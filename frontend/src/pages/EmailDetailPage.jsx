import { useEffect, useState } from 'react';
import api from '../services/api.js';
import { useParams, useNavigate } from 'react-router-dom';

const EmailDetailPage = () => {
  const { id } = useParams();
  const navigate = useNavigate();

  const [email, setEmail] = useState(null);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');

  useEffect(() => {
    const fetchEmail = async () => {
      try {
        // Buscar o e-mail
        const response = await api.put(`/emails/${id}`);
        setEmail(response.data.email);
        setSuccess('E-mail marcado como lido');
      } catch (err) {
        setError('Erro ao carregar e-mail');
      }
    };

    fetchEmail();
  }, [id]);

  const handleBack = () => {
    navigate('/');
  };

  return (
    <div>
      <h2>Detalhes do E-mail</h2>

      {error && <p style={{ color: 'red' }}>{error}</p>}
      {success && <p style={{ color: 'green' }}>{success}</p>}

      {email ? (
        <div>
          <p><strong>Assunto:</strong> {email.assunto}</p>
          <p><strong>De:</strong> {email.emailRemetente}</p>
          <p><strong>Para:</strong> {email.emailDestinatario}</p>
          <p><strong>Status:</strong> {email.status}</p>
          <p><strong>Data:</strong> {email.dataEnvio}</p>
          <p><strong>Corpo:</strong></p>
          <p>{email.corpo}</p>
        </div>
      ) : (
        <p>Carregando e-mail...</p>
      )}

      <button onClick={handleBack}>Voltar</button>
    </div>
  );
};

export default EmailDetailPage;
