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
} from '@chakra-ui/react';
import { motion } from 'framer-motion';
import { FiHome } from 'react-icons/fi';
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

const ProfilePage: React.FC = () => {
  const router = useRouter();
  const toast = useToast();
  const [userData, setUserData] = useState<UserData | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

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
        address: payload.address || '',
      };

      // Если есть ID пользователя, пытаемся загрузить полный профиль через API
      if (user.id) {
        try {
          const token = localStorage.getItem('token');
          if (token) {
            const profileData = await apiService.getUserProfile(user.id, token);
            // Обновляем данные из API
            user.firstName = profileData.firstName;
            user.lastName = profileData.lastName;
            user.phone = profileData.phone;
            user.address = profileData.address;
          }
        } catch (apiError) {
          console.warn('Не удалось загрузить профиль через API, используем данные из JWT:', apiError);
          // Продолжаем с данными из JWT
        }
      }
      
      setUserData(user);
      setIsLoading(false);
    } catch (error) {
      console.error('Ошибка загрузки данных пользователя:', error);
      setError('Не удалось загрузить данные пользователя');
      setIsLoading(false);
    }
  };

  const handleProfileUpdate = async (updatedData: Partial<UserData>) => {
    try {
      // Обновляем локальное состояние
      setUserData(prev => prev ? { ...prev, ...updatedData } : null);
      
      toast({
        title: 'Профиль обновлен',
        description: 'Ваши данные успешно сохранены',
        status: 'success',
        duration: 3000,
        isClosable: true,
      });
    } catch (error) {
      console.error('Ошибка обновления профиля:', error);
      toast({
        title: 'Ошибка',
        description: 'Не удалось обновить профиль',
        status: 'error',
        duration: 3000,
        isClosable: true,
      });
    }
  };

  if (isLoading) {
    return (
      <Box minH="100vh" display="flex" alignItems="center" justifyContent="center">
        <Spinner size="xl" color="pink.500" />
      </Box>
    );
  }

  if (error) {
    return (
      <Container maxW="container.md" py={10}>
        <Alert status="error">
          <AlertIcon />
          {error}
        </Alert>
      </Container>
    );
  }

  if (!userData) {
    return (
      <Container maxW="container.md" py={10}>
        <Alert status="warning">
          <AlertIcon />
          Пользователь не найден
        </Alert>
      </Container>
    );
  }

  return (
    <Box minH="100vh" bg="gray.50" pt={20}>
      <Container maxW="container.xl" py={8}>
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          {/* Заголовок профиля */}
          <VStack spacing={6} mb={8}>
            <HStack spacing={4} alignSelf="flex-start" w="full" justify="space-between">
              <Button
                leftIcon={<Icon as={FiHome} />}
                colorScheme="pink"
                variant="outline"
                onClick={() => router.push('/')}
                size="md"
              >
                На главную
              </Button>
            </HStack>
            
            <Avatar 
              size="2xl" 
              name={`${userData.firstName} ${userData.lastName}`}
              bg="pink.500"
              color="white"
            />
            <VStack spacing={2}>
              <Text fontSize="2xl" fontWeight="bold" color="gray.800">
                {userData.firstName} {userData.lastName}
              </Text>
              <Text fontSize="md" color="gray.600">
                {userData.email}
              </Text>
            </VStack>
          </VStack>

          {/* Табы для навигации */}
          <Tabs variant="enclosed" colorScheme="pink">
            <TabList>
              <Tab>Личные данные</Tab>
              <Tab>История заказов</Tab>
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
        </motion.div>
      </Container>
    </Box>
  );
};

export default ProfilePage;
