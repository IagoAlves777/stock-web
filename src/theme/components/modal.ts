import { ComponentStyleConfig } from '@chakra-ui/react';

export const modalStyle: ComponentStyleConfig = {
  baseStyle: (props) => {
    return {
      dialog: {
        bg: props.colorMode === 'light' ? 'white' : 'navy.800',
      },
    };
  },
  sizes: {
    '6xl': { dialog: { maxW: '95vw', h: '80vh' } },
    '5xl': { dialog: { maxW: '50vw', h: '80vh' } },
  },
};
