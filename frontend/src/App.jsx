import { Routes, Route } from 'react-router-dom';
import LoginPage from './pages/LoginPage.jsx';
import EmailListPage from './pages/EmailListPage.jsx';
import NewEmailPage from './pages/NewEmailPage.jsx';
import DraftListPage from './pages/DraftListPage.jsx';
import EmailDetailPage from './pages/EmailDetailPage.jsx';
import PrivateRoute from './components/PrivateRoute.jsx';
import Navbar from './components/Navbar.jsx';

function App() {
  return (
    <div>
      <Navbar />
      <Routes>
        <Route path="/login" element={<LoginPage />} />
        <Route path="/" element={<PrivateRoute><EmailListPage /></PrivateRoute>} />
        <Route path="/emails/:id" element={<PrivateRoute><EmailDetailPage /></PrivateRoute>} />
        <Route path="/newEmail" element={<PrivateRoute><NewEmailPage /></PrivateRoute>} />
        <Route path="/drafts" element={<PrivateRoute><DraftListPage /></PrivateRoute>} />
      </Routes>
    </div>
  );
}

export default App;
