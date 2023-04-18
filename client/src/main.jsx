import React from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter } from 'react-router-dom';

import RoutesApp from './routes';

import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

import "./index.css";
import { UserProvider } from './context/userContext';
import { FoldersProvider } from './context/foldersContext';

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <UserProvider>
      <FoldersProvider>
        <BrowserRouter>
          <RoutesApp />
          <ToastContainer />
        </BrowserRouter>
      </FoldersProvider>
    </UserProvider>
  </React.StrictMode>,
)
