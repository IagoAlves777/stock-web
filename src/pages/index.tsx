import { useMemo } from 'react';
import { FiPackage } from 'react-icons/fi';
import { IoStorefrontOutline } from 'react-icons/io5';
import { Outlet } from 'react-router-dom';

import { Layout } from '@components';
import { OptionsSidebarProps } from '@components/SideBar';
import { useAuth } from '@store/auth';

const Pages: React.FC = () => {
  const user = useAuth((state) => state.user);

  const optionsSideBar = useMemo<OptionsSidebarProps[]>(() => {
    const options = [];

    options.push({
      name: 'Loja',
      url: '/store',
      icon: IoStorefrontOutline,
    });

    if (user?.role === 'ADMIN') {
      options.push({
        name: 'Estoque',
        icon: FiPackage,
        childrens: [
          { name: 'Lista de produtos', url: '/stock' },
          {
            name: 'Novo produto',
            url: '/new-product',
          },
        ],
      });
    }

    return options;
  }, [user?.role]);

  return (
    <Layout options={optionsSideBar}>
      <Outlet />
    </Layout>
  );
};

export default Pages;
