'use client';
import React from 'react';
import {
  Box,
  Container,
  Heading,
  Text,
  VStack,
  HStack,
  SimpleGrid,
  Button,
  IconButton,
  Image,
  Badge,
  Flex,
  useToast,
  Spinner,
  Center,
} from '@chakra-ui/react';
import { motion } from 'framer-motion';
import { FaHeart, FaTrash, FaShoppingCart } from 'react-icons/fa';
import { useRouter } from 'next/navigation';
import { useFavourites, FavouriteProduct } from '../hooks/useFavourites';
import { useCart } from '../hooks/useCart';

const FavouritesPage: React.FC = () => {
  const router = useRouter();
  const { favouriteProducts, isLoading, removeFromFavourites } = useFavourites();
  const { addToCart } = useCart();
  const toast = useToast();

  // Проверка авторизации
  React.useEffect(() => {
    const token = localStorage.getItem('token');
    if (!token) {
      toast({
        title: 'Доступ запрещен',
        description: 'Необходимо войти в систему',
        status: 'error',
        duration: 3000,
        isClosable: true,
      });
      router.push('/login');
    }
  }, [router, toast]);

  // Обработка удаления из избранного
  const handleRemoveFromFavourites = async (productId: number) => {
    const success = await removeFromFavourites(productId);
    if (success) {
      toast({
        title: 'Удалено из избранного',
        description: 'Товар удален из избранного',
        status: 'success',
        duration: 2000,
        isClosable: true,
      });
    }
  };

  // Обработка добавления в корзину
  const handleAddToCart = (product: FavouriteProduct) => {
    const productData = {
      id: product.productId,
      name: product.productName,
      description: product.productDescription || '',
      price: product.productPrice?.toString() || '0',
      imageUrl: product.productImage || '',
      shopName: 'Магазин цветов',
    };
    
    addToCart(productData);
    toast({
      title: 'Добавлено в корзину',
      description: `${product.productName} добавлен в корзину`,
      status: 'success',
      duration: 2000,
      isClosable: true,
    });
  };

  if (isLoading) {
    return (
      <Center minH="100vh">
        <Spinner size="xl" color="pink.400" />
      </Center>
    );
  }

  return (
    <Box minH="100vh" bg="linear-gradient(135deg, #667eea 0%, #764ba2 100%)" pt="80px">
      <Container maxW="7xl" py={8}>
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          <VStack spacing={8} align="stretch">
            {/* Заголовок */}
            <Box textAlign="center">
              <Heading
                as="h1"
                size="2xl"
                color="white"
                mb={4}
                bgGradient="linear(to-r, pink.300, purple.300)"
                bgClip="text"
              >
                ❃ Избранное
              </Heading>
              <Text color="gray.200" fontSize="lg">
                Ваши любимые цветочные композиции
              </Text>
            </Box>

            {/* Кнопка возврата */}
            <Flex justify="center">
              <Button
                variant="ghost"
                color="white"
                _hover={{ bg: 'rgba(255, 255, 255, 0.1)' }}
                onClick={() => router.push('/home')}
                size="lg"
              >
                ← Вернуться на главную
              </Button>
            </Flex>

            {/* Список избранных товаров */}
            {favouriteProducts.length === 0 ? (
              <Box textAlign="center" py={16}>
                <Text color="gray.300" fontSize="xl" mb={4}>
                  У вас пока нет избранных товаров
                </Text>
                <Button
                  bgGradient="linear(to-r, pink.400, purple.500)"
                  color="white"
                  _hover={{
                    bgGradient: 'linear(to-r, pink.500, purple.600)',
                  }}
                  onClick={() => router.push('/home')}
                  size="lg"
                >
                  Перейти к каталогу
                </Button>
              </Box>
            ) : (
              <SimpleGrid columns={{ base: 1, md: 2, lg: 3 }} spacing={6}>
                {favouriteProducts.map((product) => (
                  <motion.div
                    key={product.id}
                    whileHover={{ y: -5 }}
                    transition={{ duration: 0.3 }}
                  >
                    <Box
                      bg="rgba(255, 255, 255, 0.1)"
                      backdropFilter="blur(10px)"
                      borderRadius="2xl"
                      p={6}
                      border="1px solid rgba(255, 255, 255, 0.2)"
                      position="relative"
                      overflow="hidden"
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
                      {/* Кнопка удаления из избранного */}
                      <Flex justify="flex-end" mb={4} position="relative" zIndex={1}>
                        <IconButton
                          aria-label="Убрать из избранного"
                          icon={<FaTrash />}
                          size="sm"
                          variant="ghost"
                          color="red.400"
                          _hover={{
                            bg: 'rgba(255, 0, 0, 0.1)',
                            color: 'red.300',
                            transform: 'scale(1.1)',
                          }}
                          transition="all 0.2s ease"
                          onClick={() => handleRemoveFromFavourites(product.productId)}
                        />
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
                        {product.productImage ? (
                          <Image
                            src={product.productImage}
                            alt={product.productName}
                            borderRadius="lg"
                            maxH="100%"
                            maxW="100%"
                            objectFit="cover"
                          />
                        ) : (
                          <Box
                            fontSize="4rem"
                            color="pink.300"
                            filter="drop-shadow(0 4px 8px rgba(236, 72, 153, 0.3))"
                          >
                            🌸
                          </Box>
                        )}
                      </Box>

                      {/* Информация о продукте */}
                      <VStack spacing={4} align="stretch" position="relative" zIndex={1}>
                        <Text
                          fontSize="lg"
                          fontWeight="semibold"
                          color="white"
                          lineHeight="1.4"
                          noOfLines={2}
                          minHeight="2.4em"
                        >
                          {product.productName}
                        </Text>

                        {product.productDescription && (
                          <Text
                            fontSize="sm"
                            color="gray.300"
                            lineHeight="1.4"
                            noOfLines={2}
                            minHeight="2.4em"
                          >
                            {product.productDescription}
                          </Text>
                        )}

                        {/* Цена */}
                        <HStack justify="space-between" align="center">
                          <Text
                            fontSize="xl"
                            fontWeight="bold"
                            color="white"
                          >
                            {product.productPrice?.toLocaleString()} ₽
                          </Text>
                          
                          <Badge
                            bgGradient="linear(to-r, pink.400, purple.500)"
                            color="white"
                            px={3}
                            py={1}
                            borderRadius="full"
                            fontSize="xs"
                            fontWeight="semibold"
                          >
                            В избранном
                          </Badge>
                        </HStack>

                        {/* Кнопки действий */}
                        <HStack spacing={3}>
                          <Button
                            flex={1}
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
                            leftIcon={<FaShoppingCart />}
                            onClick={() => handleAddToCart(product)}
                          >
                            В корзину
                          </Button>
                        </HStack>
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
                ))}
              </SimpleGrid>
            )}
          </VStack>
        </motion.div>
      </Container>
    </Box>
  );
};

export default FavouritesPage;
