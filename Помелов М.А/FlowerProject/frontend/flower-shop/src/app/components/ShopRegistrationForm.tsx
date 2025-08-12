'use client';
import React, { useState } from 'react';
import {
  Box,
  Button,
  FormControl,
  FormLabel,
  Input,
  Textarea,
  VStack,
  HStack,
  Text,
  Alert,
  AlertIcon,
  useToast,
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalCloseButton,
  useDisclosure,
  PinInput,
  PinInputField,
  Divider,
  IconButton,
  InputGroup,
  InputRightElement,
} from '@chakra-ui/react';
import { motion } from 'framer-motion';
import { FaEye, FaEyeSlash, FaStore, FaHome } from 'react-icons/fa';
import { apiService, ShopRegistrationData, ShopVerificationData } from '../../services/api';
import { useRouter } from 'next/navigation';

// Иконки для показа/скрытия пароля
const ViewIcon = () => (
  <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor">
    <path d="M12 4.5C7 4.5 2.73 7.61 1 12c1.73 4.39 6 7.5 11 7.5s9.27-3.11 11-7.5c-1.73-4.39-6-7.5-11-7.5zM12 17c-2.76 0-5-2.24-5-5s2.24-5 5-5 5 2.24 5 5-2.24 5-5 5zm0-8c-1.66 0-3 1.34-3 3s1.34 3 3 3 3-1.34 3-3-1.34-3-3-3z"/>
  </svg>
);

const ViewOffIcon = () => (
  <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor">
    <path d="M12 7c2.76 0 5 2.24 5 5 0 .65-.13 1.26-.36 1.83l2.92 2.92c1.51-1.26 2.7-2.89 3.43-4.75-1.73-4.39-6-7.5-11-7.5-1.4 0-2.74.25-3.98.7l2.16 2.16C10.74 7.13 11.35 7 12 7zM2 4.27l2.28 2.28.46.46C3.08 8.3 1.78 10.02 1 12c1.73 4.39 6 7.5 11 7.5 1.55 0 3.03-.3 4.38-.84l.42.42L19.73 22 21 20.73 3.27 3 2 4.27zM7.53 9.8l1.55 1.55c-.05.21-.08.43-.08.65 0 1.66 1.34 3 3 3 .22 0 .44-.03.65-.08l1.55 1.55c-.67.33-1.41.53-2.2.53-2.76 0-5-2.24-5-5 0-.79.2-1.53.53-2.2zm4.31-.78l3.15 3.15.02-.16c0-1.66-1.34-3-3-3l-.17.01z"/>
  </svg>
);

interface ShopRegistrationFormProps {
  isOpen: boolean;
  onClose: () => void;
}

