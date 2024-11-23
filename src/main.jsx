// main.tsx or main.jsx
import React from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter as Router } from 'react-router-dom';
import App from './App';
import './index.css';
import { UserProvider } from './context/AuthContext.jsx';
import { CartContextProvider } from './context/CartContext.jsx';

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <Router>
      <UserProvider>
        <CartContextProvider>
          <main className=" text-foreground bg-background">
            <App />
          </main>
        </CartContextProvider>
      </UserProvider>
    </Router>
  </React.StrictMode>
);
