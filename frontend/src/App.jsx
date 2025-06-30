import { Routes, Route } from 'react-router-dom';
import LoginPage from './pages/LoginPage.jsx';
import EmailListPage from './pages/EmailListPage.jsx';
import NewEmailPage from './pages/NewEmailPage.jsx';
import DraftListPage from './pages/DraftListPage.jsx';
import EmailDetailPage from './pages/EmailDetailPage.jsx';
import PrivateRoute from './components/PrivateRoute.jsx';
import DraftDetailPage from './pages/DraftDetailPage.jsx';
import Navbar from './components/Navbar.jsx';
import ServerInfoPage from './pages/ServerInfoPage.jsx';

function App() {
  return (
    <div className="flex flex-col min-h-screen">
      <Navbar />

      <div className="flex-grow">
        <Routes>
          <Route path="/login" element={<LoginPage />} />
          <Route path="/" element={<PrivateRoute><EmailListPage /></PrivateRoute>} />
          <Route path="/emails/:id" element={<PrivateRoute><EmailDetailPage /></PrivateRoute>} />
          <Route path="/newEmail" element={<PrivateRoute><NewEmailPage /></PrivateRoute>} />
          <Route path="/drafts" element={<PrivateRoute><DraftListPage /></PrivateRoute>} />
          <Route path="/draft/:id" element={<PrivateRoute><DraftDetailPage /></PrivateRoute>} />
          <Route path="/server" element={<PrivateRoute><ServerInfoPage /></PrivateRoute>} />
        </Routes>
      </div>
    </div>
  );
}

export default App;
