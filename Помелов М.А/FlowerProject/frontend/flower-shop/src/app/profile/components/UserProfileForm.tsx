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
  useColorModeValue,
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
  onUpdate: (data: Partial<{ firstName: string; lastName: string; phone?: string; city?: string }>) => Promise<void>;
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

  // Цвета для цветочной темы (как в форме входа)
  const primaryColor = 'pink.500';
  const secondaryColor = 'purple.500';
  const borderColor = useColorModeValue('pink.200', 'pink.600');
  const fonColorForm = 'gray.200';

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

      // Обновляем данные через API
      const updatedProfile = await apiService.updateUserProfile(
        userData.id,
        {
          firstName: formData.firstName,
          lastName: formData.lastName,
          phone: formData.phone,
          city: formData.address, // Преобразуем address в city для API
        },
        token
      );

      // Вызываем callback для обновления родительского компонента
      await onUpdate({
        firstName: updatedProfile.firstName,
        lastName: updatedProfile.lastName,
        phone: updatedProfile.phone,
        city: updatedProfile.city,
      });
      
      setIsEditing(false);
      
      toast({
        title: 'Профиль обновлен',
        description: 'Ваши данные успешно сохранены на сервере',
        status: 'success',
        duration: 3000,
        isClosable: true,
      });
      
    } catch (error) {
      console.error('Ошибка сохранения:', error);
      toast({
        title: 'Ошибка',
        description: 'Не удалось сохранить изменения. Проверьте подключение к интернету и попробуйте еще раз.',
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
      <VStack spacing={6} align="stretch">
        {/* Заголовок */}
        <HStack justify="space-between" align="center">
          <Text 
            fontSize="xl" 
            fontWeight="bold" 
            color="white"
            textShadow="0 1px 2px rgba(0,0,0,0.5)"
          >
            Личные данные
          </Text>
          {!isEditing ? (
            <Button
              leftIcon={<Icon as={FiUser} />}
              colorScheme="pink"
              variant="outline"
              onClick={handleEdit}
              bgGradient={`linear(to-r, ${primaryColor}, ${secondaryColor})`}
              _hover={{
                bgGradient: `linear(to-r, ${secondaryColor}, ${primaryColor})`,
                transform: 'translateY(-2px)',
                boxShadow: `0 8px 25px rgba(236, 72, 153, 0.3)`,
              }}
              _active={{
                transform: 'translateY(0)',
              }}
              transition="all 0.3s"
            >
              Редактировать
            </Button>
          ) : (
            <HStack spacing={3}>
              <Button
                variant="ghost"
                onClick={handleCancel}
                isDisabled={isLoading}
                color="white"
                _hover={{ bg: "rgba(255, 255, 255, 0.1)" }}
              >
                Отмена
              </Button>
              <Button
                leftIcon={<Icon as={FiSave} />}
                colorScheme="pink"
                onClick={handleSave}
                isLoading={isLoading}
                isDisabled={!isFormChanged()}
                bgGradient={`linear(to-r, ${primaryColor}, ${secondaryColor})`}
                _hover={{
                  bgGradient: `linear(to-r, ${secondaryColor}, ${primaryColor})`,
                  transform: 'translateY(-2px)',
                  boxShadow: `0 8px 25px rgba(236, 72, 153, 0.3)`,
                }}
                _active={{
                  transform: 'translateY(0)',
                }}
                transition="all 0.3s"
              >
                Сохранить
              </Button>
            </HStack>
          )}
        </HStack>

        <Divider borderColor="rgba(255, 255, 255, 0.1)" />

        {/* Форма */}
        <VStack spacing={4} align="stretch">
          {/* Имя и Фамилия */}
          <HStack spacing={4}>
            <FormControl isRequired>
              <FormLabel color="white" fontWeight="semibold" textShadow="0 1px 2px rgba(0,0,0,0.5)">
                <HStack spacing={2}>
                  <Icon as={FiUser} color={primaryColor} />
                  <Text>Имя</Text>
                </HStack>
              </FormLabel>
              <Input
                value={formData.firstName}
                onChange={(e) => handleInputChange('firstName', e.target.value)}
                placeholder="Введите имя"
                isDisabled={!isEditing}
                color={fonColorForm}
                borderColor={borderColor}
                bg={isEditing ? "rgba(255, 255, 255, 0.1)" : "rgba(255, 255, 255, 0.05)"}
                _focus={{
                  borderColor: primaryColor,
                  boxShadow: `0 0 0 1px ${primaryColor}`,
                  bg: "rgba(255, 255, 255, 0.15)",
                }}
              />
            </FormControl>

            <FormControl isRequired>
              <FormLabel color="white" fontWeight="semibold" textShadow="0 1px 2px rgba(0,0,0,0.5)">
                <HStack spacing={2}>
                  <Icon as={FiUser} color={primaryColor} />
                  <Text>Фамилия</Text>
                </HStack>
              </FormLabel>
              <Input
                value={formData.lastName}
                onChange={(e) => handleInputChange('lastName', e.target.value)}
                placeholder="Введите фамилию"
                isDisabled={!isEditing}
                color={fonColorForm}
                borderColor={borderColor}
                bg={isEditing ? "rgba(255, 255, 255, 0.1)" : "rgba(255, 255, 255, 0.05)"}
                _focus={{
                  borderColor: primaryColor,
                  boxShadow: `0 0 0 1px ${primaryColor}`,
                  bg: "rgba(255, 255, 255, 0.15)",
                }}
              />
            </FormControl>
          </HStack>

          {/* Email (только для чтения) */}
          <FormControl>
            <FormLabel color="white" fontWeight="semibold" textShadow="0 1px 2px rgba(0,0,0,0.5)">
              <HStack spacing={2}>
                <Icon as={FiMail} color={primaryColor} />
                <Text>Email</Text>
              </HStack>
            </FormLabel>
            <Input
              value={userData.email}
              isDisabled={true}
              color="gray.300"
              borderColor={borderColor}
              bg="rgba(255, 255, 255, 0.05)"
            />
            <Text fontSize="sm" color="gray.400" mt={1}>
              Email нельзя изменить
            </Text>
          </FormControl>

          {/* Телефон */}
          <FormControl>
            <FormLabel color="white" fontWeight="semibold" textShadow="0 1px 2px rgba(0,0,0,0.5)">
              <HStack spacing={2}>
                <Icon as={FiPhone} color={primaryColor} />
                <Text>Телефон</Text>
              </HStack>
            </FormLabel>
            <Input
              value={formData.phone}
              onChange={(e) => handleInputChange('phone', e.target.value)}
              placeholder="Введите номер телефона"
              isDisabled={!isEditing}
              color={fonColorForm}
              borderColor={borderColor}
              bg={isEditing ? "rgba(255, 255, 255, 0.1)" : "rgba(255, 255, 255, 0.05)"}
              type="tel"
              _focus={{
                borderColor: primaryColor,
                boxShadow: `0 0 0 1px ${primaryColor}`,
                bg: "rgba(255, 255, 255, 0.15)",
              }}
            />
          </FormControl>

          {/* Адрес */}
          <FormControl>
            <FormLabel color="white" fontWeight="semibold" textShadow="0 1px 2px rgba(0,0,0,0.5)">
              <HStack spacing={2}>
                <Icon as={FiMapPin} color={primaryColor} />
                <Text>Адрес доставки</Text>
              </HStack>
            </FormLabel>
            <Input
              value={formData.address}
              onChange={(e) => handleInputChange('address', e.target.value)}
              placeholder="Введите адрес доставки"
              isDisabled={!isEditing}
              color={fonColorForm}
              borderColor={borderColor}
              bg={isEditing ? "rgba(255, 255, 255, 0.1)" : "rgba(255, 255, 255, 0.05)"}
              _focus={{
                borderColor: primaryColor,
                boxShadow: `0 0 0 1px ${primaryColor}`,
                bg: "rgba(255, 255, 255, 0.15)",
              }}
            />
          </FormControl>
        </VStack>

        {/* Информация */}
        {!isEditing && (
          <Box 
            bg="rgba(59, 130, 246, 0.1)" 
            p={4} 
            borderRadius="md" 
            border="1px solid" 
            borderColor="rgba(59, 130, 246, 0.3)"
          >
            <Text fontSize="sm" color="blue.300">
              💡 Нажмите "Редактировать" чтобы изменить свои данные
            </Text>
          </Box>
        )}
      </VStack>
    </motion.div>
  );
};

export default UserProfileForm;
