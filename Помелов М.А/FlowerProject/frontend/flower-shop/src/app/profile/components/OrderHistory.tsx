'use client';
import React, { useState, useEffect } from 'react';
import {
  Box,
  VStack,
  HStack,
  Text,
  Card,
  CardBody,
  Badge,
  Spinner,
  Alert,
  AlertIcon,
  Button,
  Icon,
  Divider,
  Flex,
  useToast,
} from '@chakra-ui/react';
import { motion } from 'framer-motion';
import { FiPackage, FiCalendar, FiMapPin, FiDollarSign, FiRefreshCw } from 'react-icons/fi';
import { apiService, UserOrder } from '../../../services/api';
import { useOrders } from '../../hooks/useOrders';
import OrderStatusBadge from './OrderStatusBadge';

interface OrderItem {
  id: number;
  productName: string;
  quantity: number;
  price: number;
  imageUrl?: string;
}

// Используем тип из API сервиса
type Order = UserOrder;

interface OrderHistoryProps {
  userId: number;
}

const OrderHistory: React.FC<OrderHistoryProps> = ({ userId }) => {
  const toast = useToast();
  const [error, setError] = useState<string | null>(null);
  const { orders, isLoading, loadOrders } = useOrders(userId);

  useEffect(() => {
    // Загружаем заказы из API
    const loadOrdersFromAPI = async () => {
      try {
        const token = localStorage.getItem('token');
        if (!token) {
          return; // Используем локальные заказы
        }

        // Загружаем заказы через API
        const userOrders = await apiService.getUserOrders(userId, token);
        
        // Если API работает, но заказов нет
        if (userOrders.length === 0 && orders.length === 0) {
          toast({
            title: 'Нет заказов',
            description: 'У вас пока нет заказов. Сделайте свой первый заказ!',
            status: 'info',
            duration: 3000,
            isClosable: true,
          });
        }
      } catch (error) {
        console.error('Ошибка загрузки заказов из API:', error);
        // Если API недоступен, используем локальные заказы
        if (orders.length === 0) {
          toast({
            title: 'Локальные данные',
            description: 'Используются локальные данные (API недоступен). В реальном приложении заказы будут загружаться с сервера.',
            status: 'info',
            duration: 5000,
            isClosable: true,
          });
        }
      }
    };

    loadOrdersFromAPI();
  }, [userId, orders.length, toast]);



  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('ru-RU', {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit',
    });
  };

  const formatPrice = (price: number) => {
    return new Intl.NumberFormat('ru-RU', {
      style: 'currency',
      currency: 'RUB',
    }).format(price);
  };

  if (isLoading) {
    return (
      <Box display="flex" justifyContent="center" py={10}>
        <Spinner size="xl" color="pink.500" />
      </Box>
    );
  }

  if (error) {
    return (
      <Alert status="error">
        <AlertIcon />
        {error}
      </Alert>
    );
  }

  if (orders.length === 0) {
    return (
      <Card>
        <CardBody>
          <VStack spacing={4} py={8}>
            <Icon as={FiPackage} size="xl" color="gray.400" />
            <Text fontSize="lg" color="gray.600">
              У вас пока нет заказов
            </Text>
            <Text fontSize="sm" color="gray.500" textAlign="center">
              Сделайте свой первый заказ в нашем магазине!
            </Text>
          </VStack>
        </CardBody>
      </Card>
    );
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6 }}
    >
      <VStack spacing={6} align="stretch">
        {/* Заголовок и кнопка обновления */}
        <HStack justify="space-between" align="center">
          <Text fontSize="xl" fontWeight="bold" color="gray.800">
            История заказов
          </Text>
          <Button
            leftIcon={<Icon as={FiRefreshCw} />}
            variant="outline"
            colorScheme="pink"
            onClick={loadOrders}
            isLoading={isLoading}
          >
            Обновить
          </Button>
        </HStack>

        {/* Список заказов */}
        <VStack spacing={4} align="stretch">
          {orders.map((order) => (
            <motion.div
              key={order.id}
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.4 }}
            >
              <Card>
                <CardBody>
                  <VStack spacing={4} align="stretch">
                    {/* Заголовок заказа */}
                    <HStack justify="space-between" align="center">
                      <VStack align="start" spacing={1}>
                        <Text fontSize="lg" fontWeight="bold" color="gray.800">
                          Заказ {order.orderNumber}
                        </Text>
                        <Text fontSize="sm" color="gray.600">
                          {order.shopName}
                        </Text>
                      </VStack>
                      <OrderStatusBadge status={order.status} size="sm" />
                    </HStack>

                    <Divider />

                    {/* Детали заказа */}
                    <HStack spacing={6} align="start">
                      <VStack align="start" spacing={2} flex={1}>
                        <HStack spacing={2}>
                          <Icon as={FiCalendar} color="pink.500" />
                          <Text fontSize="sm" color="gray.600">
                            {formatDate(order.orderDate)}
                          </Text>
                        </HStack>
                        <HStack spacing={2}>
                          <Icon as={FiMapPin} color="pink.500" />
                          <Text fontSize="sm" color="gray.600">
                            {order.deliveryAddress}
                          </Text>
                        </HStack>
                        <HStack spacing={2}>
                          <Icon as={FiDollarSign} color="pink.500" />
                          <Text fontSize="lg" fontWeight="bold" color="gray.800">
                            {formatPrice(order.totalAmount)}
                          </Text>
                        </HStack>
                      </VStack>
                    </HStack>

                    <Divider />

                    {/* Товары в заказе */}
                    <VStack spacing={3} align="stretch">
                      <Text fontSize="md" fontWeight="semibold" color="gray.700">
                        Товары в заказе:
                      </Text>
                      {order.items.map((item) => (
                        <HStack key={item.id} spacing={3} p={3} bg="gray.50" borderRadius="md">
                          <Box
                            w="50px"
                            h="50px"
                            bg="gray.200"
                            borderRadius="md"
                            display="flex"
                            alignItems="center"
                            justifyContent="center"
                          >
                            <Icon as={FiPackage} color="gray.500" />
                          </Box>
                          <VStack align="start" spacing={1} flex={1}>
                            <Text fontSize="sm" fontWeight="medium" color="gray.800">
                              {item.productName}
                            </Text>
                            <Text fontSize="xs" color="gray.600">
                              Количество: {item.quantity}
                            </Text>
                          </VStack>
                          <Text fontSize="sm" fontWeight="semibold" color="gray.800">
                            {formatPrice(item.price)}
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
      </VStack>
    </motion.div>
  );
};

export default OrderHistory;
