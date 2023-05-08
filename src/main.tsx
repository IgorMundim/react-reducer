import './index.css';

import React from 'react';
import ReactDOM from 'react-dom/client';

import App from '@/App';

import { CartProvider } from './contexts/cart.context';
import { UserProvider } from './contexts/user.context';

// eslint-disable-next-line @typescript-eslint/no-non-null-assertion
ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <UserProvider>
      <CartProvider>
        <App />
      </CartProvider>
    </UserProvider>
  </React.StrictMode>
);
