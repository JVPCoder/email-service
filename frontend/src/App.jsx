import { Routes, Route } from 'react-router-dom';
import LoginPage from './pages/LoginPage.jsx';
import RegisterPage from './pages/RegisterPage.jsx';
import EmailListPage from './pages/EmailListPage.jsx';
import EmailDetailPage from './pages/EmailDetailPage.jsx';
import DraftPage from './pages/DraftPage.jsx';
import DraftListPage from './pages/DraftListPage.jsx';
import PrivateRoute from './components/PrivateRoute.jsx';

function App() {
  return (
    <Routes>
      <Route path="/login" element={<LoginPage />} />
      <Route path="/register" element={<RegisterPage />} />

      <Route path="/" element={
        <PrivateRoute>
          <EmailListPage />
        </PrivateRoute>
      } />

      <Route path="/emails/:id" element={
        <PrivateRoute>
          <EmailDetailPage />
        </PrivateRoute>
      } />

      <Route path="/draft" element={
        <PrivateRoute>
          <DraftPage />
        </PrivateRoute>
      } />

      <Route path="/drafts" element={
        <PrivateRoute>
          <DraftListPage />
        </PrivateRoute>
      } />
    </Routes>
  );
}

export default App;
