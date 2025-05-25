import { useState, useEffect } from 'react';
import api from '../services/api.js';
import { useNavigate } from 'react-router-dom';

const DraftListPage = () => {
  const [drafts, setDrafts] = useState([]);
  const [error, setError] = useState('');

  const navigate = useNavigate();

  useEffect(() => {
    const fetchDrafts = async () => {
      try {
        const response = await api.get('/rascunhos');
        setDrafts(response.data.rascunhos);
      } catch (err) {
        setError('Erro ao carregar rascunhos');
      }
    };

    fetchDrafts();
  }, []);

  const handleEdit = (draft) => {
    navigate('/draft', { state: { draft } });
  };

  const handleSend = async (draftId) => {
    try {
      await api.post(`/emails/${draftId}`);
      alert('E-mail enviado com sucesso!');
    } catch (err) {
      alert('Erro ao enviar e-mail');
    }
  };

  const handleBack = () => {
    navigate('/');
  };

  return (
    <div>
      <h2>Meus Rascunhos</h2>
      <button onClick={handleBack}>Voltar</button>

      {error && <p style={{ color: 'red' }}>{error}</p>}

      {drafts.length === 0 ? (
        <p>Nenhum rascunho encontrado.</p>
      ) : (
        <ul>
          {drafts.map(draft => (
            <li key={draft.rascunhold}>
              <strong>Assunto:</strong> {draft.assunto}<br />
              <strong>Destinatário:</strong> {draft.emailDestinatario}<br />
              <button onClick={() => handleEdit(draft)}>Editar</button>
              <button onClick={() => handleSend(draft.rascunhold)}>Enviar</button>
              <hr />
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default DraftListPage;
