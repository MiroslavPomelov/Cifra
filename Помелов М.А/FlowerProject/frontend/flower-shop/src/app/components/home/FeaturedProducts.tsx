'use client';
import React, { useState, useEffect } from 'react';
import {
  Box,
  Container,
  Text,
  SimpleGrid,
  VStack,
  Badge,
  Button,
  Spinner,
  Center,
} from '@chakra-ui/react';
import { motion } from 'framer-motion';
import ProductCard from './ProductCard';
import LoadingSpinner from './LoadingSpinner';
import ErrorMessage from './ErrorMessage';
import { apiService, Product } from '../../../services/api';

const FeaturedProducts: React.FC = () => {
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 50 },
    visible: { opacity: 1, y: 0 },
  };

  // Загружаем данные продуктов
  useEffect(() => {
    const loadProducts = async () => {
             try {
         setLoading(true);
         setError(null);
         const featuredProducts = await apiService.getFeaturedProducts();
         setProducts(featuredProducts);
       } catch (err) {
         console.error('Ошибка загрузки продуктов:', err);
         setError(`Ошибка при загрузке продуктов: ${(err as Error).message}`);
       } finally {
        setLoading(false);
      }
    };

    loadProducts();
  }, []);

  // Показываем спиннер во время загрузки
  if (loading) {
    return <LoadingSpinner message="Загружаем избранные букеты..." />;
  }

  // Показываем сообщение об ошибке
  if (error) {
    return (
      <ErrorMessage 
        message={error} 
        onRetry={() => {
          setError(null);
          setLoading(true);
          apiService.getFeaturedProducts()
            .then(setProducts)
            .catch(err => setError('Ошибка при загрузке продуктов'))
            .finally(() => setLoading(false));
        }}
      />
    );
  }

  return (
    <Box
      py={20}
      position="relative"
      overflow="hidden"
    >
      

      {/* Упрощенный фоновый эффект */}
      <motion.div
        style={{
          position: 'absolute',
          top: '10%',
          left: '5%',
          width: '150px',
          height: '150px',
          background: 'radial-gradient(circle, rgba(236, 72, 153, 0.03), transparent)',
          borderRadius: '50%',
          filter: 'blur(30px)',
          willChange: 'transform',
        }}
        animate={{
          scale: [1, 1.2, 1],
          opacity: [0.1, 0.2, 0.1],
        }}
        transition={{
          duration: 8,
          repeat: Infinity,
          ease: "easeInOut",
        }}
      />

      <Container maxW="7xl" position="relative" zIndex={1}>
        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.3 }}
        >
          <VStack spacing={12}>
            {/* Заголовок секции */}
            <motion.div variants={itemVariants}>
              <VStack spacing={4} textAlign="center">
                <Badge
                  bgGradient="linear(to-r, pink.400, purple.500)"
                  color="white"
                  px={4}
                  py={2}
                  borderRadius="full"
                  fontSize="sm"
                  fontWeight="semibold"
                  letterSpacing="wide"
                >
                  🌸 Избранные букеты
                </Badge>
                
                <Text
                  fontSize={{ base: '3xl', md: '4xl', lg: '5xl' }}
                  fontWeight="bold"
                  bgGradient="linear(to-r, white, pink.100)"
                  bgClip="text"
                  textShadow="0 4px 8px rgba(0,0,0,0.3)"
                >
                  Наши лучшие
                  <br />
                  <Text
                    as="span"
                    bgGradient="linear(to-r, pink.400, purple.500)"
                    bgClip="text"
                  >
                    композиции
                  </Text>
                </Text>
                
                <Text
                  fontSize={{ base: 'lg', md: 'xl' }}
                  color="gray.300"
                  maxW="600px"
                  lineHeight="1.6"
                >
                  Каждый букет создан с любовью и вниманием к деталям. 
                  Выбирайте из нашей коллекции эксклюзивных композиций.
                </Text>
              </VStack>
            </motion.div>

            {/* Сетка продуктов */}
            <motion.div variants={itemVariants}>
              <SimpleGrid
                columns={{ base: 1, md: 2, lg: 4 }}
                spacing={8}
                w="full"
              >
                {products.length > 0 ? (
                  products.map((product, index) => (
                    <motion.div
                      key={product.id}
                      initial={{ opacity: 0, y: 50 }}
                      whileInView={{ opacity: 1, y: 0 }}
                      viewport={{ once: true, amount: 0.3 }}
                      transition={{ delay: index * 0.1 }}
                    >
                      <ProductCard product={product} />
                    </motion.div>
                  ))
                ) : (
                  <Box textAlign="center" gridColumn="1 / -1">
                    <Text color="gray.400" fontSize="lg">
                      Нет доступных продуктов
                    </Text>
                  </Box>
                )}
              </SimpleGrid>
            </motion.div>

            {/* Кнопка "Показать все" */}
            <motion.div variants={itemVariants}>
              <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
                <Button
                  size="lg"
                  variant="outline"
                  color="white"
                  borderColor="rgba(255, 255, 255, 0.3)"
                  _hover={{
                    bg: 'rgba(255, 255, 255, 0.1)',
                    borderColor: 'pink.300',
                    color: 'pink.300',
                  }}
                  transition="all 0.3s ease"
                  px={8}
                  py={6}
                  fontSize="lg"
                  fontWeight="semibold"
                >
                  Показать все букеты
                </Button>
              </motion.div>
            </motion.div>
          </VStack>
        </motion.div>
      </Container>
    </Box>
  );
};

export default FeaturedProducts;
