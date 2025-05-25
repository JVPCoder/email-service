import { Link, useNavigate } from 'react-router-dom';

function Navbar() {
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem('token');
    navigate('/login');
  };

  return (
    <nav className="bg-gray-900 text-white px-6 py-4 flex justify-between items-center shadow-md">
      <h1 className="text-2xl font-bold">JVP Mail</h1>
      <div className="flex space-x-4">
        <Link to="/" className="hover:text-red-400 transition">Inbox</Link>
        <Link to="/drafts" className="hover:text-red-400 transition">Rascunhos</Link>
        <Link to="/newEmail" className="hover:text-red-400 transition">Novo Email</Link>
        <button
          onClick={handleLogout}
          className="bg-red-700 hover:bg-red-800 text-white px-3 py-1 rounded transition"
        >
          Logout
        </button>
      </div>
    </nav>
  );
}

export default Navbar;
