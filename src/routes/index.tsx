import React from 'react';

import { useAuth } from 'src/store/auth';

import Loading from '@components/Loading';

import AdminRoutes from './admin.routes';
import AuthRoutes from './auth.routes';
import UserRoutes from './user.routes';

const Routes: React.FC = () => {
  const isLoading = useAuth((state) => state.isLoading);
  const user = useAuth((state) => state.user);
  const signed = useAuth((state) => state.signed);

  if (!signed) return <AuthRoutes />;

  if (isLoading) return <Loading />;

  if (user?.role === 'ADMIN') return <AdminRoutes />;

  return <UserRoutes />;
};

export default Routes;
