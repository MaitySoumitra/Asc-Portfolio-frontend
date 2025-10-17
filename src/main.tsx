// src/main.tsx or index.tsx

import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'; // ✅
import './index.css';
import Router from './Routes/Router'; // or App/Admin depending on your setup

const queryClient = new QueryClient(); // ✅

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <QueryClientProvider client={queryClient}> {/* ✅ This is required */}
      <Router /> {/* This could be App or Admin if you're not using Router */}
    </QueryClientProvider>
  </StrictMode>
);
