import { Link, useNavigate } from 'react-router-dom';

function Navbar() {
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem('token');
    navigate('/login');
  };

  return (
    <nav className="bg-gray-800 text-white px-6 py-4 flex justify-between items-center shadow-md">
      <h1 className="text-2xl font-bold">Email Service</h1>
      <div className="flex space-x-4">
        <Link to="/" className="hover:text-gray-300">Inbox</Link>
        <Link to="/rascunhos" className="hover:text-gray-300">Rascunhos</Link>
        <Link to="/novo" className="hover:text-gray-300">Novo Email</Link>
        <button
          onClick={handleLogout}
          className="bg-red-500 hover:bg-red-600 text-white px-3 py-1 rounded"
        >
          Logout
        </button>
      </div>
    </nav>
  );
}

export default Navbar;
