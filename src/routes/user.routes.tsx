import React from 'react';
import { ErrorBoundary } from 'react-error-boundary';
import { Navigate, Route, Routes } from 'react-router-dom';

import { ErrorFallback } from '@components';
import Pages from '@pages';

import Home from '../pages/Home';

const UserRoutes: React.FC = () => {
  return (
    <Routes>
      <Route element={<Pages />}>
        <Route
          path="home"
          element={
            <ErrorBoundary FallbackComponent={ErrorFallback}>
              <Home />
            </ErrorBoundary>
          }
        />
        <Route path="*" element={<Navigate to="/home" />} />
      </Route>
    </Routes>
  );
};

export default UserRoutes;
