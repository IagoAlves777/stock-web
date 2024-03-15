import React, { useMemo, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Column } from 'react-table';

import { Button, Flex, Input, useColorModeValue } from '@chakra-ui/react';

import { Table, Header, buttonSubmit } from '@components';
import useFetch from '@hooks/useFetch';
import { filteredList } from '@utils/filteredList';
import { formatMoney } from '@utils/formatMoney';
import { Product } from 'src/@types/product';

// import { Container } from './styles';

const Stock: React.FC = () => {
  const { data: products } = useFetch<Product[]>('product', { suspense: true });

  const bgInput = useColorModeValue('white', 'navy.800');
  const navigate = useNavigate();

  const [search, setSearch] = useState('');

  const filteredProducts = useMemo(() => filteredList(products || [], search), [products, search]);

  const columns = useMemo<Column<Product>[]>(
    () => [
      {
        Header: 'Nome',
        accessor: 'name',
      },
      {
        Header: 'Preço',
        accessor: 'price',
        Cell: ({ value }) => formatMoney(Number(value)),
      },
      {
        Header: 'Quantidade em estoque',
        accessor: 'amount',
      },
    ],
    [],
  );

  return (
    <Flex width="100%" flexDirection="column">
      <Header title="Produtos" subTitle="Estoque de produtos disponíveis" />
      <Flex alignItems="center" justifyContent="space-between" paddingRight="1rem" paddingBottom="1rem">
        <Input
          placeholder="Busque aqui"
          bg={bgInput}
          width="25rem"
          onChange={(e) => setSearch(e.target.value)}
          borderRadius={12}
          height="3rem"
        />

        <Button {...buttonSubmit} onClick={() => navigate('/new-product')}>
          Novo produto
        </Button>
      </Flex>
      <Table height="calc(100vh - 11rem)" columns={columns} rows={filteredProducts || []} />
    </Flex>
  );
};

export default Stock;
