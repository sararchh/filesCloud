import React from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter } from 'react-router-dom';

import RoutesApp from './routes';

import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

import "./index.css";
import { UserProvider } from './context/userContext';

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <UserProvider>
      <BrowserRouter>
        <RoutesApp />
        <ToastContainer />
      </BrowserRouter>
    </UserProvider>
  </React.StrictMode>,
)
