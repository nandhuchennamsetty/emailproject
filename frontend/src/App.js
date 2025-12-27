import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import Authentication from './components/authenticate/Authenticate'
import Dashboard from './pages/Dashboard';
import './styles.css';
import ProtectedRoute from './components/ProtectedRoute';

function App() {
  return (
    <Router>
      <Routes>
        <Route path='/login' element={localStorage.getItem('token') ? <Navigate to='/' replace /> : <Authentication />} />
        <Route path='/' element={
          <ProtectedRoute>
            <Dashboard />
          </ProtectedRoute>
        } />
      </Routes>
    </Router>
  );
}

export default App;
