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
  Tabs,
  TabList,
  TabPanels,
  Tab,
  TabPanel,
  Avatar,
  Divider,
  Spinner,
  Alert,
  AlertIcon,
  Icon,
  useColorModeValue,
  Flex,
  Badge,
} from '@chakra-ui/react';
import { motion } from 'framer-motion';
import { FiHome } from 'react-icons/fi';
import FlowerBackground from '../components/FlowerBackground';
import UserProfileForm from './components/UserProfileForm';
import OrderHistory from './components/OrderHistory';
import { apiService } from '../../services/api';

interface UserData {
  id: number;
  email: string;
  firstName: string;
  lastName: string;
  phone?: string;
  address?: string;
}

// Интерфейс для данных, возвращаемых API (с полем city)
interface ApiUserData {
  id: number;
  email: string;
  firstName: string;
  lastName: string;
  phone?: string;
  city?: string;
}

const ProfilePage: React.FC = () => {
  const router = useRouter();
  const toast = useToast();
  const [userData, setUserData] = useState<UserData | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  // Цвета для цветочной темы (как в форме входа)
  const primaryColor = 'pink.500';
  const secondaryColor = 'purple.500';
  const borderColor = useColorModeValue('pink.200', 'pink.600');

  useEffect(() => {
    checkAuthAndLoadUser();
  }, []);

  const checkAuthAndLoadUser = async () => {
    try {
      const token = localStorage.getItem('token');
      if (!token) {
        router.push('/login');
        return;
      }

      // Декодируем JWT для получения данных пользователя
      const payload = parseJwt(token);
      if (!payload || !payload.sub) {
        router.push('/login');
        return;
      }

      // Загружаем данные пользователя
      await loadUserData(payload);
    } catch (error) {
      console.error('Ошибка проверки авторизации:', error);
      router.push('/login');
    }
  };

  const parseJwt = (token: string): any | null => {
    try {
      const base64Url = token.split('.')[1];
      const base64 = base64Url.replace(/-/g, '+').replace(/_/g, '/');
      const jsonPayload = decodeURIComponent(
        atob(base64)
          .split('')
          .map((c) => '%' + ('00' + c.charCodeAt(0).toString(16)).slice(-2))
          .join(''),
      );
      return JSON.parse(jsonPayload);
    } catch {
      return null;
    }
  };

  const loadUserData = async (payload: any) => {
    try {
      // Сначала создаем базовый объект с данными из JWT
      const user: UserData = {
        id: payload.sub || 0,
        email: payload.email || '',
        firstName: payload.firstName || '',
        lastName: payload.lastName || '',
        phone: payload.phone || '',
        address: payload.city || '', // В JWT может быть city, маппим в address
      };

      // Если есть ID пользователя, загружаем полный профиль через API
      if (user.id) {
        const token = localStorage.getItem('token');
        if (token) {
          const profileData = await apiService.getUserProfile(user.id, token);
          // Обновляем данные из API
          user.firstName = profileData.firstName;
          user.lastName = profileData.lastName;
          user.phone = profileData.phone;
          user.address = profileData.city; // API возвращает city, маппим в address
        }
      }
      
      setUserData(user);
      setIsLoading(false);
    } catch (error) {
      console.error('Ошибка загрузки данных пользователя:', error);
      setError('Не удалось загрузить данные пользователя. Проверьте подключение к интернету и попробуйте еще раз.');
      setIsLoading(false);
    }
  };

  const handleProfileUpdate = async (updatedData: Partial<ApiUserData>) => {
    try {
      // Преобразуем данные из API (city -> address) для локального состояния
      const transformedData = {
        ...updatedData,
        address: updatedData.city, // API возвращает city, маппим в address
      };
      
      // Обновляем локальное состояние с данными, возвращенными из API
      setUserData(prev => prev ? { ...prev, ...transformedData } : null);
      
      toast({
        title: 'Профиль обновлен',
        description: 'Ваши данные успешно сохранены на сервере',
        status: 'success',
        duration: 3000,
        isClosable: true,
      });
    } catch (error) {
      console.error('Ошибка обновления профиля:', error);
      toast({
        title: 'Ошибка',
        description: 'Не удалось обновить профиль. Попробуйте еще раз.',
        status: 'error',
        duration: 3000,
        isClosable: true,
      });
    }
  };

  if (isLoading) {
    return (
      <Box 
        minH="100vh" 
        bg="gray.900"
        display="flex" 
        alignItems="center" 
        justifyContent="center"
        position="relative"
        overflow="hidden"
      >
        <FlowerBackground />
        <Spinner size="xl" color={primaryColor} />
      </Box>
    );
  }

  if (error) {
    return (
      <Box 
        minH="100vh" 
        bg="gray.900"
        position="relative"
        overflow="hidden"
      >
        <FlowerBackground />
        <Container maxW="container.md" py={10} position="relative" zIndex={1}>
          <Alert status="error">
            <AlertIcon />
            {error}
          </Alert>
        </Container>
      </Box>
    );
  }

  if (!userData) {
    return (
      <Box 
        minH="100vh" 
        bg="gray.900"
        position="relative"
        overflow="hidden"
      >
        <FlowerBackground />
        <Container maxW="container.md" py={10} position="relative" zIndex={1}>
          <Alert status="warning">
            <AlertIcon />
            Пользователь не найден
          </Alert>
        </Container>
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

      {/* Glow эффекты как в форме входа */}
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
          {/* Заголовок профиля */}
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
                  ❃ Профиль
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
              Личный кабинет
            </Badge>
          </Flex>

          {/* Основной контент профиля */}
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
            {/* Контейнер для содержимого */}
            <Box position="relative" zIndex={1}>
              {/* Информация о пользователе */}
              <VStack spacing={6} mb={8}>
                <Avatar 
                  size="2xl" 
                  name={`${userData.firstName} ${userData.lastName}`}
                  bg={primaryColor}
                  color="white"
                  border="4px solid"
                  borderColor={borderColor}
                  boxShadow="0 8px 25px rgba(236, 72, 153, 0.3)"
                />
                <VStack spacing={2}>
                  <Text 
                    fontSize="2xl" 
                    fontWeight="bold" 
                    color="white"
                    textShadow="0 1px 2px rgba(0,0,0,0.5)"
                  >
                    {userData.firstName} {userData.lastName}
                  </Text>
                  <Text 
                    fontSize="md" 
                    color="gray.300"
                    textShadow="0 1px 2px rgba(0,0,0,0.5)"
                  >
                    {userData.email}
                  </Text>
                </VStack>
              </VStack>

              {/* Табы для навигации */}
              <Tabs variant="enclosed" colorScheme="pink">
                <TabList 
                  bg="rgba(255, 255, 255, 0.05)"
                  borderRadius="lg"
                  p={1}
                  border="1px solid"
                  borderColor="rgba(255, 255, 255, 0.1)"
                >
                  <Tab 
                    color="white"
                    _selected={{
                      bg: primaryColor,
                      color: "white",
                      borderRadius: "md",
                      boxShadow: "0 4px 12px rgba(236, 72, 153, 0.3)"
                    }}
                    _hover={{
                      bg: "rgba(255, 255, 255, 0.1)"
                    }}
                  >
                    Личные данные
                  </Tab>
                  <Tab 
                    color="white"
                    _selected={{
                      bg: primaryColor,
                      color: "white",
                      borderRadius: "md",
                      boxShadow: "0 4px 12px rgba(236, 72, 153, 0.3)"
                    }}
                    _hover={{
                      bg: "rgba(255, 255, 255, 0.1)"
                    }}
                  >
                    История заказов
                  </Tab>
                </TabList>

                <TabPanels>
                  <TabPanel>
                    <UserProfileForm 
                      userData={userData} 
                      onUpdate={handleProfileUpdate} 
                    />
                  </TabPanel>
                  <TabPanel>
                    <OrderHistory userId={userData.id} />
                  </TabPanel>
                </TabPanels>
              </Tabs>
            </Box>
          </Box>
        </motion.div>
      </Container>
    </Box>
  );
};

export default ProfilePage;
