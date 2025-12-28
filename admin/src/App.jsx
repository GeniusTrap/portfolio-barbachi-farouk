import React, { useState, useEffect } from 'react'; 
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import Login from './components/Login';
import Sidebar from './components/Sidebar';
import Navbar from './components/Navbar';
import ContactAdmin from './pages/ContactAdmin';

export const backendUrl = import.meta.env.VITE_BACKEND_URL || 'http://localhost:4000';

function App() {
  const [isAuthenticated, setIsAuthenticated] = useState(() => {
    return sessionStorage.getItem('isAdminLoggedIn') === 'true';
  }); 

  useEffect(() => {
    if (isAuthenticated) {
      sessionStorage.setItem('isAdminLoggedIn', 'true');
    } else {
      sessionStorage.removeItem('isAdminLoggedIn');
    }
  }, [isAuthenticated]);

const AdminLayout = () => (
  <div className="flex h-screen bg-gray-100">
    <Sidebar />
    <div className="flex-1 flex flex-col">
      <Navbar onLogout={handleLogout} />
      <main className="flex-1 overflow-y-auto p-6">
        <ContactAdmin />
      </main>
    </div>
  </div>
);
const handleLogout = () => {
  sessionStorage.removeItem('adminSession'); 
  setIsAuthenticated(false);

};

  return (
    <Router>
      <Routes>
        <Route path="/" element={
          isAuthenticated ? <AdminLayout /> : <Navigate to="/login" />
        } />
        
        <Route path="/login" element={
          <Login setIsAuthenticated={setIsAuthenticated} />
        } />
        
        <Route path="*" element={<Navigate to="/" />} />
      </Routes>
    </Router>
  );
}

export default App;