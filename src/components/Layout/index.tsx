import React, { Suspense } from 'react';

import { Box, useDisclosure } from '@chakra-ui/react';

import Loading from '@components/Loading';
import { useLoading } from '@store/loading';

import Sidebar, { OptionsSidebarProps } from '../SideBar';

interface Props {
  options: OptionsSidebarProps[];
  children?: React.ReactNode;
}

const Layout: React.FC<Props> = ({ children, options }) => {
  const loading = useLoading((state) => state.loading);

  const { isOpen, onOpen, onClose } = useDisclosure({ defaultIsOpen: true });

  return (
    <Box w="100%" h="100%" display="flex" gap={5}>
      {loading && <Loading />}
      <Sidebar isOpen={isOpen} onClose={() => (isOpen ? onClose() : onOpen())} options={options} />
      <Suspense fallback={<Loading />}>{children}</Suspense>
    </Box>
  );
};

export default Layout;
