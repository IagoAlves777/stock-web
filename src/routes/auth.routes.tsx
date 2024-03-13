import React from 'react';
import { Navigate, Route, Routes } from 'react-router-dom';

import Login from '@pages/Login';

const AuthRoutes: React.FC = () => (
  <Routes>
    <Route path="/" element={<Login />} />

    <Route path="*" element={<Navigate to="/" />} />
  </Routes>
);

export default AuthRoutes;
