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
  IconButton,
  Tooltip,
} from '@chakra-ui/react';
import { motion } from 'framer-motion';
import { FaHeart, FaRegHeart } from 'react-icons/fa';
import { Product } from '../../../services/api';
import { useCart } from '../../hooks/useCart';
import { useFavourites } from '../../hooks/useFavourites';

interface ProductCardProps {
  product: Product;
}

const ProductCard: React.FC<ProductCardProps> = ({ product }) => {
  const { addToCart } = useCart();
  const { isFavourite, toggleFavourite } = useFavourites();

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

  // Функция добавления товара в корзину
  const handleAddToCart = () => {
    addToCart(product);
  };

  // Функция переключения избранного
  const handleToggleFavourite = async () => {
    await toggleFavourite(product);
  };

  const category = getCategory();
  const emoji = getEmoji();
  const favourite = isFavourite(product.id);

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
        {/* Бейджи и кнопка избранного */}
        <Flex justify="space-between" mb={4} position="relative" zIndex={1}>
          <motion.div
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            transition={{ duration: 0.2 }}
          >
            <Box
              bg="linear-gradient(135deg, #ec4899, #8b5cf6)"
              color="white"
              px={3}
              py={1.5}
              borderRadius="full"
              fontSize="xs"
              fontWeight="bold"
              boxShadow="0 2px 8px rgba(236, 72, 153, 0.4)"
              transition="all 0.2s ease"
              display="inline-block"
              textAlign="center"
              minW="fit-content"
              position="relative"
              overflow="hidden"
              _before={{
                content: '""',
                position: 'absolute',
                top: 0,
                left: '-100%',
                width: '100%',
                height: '100%',
                background: 'linear-gradient(90deg, transparent, rgba(255,255,255,0.2), transparent)',
                transition: 'left 0.5s ease',
              }}
              _hover={{
                boxShadow: '0 4px 12px rgba(236, 72, 153, 0.6)',
                _before: {
                  left: '100%',
                }
              }}
            >
              {category}
            </Box>
          </motion.div>
          
          {/* Кнопка избранного */}
          <Tooltip 
            label={favourite ? "Убрать из избранного" : "Добавить в избранное"}
            placement="top"
            hasArrow
          >
            <IconButton
              aria-label={favourite ? "Убрать из избранного" : "Добавить в избранное"}
              icon={favourite ? (
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none">
                  <defs>
                    <linearGradient id={`heartGradient-${product.id}`} x1="0%" y1="0%" x2="100%" y2="100%">
                      <stop offset="0%" stopColor="#ec4899" />
                      <stop offset="100%" stopColor="#8b5cf6" />
                    </linearGradient>
                  </defs>
                  <FaHeart size={20} fill={`url(#heartGradient-${product.id})`} />
                </svg>
              ) : <FaRegHeart size={20} />}
              size="lg"
              variant="ghost"
              color={favourite ? "transparent" : "white"}
              bg={favourite ? "transparent" : "transparent"}
              _hover={{
                bg: 'rgba(255, 255, 255, 0.1)',
                transform: 'scale(1.1)',
              }}
              _active={{
                transform: 'scale(0.95)',
              }}
              transition="all 0.2s ease"
              onClick={handleToggleFavourite}
              position="relative"
              zIndex={2}
              sx={{
                '& svg': {
                  filter: favourite ? 'drop-shadow(0 2px 8px rgba(236, 72, 153, 0.6))' : 'none',
                }
              }}
            />
          </Tooltip>
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
                {parseFloat(product.price).toLocaleString()} ₽
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
              onClick={handleAddToCart}
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
