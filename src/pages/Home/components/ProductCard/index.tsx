import React from 'react';
import { AiOutlineShoppingCart } from 'react-icons/ai';

import { Button, Flex, Icon, Text, useColorModeValue } from '@chakra-ui/react';

import { buttonSubmit } from '@components';
import { formatMoney } from '@utils/formatMoney';
import { Product } from 'src/@types/product';

interface Props {
  product: Product;
  onAddProduct: (value: Product) => void;
}

const ProductCard: React.FC<Props> = ({ product, onAddProduct }) => {
  const { name, price } = product;

  const bg = useColorModeValue('gray.50', 'navy.800');

  return (
    <Flex
      width="20%"
      border="1px solid"
      borderColor="rgba(255, 255, 255, 0.2)"
      height="20rem"
      flexDirection="column"
      padding="0.2rem"
      bg={bg}
      gap="0.5rem"
      cursor="pointer"
      onClick={() => onAddProduct(product)}
    >
      <Flex height="100%" alignItems="center" justifyContent="center">
        Imagem do produto aqui
      </Flex>
      <Flex justifyContent="center">
        <Text fontWeight="bold">{name}</Text>
      </Flex>
      <Flex width="100%" justifyContent="center">
        <Text fontSize="1.4rem" fontWeight="bold" color="orange">
          {formatMoney(Number(price))}
        </Text>
      </Flex>
      <Flex>
        <Button
          borderRadius="0.5rem"
          width="100%"
          {...buttonSubmit}
          leftIcon={<Icon as={AiOutlineShoppingCart} fontSize="1.5rem" />}
          onClick={() => onAddProduct(product)}
        >
          Comprar
        </Button>
      </Flex>
    </Flex>
  );
};

export default ProductCard;
