import React, { useState } from 'react';
import { toast } from 'react-toastify';

import { Button, Flex, useColorModeValue } from '@chakra-ui/react';

import { Header, InputMoney, Inputs, buttonSubmit } from '@components';
import api from '@services/api';
import { useLoading } from '@store/loading';

// import { Container } from './styles';

const CreateProduct: React.FC = () => {
  const onLoading = useLoading((state) => state.onLoading);

  const bg = useColorModeValue('white', 'navy.800');

  const [name, setName] = useState('');
  const [price, setPrice] = useState(0);
  const [amount, setAmount] = useState('');
  const [nameError, setNameError] = useState<boolean | string>(false);
  const [priceError, setPriceError] = useState<boolean | string>(false);
  const [amountError, setAmountError] = useState<boolean | string>(false);

  const validateInputs = () => {
    let isValid = true;

    if (name.trim() === '') {
      setNameError('O nome do produto é obrigatório');

      isValid = false;
    }

    if (price <= 0) {
      setPriceError('O preço do produto deve ser maior que R$ 0 (zero)');

      isValid = false;
    }

    if (Number(amount) <= 0) {
      setAmountError('A quantidade do produto deve ser maior que 0');

      isValid = false;
    }

    return isValid;
  };

  const clearForm = () => {
    setName('');
    setAmount('');
    setPrice(0);
  };

  const onSubmit = async () => {
    const isValid = validateInputs();

    if (isValid) {
      onLoading(true);

      try {
        const productData = {
          name,
          amount: Number(amount),
          price,
        };

        await api.post(`product`, productData);
        toast.success('Produto criado com sucesso!');
        clearForm();
        onLoading(false);
      } catch (error) {
        onLoading(false);
        toast.error(`Ops parece que algo deu errado ao criar produto por favor tente novamente.`);
      }
    }
  };

  return (
    <Flex width="100%" flexDirection="column" paddingRight="1rem">
      <Header title="Novo produto" subTitle="Criar novo produto" />
      <Flex bg={bg} height="calc(100vh - 7rem)" borderRadius="16px" padding="1rem" gap="1rem" flexDirection="column">
        <Inputs label="Nome" value={name} onChange={(e) => setName(e.target.value)} errorMessage={nameError} />
        <InputMoney label="Preço" value={price} onChangeValue={(e) => setPrice(e)} errorMessage={priceError} />
        <Inputs
          label="Quantidade"
          type="number"
          value={amount}
          onChange={(e) => setAmount(e.target.value)}
          errorMessage={amountError}
        />
        <Flex width="100%" justifyContent="flex-end" marginTop="1rem">
          <Button {...buttonSubmit} size="lg" onClick={() => onSubmit()}>
            Criar produto
          </Button>
        </Flex>
      </Flex>
    </Flex>
  );
};

export default CreateProduct;
