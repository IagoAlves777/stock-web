import React, { memo, useMemo } from 'react';
import { IconType } from 'react-icons';
import { FiChevronLeft, FiChevronRight } from 'react-icons/fi';

import { Flex, IconButton, Text, useColorMode } from '@chakra-ui/react';

import { useAuth } from '@store/auth';

import Option from './components/Option';
import OptionTheme from './components/OptionTheme';
import OptionUser from './components/OptionUser';
import Subject from './components/Subject';

export interface OptionsSidebarProps {
  name: string;
  icon: IconType;
  hasAccount?: boolean;
  url?: string;
  childrens?: {
    name: string;
    url: string;
    active?: boolean;
    onAction?(): void;
  }[];
  active?: boolean;
  onAction?(): void;
}

interface SidebarProps {
  isOpen: boolean;
  onClose(): void;
  options: OptionsSidebarProps[];
}

const Sidebar: React.FC<SidebarProps> = ({ isOpen, onClose, options }) => {
  const { colorMode } = useColorMode();
  const user = useAuth((state) => state.user);

  const logout = useAuth((state) => state.logout);

  const colorModeChange = useMemo(
    () => (colorMode === 'light' ? { backgroundColor: 'gray.50' } : { backgroundColor: 'navy.800' }),
    [colorMode],
  );

  const width = useMemo(() => {
    return isOpen ? 250 : 100;
  }, [isOpen]);

  const handleIcon = () => {
    if (isOpen) {
      return <FiChevronLeft />;
    }

    return <FiChevronRight />;
  };

  return (
    <Flex
      display="flex"
      zIndex={5}
      top={0}
      height="100svh"
      width={width}
      borderTopRightRadius={18}
      borderBottomRightRadius={18}
      padding={isOpen ? '1rem' : 5}
      flexDirection="column"
      justifyContent="space-between"
      position="relative"
      transition="2s"
      transitionProperty="width"
      {...colorModeChange}
      gap={2}
    >
      <IconButton
        position="absolute"
        right={-3}
        top={5}
        height={isOpen ? '30px' : '25px'}
        minWidth={isOpen ? '30px' : '25px'}
        aria-label="Abrir ou Fechar menu lateral"
        background="orange.500"
        color="white"
        onClick={onClose}
        icon={handleIcon()}
        _hover={{
          background: 'orange.500',
          opacity: 0.8,
        }}
      />
      <Flex flexDirection="column" alignItems="center" height="90svh" overflow="auto">
        <Flex
          height="5rem"
          alignItems="center"
          justifyContent="center"
          border="1px solid gray"
          width="100%"
          marginBottom="1rem"
        >
          <Text textAlign="center">Logo aqui</Text>
        </Flex>

        <Flex flexDirection="column" gap="0.5rem" w="100%">
          {options.map((option) =>
            option.childrens?.length ? (
              <Subject
                key={option.name}
                icon={option.icon}
                name={option.name}
                childrens={option.childrens}
                open={isOpen}
              />
            ) : (
              <Option
                key={option.url}
                icon={option.icon}
                name={option.name}
                url={option.url || ''}
                open={isOpen}
                active={option.active}
                onAction={option.onAction}
              />
            ),
          )}
        </Flex>
      </Flex>
      {user ? (
        <Flex flexDirection="column" gap={2} justifyContent="center" align="center">
          <OptionTheme open={isOpen} />
          <OptionUser name={user?.name} email={user.login} onLogout={logout} open={isOpen} />
        </Flex>
      ) : null}
    </Flex>
  );
};

export default memo(Sidebar);
