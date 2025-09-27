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
  Icon,
  useColorModeValue,
} from '@chakra-ui/react';
import { motion } from 'framer-motion';
import { FaHeart, FaTrash, FaShoppingCart } from 'react-icons/fa';
import { FiHome } from 'react-icons/fi';
import { useRouter } from 'next/navigation';
import { useFavourites, FavouriteProduct } from '../hooks/useFavourites';
import { useCart } from '../hooks/useCart';
import FlowerBackground from '../components/FlowerBackground';

const FavouritesPage: React.FC = () => {
  const router = useRouter();
  const { favouriteProducts, isLoading, removeFromFavourites } = useFavourites();
  const { addToCart } = useCart();
  const toast = useToast();

  const primaryColor = 'pink.500';
  const secondaryColor = 'purple.500';
  const borderColor = useColorModeValue('pink.200', 'pink.600');

  // Определяем эмодзи на основе названия продукта
  const getEmoji = (productName: string) => {
    const name = productName.toLowerCase();
    if (name.includes('роза') || name.includes('роз')) return '🌹';
    if (name.includes('тюльпан')) return '🌷';
    if (name.includes('орхидея') || name.includes('орхид')) return '🌺';
    if (name.includes('подсолнух') || name.includes('нарцисс')) return '🌻';
    if (name.includes('пион')) return '🌸';
    return '🌸';
  };

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
      <Box 
        minH="100vh" 
        bg="gray.900"
        position="relative"
        overflow="hidden"
      >
        <FlowerBackground />
        <Center minH="100vh" position="relative" zIndex={1}>
          <Spinner size="xl" color="pink.400" />
        </Center>
      </Box>
    );
  }

  return (
    <Box 
      minH="100vh" 
      bg="gray.900" 
      position="relative"
      overflow="hidden"
    >
      <FlowerBackground />

      <motion.div
        style={{
          position: 'absolute',
          top: '10%',
          left: '10%',
          width: '200px',
          height: '200px',
          background: `radial-gradient(circle, ${primaryColor}20, transparent)`,
          borderRadius: '50%',
          pointerEvents: 'none',
        }}
        animate={{
          opacity: [0.5, 1, 0.5],
          scale: [1, 1.1, 1],
        }}
        transition={{
          duration: 3,
          repeat: Infinity,
          ease: "easeInOut"
        }}
      />
      <motion.div
        style={{
          position: 'absolute',
          top: '60%',
          right: '10%',
          width: '150px',
          height: '150px',
          background: `radial-gradient(circle, ${secondaryColor}20, transparent)`,
          borderRadius: '50%',
          pointerEvents: 'none',
        }}
        animate={{
          opacity: [0.5, 1, 0.5],
          scale: [1, 1.1, 1],
        }}
        transition={{
          duration: 3,
          repeat: Infinity,
          ease: "easeInOut"
        }}
      />

      <Container maxW="container.xl" py={8} position="relative" zIndex={1}>
        {/* Иконка дома в левом углу */}
        <Box position="absolute" top={4} left={4} zIndex={2}>
          <Button
            leftIcon={<Icon as={FiHome} />}
            onClick={() => router.push('/')}
            size="sm"
            variant="ghost"
            color="white"
            _hover={{
              bg: "rgba(255, 255, 255, 0.15)",
              color: secondaryColor,
              transform: "scale(1.05)"
            }}
            _active={{
              transform: "scale(0.95)"
            }}
            transition="all 0.2s ease"
            borderRadius="full"
            backdropFilter="blur(8px)"
            bg="rgba(255, 255, 255, 0.08)"
            border="1px solid rgba(255, 255, 255, 0.12)"
            boxShadow="0 2px 8px rgba(0, 0, 0, 0.1)"
          >
            На главную
          </Button>
        </Box>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          <Flex direction="column" align="center" mb={8}>
            <motion.div
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{ duration: 0.5, type: "spring" }}
            >
              <Box position="relative" mb={4}>
                <Text
                  fontSize="4xl"
                  fontWeight="bold"
                  bgGradient={`linear(to-r, ${primaryColor}, ${secondaryColor})`}
                  bgClip="text"
                  textAlign="center"
                >
                  ❃ Избранное
                </Text>
                <motion.div
                  style={{
                    position: 'absolute',
                    top: 0,
                    left: 0,
                    right: 0,
                    bottom: 0,
                    background: `linear-gradient(45deg, ${primaryColor}20, ${secondaryColor}20)`,
                    borderRadius: '10px',
                    filter: 'blur(20px)',
                    zIndex: -1,
                  }}
                  animate={{
                    opacity: [0.5, 1, 0.5],
                    scale: [1, 1.1, 1],
                  }}
                  transition={{
                    duration: 3,
                    repeat: Infinity,
                    ease: "easeInOut"
                  }}
                />
              </Box>
            </motion.div>

            <Badge
              bgGradient='linear(to-l, #fd5bacff, #8e48d3ff )'
              variant="subtle"
              px={4}
              py={1.5}
              borderRadius="full"
              fontSize="sm"
              color={'white'}
              fontWeight="semibold"
              letterSpacing="wide"
            >
              Ваши любимые цветы
            </Badge>
          </Flex>

          <Box
            bg="rgba(255, 255, 255, 0.01)"
            backdropFilter="blur(3.5px)"
            p={8}
            borderRadius="2xl"
            boxShadow="0 20px 40px rgba(0, 0, 0, 0.35)"
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
              padding: '0.8px',
              background: 'linear-gradient(49deg, #830202ff, #8b0f8fff, #48038dff, #fd75c4ff)',
              WebkitMask: 'linear-gradient(#fff 0 0) content-box, linear-gradient(#fff 0 0)',
              WebkitMaskComposite: 'xor',
              maskComposite: 'exclude',
              zIndex: 0
            }}
          >
            <Box position="relative" zIndex={1}>
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
                      transform: 'translateY(-2px)',
                      boxShadow: '0 8px 25px rgba(236, 72, 153, 0.3)',
                    }}
                    _active={{
                      transform: 'translateY(0)',
                    }}
                    onClick={() => router.push('/home')}
                    size="lg"
                    fontWeight="semibold"
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
                      bg="rgba(255, 255, 255, 0.05)"
                      backdropFilter="blur(10px)"
                      borderRadius="2xl"
                      p={6}
                      border="1px solid rgba(255, 255, 255, 0.1)"
                      position="relative"
                      overflow="hidden"
                      _hover={{
                        bg: "rgba(255, 255, 255, 0.08)",
                        borderColor: "rgba(236, 72, 153, 0.3)",
                        transform: "translateY(-2px)",
                        boxShadow: "0 8px 25px rgba(236, 72, 153, 0.2)",
                      }}
                      transition="all 0.3s ease"
                    >
                      <Flex justify="flex-end" mb={4}>
                        <IconButton
                          aria-label="Убрать из избранного"
                          icon={<FaTrash />}
                          size="sm"
                          variant="ghost"
                          color="red.400"
                          _hover={{
                            bg: 'rgba(239, 68, 68, 0.1)',
                            color: 'red.300',
                            transform: 'scale(1.1)',
                          }}
                          transition="all 0.2s ease"
                          onClick={() => handleRemoveFromFavourites(product.productId)}
                        />
                      </Flex>

                      <Box
                        mb={4}
                        display="flex"
                        justifyContent="center"
                        alignItems="center"
                        height="150px"
                        flex="0 0 auto"
                      >
                        {product.productImage ? (
                          <Image
                            src={product.productImage}
                            alt={product.productName}
                            borderRadius="lg"
                            maxH="100%"
                            maxW="100%"
                            objectFit="cover"
                            border="2px solid"
                            borderColor="rgba(236, 72, 153, 0.2)"
                          />
                        ) : (
                          <motion.div
                            whileHover={{ scale: 1.1, rotate: 5 }}
                            transition={{ duration: 0.3 }}
                            style={{
                              fontSize: '4rem',
                              filter: 'drop-shadow(0 8px 16px rgba(236, 72, 153, 0.3))',
                            }}
                          >
                            {getEmoji(product.productName)}
                          </motion.div>
                        )}
                      </Box>

                      <VStack spacing={4} align="stretch">
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

                        <Button
                          width="100%"
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
                      </VStack>
                    </Box>
                  </motion.div>
                ))}
                </SimpleGrid>
              )}
            </Box>
          </Box>
        </motion.div>
      </Container>
    </Box>
  );
};

export default FavouritesPage;
