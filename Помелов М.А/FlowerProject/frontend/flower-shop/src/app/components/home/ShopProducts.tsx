'use client';
import React, { useState, useEffect } from 'react';
import {
  Box,
  Text,
  SimpleGrid,
  VStack,
  Badge,
  Heading,
  HStack,
  Icon,
  Divider,
} from '@chakra-ui/react';
import { motion } from 'framer-motion';
import { FaStore, FaBox } from 'react-icons/fa';
import LoadingSpinner from './LoadingSpinner';
import ErrorMessage from './ErrorMessage';
import ProductCard from './ProductCard';
import { apiService, Product } from '../../../services/api';

interface ShopProductsProps {
  shopId: number;
  shopName: string;
}

const ShopProducts: React.FC<ShopProductsProps> = ({ shopId, shopName }) => {
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: { opacity: 1, y: 0 },
  };

  // Загружаем товары магазина
  useEffect(() => {
    const loadShopProducts = async () => {
      try {
        setLoading(true);
        setError(null);
        const productsData = await apiService.getProductsByShop(shopId);
        setProducts(productsData);
      } catch (err) {
        setError('Ошибка при загрузке товаров магазина');
        console.error('Ошибка загрузки товаров магазина:', err);
      } finally {
        setLoading(false);
      }
    };

    loadShopProducts();
  }, [shopId]);

  // Показываем спиннер во время загрузки
  if (loading) {
    return <LoadingSpinner message={`Загружаем товары магазина "${shopName}"...`} />;
  }

  // Показываем сообщение об ошибке
  if (error) {
    return (
      <ErrorMessage 
        message={error} 
        onRetry={() => {
          setError(null);
          setLoading(true);
          apiService.getProductsByShop(shopId)
            .then(setProducts)
            .catch(err => setError('Ошибка при загрузке товаров магазина'))
            .finally(() => setLoading(false));
        }}
      />
    );
  }

  return (
    <Box>
      <motion.div
        variants={containerVariants}
        initial="hidden"
        animate="visible"
      >
        <VStack spacing={8} align="stretch">
          {/* Заголовок с информацией о магазине */}
          <motion.div variants={itemVariants}>
            <VStack spacing={4} textAlign="center">
              <HStack spacing={3}>
                <Icon as={FaStore} color="purple.300" boxSize={6} />
                <Heading size="lg" color="white">
                  {shopName}
                </Heading>
              </HStack>
              
              <HStack spacing={4}>
                <Badge
                  bgGradient="linear(to-r, purple.400, blue.500)"
                  color="white"
                  px={3}
                  py={1}
                  borderRadius="full"
                  fontSize="sm"
                >
                  <HStack spacing={1}>
                    <Icon as={FaBox} boxSize={3} />
                    <Text>{products.length} товаров</Text>
                  </HStack>
                </Badge>
              </HStack>
            </VStack>
          </motion.div>

          <Divider borderColor="rgba(255, 255, 255, 0.1)" />

          {/* Сетка товаров */}
          {products.length > 0 ? (
            <motion.div variants={itemVariants}>
              <SimpleGrid
                columns={{ base: 1, md: 2, lg: 3 }}
                spacing={6}
                w="full"
              >
                {products.map((product, index) => (
                  <motion.div
                    key={product.id}
                    variants={itemVariants}
                    transition={{ delay: index * 0.05 }}
                  >
                    <ProductCard product={product} />
                  </motion.div>
                ))}
              </SimpleGrid>
            </motion.div>
          ) : (
            <motion.div variants={itemVariants}>
              <VStack spacing={4} py={8}>
                <Icon as={FaBox} color="gray.500" boxSize={12} />
                <Text color="gray.400" fontSize="lg" textAlign="center">
                  В этом магазине пока нет товаров
                </Text>
                <Text color="gray.500" fontSize="sm" textAlign="center">
                  Загляните позже, мы обязательно добавим новые букеты
                </Text>
              </VStack>
            </motion.div>
          )}
        </VStack>
      </motion.div>
    </Box>
  );
};

export default ShopProducts;

