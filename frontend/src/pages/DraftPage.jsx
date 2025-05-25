import { useState } from 'react';
import api from '../services/api';
import { useNavigate, useLocation } from 'react-router-dom';

const DraftPage = () => {
  const location = useLocation();
  const existingDraft = location.state?.draft;

  const [assunto, setAssunto] = useState(existingDraft ? existingDraft.assunto : '');
  const [emailDestinatario, setEmailDestinatario] = useState(existingDraft ? existingDraft.emailDestinatario : '');
  const [corpo, setCorpo] = useState(existingDraft ? existingDraft.corpo : '');
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');

  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!assunto && !emailDestinatario && !corpo) {
      setError('Preencha pelo menos um campo!');
      return;
    }

    try {
      if (existingDraft) {
        await api.put('/rascunhos', {
          rascunhoId: existingDraft.rascunhold,
          assunto,
          emailDestinatario,
          corpo
        });
        setSuccess('Rascunho atualizado com sucesso!');
      } else {
        await api.post('/rascunhos', { assunto, emailDestinatario, corpo });
        setSuccess('Rascunho criado com sucesso!');
      }
      setError('');
    } catch (err) {
      setError('Erro ao salvar rascunho');
      setSuccess('');
    }
  };

  const handleBack = () => {
    navigate('/');
  };

  return (
    <div>
      <h2>{existingDraft ? 'Editar Rascunho' : 'Novo Rascunho'}</h2>

      {error && <p style={{ color: 'red' }}>{error}</p>}
      {success && <p style={{ color: 'green' }}>{success}</p>}

      <form onSubmit={handleSubmit}>
        <input
          type="text"
          placeholder="Assunto"
          value={assunto}
          onChange={e => setAssunto(e.target.value)}
        />
        <input
          type="email"
          placeholder="Destinatário"
          value={emailDestinatario}
          onChange={e => setEmailDestinatario(e.target.value)}
        />
        <textarea
          placeholder="Corpo"
          value={corpo}
          onChange={e => setCorpo(e.target.value)}
        />
        <button type="submit">{existingDraft ? 'Salvar' : 'Criar'}</button>
      </form>

      <button onClick={handleBack}>Voltar</button>
    </div>
  );
};

export default DraftPage;
