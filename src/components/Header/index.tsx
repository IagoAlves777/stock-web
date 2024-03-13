import React from 'react';

import { Flex, Text } from '@chakra-ui/react';

import { CustomFlex } from './styles';

interface Props {
  title: string;
  subTitle: string;
  children?: React.ReactNode;
  height?: string;
}

const Header: React.FC<Props> = ({ title, subTitle, children, height }) => {
  return (
    <CustomFlex position="sticky" zIndex={2} height={height || '6rem'}>
      <Flex flexDirection="column">
        <Flex>
          <Text fontSize="sm">{subTitle}</Text>
        </Flex>
        <Text fontSize="2xl" fontWeight="900">
          {title}
        </Text>
      </Flex>
      <Flex>{children}</Flex>
    </CustomFlex>
  );
};

export default Header;
