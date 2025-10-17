// src/Admin.tsx

import { useEffect, useState } from 'react';
import LoginPage from './components/LoginPage';
import UiItemForm from './components/UiItemForm';

const Admin: React.FC = () => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  useEffect(() => {
    const token = localStorage.getItem('token');
    setIsAuthenticated(!!token);
  }, []);

  const handleLogin = () => setIsAuthenticated(true);

  return (
    <div>
      
      {isAuthenticated ? <UiItemForm /> : <LoginPage onLogin={handleLogin} />}
    </div>
  );
};

export default Admin;
