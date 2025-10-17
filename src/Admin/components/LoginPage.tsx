// src/components/LoginPage.tsx
import { useMutation } from '@tanstack/react-query';
import { login } from '../api/auth';
import { useState } from 'react';

interface Props {
  onLogin: () => void;
}

const LoginPage: React.FC<Props> = ({ onLogin }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const { mutate, isPending, error } = useMutation({
    mutationFn: () => login(email, password),
    onSuccess: (data) => {
      localStorage.setItem('token', data.token);
      onLogin();
    },
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    mutate();
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100 px-4">
      <div className="relative bg-[#fcfaf3] rounded-xl shadow-2xl p-8 pt-16 w-full max-w-md text-center">
        {/* Logo */}
        <div className="absolute -top-8 left-1/2 transform -translate-x-1/2 w-20 h-20 rounded-full bg-black flex items-center justify-center shadow-md">
          <img
            src="https://ahaanmedia.com/asc/layouts/asc.png"
            alt="Logo"
            className="w-16 h-16 object-contain"
          />
        </div>
        {/* Heading */}
        <h2 className="text-3xl font-bold text-gray-800 mb-6 tracking-wide">PORTFOLIO</h2>

        {/* Error */}
        {error && (
          <p className="text-sm text-red-500 mb-4">Invalid login credentials</p>
        )}
        {/* Form */}
        <form onSubmit={handleSubmit} className="space-y-4">
          <input
            type="email"
            placeholder="Username"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
            className="w-full px-5 py-3 rounded-xl border border-gray-300 focus:outline-none focus:ring-2 focus:ring-black bg-white"
          />
          <input
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
            className="w-full px-5 py-3 rounded-xl border border-gray-300 focus:outline-none focus:ring-2 focus:ring-black bg-white"
          />
          <button
            type="submit"
            disabled={isPending}
            className="w-full bg-black text-white py-3 rounded-xl hover:bg-gray-900 transition duration-200 font-medium cursor-pointer"
          >
            {isPending ? 'Logging in...' : 'Login'}
          </button>
        </form>
      </div>
    </div>
  );
};

export default LoginPage;
