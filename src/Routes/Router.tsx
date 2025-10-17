// src/routes/Router.tsx
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import App from '../App';
import Admin from '../Admin/Admin';

const Router = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<App />} />
        <Route path="/admin" element={<Admin />} />
      </Routes>
    </BrowserRouter>
  );
};

export default Router;
