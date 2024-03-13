import React, { memo, useMemo } from 'react';
import { FiMoon, FiSun } from 'react-icons/fi';

import { Flex, Icon, IconButton, Tooltip, useColorMode } from '@chakra-ui/react';

const OptionTheme: React.FC<{ open: boolean }> = ({ open }) => {
  const { colorMode, setColorMode } = useColorMode();

  const colorModeChange = useMemo(
    () =>
      colorMode === 'light'
        ? {
            container: { borderColor: 'gray.700' },
            button: { background: 'gray.300', _hover: { background: 'gray.300', opacity: 0.7 } },
            icon: {
              color: 'gray.500',
            },
          }
        : {
            container: { borderColor: 'navy.700' },
            button: {
              background: 'orange.600',
              _hover: { background: 'orange.600', opacity: 0.7 },
            },
            icon: {
              color: 'gray.50',
            },
          },
    [colorMode],
  );

  return (
    <Flex
      width={open ? '10rem' : '100%'}
      height="2rem"
      paddingTop="1.25rem"
      paddingBottom="1.25rem"
      alignItems="center"
      justifyContent={open ? 'space-between' : 'center'}
      borderWidth={open ? 2 : 0}
      boxShadow="sm"
      borderRadius={18}
    >
      {open ? (
        <>
          <Tooltip label="Tema Branco" placement="top">
            <IconButton
              w="100%"
              {...(colorMode === 'light' ? { ...colorModeChange.button } : { background: 'transparent' })}
              icon={<Icon as={FiSun} w="1rem" height="1rem" {...colorModeChange.icon} />}
              aria-label="Light"
              onClick={() => setColorMode('light')}
              borderRight={0}
            />
          </Tooltip>

          <Tooltip label="Tema Escuro" placement="top">
            <IconButton
              w="100%"
              {...(colorMode === 'dark' ? { ...colorModeChange.button } : { background: 'transparent' })}
              icon={<Icon as={FiMoon} w="1rem" height="1rem" {...colorModeChange.icon} />}
              aria-label="Light"
              onClick={() => setColorMode('dark')}
            />
          </Tooltip>
        </>
      ) : (
        <IconButton
          width="100%"
          icon={
            colorMode === 'light' ? (
              <Icon as={FiSun} w="1.25rem" height="1.25rem" {...colorModeChange.icon} />
            ) : (
              <Icon as={FiMoon} w="1.25rem" height="1.25rem" {...colorModeChange.icon} />
            )
          }
          aria-label="Light"
          onClick={() => setColorMode(colorMode === 'dark' ? 'light' : 'dark')}
        />
      )}
    </Flex>
  );
};

export default memo(OptionTheme);
