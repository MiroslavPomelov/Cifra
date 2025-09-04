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
  Badge,
  Spinner,
  Alert,
  AlertIcon,
  Heading,
  Divider,
} from '@chakra-ui/react';
import { motion } from 'framer-motion';
import { FaArrowLeft, FaHome, FaShoppingBag } from 'react-icons/fa';
import { useOrders } from '../hooks/useOrders';

const GuestOrdersPage: React.FC = () => {
  const router = useRouter();
  const toast = useToast();
  const { orders, isLoading, error } = useOrders(0); // userId = 0 для гостевых заказов

  useEffect(() => {
    // Проверяем, есть ли гостевые заказы
    const guestOrders = localStorage.getItem('guest_orders');
    if (!guestOrders) {
      toast({
        title: 'Заказы не найдены',
        description: 'У вас пока нет гостевых заказов',
        status: 'info',
        duration: 3000,
        isClosable: true,
      });
    }
  }, [toast]);

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'pending': return 'yellow';
      case 'confirmed': return 'blue';
      case 'shipped': return 'purple';
      case 'delivered': return 'green';
      case 'cancelled': return 'red';
      default: return 'gray';
    }
  };

  const getStatusText = (status: string) => {
    switch (status) {
      case 'pending': return 'Ожидает подтверждения';
      case 'confirmed': return 'Подтвержден';
      case 'shipped': return 'Отправлен';
      case 'delivered': return 'Доставлен';
      case 'cancelled': return 'Отменен';
      default: return 'Неизвестно';
    }
  };

  if (isLoading) {
    return (
      <Box minH="100vh" bg="gray.50" display="flex" alignItems="center" justifyContent="center">
        <Spinner size="xl" color="pink.500" />
      </Box>
    );
  }

  return (
    <Box minH="100vh" bg="gray.50">
      <Container maxW="6xl" py={8}>
        <VStack spacing={8} align="stretch">
          <HStack justify="space-between" align="center">
            <HStack spacing={4}>
              <Button
                leftIcon={<FaHome />}
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
              🛒 Мои гостевые заказы
            </Heading>
          </HStack>

          {error && (
            <Alert status="error" borderRadius="md">
              <AlertIcon />
              <Text>{error}</Text>
            </Alert>
          )}

          {orders.length === 0 ? (
            <Card>
              <CardBody textAlign="center" py={20}>
                <FaShoppingBag size={64} color="#E53E3E" style={{ margin: '0 auto 16px' }} />
                <Heading size="md" color="gray.600" mb={4}>
                  У вас пока нет заказов
                </Heading>
                <Text color="gray.500" mb={6}>
                  Оформите свой первый заказ, чтобы увидеть его здесь
                </Text>
                <Button
                  colorScheme="pink"
                  size="lg"
                  onClick={() => router.push('/')}
                  leftIcon={<FaShoppingBag />}
                >
                  Перейти к покупкам
                </Button>
              </CardBody>
            </Card>
          ) : (
            <VStack spacing={6} align="stretch">
              <Text fontSize="lg" fontWeight="semibold" color="gray.700">
                Найдено заказов: {orders.length}
              </Text>
              
              {orders.map((order) => (
                <motion.div
                  key={order.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.3 }}
                >
                  <Card>
                    <CardHeader>
                      <HStack justify="space-between" align="center">
                        <VStack align="start" spacing={1}>
                          <Text fontSize="lg" fontWeight="semibold" color="gray.700">
                            Заказ №{order.orderNumber}
                          </Text>
                          <Text fontSize="sm" color="gray.500">
                            {new Date(order.orderDate).toLocaleDateString('ru-RU', {
                              year: 'numeric',
                              month: 'long',
                              day: 'numeric',
                              hour: '2-digit',
                              minute: '2-digit'
                            })}
                          </Text>
                        </VStack>
                        <Badge
                          colorScheme={getStatusColor(order.status)}
                          variant="subtle"
                          fontSize="md"
                          px={3}
                          py={1}
                        >
                          {getStatusText(order.status)}
                        </Badge>
                      </HStack>
                    </CardHeader>
                    <CardBody>
                      <VStack spacing={4} align="stretch">
                        <HStack justify="space-between" align="start">
                          <VStack align="start" spacing={2} flex={1}>
                            <Text fontWeight="medium" color="gray.700">
                              Адрес доставки:
                            </Text>
                            <Text color="gray.600">{order.deliveryAddress}</Text>
                          </VStack>
                          <VStack align="end" spacing={2}>
                            <Text fontWeight="medium" color="gray.700">
                              Сумма заказа:
                            </Text>
                            <Text fontSize="xl" fontWeight="bold" color="pink.500">
                              {order.totalAmount.toLocaleString('ru-RU')} ₽
                            </Text>
                          </VStack>
                        </HStack>
                        
                        <Divider />
                        
                        <Text fontWeight="medium" color="gray.700" mb={2}>
                          Товары в заказе:
                        </Text>
                        <VStack spacing={3} align="stretch">
                          {order.items.map((item, index) => (
                            <HStack key={index} spacing={3} align="start">
                              <Image
                                src={item.imageUrl}
                                alt={item.productName}
                                borderRadius="md"
                                boxSize="50px"
                                objectFit="cover"
                              />
                              <VStack align="start" flex={1} spacing={1}>
                                <Text fontSize="sm" fontWeight="medium" noOfLines={2}>
                                  {item.productName}
                                </Text>
                                <Text fontSize="xs" color="gray.500">
                                  {item.quantity} × {item.price.toLocaleString('ru-RU')} ₽
                                </Text>
                              </VStack>
                              <Text fontSize="sm" fontWeight="semibold">
                                {(item.price * item.quantity).toLocaleString('ru-RU')} ₽
                              </Text>
                            </HStack>
                          ))}
                        </VStack>
                      </VStack>
                    </CardBody>
                  </Card>
                </motion.div>
              ))}
            </VStack>
          )}
        </VStack>
      </Container>
    </Box>
  );
};

export default GuestOrdersPage;
