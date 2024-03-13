import React from 'react';
import Lottie from 'react-lottie';

import { Flex } from '@chakra-ui/react';

import animationData from '../../assets/animation/moneyLoading.json';

const Loading: React.FC = () => {
  return (
    <Flex
      position="absolute"
      width="100vw"
      height="100svh"
      top={0}
      left={0}
      zIndex={3000}
      justifyContent="center"
      alignItems="center"
      bg="rgba(0, 0, 0, 0.5)"
    >
      <Lottie options={{ autoplay: true, animationData }} width={300} height={300} isClickToPauseDisabled />
    </Flex>
  );
};

export default Loading;
