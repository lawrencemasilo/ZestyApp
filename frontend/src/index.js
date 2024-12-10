import React from 'react';
import { createRoot } from 'react-dom/client';
import { BrowserRouter } from 'react-router-dom';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import { SelectedItemProvider } from './context/SelectedItemContext';
import { UserProvider } from './context/userContext';

// Create root
const root = createRoot(document.getElementById('root'));

// Render
root.render(
  <React.StrictMode>
    <BrowserRouter>
      <UserProvider>
        <SelectedItemProvider>
          <App />
        </SelectedItemProvider>
      </UserProvider>
    </BrowserRouter>
  </React.StrictMode>
);

reportWebVitals();
