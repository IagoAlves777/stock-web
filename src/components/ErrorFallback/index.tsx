import React from 'react';
import Lottie from 'react-lottie';

import { Flex, Text } from '@chakra-ui/react';

import animationData from '../../assets/animation/error.json';

import { Container } from './styles';

const defaultOptions = {
  loop: true,
  autoplay: true,
  animationData,
  rendererSettings: {
    preserveAspectRatio: 'xMidYMid slice',
  },
};

const ErrorFallback: React.FC = () => {
  return (
    <Container flex={1} flexDirection="column" alignItems="center" justifyContent="center" height="100%">
      <Text fontSize="5xl">Oops!</Text>
      <Text fontSize="2xl" wordBreak="break-word" maxWidth="50%" textAlign="center">
        Não conseguimos nos conectar ao servidor, verifique sua conexão ou recarregue a página!
      </Text>
      <Flex maxHeight={500} maxWidth={500}>
        <Lottie options={defaultOptions} speed={1.5} isClickToPauseDisabled />
      </Flex>
    </Container>
  );
};

export default ErrorFallback;
