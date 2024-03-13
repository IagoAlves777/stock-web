import React, { useMemo, useState } from 'react';
import { IconType } from 'react-icons';
import { useNavigate } from 'react-router-dom';

import {
  Flex,
  Icon,
  useColorMode,
  Text,
  Menu,
  MenuButton,
  MenuList,
  MenuItem,
  Divider,
  Accordion,
  AccordionItem,
  AccordionPanel,
  AccordionButton,
} from '@chakra-ui/react';

interface Props {
  name: string;
  icon: IconType;
  open: boolean;
  childrens?: {
    name: string;
    url: string;
    active?: boolean;
    onAction?(): void;
  }[];
}

const Subject: React.FC<Props> = ({ icon, name, childrens, open }) => {
  const { colorMode } = useColorMode();
  const navigate = useNavigate();
  const [openMenu, setOpenMenu] = useState(false);

  const handleNavigate = (url: string) => {
    navigate(url || '/');
  };

  const colorModeChange = useMemo(() => {
    return colorMode === 'light'
      ? {
          container: {
            _hover: {
              background: 'gray.200',
            },
            borderRadius: '18px',
          },
          text: { color: 'gray.500' },
        }
      : {
          container: {
            _hover: {
              background: 'navy.700',
            },
            borderRadius: '18px',
          },
          text: { color: 'gray.500' },
        };
  }, [colorMode]);

  return open ? (
    <Accordion allowToggle>
      <AccordionItem border={0}>
        <AccordionButton
          alignItems="center"
          gap={3}
          paddingTop="0.7rem"
          paddingBottom="0.7rem"
          w="100%"
          cursor="pointer"
          {...(open ? { paddingLeft: '20px' } : { justifyContent: 'center' })}
          {...colorModeChange.container}
        >
          <Flex gap={3}>
            <Icon as={icon} w={22} h={22} fontWeight="600" {...colorModeChange.text} />
            {open ? (
              <Text fontSize="0.8rem" fontWeight="600" {...colorModeChange.text}>
                {name}
              </Text>
            ) : null}
          </Flex>
        </AccordionButton>
        <AccordionPanel paddingBottom={0}>
          {childrens?.map((c) => (
            <Flex
              key={c.url}
              alignItems="center"
              gap={3}
              paddingTop="0.7rem"
              paddingBottom="0.7rem"
              w="100%"
              cursor="pointer"
              {...(open ? { paddingLeft: '20px' } : { justifyContent: 'center' })}
              {...colorModeChange.container}
              onClick={() => handleNavigate(c.url)}
            >
              <Text fontWeight="bold" fontSize="0.8rem" {...colorModeChange.text}>
                {c.name}
              </Text>
            </Flex>
          ))}
        </AccordionPanel>
      </AccordionItem>
    </Accordion>
  ) : (
    <Menu isOpen={openMenu} onOpen={() => setOpenMenu(!openMenu)} offset={[0, 0]} placement="right">
      <MenuButton
        {...colorModeChange.container}
        alignItems="center"
        paddingTop="0.7rem"
        paddingBottom="0.7rem"
        w="100%"
        cursor="pointer"
        {...(open ? { paddingLeft: '20px' } : { justifyContent: 'center' })}
        onClick={() => setOpenMenu(!openMenu)}
        onMouseEnter={() => setOpenMenu(true)}
        onMouseLeave={() => setOpenMenu(false)}
      >
        <Flex alignItems="center" gap={3} justifyContent={open ? 'flex-start' : 'center'}>
          <Icon as={icon} w={22} h={22} fontWeight="600" {...colorModeChange.text} />
          {open ? (
            <Text fontSize="0.8rem" fontWeight="600" {...colorModeChange.text}>
              {name}
            </Text>
          ) : null}
        </Flex>
      </MenuButton>

      <MenuList onMouseEnter={() => setOpenMenu(true)} onMouseLeave={() => setOpenMenu(false)}>
        <Flex width="100%" padding="0.5rem 0.75rem" flexDirection="column">
          <Text fontWeight="bold" fontSize="lg">
            {name}
          </Text>
        </Flex>
        <Divider />

        {childrens?.map((c) => (
          <MenuItem
            key={c.url}
            onClick={() => {
              setOpenMenu(false);
              handleNavigate(c.url);
            }}
          >
            {c.name}
          </MenuItem>
        ))}
      </MenuList>
    </Menu>
  );
};

export default Subject;
