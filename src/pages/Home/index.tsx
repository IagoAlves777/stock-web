import React, { useMemo, useState } from 'react';
import { AiOutlineShoppingCart } from 'react-icons/ai';
import { toast } from 'react-toastify';

import { Button, Flex, Icon, Text, Input, useColorModeValue } from '@chakra-ui/react';

import { ModalConfirmation } from '@components';
import Header from '@components/Header';
import useFetch from '@hooks/useFetch';
import api from '@services/api';
import { useAuth } from '@store/auth';
import { useLoading } from '@store/loading';
import { dateFormatAPI } from '@utils/dateFormat';
import { filteredList } from '@utils/filteredList';
import { Product, SupermarketCarProduct } from 'src/@types/product';

import DrawerResume from './components/DrawerResume';
import ProductCard from './components/ProductCard';

const Home: React.FC = () => {
  const user = useAuth((state) => state.user);
  const onLoading = useLoading((state) => state.onLoading);

  const { data: products } = useFetch<Product[]>('/product', { suspense: true });

  const bgInput = useColorModeValue('gray.50', 'navy.800');

  const [search, setSearch] = useState('');
  const [supermarketCar, setSupermarketCar] = useState<SupermarketCarProduct[]>([]);
  const [openDrawerResume, setOpenDrawerResume] = useState(false);
  const [openModalConfirmation, setOpenModalConfirmation] = useState(false);

  const filteredProducts: Product[] = useMemo(() => filteredList(products || [], search), [products, search]);

  const onAddProduct = (product: Product) => {
    const exist = supermarketCar.find((s) => s.id === product.id);

    if (exist) {
      const newSupermarketCar = supermarketCar.filter((s) => s.id !== product.id);

      const newProduct = { id: product.id, price: Number(product.price), amount: exist.amount + 1, name: product.name };

      setSupermarketCar([...newSupermarketCar, newProduct]);
    } else {
      const newProduct = { id: product.id, price: Number(product.price), amount: 1, name: product.name };

      setSupermarketCar([...supermarketCar, newProduct]);
    }
  };

  const onCloseDrawerResume = () => {
    setOpenDrawerResume(false);
  };

  const onCloseConfirmation = () => {
    setSupermarketCar([]);
    setOpenDrawerResume(false);
    setOpenModalConfirmation(false);
    toast.success('Pedido realizado com sucesso.');
  };

  const onFinish = async () => {
    onLoading(true);

    try {
      const total = supermarketCar.reduce((acc, curr) => acc + curr.price * curr.amount, 0);

      const saleData = {
        userId: user?.id,
        date: dateFormatAPI(new Date()),
        total,
        products: supermarketCar.map((s) => ({
          id: s.id,
          price: s.price,
          amount: s.amount,
        })),
      };

      await api.post(`sales`, saleData);
      onLoading(false);
      onCloseConfirmation();
    } catch (error) {
      onLoading(false);
      toast.error(`Ops parece que algo deu errado na seu pedido por favor tente novamente.`);
    }
  };

  const productsAmount = useMemo(() => supermarketCar.reduce((acc, curr) => acc + curr.amount, 0), [supermarketCar]);

  return (
    <Flex flexDirection="column" gap="1rem" width="100%">
      <Header title="Lojinhas de produtos" subTitle="Tem tudo baratinho" />
      <Flex marginBottom="1rem" justifyContent="space-between" paddingRight="1.5rem">
        <Input placeholder="Busque aqui" bg={bgInput} width="25rem" onChange={(e) => setSearch(e.target.value)} />
        <Flex>
          {productsAmount ? (
            <Text position="absolute" right={8} color="white" zIndex={2} fontWeight="bold" fontSize="0.85rem">
              {productsAmount}
            </Text>
          ) : null}
          <Button
            rightIcon={<Icon as={AiOutlineShoppingCart} />}
            height="3rem"
            colorScheme={productsAmount ? 'orange' : 'whiteAlpha'}
            color="white"
            onClick={() => setOpenDrawerResume(true)}
          >
            Carrinho
          </Button>
        </Flex>
      </Flex>
      <Flex gap="0.5rem" flexWrap="wrap" width="100%" maxHeight="80vh" overflow="auto">
        {filteredProducts?.map((product) => (
          <ProductCard key={product.id} product={product} onAddProduct={onAddProduct} />
        ))}
      </Flex>

      <DrawerResume
        isOpen={openDrawerResume}
        onClose={onCloseDrawerResume}
        onFinish={() => setOpenModalConfirmation(true)}
        products={supermarketCar}
        setSupermarketCar={setSupermarketCar}
        supermarketCar={supermarketCar}
      />

      <ModalConfirmation
        title="Confirmar pedido"
        open={openModalConfirmation}
        onConfirm={onFinish}
        onClose={onCloseConfirmation}
        onCancel={() => setOpenModalConfirmation(false)}
        text="Deseja confirmar o pedido?"
      />
    </Flex>
  );
};

export default Home;
