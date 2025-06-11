import { useContext } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { AuthContext } from '../context/AuthContext';

function Navbar() {
  const { user, token, logout } = useContext(AuthContext);
  const navigate = useNavigate();

  if (!token) return null;

  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  return (
    <nav className="bg-gray-900 text-white px-6 py-4 flex justify-between items-center shadow-md">
      <div className="flex gap-4">
        <Link
          to="/"
          className="px-4 py-2 rounded-md bg-gray-800 hover:bg-red-700 hover:scale-98 transform transition duration-300 shadow hover:shadow-lg"
        >
          📥 Inbox
        </Link>

        <Link
          to="/newEmail"
          className="px-4 py-2 rounded-md bg-gray-800 hover:bg-red-700 hover:scale-98 transform transition duration-300 shadow hover:shadow-lg"
        >
          ✉️ Novo Email
        </Link>

        <Link
          to="/drafts"
          className="px-4 py-2 rounded-md bg-gray-800 hover:bg-red-700 hover:scale-98 transform transition duration-300 shadow hover:shadow-lg"
        >
          📝 Rascunhos
        </Link>
      </div>

      <div className="flex items-center gap-4">
        <button
          onClick={handleLogout}
          className="px-4 py-2 rounded-md bg-red-700 hover:bg-red-800 hover:scale-98 transform transition duration-300 shadow hover:shadow-lg"
        >
          🚪 Sair
        </button>
      </div>
    </nav>
  );
}

export default Navbar;
