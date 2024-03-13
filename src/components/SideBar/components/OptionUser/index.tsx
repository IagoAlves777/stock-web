import React, { memo } from 'react';
import { TbLogout } from 'react-icons/tb';

import { Flex, Avatar, Text, Icon, Tooltip, IconButton } from '@chakra-ui/react';

interface OptionUserProps {
  name: string;
  email: string;
  onLogout(): void;
  open?: boolean;
}

const OptionUser: React.FC<OptionUserProps> = ({ name, email, onLogout, open }) => {
  return (
    <Flex w="100%" justifyContent="space-between" alignItems="center" {...(open ? { gap: 3 } : {})}>
      {open ? (
        <Flex alignItems="center" cursor="pointer">
          <Tooltip label={name}>
            <Avatar name={name} w="30px" height="30px" />
          </Tooltip>
          <Flex ml={2} flexDirection="column">
            <Text fontSize="0.70rem" fontWeight="600" color="gray.500" maxWidth={140}>
              {name}
            </Text>
            <Text fontSize="0.70rem" mt={-1} color="gray.500" fontWeight="400" maxWidth={140}>
              {email}
            </Text>
          </Flex>
        </Flex>
      ) : null}

      <Tooltip label="Sair" placement="top">
        <IconButton aria-label="Logout" onClick={onLogout} background="transparent" {...(open ? {} : { w: '100%' })}>
          <Icon as={TbLogout} h="22px" w="22px" color="gray.500" />
        </IconButton>
      </Tooltip>
    </Flex>
  );
};

export default memo(OptionUser);
