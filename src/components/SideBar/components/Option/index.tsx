import React, { memo, useMemo } from 'react';
import { IconType } from 'react-icons';
import { useLocation, useNavigate } from 'react-router-dom';

import { Flex, Text, Icon, useColorMode, Tooltip } from '@chakra-ui/react';

interface OptionsSidebarProps {
  name: string;
  url: string;
  icon: IconType;
  active?: boolean;
  onAction?(): void;
  open?: boolean;
}

const Option: React.FC<OptionsSidebarProps> = ({ icon, name, url, open, onAction }) => {
  const { colorMode } = useColorMode();
  const location = useLocation();
  const navigate = useNavigate();

  const handleNavigate = () => {
    navigate(url);
  };

  const colorModeChange = useMemo(() => {
    if (location.pathname.replace('/', '') === url.replace('/', '')) {
      return colorMode === 'light'
        ? {
            container: {
              borderRadius: '18px',
              borderColor: 'gray.200',
              borderWidth: '2px',
              background: 'gray.100',
              _hover: {
                background: 'gray.200',
                borderRadius: '18px',
              },
            },
            text: { color: 'blue.950' },
          }
        : {
            container: {
              borderRadius: '18px',
              borderColor: 'navy.100',
              borderWidth: '2px',
              background: 'navy.800',
              _hover: {
                background: 'navy.700',
                borderRadius: '18px',
              },
            },
            text: { color: 'gray.300' },
          };
    }

    return colorMode === 'light'
      ? {
          container: {
            _hover: {
              background: 'gray.200',
              borderRadius: '18px',
            },
          },
          text: { color: 'gray.500' },
        }
      : {
          container: {
            _hover: {
              background: 'navy.700',
              borderRadius: '18px',
            },
          },
          text: { color: 'gray.500' },
        };
  }, [colorMode, location.pathname, url]);

  return (
    <Tooltip label={open ? undefined : name}>
      <Flex
        alignItems="center"
        gap={3}
        paddingTop="0.7rem"
        paddingBottom="0.7rem"
        w="100%"
        cursor="pointer"
        onClick={() => (onAction ? onAction() : handleNavigate())}
        {...(open ? { paddingLeft: '20px' } : { justifyContent: 'center' })}
        {...colorModeChange.container}
      >
        <Icon as={icon} w={22} h={22} fontWeight="600" {...colorModeChange.text} />
        {open ? (
          <Text fontSize="0.8rem" fontWeight="600" {...colorModeChange.text}>
            {name}
          </Text>
        ) : null}
      </Flex>
    </Tooltip>
  );
};

export default memo(Option);
