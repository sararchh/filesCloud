import { Routes, Route } from 'react-router-dom';

import Register from '../pages/Register';
import Login from '../pages/Login';
import Storage from '../pages/Storage';
import PrivateRoute from '../pages/PrivateRoute';
import Folder from '../pages/Folder';


const RoutesApp = () => {
  return (

    <Routes>
      <Route path='/' element={<Register />} />
      <Route path='/login' element={<Login />} />

      <Route path='/storage' element={<PrivateRoute> <Storage /> </PrivateRoute>} />
      <Route path='/storage/folder/:id' element={<PrivateRoute> <Folder /> </PrivateRoute>} />


    </Routes>

  );
}

export default RoutesApp;