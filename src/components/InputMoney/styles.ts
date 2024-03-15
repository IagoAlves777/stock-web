import { Flex } from '@chakra-ui/react';

import styled from 'styled-components';

export const Container = styled(Flex)<{ dark: boolean; width?: string }>`
  input {
    outline: 2px solid transparent;
    border-radius: 0.375rem;
    height: 2.5rem;
    padding: 0 1rem;
    background-color: ${(props) => (props.dark ? '#111c44' : 'white')};
    border-color: ${(props) => (props.dark ? 'rgba(255, 255, 255, 0.24)' : 'rgba(211, 211, 211,0.4)')} !important;
    border: 1px solid;
  }
  width: ${(props) => props.width || '100%'};
`;
