import { HTMLInputTypeAttribute, memo } from 'react';

import { InfoIcon, InfoOutlineIcon } from '@chakra-ui/icons';
import {
  Input,
  Text,
  InputProps,
  Box,
  Tooltip,
  InputGroup,
  InputLeftAddon,
  InputRightElement,
  BoxProps,
  Flex,
  InputLeftElement,
} from '@chakra-ui/react';

interface InputsProps extends InputProps {
  label?: string;
  placeholder?: string;
  errorMessage?: string | boolean;
  tooltip?: string;
  mask?: string;
  maskChar?: string;
  alwaysShowMask?: boolean;
  formatChars?: {
    '9': '[0-9]';
    a: '[A-Za-z]';
    '*': '[A-Za-z0-9]';
  };
  permanents?: number[];
  addon?: React.ReactNode;
  rightElement?: React.ReactNode;
  leftElement?: React.ReactNode;
  onClickRightElement?: () => void;
  onClickLeftElement?: () => void;
  boxProps?: BoxProps;
  help?: string;
  InputRightElementWidth?: string;
  InputLeftElementWidth?: string;
  type?: HTMLInputTypeAttribute;
  multiple?: boolean;
  ref?: React.LegacyRef<HTMLInputElement> | undefined;
}

const Inputs: React.FC<InputsProps> = ({
  label,
  placeholder,
  errorMessage,
  tooltip,
  addon,
  size,
  rightElement,
  leftElement,
  onClickRightElement,
  onClickLeftElement,
  boxProps,
  help,
  InputRightElementWidth,
  InputLeftElementWidth,
  multiple,
  autoFocus,
  ref,
  ...rest
}) => {
  return (
    <Box width="100%" {...boxProps}>
      <Flex alignItems="center" gap={1}>
        {label ? (
          <Text fontWeight="700" fontSize="15" mb="0.375rem" display="flex" alignItems="center">
            {label}
            &nbsp;
            {tooltip && (
              <Tooltip hasArrow label={tooltip}>
                <InfoOutlineIcon />
              </Tooltip>
            )}
          </Text>
        ) : null}
        {help && (
          <Tooltip label={help}>
            <InfoIcon marginBottom="8px" />
          </Tooltip>
        )}
      </Flex>
      <InputGroup size={size}>
        {rightElement && (
          <InputRightElement cursor="pointer" onClick={onClickRightElement} width={InputRightElementWidth || 'auto'}>
            {rightElement}
          </InputRightElement>
        )}

        {addon && <InputLeftAddon backgroundSize="inherit">{addon}</InputLeftAddon>}

        <Input
          placeholder={placeholder}
          {...rest}
          size={size}
          _light={{
            borderColor: 'gray.100',
            borderWidth: 2,
            _placeholder: {
              color: 'secondaryGray.50',
            },
          }}
          _dark={{
            borderColor: 'gray.600',
          }}
          multiple={multiple}
          ref={ref}
          autoFocus={autoFocus}
          _focusVisible={{
            borderColor: 'none',
          }}
        />

        {leftElement && (
          <InputLeftElement cursor="pointer" onClick={onClickLeftElement} width={InputLeftElementWidth || 'auto'}>
            {leftElement}
          </InputLeftElement>
        )}
      </InputGroup>

      {errorMessage && (
        <Text mt={1} fontWeight="semibold" fontSize="14" color="red.300">
          {errorMessage}
        </Text>
      )}
    </Box>
  );
};

export default memo(Inputs);
