import './index.css'; // pastikan ini berada di paling atas
import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import { UserPreferencesProvider } from './context/UserPreferencesContext.jsx';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';

const queryClient = new QueryClient();

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <QueryClientProvider client={queryClient}>
      <UserPreferencesProvider>
        <App />
      </UserPreferencesProvider>
    </QueryClientProvider>
  </React.StrictMode>
);