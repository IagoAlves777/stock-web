import { Box } from '@chakra-ui/react';

import styled from 'styled-components';

export const CustomBox = styled(Box)`
  .chakra-text,
  span {
    cursor: pointer;
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
  }
`;