const ShopRegistrationForm: React.FC<ShopRegistrationFormProps> = ({ isOpen, onClose }) => {
  const [step, setStep] = useState<'register' | 'verify' | 'success'>('register');
  const [loading, setLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [formData, setFormData] = useState<ShopRegistrationData>({
    email: '',
    password: '',
    name: '',
    address: '',
    description: '',
    phone: '',
  });
  const [verificationCode, setVerificationCode] = useState('');
  const [error, setError] = useState<string | null>(null);
  const toast = useToast();
  const router = useRouter();

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
    setError(null);
  };

  const handleRegistration = async () => {
    try {
      setLoading(true);
      setError(null);

      // Валидация
      if (!formData.email || !formData.password || !formData.name || !formData.address) {
        setError('Пожалуйста, заполните все обязательные поля');
        return;
      }

      if (formData.password.length < 6) {
        setError('Пароль должен содержать минимум 6 символов');
        return;
      }

      const response = await apiService.registerShop(formData);
      toast({
        title: 'Код отправлен!',
        description: response.message,
        status: 'success',
        duration: 3000,
        isClosable: true,
      });
      setStep('verify');
    } catch (error: any) {
      setError(error.response?.data?.message || 'Ошибка при регистрации');
    } finally {
      setLoading(false);
    }
  };

  const handleVerification = async () => {
    try {
      setLoading(true);
      setError(null);

      if (verificationCode.length !== 6) {
        setError('Введите 6-значный код подтверждения');
        return;
      }

      const verificationData: ShopVerificationData = {
        ...formData,
        code: verificationCode
      };

      const response = await apiService.verifyShop(verificationData);
      
      toast({
        title: 'Магазин зарегистрирован!',
        description: response.message,
        status: 'success',
        duration: 5000,
        isClosable: true,
      });
      
      // Автоматически входим в систему магазина
      try {
        const loginResponse = await apiService.loginShop({
          email: formData.email,
          password: formData.password
        });
        
        if (loginResponse.accessToken) {
          localStorage.setItem('token', loginResponse.accessToken);
          
          toast({
            title: 'Автоматический вход выполнен!',
            description: 'Перенаправляем на главную страницу...',
            status: 'success',
            duration: 2000,
            isClosable: true,
          });
          
          // Перенаправляем на главную страницу
          setTimeout(() => {
            window.location.href = '/';
          }, 2000);
        }
      } catch (loginError) {
        console.error('Ошибка автоматического входа магазина:', loginError);
        // Если автоматический вход не удался, просто показываем успех
        setStep('success');
      }
      
      setStep('success');
    } catch (error: any) {
      setError(error.response?.data?.message || 'Ошибка при верификации');
    } finally {
      setLoading(false);
    }
  };

  const resetForm = () => {
    setStep('register');
    setFormData({
      email: '',
      password: '',
      name: '',
      address: '',
      description: '',
      phone: '',
    });
    setVerificationCode('');
    setError(null);
    setShowPassword(false);
  };

  const handleClose = () => {
    resetForm();
    onClose();
  };

  return (
    <Modal isOpen={isOpen} onClose={handleClose} size="lg" isCentered>
      <ModalOverlay backdropFilter="blur(4px)" />
      <ModalContent 
        bg="rgba(26, 32, 44, 0.95)"
        backdropFilter="blur(20px)"
        border="1px solid rgba(255, 255, 255, 0.1)"
        borderRadius="2xl"
        boxShadow="0 25px 50px -12px rgba(0, 0, 0, 0.5)"
      >
        <ModalHeader color="white" textAlign="center">
          <VStack spacing={2}>
            <Box
              p={3}
              borderRadius="full"
              bgGradient="linear(to-r, pink.400, purple.500)"
            >
              <FaStore size={24} />
            </Box>
            <Text fontSize="xl" fontWeight="bold">
              {step === 'register' && 'Регистрация магазина'}
              {step === 'verify' && 'Подтверждение email'}
              {step === 'success' && 'Регистрация завершена!'}
            </Text>
          </VStack>
        </ModalHeader>
        <ModalCloseButton color="white" />
        
        <ModalBody pb={8}>
          <motion.div
            key={step}
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -20 }}
            transition={{ duration: 0.3 }}
          >
            {step === 'register' && (
              <VStack spacing={4}>
                {error && (
                  <Alert status="error" borderRadius="lg" bg="red.500" color="white">
                    <AlertIcon />
                    {error}
                  </Alert>
                )}

                <FormControl isRequired>
                  <FormLabel color="gray.300">Название магазина</FormLabel>
                  <Input
                    name="name"
                    value={formData.name}
                    onChange={handleInputChange}
                    placeholder="Введите название вашего магазина"
                    bg="rgba(255, 255, 255, 0.05)"
                    border="1px solid rgba(255, 255, 255, 0.1)"
                    color="white"
                    _placeholder={{ color: 'gray.400' }}
                    _focus={{
                      borderColor: 'pink.400',
                      boxShadow: '0 0 0 1px rgba(236, 72, 153, 0.3)',
                    }}
                  />
                </FormControl>

                <FormControl isRequired>
                  <FormLabel color="gray.300">Email</FormLabel>
                  <Input
                    name="email"
                    type="email"
                    value={formData.email}
                    onChange={handleInputChange}
                    placeholder="your-shop@example.com"
                    bg="rgba(255, 255, 255, 0.05)"
                    border="1px solid rgba(255, 255, 255, 0.1)"
                    color="white"
                    _placeholder={{ color: 'gray.400' }}
                    _focus={{
                      borderColor: 'pink.400',
                      boxShadow: '0 0 0 1px rgba(236, 72, 153, 0.3)',
                    }}
                  />
                </FormControl>

                <FormControl isRequired>
                  <FormLabel color="gray.300">Пароль</FormLabel>
                  <InputGroup>
                    <Input
                      name="password"
                      type={showPassword ? 'text' : 'password'}
                      value={formData.password}
                      onChange={handleInputChange}
                      placeholder="Минимум 6 символов"
                      bg="rgba(255, 255, 255, 0.05)"
                      border="1px solid rgba(255, 255, 255, 0.1)"
                      color="white"
                      _placeholder={{ color: 'gray.400' }}
                      _focus={{
                        borderColor: 'pink.400',
                        boxShadow: '0 0 0 1px rgba(236, 72, 153, 0.3)',
                      }}
                    />
                    <InputRightElement>
                      <IconButton
                        aria-label={showPassword ? 'Скрыть пароль' : 'Показать пароль'}
                        icon={showPassword ? <ViewOffIcon /> : <ViewIcon />}
                        variant="ghost"
                        color="gray.400"
                        size="sm"
                        onClick={() => setShowPassword(!showPassword)}
                      />
                    </InputRightElement>
                  </InputGroup>
                </FormControl>

                <FormControl isRequired>
                  <FormLabel color="gray.300">Адрес</FormLabel>
                  <Input
                    name="address"
                    value={formData.address}
                    onChange={handleInputChange}
                    placeholder="Адрес вашего магазина"
                    bg="rgba(255, 255, 255, 0.05)"
                    border="1px solid rgba(255, 255, 255, 0.1)"
                    color="white"
                    _placeholder={{ color: 'gray.400' }}
                    _focus={{
                      borderColor: 'pink.400',
                      boxShadow: '0 0 0 1px rgba(236, 72, 153, 0.3)',
                    }}
                  />
                </FormControl>

                <FormControl>
                  <FormLabel color="gray.300">Телефон</FormLabel>
                  <Input
                    name="phone"
                    value={formData.phone}
                    onChange={handleInputChange}
                    placeholder="+7 (999) 123-45-67"
                    bg="rgba(255, 255, 255, 0.05)"
                    border="1px solid rgba(255, 255, 255, 0.1)"
                    color="white"
                    _placeholder={{ color: 'gray.400' }}
                    _focus={{
                      borderColor: 'pink.400',
                      boxShadow: '0 0 0 1px rgba(236, 72, 153, 0.3)',
                    }}
                  />
                </FormControl>

                <FormControl>
                  <FormLabel color="gray.300">Описание</FormLabel>
                  <Textarea
                    name="description"
                    value={formData.description}
                    onChange={handleInputChange}
                    placeholder="Расскажите о вашем магазине..."
                    bg="rgba(255, 255, 255, 0.05)"
                    border="1px solid rgba(255, 255, 255, 0.1)"
                    color="white"
                    _placeholder={{ color: 'gray.400' }}
                    _focus={{
                      borderColor: 'pink.400',
                      boxShadow: '0 0 0 1px rgba(236, 72, 153, 0.3)',
                    }}
                    resize="vertical"
                    minH="100px"
                  />
                </FormControl>

                <HStack spacing={4} w="full">
                  <Button
                    onClick={handleRegistration}
                    isLoading={loading}
                    loadingText="Отправляем код..."
                    w="full"
                    size="lg"
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
                  >
                    Зарегистрировать магазин
                  </Button>
                  <Button
                    onClick={() => router.push('/')}
                    leftIcon={<FaHome />}
                    variant="outline"
                    colorScheme="gray"
                    size="lg"
                    border="1px solid rgba(255, 255, 255, 0.1)"
                    color="gray.400"
                    _hover={{
                      bg: "rgba(255, 255, 255, 0.05)",
                      borderColor: "rgba(255, 255, 255, 0.2)",
                      color: "gray.300",
                    }}
                    _active={{
                      transform: 'translateY(0)',
                    }}
                  >
                    На главную
                  </Button>
                </HStack>
              </VStack>
            )}

            {step === 'verify' && (
              <VStack spacing={6}>
                <Text color="gray.300" textAlign="center">
                  Мы отправили код подтверждения на<br />
                  <Text as="span" color="pink.300" fontWeight="semibold">
                    {formData.email}
                  </Text>
                </Text>

                {error && (
                  <Alert status="error" borderRadius="lg" bg="red.500" color="white">
                    <AlertIcon />
                    {error}
                  </Alert>
                )}

                <VStack spacing={4}>
                  <Text color="gray.300" fontSize="sm">
                    Введите 6-значный код:
                  </Text>
                  <HStack>
                    <PinInput
                      value={verificationCode}
                      onChange={setVerificationCode}
                      size="lg"
                      colorScheme="pink"
                    >
                      <PinInputField
                        bg="rgba(255, 255, 255, 0.05)"
                        border="1px solid rgba(255, 255, 255, 0.1)"
                        color="white"
                        _focus={{
                          borderColor: 'pink.400',
                          boxShadow: '0 0 0 1px rgba(236, 72, 153, 0.3)',
                        }}
                      />
                      <PinInputField
                        bg="rgba(255, 255, 255, 0.05)"
                        border="1px solid rgba(255, 255, 255, 0.1)"
                        color="white"
                        _focus={{
                          borderColor: 'pink.400',
                          boxShadow: '0 0 0 1px rgba(236, 72, 153, 0.3)',
                        }}
                      />
                      <PinInputField
                        bg="rgba(255, 255, 255, 0.05)"
                        border="1px solid rgba(255, 255, 255, 0.1)"
                        color="white"
                        _focus={{
                          borderColor: 'pink.400',
                          boxShadow: '0 0 0 1px rgba(236, 72, 153, 0.3)',
                        }}
                      />
                      <PinInputField
                        bg="rgba(255, 255, 255, 0.05)"
                        border="1px solid rgba(255, 255, 255, 0.1)"
                        color="white"
                        _focus={{
                          borderColor: 'pink.400',
                          boxShadow: '0 0 0 1px rgba(236, 72, 153, 0.3)',
                        }}
                      />
                      <PinInputField
                        bg="rgba(255, 255, 255, 0.05)"
                        border="1px solid rgba(255, 255, 255, 0.1)"
                        color="white"
                        _focus={{
                          borderColor: 'pink.400',
                          boxShadow: '0 0 0 1px rgba(236, 72, 153, 0.3)',
                        }}
                      />
                      <PinInputField
                        bg="rgba(255, 255, 255, 0.05)"
                        border="1px solid rgba(255, 255, 255, 0.1)"
                        color="white"
                        _focus={{
                          borderColor: 'pink.400',
                          boxShadow: '0 0 0 1px rgba(236, 72, 153, 0.3)',
                        }}
                      />
                    </PinInput>
                  </HStack>
                </VStack>

                <VStack spacing={3} w="full">
                  <Button
                    onClick={handleVerification}
                    isLoading={loading}
                    loadingText="Проверяем..."
                    w="full"
                    size="lg"
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
                  >
                    Подтвердить
                  </Button>

                  <HStack spacing={3} w="full">
                    <Button
                      variant="ghost"
                      color="gray.400"
                      size="sm"
                      onClick={() => setStep('register')}
                      flex={1}
                    >
                      Назад к регистрации
                    </Button>
                    <Button
                      onClick={() => router.push('/')}
                      leftIcon={<FaHome />}
                      variant="outline"
                      colorScheme="gray"
                      size="sm"
                      border="1px solid rgba(255, 255, 255, 0.1)"
                      color="gray.400"
                      _hover={{
                        bg: "rgba(255, 255, 255, 0.05)",
                        borderColor: "rgba(255, 255, 255, 0.2)",
                        color: "gray.300",
                      }}
                      flex={1}
                    >
                      На главную
                    </Button>
                  </HStack>
                </VStack>
              </VStack>
            )}

            {step === 'success' && (
              <VStack spacing={6} textAlign="center">
                <motion.div
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  transition={{ type: "spring", stiffness: 200, damping: 10 }}
                >
                  <Box
                    w={20}
                    h={20}
                    borderRadius="full"
                    bgGradient="linear(to-r, green.400, green.500)"
                    display="flex"
                    alignItems="center"
                    justifyContent="center"
                    fontSize="2xl"
                  >
                    ✅
                  </Box>
                </motion.div>

                <VStack spacing={2}>
                  <Text color="white" fontSize="xl" fontWeight="bold">
                    Поздравляем!
                  </Text>
                  <Text color="gray.300">
                    Ваш магазин <Text as="span" color="pink.300" fontWeight="semibold">{formData.name}</Text> успешно зарегистрирован!
                  </Text>
                  <Text color="gray.400" fontSize="sm">
                    Теперь вы можете входить в систему и управлять своим магазином.
                  </Text>
                </VStack>

                <HStack spacing={4} w="full">
                  <Button
                    onClick={handleClose}
                    w="full"
                    size="lg"
                    bgGradient="linear(to-r, green.400, green.500)"
                    color="white"
                    _hover={{
                      bgGradient: "linear(to-r, green.500, green.600)",
                      transform: 'translateY(-2px)',
                      boxShadow: '0 8px 25px rgba(72, 187, 120, 0.3)',
                    }}
                    _active={{
                      transform: 'translateY(0)',
                    }}
                  >
                    Закрыть
                  </Button>
                  <Button
                    onClick={() => router.push('/')}
                    leftIcon={<FaHome />}
                    variant="outline"
                    colorScheme="gray"
                    size="lg"
                    border="1px solid rgba(255, 255, 255, 0.1)"
                    color="gray.400"
                    _hover={{
                      bg: "rgba(255, 255, 255, 0.05)",
                      borderColor: "rgba(255, 255, 255, 0.2)",
                      color: "gray.300",
                    }}
                    w="full"
                  >
                    На главную
                  </Button>
                </HStack>
              </VStack>
            )}
          </motion.div>
        </ModalBody>
      </ModalContent>
    </Modal>
  );
};

export default ShopRegistrationForm;

