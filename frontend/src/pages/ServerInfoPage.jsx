import { useEffect, useState, useCallback } from 'react';
import api from '../services/api';
import Loader from '../components/Loader';
import Toast from '../components/Toast';

function ServerInfoPage() {
  const [usuarios, setUsuarios] = useState([]);
  const [loading, setLoading] = useState(true);
  const [toastMessage, setToastMessage] = useState('');
  const [toastType, setToastType] = useState('success');

  const showToast = (msg, type = 'success') => {
    setToastMessage(msg);
    setToastType(type);
    setTimeout(() => setToastMessage(''), 3000);
  };

  const fetchAtivos = useCallback(async () => {
    try {
      const res = await api.get('../api/usuarios-ativos');
      setUsuarios(res.data.usuarios);
    } catch (err) {
      showToast('Erro ao buscar usuários ativos.', 'error');
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchAtivos(); // chamada inicial

    const intervalId = setInterval(() => {
      fetchAtivos();
    }, 1000); // atualiza a cada 1s

    return () => clearInterval(intervalId); // cleanup
  }, [fetchAtivos]);

  const formatData = (timestamp) => {
    if (!timestamp) return '-';
    const data = new Date(timestamp);
    return data.toLocaleString('pt-BR', {
      hour: '2-digit',
      minute: '2-digit',
      second: '2-digit',
    });
  };

  if (loading) return <Loader />;

  return (
    <div className="min-h-screen bg-gray-100 p-8">
      {toastMessage && <Toast message={toastMessage} type={toastType} />}
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-3xl font-bold text-gray-900">Usuários Ativos</h2>
        <button
          onClick={fetchAtivos}
          className="bg-red-700 hover:bg-red-800 text-white px-4 py-2 rounded shadow transition"
        >
          🔄 Atualizar
        </button>
      </div>

      {usuarios.length === 0 ? (
        <p className="text-gray-600">Nenhum usuário ativo nos últimos 5 minutos.</p>
      ) : (
        <div className="overflow-x-auto">
          <table className="min-w-full bg-white border border-gray-300 rounded shadow">
            <thead className="bg-gray-200">
              <tr>
                <th className="text-left px-4 py-2 border-b">ID</th>
                <th className="text-left px-4 py-2 border-b">Nome</th>
                <th className="text-left px-4 py-2 border-b">Email</th>
                <th className="text-left px-4 py-2 border-b">Última Atividade</th>
              </tr>
            </thead>
              <tbody>
                {usuarios.map((u) => {
                  const agora = Date.now();
                  const ultimoAtivo = new Date(u.last_active).getTime();
                  const minutosPassados = (agora - ultimoAtivo) / 60000;

                  const iconeStatus = minutosPassados <= 2 ? '🟢' : '⚫';

                  return (
                    <tr key={u.id} className="hover:bg-gray-50">
                      <td className="px-4 py-2 border-b flex items-center gap-2">
                        {iconeStatus}
                        {u.id}
                      </td>
                      <td className="px-4 py-2 border-b">{u.nome}</td>
                      <td className="px-4 py-2 border-b">{u.email}</td>
                      <td className="px-4 py-2 border-b">{formatData(u.last_active)}</td>
                    </tr>
                  );
                })}
              </tbody>
          </table>
        </div>
      )}
    </div>
  );
}

export default ServerInfoPage;
