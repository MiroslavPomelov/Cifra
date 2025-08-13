'use client';
import React, { useState } from 'react';
import {
  Box,
  VStack,
  HStack,
  FormControl,
  FormLabel,
  Input,
  Button,
  Text,
  useToast,
  Card,
  CardBody,
  Divider,
  Icon,
} from '@chakra-ui/react';
import { motion } from 'framer-motion';
import { FiUser, FiMail, FiPhone, FiMapPin, FiSave } from 'react-icons/fi';
import { apiService } from '../../../services/api';

interface UserData {
  id: number;
  email: string;
  firstName: string;
  lastName: string;
  phone?: string;
  address?: string;
}

interface UserProfileFormProps {
  userData: UserData;
  onUpdate: (data: Partial<UserData>) => Promise<void>;
}

const UserProfileForm: React.FC<UserProfileFormProps> = ({ userData, onUpdate }) => {
  const toast = useToast();
  const [formData, setFormData] = useState({
    firstName: userData.firstName,
    lastName: userData.lastName,
    phone: userData.phone || '',
    address: userData.address || '',
  });
  const [isEditing, setIsEditing] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  // Функция для парсинга JWT токена
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

  const handleInputChange = (field: string, value: string) => {
    setFormData(prev => ({
      ...prev,
      [field]: value,
    }));
  };

  const handleEdit = () => {
    setIsEditing(true);
  };

  const handleCancel = () => {
    setFormData({
      firstName: userData.firstName,
      lastName: userData.lastName,
      phone: userData.phone || '',
      address: userData.address || '',
    });
    setIsEditing(false);
  };

  const handleSave = async () => {
    if (!formData.firstName.trim() || !formData.lastName.trim()) {
      toast({
        title: 'Ошибка валидации',
        description: 'Имя и фамилия обязательны для заполнения',
        status: 'error',
        duration: 3000,
        isClosable: true,
      });
      return;
    }

    setIsLoading(true);
    try {
      const token = localStorage.getItem('token');
      if (!token) {
        throw new Error('Токен не найден');
      }

      // Пытаемся обновить данные через API
      try {
        const updatedProfile = await apiService.updateUserProfile(
          userData.id,
          {
            firstName: formData.firstName,
            lastName: formData.lastName,
            phone: formData.phone,
            address: formData.address,
          },
          token
        );

        // Вызываем callback для обновления родительского компонента
        await onUpdate(updatedProfile);
        setIsEditing(false);
      } catch (apiError) {
        console.warn('API недоступен, сохраняем локально:', apiError);
        
        // Fallback: сохраняем данные локально
        const localProfile = {
          firstName: formData.firstName,
          lastName: formData.lastName,
          phone: formData.phone,
          address: formData.address,
        };

        // Обновляем JWT токен с новыми данными (если возможно)
        try {
          const payload = parseJwt(token);
          if (payload) {
            const updatedPayload = {
              ...payload,
              firstName: formData.firstName,
              lastName: formData.lastName,
              phone: formData.phone,
              address: formData.address,
            };
            
            // В реальном приложении здесь нужно было бы обновить токен через API
            // Пока просто сохраняем данные локально
            localStorage.setItem('userProfile', JSON.stringify(localProfile));
          }
        } catch (jwtError) {
          console.warn('Не удалось обновить JWT:', jwtError);
        }

        // Вызываем callback с локальными данными
        await onUpdate(localProfile);
        setIsEditing(false);

        toast({
          title: 'Данные сохранены локально',
          description: 'API недоступен. Данные сохранены в браузере.',
          status: 'warning',
          duration: 4000,
          isClosable: true,
        });
      }
    } catch (error) {
      console.error('Ошибка сохранения:', error);
      toast({
        title: 'Ошибка',
        description: 'Не удалось сохранить изменения. Проверьте подключение к интернету.',
        status: 'error',
        duration: 3000,
        isClosable: true,
      });
    } finally {
      setIsLoading(false);
    }
  };

  const isFormChanged = () => {
    return (
      formData.firstName !== userData.firstName ||
      formData.lastName !== userData.lastName ||
      formData.phone !== (userData.phone || '') ||
      formData.address !== (userData.address || '')
    );
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6 }}
    >
      <Card>
        <CardBody>
          <VStack spacing={6} align="stretch">
            {/* Заголовок */}
            <HStack justify="space-between" align="center">
              <Text fontSize="xl" fontWeight="bold" color="gray.800">
                Личные данные
              </Text>
              {!isEditing ? (
                <Button
                  leftIcon={<Icon as={FiUser} />}
                  colorScheme="pink"
                  variant="outline"
                  onClick={handleEdit}
                >
                  Редактировать
                </Button>
              ) : (
                <HStack spacing={3}>
                  <Button
                    variant="ghost"
                    onClick={handleCancel}
                    isDisabled={isLoading}
                  >
                    Отмена
                  </Button>
                  <Button
                    leftIcon={<Icon as={FiSave} />}
                    colorScheme="pink"
                    onClick={handleSave}
                    isLoading={isLoading}
                    isDisabled={!isFormChanged()}
                  >
                    Сохранить
                  </Button>
                </HStack>
              )}
            </HStack>

            <Divider />

            {/* Форма */}
            <VStack spacing={4} align="stretch">
              {/* Имя и Фамилия */}
              <HStack spacing={4}>
                <FormControl isRequired>
                  <FormLabel>
                    <HStack spacing={2}>
                      <Icon as={FiUser} color="pink.500" />
                      <Text>Имя</Text>
                    </HStack>
                  </FormLabel>
                  <Input
                    value={formData.firstName}
                    onChange={(e) => handleInputChange('firstName', e.target.value)}
                    placeholder="Введите имя"
                    isDisabled={!isEditing}
                    bg={isEditing ? 'white' : 'gray.50'}
                  />
                </FormControl>

                <FormControl isRequired>
                  <FormLabel>
                    <HStack spacing={2}>
                      <Icon as={FiUser} color="pink.500" />
                      <Text>Фамилия</Text>
                    </HStack>
                  </FormLabel>
                  <Input
                    value={formData.lastName}
                    onChange={(e) => handleInputChange('lastName', e.target.value)}
                    placeholder="Введите фамилию"
                    isDisabled={!isEditing}
                    bg={isEditing ? 'white' : 'gray.50'}
                  />
                </FormControl>
              </HStack>

              {/* Email (только для чтения) */}
              <FormControl>
                <FormLabel>
                  <HStack spacing={2}>
                    <Icon as={FiMail} color="pink.500" />
                    <Text>Email</Text>
                  </HStack>
                </FormLabel>
                <Input
                  value={userData.email}
                  isDisabled={true}
                  bg="gray.100"
                  color="gray.600"
                />
                <Text fontSize="sm" color="gray.500" mt={1}>
                  Email нельзя изменить
                </Text>
              </FormControl>

              {/* Телефон */}
              <FormControl>
                <FormLabel>
                  <HStack spacing={2}>
                    <Icon as={FiPhone} color="pink.500" />
                    <Text>Телефон</Text>
                  </HStack>
                </FormLabel>
                <Input
                  value={formData.phone}
                  onChange={(e) => handleInputChange('phone', e.target.value)}
                  placeholder="Введите номер телефона"
                  isDisabled={!isEditing}
                  bg={isEditing ? 'white' : 'gray.50'}
                  type="tel"
                />
              </FormControl>

              {/* Адрес */}
              <FormControl>
                <FormLabel>
                  <HStack spacing={2}>
                    <Icon as={FiMapPin} color="pink.500" />
                    <Text>Адрес доставки</Text>
                  </HStack>
                </FormLabel>
                <Input
                  value={formData.address}
                  onChange={(e) => handleInputChange('address', e.target.value)}
                  placeholder="Введите адрес доставки"
                  isDisabled={!isEditing}
                  bg={isEditing ? 'white' : 'gray.50'}
                />
              </FormControl>
            </VStack>

            {/* Информация */}
            {!isEditing && (
              <Box bg="blue.50" p={4} borderRadius="md" border="1px solid" borderColor="blue.200">
                <Text fontSize="sm" color="blue.700">
                  💡 Нажмите "Редактировать" чтобы изменить свои данные
                </Text>
              </Box>
            )}
          </VStack>
        </CardBody>
      </Card>
    </motion.div>
  );
};

export default UserProfileForm;
