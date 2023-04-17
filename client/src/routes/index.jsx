import { Routes, Route } from 'react-router-dom';

import Register from '../pages/Register';
import Login from '../pages/Login';
import Storage from '../pages/Storage';

const NotFound = () => {
  return (
    <p>Não encontrado</p>
  )
}

const RoutesApp = () => {
  return (

    <Routes>
      <Route path='/' element={<Register />} />
      <Route path='/login' element={<Login />} />

      {/* <Route path='/home' element={<ProtectedRouteGuard><Home /></ProtectedRouteGuard>} /> */}
      <Route path='/storage' element={<Storage />} />


    </Routes>

  );
}

export default RoutesApp;