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
  Card,
  CardBody,
  CardHeader,
  Heading,
  Stack,
  Icon,
  useDisclosure,
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalCloseButton,
  HStack,
  Divider,
} from '@chakra-ui/react';
import { motion } from 'framer-motion';
import { FaStore, FaPhone, FaMapMarkerAlt, FaEye } from 'react-icons/fa';
import LoadingSpinner from './LoadingSpinner';
import ErrorMessage from './ErrorMessage';
import { apiService, Shop } from '../../../services/api';
import ShopProducts from './ShopProducts';

const ShopsSection: React.FC = () => {
  const [shops, setShops] = useState<Shop[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [selectedShop, setSelectedShop] = useState<Shop | null>(null);
  const { isOpen, onOpen, onClose } = useDisclosure();

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

  // Загружаем данные магазинов
  useEffect(() => {
    const loadShops = async () => {
             try {
         setLoading(true);
         setError(null);
         const shopsData = await apiService.getShops();
         setShops(shopsData);
       } catch (err) {
         console.error('Ошибка загрузки магазинов:', err);
         setError(`Ошибка при загрузке магазинов: ${(err as Error).message}`);
       } finally {
        setLoading(false);
      }
    };

    loadShops();
  }, []);

  const handleShopClick = (shop: Shop) => {
    setSelectedShop(shop);
    onOpen();
  };

  // Показываем спиннер во время загрузки
  if (loading) {
    return <LoadingSpinner message="Загружаем магазины..." />;
  }

  // Показываем сообщение об ошибке
  if (error) {
    return (
      <ErrorMessage 
        message={error} 
        onRetry={() => {
          setError(null);
          setLoading(true);
          apiService.getShops()
            .then(setShops)
            .catch(err => setError('Ошибка при загрузке магазинов'))
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
      

      {/* Фоновые эффекты */}
      <motion.div
        style={{
          position: 'absolute',
          top: '10%',
          right: '10%',
          width: '200px',
          height: '200px',
          background: 'radial-gradient(circle, rgba(147, 51, 234, 0.05), transparent)',
          borderRadius: '50%',
          filter: 'blur(30px)',
        }}
        animate={{
          scale: [1, 1.2, 1],
          opacity: [0.2, 0.4, 0.2],
        }}
        transition={{
          duration: 6,
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
                  bgGradient="linear(to-r, purple.400, blue.500)"
                  color="white"
                  px={4}
                  py={2}
                  borderRadius="full"
                  fontSize="sm"
                  fontWeight="semibold"
                  letterSpacing="wide"
                >
                  🏪 Наши магазины
                </Badge>
                
                <Text
                  fontSize={{ base: '3xl', md: '4xl', lg: '5xl' }}
                  fontWeight="bold"
                  bgGradient="linear(to-r, white, purple.100)"
                  bgClip="text"
                  textShadow="0 4px 8px rgba(0,0,0,0.3)"
                >
                  Выбирайте из
                  <br />
                  <Text
                    as="span"
                    bgGradient="linear(to-r, purple.400, blue.500)"
                    bgClip="text"
                  >
                    лучших магазинов
                  </Text>
                </Text>
                
                <Text
                  fontSize={{ base: 'lg', md: 'xl' }}
                  color="gray.300"
                  maxW="600px"
                  lineHeight="1.6"
                >
                  Каждый магазин предлагает уникальную коллекцию букетов и композиций. 
                  Найдите свой идеальный цветочный магазин.
                </Text>
              </VStack>
            </motion.div>

            {/* Сетка магазинов */}
            <motion.div variants={itemVariants}>
              <SimpleGrid
                columns={{ base: 1, md: 2, lg: 3 }}
                spacing={8}
                w="full"
                alignItems="stretch"
              >
                {shops.map((shop, index) => (
                  <motion.div
                    key={shop.id}
                    initial={{ opacity: 0, y: 50 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true, amount: 0.3 }}
                    transition={{ delay: index * 0.1 }}
                  >
                    <Card
                      bg="rgba(255, 255, 255, 0.05)"
                      backdropFilter="blur(10px)"
                      border="1px solid rgba(255, 255, 255, 0.1)"
                      borderRadius="xl"
                      overflow="hidden"
                      transition="all 0.3s ease"
                      height="100%"
                      _hover={{
                        transform: 'translateY(-5px)',
                        boxShadow: '0 20px 40px rgba(0, 0, 0, 0.3)',
                        borderColor: 'purple.300',
                      }}
                    >
                      <CardHeader pb={4}>
                        <HStack spacing={3}>
                          <Icon as={FaStore} color="purple.300" boxSize={5} />
                          <Heading size="md" color="white">
                            {shop.name}
                          </Heading>
                        </HStack>
                      </CardHeader>
                      
                      <CardBody pt={0}>
                        <VStack spacing={4} align="stretch">
                          <Text color="gray.300" fontSize="sm">
                            {shop.description}
                          </Text>
                          
                          <Stack spacing={2}>
                            <HStack spacing={2}>
                              <Icon as={FaMapMarkerAlt} color="purple.300" boxSize={4} />
                              <Text color="gray.400" fontSize="sm">
                                {shop.address}
                              </Text>
                            </HStack>
                            
                            <HStack spacing={2}>
                              <Icon as={FaPhone} color="purple.300" boxSize={4} />
                              <Text color="gray.400" fontSize="sm">
                                {shop.phone}
                              </Text>
                            </HStack>
                          </Stack>
                          
                          <Divider borderColor="rgba(255, 255, 255, 0.1)" />
                          
                          <Button
                            leftIcon={<FaEye />}
                            colorScheme="purple"
                            variant="outline"
                            size="sm"
                            onClick={() => handleShopClick(shop)}
                            _hover={{
                              bg: 'purple.500',
                              color: 'white',
                            }}
                          >
                            Посмотреть товары
                          </Button>
                        </VStack>
                      </CardBody>
                    </Card>
                  </motion.div>
                ))}
              </SimpleGrid>
            </motion.div>
          </VStack>
        </motion.div>
      </Container>

      {/* Модальное окно с товарами магазина */}
      <Modal isOpen={isOpen} onClose={onClose} size="6xl">
        <ModalOverlay backdropFilter="blur(10px)" />
        <ModalContent
          bg="rgba(0, 0, 0, 0.9)"
          backdropFilter="blur(20px)"
          border="1px solid rgba(255, 255, 255, 0.1)"
          borderRadius="xl"
        >
          <ModalHeader color="white">
            {selectedShop?.name}
          </ModalHeader>
          <ModalCloseButton color="white" />
          <ModalBody pb={6}>
            {selectedShop && (
              <ShopProducts shopId={selectedShop.id} shopName={selectedShop.name} />
            )}
          </ModalBody>
        </ModalContent>
      </Modal>
    </Box>
  );
};

export default ShopsSection;

