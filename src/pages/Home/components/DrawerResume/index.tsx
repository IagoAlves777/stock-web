import React from 'react';
import { FaShoppingCart } from 'react-icons/fa';

import { AddIcon, DeleteIcon, MinusIcon } from '@chakra-ui/icons';
import {
  Drawer,
  DrawerBody,
  DrawerCloseButton,
  DrawerContent,
  DrawerHeader,
  DrawerOverlay,
  useColorModeValue,
  Text,
  Icon,
  Flex,
  DrawerFooter,
  Button,
  IconButton,
} from '@chakra-ui/react';

import { buttonSubmit } from '@components';
import { formatMoney } from '@utils/formatMoney';
import { SupermarketCarProduct } from 'src/@types/product';

interface Props {
  onClose: () => void;
  isOpen: boolean;
  onFinish: () => void;
  products: SupermarketCarProduct[];
  setSupermarketCar: (value: SupermarketCarProduct[]) => void;
  supermarketCar: SupermarketCarProduct[];
}

const DrawerResume: React.FC<Props> = ({ isOpen, onClose, onFinish, products, setSupermarketCar }) => {
  const bg = useColorModeValue('gray.50', 'navy.800');

  const onDelete = (product: SupermarketCarProduct) => {
    const newProducts = products.filter((p) => p.id !== product.id);

    setSupermarketCar(newProducts);
  };

  const onAdd = (product: SupermarketCarProduct) => {
    const newProduct = { id: product.id, price: Number(product.price), amount: product.amount + 1, name: product.name };

    const newProducts = products.filter((p) => p.id !== product.id);

    setSupermarketCar([...newProducts, newProduct]);
  };

  const onSubtract = (product: SupermarketCarProduct) => {
    if (!(product.amount - 1)) {
      onDelete(product);

      return;
    }

    const newProduct = { id: product.id, price: Number(product.price), amount: product.amount - 1, name: product.name };

    const newProducts = products.filter((p) => p.id !== product.id);

    setSupermarketCar([...newProducts, newProduct]);
  };

  return (
    <Drawer onClose={onClose} isOpen={isOpen} size="lg">
      <DrawerOverlay />
      <DrawerContent bg={bg}>
        <DrawerCloseButton />
        <DrawerHeader>
          <Flex alignItems="center" gap="0.5rem">
            <Text fontSize="1.8rem">Carrinho</Text>
            <Icon as={FaShoppingCart} fontSize="1.8rem" />
          </Flex>
        </DrawerHeader>
        <DrawerBody>
          {products.length ? (
            <Flex flexDirection="column" gap="1rem">
              {products.map((product) => (
                <Flex
                  key={product.id}
                  width="100%"
                  gap="1rem"
                  justifyContent="space-between"
                  height="3rem"
                  alignItems="center"
                >
                  <Text width="18rem" whiteSpace="nowrap" overflow="hidden" textOverflow="ellipsis">
                    {product.name}
                  </Text>
                  <Flex gap="2rem" height="3rem" alignItems="center">
                    <Flex height="3rem" alignItems="center" gap="0.5rem">
                      <IconButton
                        size="sm"
                        aria-label="excluir"
                        icon={<MinusIcon />}
                        onClick={() => onSubtract(product)}
                      />
                      <Text minWidth="2rem" textAlign="center">
                        {product.amount}
                      </Text>
                      <IconButton size="sm" aria-label="excluir" icon={<AddIcon />} onClick={() => onAdd(product)} />
                    </Flex>
                    <Text minWidth="8rem">{formatMoney(product.price * product.amount)}</Text>
                    <Flex>
                      <IconButton
                        size="sm"
                        aria-label="excluir"
                        icon={<DeleteIcon />}
                        onClick={() => onDelete(product)}
                      />
                    </Flex>
                  </Flex>
                </Flex>
              ))}
            </Flex>
          ) : (
            <Flex flexDirection="column" justifyContent="center" textAlign="center" alignItems="center" gap="1rem">
              <Flex flexDirection="column">
                <Text fontSize="1.2rem" fontWeight="bold">
                  Seu carrinho está vazio 😞
                </Text>
                <Text fontSize="1.6rem" fontWeight="bold">
                  Que tal ir as compras?
                </Text>
              </Flex>
              <Button {...buttonSubmit} onClick={onClose}>
                Ir as compras
              </Button>
            </Flex>
          )}
        </DrawerBody>
        <DrawerFooter>
          <Flex gap="1rem">
            <Button height="3rem" {...buttonSubmit} isDisabled={!products.length} onClick={onFinish}>
              Finalizar compra
            </Button>
            <Button height="3rem" onClick={() => onClose()}>
              Fechar
            </Button>
          </Flex>
        </DrawerFooter>
      </DrawerContent>
    </Drawer>
  );
};

export default DrawerResume;
