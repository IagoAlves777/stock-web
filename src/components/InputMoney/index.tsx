import React from 'react';
import IntlCurrencyInput from 'react-intl-currency-input';

import { Text, useColorMode } from '@chakra-ui/react';

import { Container } from './styles';

interface Props {
  onChangeValue?: (value: number) => void;
  value?: number;
  onEnter?: () => void;
  minimumFractionDigits?: number;
  maximumFractionDigits?: number;
  label?: string;
  errorMessage?: string | boolean;
  width?: string;
  id?: string;
}

const InputMoney: React.FC<Props> = ({
  onChangeValue,
  value,
  label,
  onEnter,
  maximumFractionDigits,
  minimumFractionDigits,
  errorMessage,
  width,
  id,
}) => {
  const currencyConfig = {
    locale: 'pt-BR' as const,
    formats: {
      number: {
        BRL: {
          style: 'currency',
          currency: 'BRL',
          minimumFractionDigits: minimumFractionDigits || 2,
          maximumFractionDigits: maximumFractionDigits || 2,
        },
      },
    },
  };

  const { colorMode } = useColorMode();
  const isDark = colorMode === 'dark';

  const handleChangeValue = (e: Event, inputValue: number | undefined) => {
    e.preventDefault();

    if (onChangeValue) onChangeValue(inputValue || 0);
  };

  return (
    <Container flexDirection="column" dark={isDark} width={width} id={id}>
      {label && (
        <Text fontWeight="700" marginBottom="0.375rem">
          {label}
        </Text>
      )}
      <IntlCurrencyInput
        currency="BRL"
        config={currencyConfig}
        onChange={handleChangeValue}
        value={value}
        onKeyPress={(event) => {
          if (event.key === 'Enter' && onEnter) {
            onEnter();
          }
        }}
        defaultValue={0}
        max={0}
      />
      {errorMessage && (
        <Text mt={1} fontWeight="semibold" fontSize="14" color="red.300">
          {errorMessage}
        </Text>
      )}
    </Container>
  );
};

export default InputMoney;
