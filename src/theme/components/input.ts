import { ComponentStyleConfig } from '@chakra-ui/react';

export const inputStyle: ComponentStyleConfig = {
  baseStyle: (props) => {
    return {
      dialog: {
        bg: props.colorMode === 'light' ? 'navy.800' : 'white',
      },
    };
  },
};
