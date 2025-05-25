import { Link } from 'react-router-dom';

function NotFoundPage() {
  return (
    <div className="min-h-screen bg-gray-100 flex flex-col justify-center items-center">
      <h1 className="text-6xl font-bold text-red-700 mb-4">404</h1>
      <p className="text-gray-700 mb-4">Página não encontrada.</p>
      <Link to="/" className="bg-red-700 hover:bg-red-800 text-white px-4 py-2 rounded transition">
        Voltar para o Início
      </Link>
    </div>
  );
}

export default NotFoundPage;
