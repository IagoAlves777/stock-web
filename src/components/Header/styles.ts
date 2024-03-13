import { Flex, IconButton, InputProps, ButtonProps, IconProps } from '@chakra-ui/react';

import styled from 'styled-components';

export const CustomFlex = styled(Flex)<{ padding?: string }>`
  box-shadow: none;
  border: transparent;
  filter: none;
  background-position: center;
  background-size: cover;
  border-radius: 1.1rem;
  border-width: 0.09rem;
  border-style: solid;
  transition-delay: '0s, 0s, 0s, 0s';
  transition-duration: ' 0.25s, 0.25s, 0.25s, 0s';
  transition-property: 'box-shadow, background-color, filter, border';
  transition-timing-function: 'linear, linear, linear, linear';
  align-items: center;
  justify-content: space-between;
  width: 'calc(100% - 135px)';
  transition: 1s;
`;

export const Toolbar = styled(Flex)`
  height: 68px;
  border-radius: 30px;
  padding: 10px 20px;
  align-items: center;
  justify-content: center;
`;

export const CustomIconButton = styled(IconButton)`
  background: inherit;
  border-radius: inherit;
`;

export const inputTextProps: InputProps = {
  variant: 'search',
  fontSize: 'sm',
  fontWeight: '500',
  _placeholder: { color: 'gray.400', fontSize: '14px' },
  borderRadius: '30px',
  placeholder: 'Pesquisar...',
};

export const buttonProps: ButtonProps = {
  variant: 'no-hover',
  bg: 'transparent',
  p: '0px',
  minW: 'unset',
  minH: 'unset',
  h: '18px',
  w: 'max-content',
};

export const iconProps: IconProps = {
  h: '18px',
  w: '18px',
};
