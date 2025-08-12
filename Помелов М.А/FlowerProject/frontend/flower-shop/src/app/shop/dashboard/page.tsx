'use client';
import React, { useEffect, useMemo, useState } from 'react';
import {
  Box,
  Button,
  Container,
  Flex,
  FormControl,
  FormLabel,
  HStack,
  Input,
  Table,
  Thead,
  Tbody,
  Tr,
  Th,
  Td,
  Text,
  VStack,
  useToast,
  Textarea,
  NumberInput,
  NumberInputField,
  IconButton,
  Badge,
} from '@chakra-ui/react';
import { motion } from 'framer-motion';
import { apiService, CreateProductPayload, Product, Shop } from '../../../services/api';
import { FaPlus, FaTrash, FaSave, FaSync, FaHome } from 'react-icons/fa';
import { useRouter } from 'next/navigation';

function parseJwt(token: string): any | null {
  try {
    const base64Url = token.split('.')[1];
    const base64 = base64Url.replace(/-/g, '+').replace(/_/g, '/');
    const jsonPayload = decodeURIComponent(
      atob(base64)
        .split('')
        .map((c) => '%' + ('00' + c.charCodeAt(0).toString(16)).slice(-2))
        .join(''),
    );
    return JSON.parse(jsonPayload);
  } catch {
    return null;
  }
}

const ShopDashboardPage: React.FC = () => {
  const toast = useToast();
  const [shop, setShop] = useState<Shop | null>(null);
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState<boolean>(false);
  const [form, setForm] = useState<CreateProductPayload>({ name: '', description: '', price: 0, imageUrl: '' });
  const router = useRouter();

  // Инициализация магазина из localStorage и загрузка товаров
  useEffect(() => {
    const token = typeof window !== 'undefined' ? localStorage.getItem('token') : null;
    const shopRaw = typeof window !== 'undefined' ? localStorage.getItem('shop') : null;
    if (!token) {
      toast({ title: 'Требуется вход', description: 'Авторизуйтесь как магазин', status: 'warning' });
      return;
    }
    if (shopRaw) {
      try { setShop(JSON.parse(shopRaw)); } catch {}
    } else {
      const payload = token ? parseJwt(token) : null;
      if (payload?.sub) {
        // минимальная инициализация
        setShop({ id: payload.sub, name: 'Магазин', description: null, email: payload.email, address: '', phone: '', isActive: true, createdAt: '', updatedAt: '' } as any);
      }
    }
  }, [toast]);

  const loadProducts = async (shopId: number) => {
    setLoading(true);
    try {
      const data = await apiService.getProductsByShop(shopId);
      setProducts(data);
    } catch (e: any) {
      toast({ title: 'Ошибка загрузки товаров', status: 'error' });
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (shop?.id) {
      loadProducts(shop.id);
    }
  }, [shop?.id]);

  const handleCreate = async () => {
    if (!form.name || form.price <= 0) {
      toast({ title: 'Заполните название и цену', status: 'warning' });
      return;
    }
    setLoading(true);
    try {
      await apiService.createProduct(form);
      toast({ title: 'Товар добавлен', status: 'success' });
      setForm({ name: '', description: '', price: 0, imageUrl: '' });
      if (shop?.id) loadProducts(shop.id);
    } catch (e: any) {
      toast({ title: 'Ошибка добавления товара', description: e?.response?.data?.message || e.message, status: 'error' });
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (id: number) => {
    setLoading(true);
    try {
      await apiService.deleteProduct(id);
      toast({ title: 'Удалено', status: 'info' });
      if (shop?.id) loadProducts(shop.id);
    } catch (e: any) {
      toast({ title: 'Ошибка удаления', status: 'error' });
    } finally {
      setLoading(false);
    }
  };

  return (
    <Box minH="100vh" bg="black">
      <Container maxW="7xl" py={10}>
        <VStack align="stretch" spacing={8}>
          <VStack align="start" spacing={1}>
            <HStack justify="space-between" w="full">
              <Text fontSize="3xl" fontWeight="bold" bgGradient="linear(to-r, pink.400, purple.500)" bgClip="text">
                Кабинет магазина
              </Text>
              <Button 
                leftIcon={<FaHome />} 
                onClick={() => router.push('/')} 
                colorScheme="pink" 
                variant="outline"
                size="md"
              >
                На главную
              </Button>
            </HStack>
            {shop && (
              <HStack>
                <Badge colorScheme="pink">ID: {shop.id}</Badge>
                <Text color="gray.400">{shop.name || shop.email}</Text>
              </HStack>
            )}
          </VStack>

          {/* Форма добавления товара */}
          <Box bg="rgba(255,255,255,0.05)" border="1px solid rgba(255,255,255,0.1)" borderRadius="xl" p={6}>
            <VStack spacing={4} align="stretch">
              <FormControl isRequired>
                <FormLabel color="gray.300">Название</FormLabel>
                <Input value={form.name} onChange={(e) => setForm({ ...form, name: e.target.value })} placeholder="Например, Букет роз" color="white" />
              </FormControl>
              <FormControl>
                <FormLabel color="gray.300">Описание</FormLabel>
                <Textarea value={form.description} onChange={(e) => setForm({ ...form, description: e.target.value })} placeholder="Описание товара" color="white" />
              </FormControl>
              <HStack>
                <FormControl isRequired>
                  <FormLabel color="gray.300">Цена (₽)</FormLabel>
                  <NumberInput min={0} precision={2} value={form.price} onChange={(_, v) => setForm({ ...form, price: Number.isFinite(v) ? v : 0 })}>
                    <NumberInputField color="white" />
                  </NumberInput>
                </FormControl>
                <FormControl>
                  <FormLabel color="gray.300">Ссылка на изображение</FormLabel>
                  <Input value={form.imageUrl} onChange={(e) => setForm({ ...form, imageUrl: e.target.value })} placeholder="https://..." color="white" />
                </FormControl>
              </HStack>
              <HStack>
                <Button leftIcon={<FaPlus />} onClick={handleCreate} isLoading={loading} colorScheme="pink">
                  Добавить товар
                </Button>
                <Button leftIcon={<FaSync />} variant="outline" onClick={() => shop?.id && loadProducts(shop.id)} isLoading={loading} colorScheme="pink">
                  Обновить список
                </Button>
              </HStack>
            </VStack>
          </Box>

          {/* Таблица товаров */}
          <Box bg="rgba(255,255,255,0.05)" border="1px solid rgba(255,255,255,0.1)" borderRadius="xl" p={6}>
            <Table variant="simple" colorScheme="whiteAlpha">
              <Thead>
                <Tr>
                  <Th color="gray.300">ID</Th>
                  <Th color="gray.300">Название</Th>
                  <Th color="gray.300">Цена</Th>
                  <Th color="gray.300">Создан</Th>
                  <Th color="gray.300"></Th>
                </Tr>
              </Thead>
              <Tbody>
                {products.map((p) => (
                  <Tr key={p.id}>
                    <Td color="gray.300">{p.id}</Td>
                    <Td color="gray.200">{p.name}</Td>
                    <Td color="gray.200">{Number(p.price).toLocaleString()} ₽</Td>
                    <Td color="gray.500">{new Date(p.createdAt).toLocaleString()}</Td>
                    <Td isNumeric>
                      <IconButton aria-label="Удалить" icon={<FaTrash />} size="sm" colorScheme="red" variant="ghost" onClick={() => handleDelete(p.id)} />
                    </Td>
                  </Tr>
                ))}
              </Tbody>
            </Table>
          </Box>
        </VStack>
      </Container>
    </Box>
  );
};

export default ShopDashboardPage;


