'use client';
import React from 'react';
import {
  Box,
  Text,
  VStack,
  HStack,
  Badge,
  Button,
  Flex,
  useColorModeValue,
} from '@chakra-ui/react';
import { motion } from 'framer-motion';
import { Product } from '../../../services/api';

interface ProductCardProps {
  product: Product;
}

const ProductCard: React.FC<ProductCardProps> = ({ product }) => {
  // Определяем категорию на основе названия или описания
  const getCategory = () => {
    const name = product.name.toLowerCase();
    if (name.includes('роза') || name.includes('роз')) return 'Розы';
    if (name.includes('тюльпан')) return 'Тюльпаны';
    if (name.includes('орхидея') || name.includes('орхид')) return 'Орхидеи';
    if (name.includes('подсолнух') || name.includes('нарцисс')) return 'Весенние';
    return 'Букеты';
  };

  // Определяем эмодзи на основе названия
  const getEmoji = () => {
    const name = product.name.toLowerCase();
    if (name.includes('роза') || name.includes('роз')) return '🌹';
    if (name.includes('тюльпан')) return '🌷';
    if (name.includes('орхидея') || name.includes('орхид')) return '🌺';
    if (name.includes('подсолнух') || name.includes('нарцисс')) return '🌻';
    return '🌸';
  };

  const category = getCategory();
  const emoji = getEmoji();

  return (
    <motion.div
      whileHover={{ y: -10 }}
      transition={{ duration: 0.3 }}
    >
      <Box
        bg="rgba(255, 255, 255, 0.05)"
        backdropFilter="blur(10px)"
        borderRadius="2xl"
        p={6}
        border="1px solid rgba(255, 255, 255, 0.1)"
        position="relative"
        overflow="hidden"
        height="480px"
        display="flex"
        flexDirection="column"
        _before={{
          content: '""',
          position: 'absolute',
          top: 0,
          left: 0,
          right: 0,
          bottom: 0,
          borderRadius: '2xl',
          padding: '1px',
          background: 'linear-gradient(45deg, rgba(236, 72, 153, 0.3), rgba(147, 51, 234, 0.3))',
          WebkitMask: 'linear-gradient(#fff 0 0) content-box, linear-gradient(#fff 0 0)',
          WebkitMaskComposite: 'xor',
          maskComposite: 'exclude',
          zIndex: 0
        }}
      >
        {/* Бейджи */}
        <Flex justify="space-between" mb={4} position="relative" zIndex={1}>
          <Badge
            bgGradient="linear(to-r, pink.400, purple.500)"
            color="white"
            px={3}
            py={1}
            borderRadius="full"
            fontSize="xs"
            fontWeight="semibold"
          >
            {category}
          </Badge>
        </Flex>

        {/* Изображение продукта */}
        <Box
          position="relative"
          mb={4}
          display="flex"
          justifyContent="center"
          alignItems="center"
          height="150px"
          flex="0 0 auto"
          zIndex={1}
        >
          <motion.div
            whileHover={{ scale: 1.1, rotate: 5 }}
            transition={{ duration: 0.3 }}
            style={{
              fontSize: '6rem',
              filter: 'drop-shadow(0 8px 16px rgba(236, 72, 153, 0.3))',
            }}
          >
            {emoji}
          </motion.div>
        </Box>

        {/* Информация о продукте */}
        <VStack spacing={4} align="stretch" position="relative" zIndex={1} flex="1" justify="space-between">
          {/* Основная информация */}
          <VStack spacing={2} align="stretch">
            <Text
              fontSize="sm"
              color="pink.300"
              fontWeight="medium"
              textTransform="uppercase"
              letterSpacing="wide"
            >
              {category}
            </Text>

            <Text
              fontSize="lg"
              fontWeight="semibold"
              color="white"
              lineHeight="1.4"
              noOfLines={2}
              minHeight="2.4em"
            >
              {product.name}
            </Text>

            {/* Описание */}
            <Text
              fontSize="sm"
              color="gray.300"
              lineHeight="1.4"
              noOfLines={2}
              minHeight="2.4em"
            >
              {product.description || 'Прекрасная цветочная композиция'}
            </Text>

            {/* Цена */}
            <HStack spacing={3} align="baseline">
              <Text
                fontSize="xl"
                fontWeight="bold"
                color="white"
              >
                {product.price.toLocaleString()} ₽
              </Text>
            </HStack>
          </VStack>

          {/* Кнопка действия */}
          <motion.div whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }}>
            <Button
              w="full"
              bgGradient="linear(to-r, pink.400, purple.500)"
              color="white"
              _hover={{
                bgGradient: "linear(to-r, pink.500, purple.600)",
                transform: 'translateY(-2px)',
                boxShadow: '0 8px 25px rgba(236, 72, 153, 0.3)',
              }}
              _active={{
                transform: 'translateY(0)',
              }}
              fontWeight="semibold"
              letterSpacing="wide"
            >
              В корзину
            </Button>
          </motion.div>
        </VStack>

        {/* Фоновые эффекты */}
        <motion.div
          style={{
            position: 'absolute',
            top: '50%',
            left: '50%',
            width: '100px',
            height: '100px',
            background: 'radial-gradient(circle, rgba(236, 72, 153, 0.1), transparent)',
            borderRadius: '50%',
            filter: 'blur(20px)',
            transform: 'translate(-50%, -50%)',
            zIndex: 0,
          }}
          animate={{
            scale: [1, 1.2, 1],
            opacity: [0.3, 0.6, 0.3],
          }}
          transition={{
            duration: 4,
            repeat: Infinity,
            ease: "easeInOut",
          }}
        />
      </Box>
    </motion.div>
  );
};

export default ProductCard;
