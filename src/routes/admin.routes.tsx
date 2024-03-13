import React from 'react';
import { ErrorBoundary } from 'react-error-boundary';
import { Navigate, Route, Routes } from 'react-router-dom';

import { ErrorFallback } from '@components';
import Pages from '@pages';
import CreateProduct from '@pages/CreateProduct';
import Stock from '@pages/Stock';

import Home from '../pages/Home';

const AdminRoutes: React.FC = () => {
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

        <Route
          path="stock"
          element={
            <ErrorBoundary FallbackComponent={ErrorFallback}>
              <Stock />
            </ErrorBoundary>
          }
        />

        <Route
          path="new-product"
          element={
            <ErrorBoundary FallbackComponent={ErrorFallback}>
              <CreateProduct />
            </ErrorBoundary>
          }
        />
        <Route path="*" element={<Navigate to="/home" />} />
      </Route>
    </Routes>
  );
};

export default AdminRoutes;
