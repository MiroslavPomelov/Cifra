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
  useColorModeValue,
} from '@chakra-ui/react';
import { motion } from 'framer-motion';
import { FiPackage, FiCalendar, FiMapPin, FiDollarSign, FiRefreshCw, FiServer } from 'react-icons/fi';
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
  const { orders, isLoading, error, loadOrders } = useOrders(userId);

  // Цвета для цветочной темы (как в форме входа)
  const primaryColor = 'pink.500';
  const secondaryColor = 'purple.500';
  const borderColor = useColorModeValue('pink.200', 'pink.600');

  useEffect(() => {
    // Показываем информацию о загрузке заказов
    if (orders.length > 0) {
      toast({
        title: 'Заказы загружены',
        description: `Загружено ${orders.length} заказов с сервера`,
        status: 'success',
        duration: 3000,
        isClosable: true,
      });
    }
  }, [orders.length, toast]);

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
        <VStack spacing={4}>
          <Spinner size="xl" color="pink.500" />
          <Text color="white" fontSize="sm">
            Загружаем заказы с сервера...
          </Text>
        </VStack>
      </Box>
    );
  }

  if (error) {
    return (
      <VStack spacing={4} align="stretch">
        <Alert status="error">
          <AlertIcon />
          {error}
        </Alert>
        <Button
          leftIcon={<Icon as={FiRefreshCw} />}
          onClick={loadOrders}
          colorScheme="pink"
          variant="outline"
        >
          Попробовать снова
        </Button>
      </VStack>
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
          <VStack align="start" spacing={1}>
            <Text 
              fontSize="xl" 
              fontWeight="bold" 
              color="white"
              textShadow="0 1px 2px rgba(0,0,0,0.5)"
            >
              История заказов
            </Text>
            <HStack spacing={2} color="green.300" fontSize="sm">
              <Icon as={FiServer} />
              <Text>Данные загружаются с сервера</Text>
            </HStack>
          </VStack>
          <Button
            leftIcon={<Icon as={FiRefreshCw} />}
            variant="outline"
            colorScheme="pink"
            onClick={loadOrders}
            isLoading={isLoading}
            bgGradient={`linear(to-r, ${primaryColor}, ${secondaryColor})`}
            _hover={{
              bgGradient: `linear(to-r, ${secondaryColor}, ${primaryColor})`,
              transform: 'translateY(-2px)',
              boxShadow: `0 8px 25px rgba(236, 72, 153, 0.3)`,
            }}
            _active={{
              transform: 'translateY(0)',
            }}
            transition="all 0.3s"
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
              <Box
                bg="rgba(255, 255, 255, 0.05)"
                backdropFilter="blur(10px)"
                p={6}
                borderRadius="xl"
                border="1px solid"
                borderColor="rgba(255, 255, 255, 0.1)"
                boxShadow="0 8px 32px rgba(0, 0, 0, 0.1)"
                _hover={{
                  transform: 'translateY(-2px)',
                  boxShadow: '0 12px 40px rgba(0, 0, 0, 0.15)',
                }}
                transition="all 0.3s ease"
              >
                <VStack spacing={4} align="stretch">
                  {/* Заголовок заказа */}
                  <HStack justify="space-between" align="center">
                    <VStack align="start" spacing={1}>
                      <Text 
                        fontSize="lg" 
                        fontWeight="bold" 
                        color="white"
                        textShadow="0 1px 2px rgba(0,0,0,0.5)"
                      >
                        Заказ {order.orderNumber}
                      </Text>
                      <Text 
                        fontSize="sm" 
                        color="gray.300"
                        textShadow="0 1px 2px rgba(0,0,0,0.5)"
                      >
                        {order.shopName}
                      </Text>
                    </VStack>
                    <OrderStatusBadge status={order.status} size="sm" />
                  </HStack>

                  <Divider borderColor="rgba(255, 255, 255, 0.1)" />

                  {/* Детали заказа */}
                  <HStack spacing={6} align="start">
                    <VStack align="start" spacing={2} flex={1}>
                      <HStack spacing={2}>
                        <Icon as={FiCalendar} color={primaryColor} />
                        <Text 
                          fontSize="sm" 
                          color="gray.300"
                          textShadow="0 1px 2px rgba(0,0,0,0.5)"
                        >
                          {formatDate(order.orderDate)}
                        </Text>
                      </HStack>
                      <HStack spacing={2}>
                        <Icon as={FiMapPin} color={primaryColor} />
                        <Text 
                          fontSize="sm" 
                          color="gray.300"
                          textShadow="0 1px 2px rgba(0,0,0,0.5)"
                        >
                          {order.deliveryAddress}
                        </Text>
                      </HStack>
                      <HStack spacing={2}>
                        <Icon as={FiDollarSign} color={primaryColor} />
                        <Text 
                          fontSize="lg" 
                          fontWeight="bold" 
                          color="white"
                          textShadow="0 1px 2px rgba(0,0,0,0.5)"
                        >
                          {formatPrice(order.totalAmount)}
                        </Text>
                      </HStack>
                    </VStack>
                  </HStack>

                  <Divider borderColor="rgba(255, 255, 255, 0.1)" />

                  {/* Товары в заказе */}
                  <VStack spacing={3} align="stretch">
                    <Text 
                      fontSize="md" 
                      fontWeight="semibold" 
                      color="white"
                      textShadow="0 1px 2px rgba(0,0,0,0.5)"
                    >
                      Товары в заказе:
                    </Text>
                    {order.items.map((item) => (
                      <HStack 
                        key={item.id} 
                        spacing={3} 
                        p={3} 
                        bg="rgba(255, 255, 255, 0.05)" 
                        borderRadius="md"
                        border="1px solid"
                        borderColor="rgba(255, 255, 255, 0.05)"
                      >
                        <Box
                          w="50px"
                          h="50px"
                          bg="rgba(255, 255, 255, 0.1)"
                          borderRadius="md"
                          display="flex"
                          alignItems="center"
                          justifyContent="center"
                        >
                          <Icon as={FiPackage} color={primaryColor} />
                        </Box>
                        <VStack align="start" spacing={1} flex={1}>
                          <Text 
                            fontSize="sm" 
                            fontWeight="medium" 
                            color="white"
                            textShadow="0 1px 2px rgba(0,0,0,0.5)"
                          >
                            {item.productName}
                          </Text>
                          <Text 
                            fontSize="xs" 
                            color="gray.300"
                            textShadow="0 1px 2px rgba(0,0,0,0.5)"
                          >
                            Количество: {item.quantity}
                          </Text>
                        </VStack>
                        <Text 
                          fontSize="sm" 
                          fontWeight="semibold" 
                          color="white"
                          textShadow="0 1px 2px rgba(0,0,0,0.5)"
                        >
                          {formatPrice(item.price)}
                        </Text>
                      </HStack>
                    ))}
                  </VStack>
                </VStack>
              </Box>
            </motion.div>
          ))}
        </VStack>
      </VStack>
    </motion.div>
  );
};

export default OrderHistory;
