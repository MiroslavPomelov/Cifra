'use client';
import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import {
  Box,
  Container,
  VStack,
  HStack,
  Text,
  Button,
  useToast,
  Card,
  CardBody,
  CardHeader,
  Image,
  IconButton,
  NumberInput,
  NumberInputField,
  NumberInputStepper,
  NumberIncrementStepper,
  NumberDecrementStepper,
  Divider,
  Badge,
  Spinner,
  Alert,
  AlertIcon,
  Flex,
  Heading,
} from '@chakra-ui/react';
import { motion } from 'framer-motion';
import { FaTrash, FaArrowLeft, FaCreditCard, FaShoppingBag } from 'react-icons/fa';
import { FiHome } from 'react-icons/fi';

interface CartItem {
  id: number;
  name: string;
  price: number;
  quantity: number;
  imageUrl: string;
  shopName: string;
}

const CartPage: React.FC = () => {
  const router = useRouter();
  const toast = useToast();
  const [cartItems, setCartItems] = useState<CartItem[]>([]);
  const [loading, setLoading] = useState(false);

  // Загрузка корзины из localStorage (в реальном приложении это будет API)
  useEffect(() => {
    const savedCart = localStorage.getItem('cart');
    if (savedCart) {
      try {
        setCartItems(JSON.parse(savedCart));
      } catch (error) {
        console.error('Ошибка загрузки корзины:', error);
      }
    }
  }, []);

  // Сохранение корзины в localStorage
  const saveCart = (items: CartItem[]) => {
    localStorage.setItem('cart', JSON.stringify(items));
    // Уведомляем другие компоненты об обновлении корзины
    window.dispatchEvent(new Event('cartUpdated'));
  };

  // Обновление количества товара
  const updateQuantity = (itemId: number, newQuantity: number) => {
    if (newQuantity <= 0) {
      removeItem(itemId);
      return;
    }
    
    const updatedItems = cartItems.map(item =>
      item.id === itemId ? { ...item, quantity: newQuantity } : item
    );
    setCartItems(updatedItems);
    saveCart(updatedItems);
  };

  // Удаление товара из корзины
  const removeItem = (itemId: number) => {
    const updatedItems = cartItems.filter(item => item.id !== itemId);
    setCartItems(updatedItems);
    saveCart(updatedItems);
    toast({
      title: 'Товар удален',
      description: 'Товар был удален из корзины',
      status: 'info',
      duration: 2000,
      isClosable: true,
    });
  };

  // Очистка корзины
  const clearCart = () => {
    setCartItems([]);
    saveCart([]);
    toast({
      title: 'Корзина очищена',
      description: 'Все товары были удалены из корзины',
      status: 'info',
      duration: 2000,
      isClosable: true,
    });
  };

  // Расчет общей суммы
  const totalAmount = cartItems.reduce((sum, item) => sum + (item.price * item.quantity), 0);

  // Переход к оформлению заказа
  const proceedToCheckout = () => {
    if (cartItems.length === 0) {
      toast({
        title: 'Корзина пуста',
        description: 'Добавьте товары в корзину для оформления заказа',
        status: 'warning',
        duration: 3000,
        isClosable: true,
      });
      return;
    }
    
    // Переход на страницу оформления заказа
    router.push('/checkout');
  };

  // Добавление тестовых товаров (для демонстрации)
  const addSampleItems = () => {
    const sampleItems: CartItem[] = [
      {
        id: 1,
        name: 'Букет "Весенняя свежесть"',
        price: 2500,
        quantity: 1,
        imageUrl: 'https://images.unsplash.com/photo-1490750967868-88aa4486c946?w=400',
        shopName: 'Цветочный рай'
      },
      {
        id: 2,
        name: 'Розы красные (11 штук)',
        price: 1800,
        quantity: 2,
        imageUrl: 'https://images.unsplash.com/photo-1518709268805-4e9042af2176?w=400',
        shopName: 'Розовый сад'
      }
    ];
    setCartItems(sampleItems);
    saveCart(sampleItems);
    toast({
      title: 'Демо-товары добавлены',
      description: 'В корзину добавлены демонстрационные товары',
      status: 'success',
      duration: 2000,
      isClosable: true,
    });
  };

  if (loading) {
    return (
      <Box minH="100vh" bg="gray.50" display="flex" alignItems="center" justifyContent="center">
        <Spinner size="xl" color="pink.500" />
      </Box>
    );
  }

  return (
    <Box minH="100vh" bg="gray.50">
      <Container maxW="6xl" py={8}>
        {/* Заголовок и навигация */}
        <VStack spacing={6} align="stretch">
          <HStack justify="space-between" align="center">
            <HStack spacing={4}>
              <Button
                leftIcon={<FiHome />}
                colorScheme="pink"
                variant="outline"
                onClick={() => router.push('/')}
                size="md"
              >
                На главную
              </Button>
              <Button
                leftIcon={<FaArrowLeft />}
                variant="ghost"
                onClick={() => router.back()}
              >
                Назад
              </Button>
            </HStack>
            
            <Heading size="lg" color="gray.700">
              🛒 Корзина покупок
            </Heading>
          </HStack>

          {/* Демо-кнопка для добавления тестовых товаров */}
          {cartItems.length === 0 && (
            <Alert status="info" borderRadius="md">
              <AlertIcon />
              <VStack align="start" spacing={2}>
                <Text fontWeight="medium">Корзина пуста</Text>
                <Text fontSize="sm" color="gray.600">
                  Добавьте товары в корзину или используйте демо-режим для просмотра функциональности
                </Text>
                <Button
                  leftIcon={<FaShoppingBag />}
                  colorScheme="pink"
                  size="sm"
                  onClick={addSampleItems}
                >
                  Добавить демо-товары
                </Button>
              </VStack>
            </Alert>
          )}

          {/* Содержимое корзины */}
          {cartItems.length > 0 ? (
            <HStack spacing={8} align="start">
              {/* Список товаров */}
              <VStack spacing={4} flex={1} align="stretch">
                <HStack justify="space-between" align="center">
                  <Text fontSize="lg" fontWeight="semibold" color="gray.700">
                    Товары в корзине ({cartItems.length})
                  </Text>
                  <Button
                    variant="ghost"
                    colorScheme="red"
                    size="sm"
                    leftIcon={<FaTrash />}
                    onClick={clearCart}
                  >
                    Очистить корзину
                  </Button>
                </HStack>

                {cartItems.map((item) => (
                  <motion.div
                    key={item.id}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.3 }}
                  >
                    <Card>
                      <CardBody>
                        <HStack spacing={4} align="start">
                          <Image
                            src={item.imageUrl}
                            alt={item.name}
                            borderRadius="md"
                            boxSize="80px"
                            objectFit="cover"
                          />
                          
                          <VStack align="start" flex={1} spacing={2}>
                            <Text fontWeight="semibold" fontSize="md">
                              {item.name}
                            </Text>
                            <Badge colorScheme="purple" variant="subtle">
                              {item.shopName}
                            </Badge>
                            <Text color="pink.500" fontWeight="bold" fontSize="lg">
                              {item.price.toLocaleString('ru-RU')} ₽
                            </Text>
                          </VStack>

                          <VStack spacing={2} align="center">
                            <NumberInput
                              value={item.quantity}
                              onChange={(_, value) => updateQuantity(item.id, value)}
                              min={1}
                              max={99}
                              size="sm"
                              w="100px"
                            >
                              <NumberInputField />
                              <NumberInputStepper>
                                <NumberIncrementStepper />
                                <NumberDecrementStepper />
                              </NumberInputStepper>
                            </NumberInput>
                            
                            <Text fontSize="sm" color="gray.500">
                              Итого: {(item.price * item.quantity).toLocaleString('ru-RU')} ₽
                            </Text>
                          </VStack>

                          <IconButton
                            aria-label="Удалить товар"
                            icon={<FaTrash />}
                            colorScheme="red"
                            variant="ghost"
                            size="sm"
                            onClick={() => removeItem(item.id)}
                          />
                        </HStack>
                      </CardBody>
                    </Card>
                  </motion.div>
                ))}
              </VStack>

              {/* Итого и оформление заказа */}
              <Card w="350px" position="sticky" top="20px">
                <CardHeader>
                  <Text fontSize="lg" fontWeight="semibold" color="gray.700">
                    Итого заказа
                  </Text>
                </CardHeader>
                <CardBody>
                  <VStack spacing={4} align="stretch">
                    <HStack justify="space-between">
                      <Text color="gray.600">Товары ({cartItems.reduce((sum, item) => sum + item.quantity, 0)}):</Text>
                      <Text fontWeight="medium">
                        {totalAmount.toLocaleString('ru-RU')} ₽
                      </Text>
                    </HStack>
                    
                    <HStack justify="space-between">
                      <Text color="gray.600">Доставка:</Text>
                      <Text fontWeight="medium">Бесплатно</Text>
                    </HStack>
                    
                    <Divider />
                    
                    <HStack justify="space-between">
                      <Text fontSize="lg" fontWeight="bold" color="gray.700">
                        К оплате:
                      </Text>
                      <Text fontSize="xl" fontWeight="bold" color="pink.500">
                        {totalAmount.toLocaleString('ru-RU')} ₽
                      </Text>
                    </HStack>

                    <Button
                      leftIcon={<FaCreditCard />}
                      colorScheme="pink"
                      size="lg"
                      onClick={proceedToCheckout}
                      isFullWidth
                    >
                      Оформить заказ
                    </Button>
                  </VStack>
                </CardBody>
              </Card>
            </HStack>
          ) : (
            <Box textAlign="center" py={20}>
              <FaShoppingBag size={64} color="#E53E3E" />
              <Text fontSize="xl" fontWeight="semibold" color="gray.600" mt={4}>
                Ваша корзина пуста
              </Text>
              <Text color="gray.500" mt={2}>
                Добавьте товары из каталога, чтобы начать покупки
              </Text>
            </Box>
          )}
        </VStack>
      </Container>
    </Box>
  );
};

export default CartPage;
