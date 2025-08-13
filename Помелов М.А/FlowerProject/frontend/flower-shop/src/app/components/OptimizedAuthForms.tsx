'use client';
import React, { useState, useCallback, useMemo } from 'react';
import {
  Box,
  Button,
  FormControl,
  FormLabel,
  Input,
  VStack,
  HStack,
  Text,
  useToast,
  InputGroup,
  InputRightElement,
  IconButton,
  Checkbox,
  Select,
  Heading,
  useColorModeValue,
  Container,
  Flex,
  Badge,
} from '@chakra-ui/react';
import { motion } from 'framer-motion';
import FlowerBackground from './FlowerBackground';
import { API_CONFIG } from '../../config/api';
import { api, AuthResponse } from '../../config/axios';
import { FaHome } from 'react-icons/fa';
import { useRouter } from 'next/navigation';

// Простые иконки для показа/скрытия пароля
const ViewIcon = () => (
  <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor">
    <path d="M12 4.5C7 4.5 2.73 7.61 1 12c1.73 4.39 6 7.5 11 7.5s9.27-3.11 11-7.5c-1.73-4.39-6-7.5-11-7.5zM12 17c-2.76 0-5-2.24-5-5s2.24-5 5-5 5 2.24 5 5-2.24 5-5 5zm0-8c-1.66 0-3 1.34-3 3s1.34 3 3 3 3-1.34 3-3-1.34-3-3-3z" />
  </svg>
);

const ViewOffIcon = () => (
  <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor">
    <path d="M12 7c2.76 0 5 2.24 5 5 0 .65-.13 1.26-.36 1.83l2.92 2.92c1.51-1.26 2.7-2.89 3.43-4.75-1.73-4.39-6-7.5-11-7.5-1.4 0-2.74.25-3.98.7l2.16 2.16C10.74 7.13 11.35 7 12 7zM2 4.27l2.28 2.28.46.46C3.08 8.3 1.78 10.02 1 12c1.73 4.39 6 7.5 11 7.5 1.55 0 3.03-.3 4.38-.84l.42.42L19.73 22 21 20.73 3.27 3 2 4.27zM7.53 9.8l1.55 1.55c-.05.21-.08.43-.08.65 0 1.66 1.34 3 3 3 .22 0 .44-.03.65-.08l1.55 1.55c-.67.33-1.41.53-2.2.53-2.76 0-5-2.24-5-5 0-.79.2-1.53.53-2.2zm4.31-.78l3.15 3.15.02-.16c0-1.66-1.34-3-3-3l-.17.01z" />
  </svg>
);

// Анимации
const containerVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.6,
      staggerChildren: 0.1
    }
  }
};

const itemVariants = {
  hidden: { opacity: 0, x: -20 },
  visible: { opacity: 1, x: 0 }
};

const glowVariants = {
  initial: { opacity: 0, scale: 0.8 },
  animate: {
    opacity: [0, 1, 0],
    scale: [0.8, 1.2, 0.8],
    transition: {
      duration: 2,
      repeat: Infinity,
      ease: "easeInOut" as const
    }
  }
};

interface LoginFormData {
  email: string;
  password: string;
}

interface RegisterFormData {
  email: string;
  password: string;
  confirmPassword?: string;
  firstName: string;
  lastName: string;
  birthDate: string;
  phone: string;
  city: string;
  personalData: boolean | string;
}

interface VerifyFormData {
  email: string;
  code: string;
  password: string;
  firstName: string;
  lastName: string;
  birthDate: string;
  phone: string;
  city: string;
  personalData: boolean | string;
}

const OptimizedAuthForms: React.FC = () => {
  const [isLogin, setIsLogin] = useState(true);
  const [isRegistering, setIsRegistering] = useState(false);
  const [isVerifying, setIsVerifying] = useState(false);
  const [isShopMode, setIsShopMode] = useState(false); // Новое состояние для режима магазина
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  
  const toast = useToast();
  const router = useRouter();
  
  // Цвета для цветочной темы
  const bgColor = useColorModeValue('white', 'gray.800');
  const borderColor = useColorModeValue('pink.200', 'pink.600');
  const primaryColor = 'pink.500';
  const secondaryColor = 'purple.500';
  const accentColor = 'rose.400';
  const fonColorForm = 'gray.200';

  // Состояния форм
  const [loginData, setLoginData] = useState<LoginFormData>({
    email: '',
    password: ''
  });

  const [registerData, setRegisterData] = useState<RegisterFormData>({
    email: '',
    password: '',
    firstName: '',
    lastName: '',
    birthDate: '',
    phone: '',
    city: '',
    personalData: false
  });

  const [verifyData, setVerifyData] = useState<VerifyFormData>({
    email: '',
    code: '',
    password: '',
    firstName: '',
    lastName: '',
    birthDate: '',
    phone: '',
    city: '',
    personalData: true
  });

  // Оптимизированные обработчики
  const handleLoginEmailChange = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
    setLoginData(prev => ({ ...prev, email: e.target.value }));
  }, []);

  const handleLoginPasswordChange = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
    setLoginData(prev => ({ ...prev, password: e.target.value }));
  }, []);

  const handleRegisterFieldChange = useCallback((field: keyof RegisterFormData) => (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    const value = field === 'personalData' ? (e.target as HTMLInputElement).checked : e.target.value;
    setRegisterData(prev => ({ ...prev, [field]: value }));
  }, []);

  const handleVerifyFieldChange = useCallback((field: keyof VerifyFormData) => (
    e: React.ChangeEvent<HTMLInputElement>
  ) => {
    setVerifyData(prev => ({ ...prev, [field]: e.target.value }));
  }, []);

  const handlePersonalDataChange = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
    setRegisterData(prev => ({ ...prev, personalData: e.target.checked }));
  }, []);

  const togglePasswordVisibility = useCallback(() => {
    setShowPassword(prev => !prev);
  }, []);

  const handleLogin = useCallback(async () => {
    setIsLoading(true);
    try {
      // Выбираем правильный эндпоинт в зависимости от режима
      const endpoint = isShopMode ? API_CONFIG.AUTH.SHOP_LOGIN : API_CONFIG.AUTH.LOGIN;
      const response = await api.post<AuthResponse>(endpoint, loginData);
      
      toast({
        title: 'Успешный вход!',
        description: isShopMode ? 'Добро пожаловать в панель управления магазином!' : 'Добро пожаловать в мир цветов!',
        status: 'success',
        duration: 2000,
        isClosable: true,
      });
      
      localStorage.setItem('token', response.data.accessToken);
      
      // Если это магазин, сохраняем информацию о роли
      if (isShopMode) {
        localStorage.setItem('userRole', 'shop');
        // Перенаправляем на панель магазина
        setTimeout(() => {
          window.location.href = '/shop/dashboard';
        }, 2000);
      } else {
        localStorage.setItem('userRole', 'user');
        
        // Проверяем, нужно ли перенаправить на оформление заказа
        const pendingCheckout = localStorage.getItem('pendingCheckout');
        if (pendingCheckout === 'true') {
          localStorage.removeItem('pendingCheckout');
          toast({
            title: 'Продолжаем оформление заказа',
            description: 'Теперь вы можете оформить заказ',
            status: 'info',
            duration: 2000,
            isClosable: true,
          });
          setTimeout(() => {
            window.location.href = '/checkout';
          }, 2000);
        } else {
          // Перенаправляем на главную страницу
          setTimeout(() => {
            window.location.href = '/';
          }, 2000);
        }
      }
      
    } catch (error: unknown) {
      const errorMessage = (error as { response?: { data?: { message?: string } } })?.response?.data?.message || 'Неверный email или пароль';
      toast({
        title: 'Ошибка входа',
        description: errorMessage,
        status: 'error',
        duration: 3000,
        isClosable: true,
      });
    } finally {
      setIsLoading(false);
    }
  }, [loginData, toast, isShopMode]);

  const handleRegister = useCallback(async () => {
    setIsLoading(true);
    try {
      // Исключаем confirmPassword из данных, отправляемых на сервер
      const { confirmPassword, ...dataWithoutConfirm } = registerData;
      
      // Выбираем правильный эндпоинт в зависимости от режима
      const endpoint = isShopMode ? API_CONFIG.AUTH.SHOP_REGISTRATION : API_CONFIG.AUTH.REGISTRATION;
      await api.post(endpoint, dataWithoutConfirm);
      
      toast({
        title: 'Код подтверждения отправлен!',
        description: 'Проверьте вашу почту и введите код',
        status: 'success',
        duration: 5000,
        isClosable: true,
      });
      setIsRegistering(false);
      setIsVerifying(true);
      setVerifyData({
        ...dataWithoutConfirm,
        code: '',
        personalData: true // Устанавливаем true для верификации
      });
    } catch (error: unknown) {
      const errorMessage = (error as { response?: { data?: { message?: string } } })?.response?.data?.message || 'Не удалось отправить код';
      toast({
        title: 'Ошибка регистрации',
        description: errorMessage,
        status: 'error',
        duration: 3000,
        isClosable: true,
      });
    } finally {
      setIsLoading(false);
    }
  }, [registerData, toast, isShopMode]);

  const handleVerify = useCallback(async () => {
    setIsLoading(true);
    try {
      // Выбираем правильный эндпоинт в зависимости от режима
      const endpoint = isShopMode ? API_CONFIG.AUTH.SHOP_VERIFY : API_CONFIG.AUTH.VERIFY;
      const response = await api.post<AuthResponse>(endpoint, verifyData);
      
      toast({
        title: 'Регистрация завершена!',
        description: isShopMode ? 'Магазин успешно зарегистрирован!' : 'Добро пожаловать в мир цветов!',
        status: 'success',
        duration: 3000,
        isClosable: true,
      });
      
      // Сохраняем токен
      localStorage.setItem('token', response.data.accessToken);
      
      // Автоматически входим в систему
      try {
        const loginEndpoint = isShopMode ? API_CONFIG.AUTH.SHOP_LOGIN : API_CONFIG.AUTH.LOGIN;
        const loginResponse = await api.post<AuthResponse>(loginEndpoint, {
          email: verifyData.email,
          password: verifyData.password
        });
        
        if (loginResponse.data.accessToken) {
          localStorage.setItem('token', loginResponse.data.accessToken);
          
          if (isShopMode) {
            localStorage.setItem('userRole', 'shop');
            toast({
              title: 'Автоматический вход выполнен!',
              description: 'Перенаправляем в панель управления...',
              status: 'success',
              duration: 2000,
              isClosable: true,
            });
            
            // Перенаправляем на панель магазина
            setTimeout(() => {
              window.location.href = '/shop/dashboard';
            }, 2000);
          } else {
            localStorage.setItem('userRole', 'user');
            
            // Проверяем, нужно ли перенаправить на оформление заказа
            const pendingCheckout = localStorage.getItem('pendingCheckout');
            if (pendingCheckout === 'true') {
              localStorage.removeItem('pendingCheckout');
              toast({
                title: 'Автоматический вход выполнен!',
                description: 'Продолжаем оформление заказа...',
                status: 'success',
                duration: 2000,
                isClosable: true,
              });
              setTimeout(() => {
                window.location.href = '/checkout';
              }, 2000);
            } else {
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
          }
        }
      } catch (loginError) {
        console.error('Ошибка автоматического входа:', loginError);
        // Если автоматический вход не удался, просто закрываем форму
        setIsVerifying(false);
        setIsLogin(true);
      }
      
      setIsVerifying(false);
    } catch (error: unknown) {
      const errorMessage = (error as { response?: { data?: { message?: string } } })?.response?.data?.message || 'Неверный код подтверждения';
      toast({
        title: 'Ошибка верификации',
        description: errorMessage,
        status: 'error',
        duration: 3000,
        isClosable: true,
      });
    } finally {
      setIsLoading(false);
    }
  }, [verifyData, toast, isShopMode]);

  const switchToRegister = useCallback(() => setIsLogin(false), []);
  const switchToLogin = useCallback(() => setIsLogin(true), []);
  const switchToVerify = useCallback(() => {
    setIsVerifying(false);
    setIsRegistering(true);
  }, []);

  // Мемоизированные компоненты форм
  const LoginForm = useMemo(() => (
    <motion.div
      variants={containerVariants}
      initial="hidden"
      animate="visible"
    >
      <VStack spacing={6} align="stretch">
        <motion.div variants={itemVariants}>
          <Heading size="lg" textAlign="center" color={primaryColor}>
            {isShopMode ? 'Вход для магазина' : 'Добро пожаловать в мир цветов'}
          </Heading>
        </motion.div>

        {/* Переключатель режимов */}
        <motion.div variants={itemVariants}>
          <HStack spacing={4} justify="center">
            <Button
              size="sm"
              variant={!isShopMode ? "solid" : "outline"}
              colorScheme="pink"
              onClick={() => setIsShopMode(false)}
              _hover={{
                transform: 'translateY(-2px)',
                boxShadow: '0 4px 12px rgba(236, 72, 153, 0.3)',
              }}
              transition="all 0.3s"
            >
              👤 Пользователь
            </Button>
            <Button
              size="sm"
              variant={isShopMode ? "solid" : "outline"}
              colorScheme="purple"
              onClick={() => setIsShopMode(true)}
              _hover={{
                transform: 'translateY(-2px)',
                boxShadow: '0 4px 12px rgba(147, 51, 234, 0.3)',
              }}
              transition="all 0.3s"
            >
              🏪 Магазин
            </Button>
          </HStack>
        </motion.div>

        <motion.div variants={itemVariants}>
          <FormControl isRequired>
            <FormLabel color="white" fontWeight="semibold" textShadow="0 1px 2px rgba(0,0,0,0.5)">Email</FormLabel>
            <Input
            color={fonColorForm}
              type="email"
              value={loginData.email}
              onChange={handleLoginEmailChange}
              placeholder="your@email.com"
              borderColor={borderColor}
              bg="rgba(255, 255, 255, 0.1)"
              _focus={{
                borderColor: primaryColor,
                boxShadow: `0 0 0 1px ${primaryColor}`,
                bg: "rgba(255, 255, 255, 0.15)",
              }}
            />
          </FormControl>
        </motion.div>

        <motion.div variants={itemVariants}>
          <FormControl isRequired>
            <FormLabel color="white" fontWeight="semibold" textShadow="0 1px 2px rgba(0,0,0,0.5)">Пароль</FormLabel>
            <InputGroup>
              <Input
              color={fonColorForm}
                type={showPassword ? 'text' : 'password'}
                value={loginData.password}
                onChange={handleLoginPasswordChange}
                placeholder="Введите пароль"
                borderColor={borderColor}
                bg="rgba(255, 255, 255, 0.1)"
                _focus={{
                  borderColor: primaryColor,
                  boxShadow: `0 0 0 1px ${primaryColor}`,
                  bg: "rgba(255, 255, 255, 0.15)",
                }}
              />
              <InputRightElement>
                <IconButton
                  aria-label={showPassword ? 'Скрыть пароль' : 'Показать пароль'}
                  icon={showPassword ? <ViewOffIcon /> : <ViewIcon />}
                  onClick={togglePasswordVisibility}
                  variant="ghost"
                  size="sm"
                  color="white"
                  _hover={{ bg: 'rgba(255, 255, 255, 0.1)' }}
                />
              </InputRightElement>
            </InputGroup>
          </FormControl>
        </motion.div>

        <motion.div variants={itemVariants}>
          <Flex justifyContent="center">
            <Button
              colorScheme="pink"
              size="lg"
              onClick={handleLogin}
              isLoading={isLoading}
              loadingText="Вход..."
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
              {isShopMode ? 'Войти в магазин' : 'Войти'}
            </Button>
          </Flex>
        </motion.div>

        <motion.div variants={itemVariants}>
          <Text textAlign="center" color="gray.300">
            {isShopMode ? 'Нет аккаунта магазина?' : 'Нет аккаунта?'}{' '}
            <Button
              variant="link"
              color={primaryColor}
              onClick={() => {
                setIsLogin(false);
                setIsShopMode(isShopMode); // Сохраняем текущий режим
              }}
              _hover={{ color: secondaryColor }}
            >
              {isShopMode ? 'Зарегистрировать магазин' : 'Зарегистрироваться'}
            </Button>
          </Text>
        </motion.div>
      </VStack>
    </motion.div>
  ), [loginData, showPassword, isLoading, handleLogin, handleLoginEmailChange, handleLoginPasswordChange, togglePasswordVisibility, switchToRegister, primaryColor, secondaryColor, borderColor, isShopMode]);

  const RegisterForm = useMemo(() => (
    <motion.div
      variants={containerVariants}
      initial="hidden"
      animate="visible"
    >
      <VStack spacing={6} align="stretch">
        <motion.div variants={itemVariants}>
          <Heading size="lg" textAlign="center" color={primaryColor}>
            {isShopMode ? 'Регистрация магазина' : 'Создайте аккаунт'}
          </Heading>
          <Text textAlign="center" color="gray.300" fontSize="sm">
            {isShopMode ? 'Присоединяйтесь к нашей сети цветочных магазинов' : 'Присоединяйтесь к миру прекрасных цветов'}
          </Text>
        </motion.div>

        {/* Переключатель режимов */}
        <motion.div variants={itemVariants}>
          <HStack spacing={4} justify="center">
            <Button
              size="sm"
              variant={!isShopMode ? "solid" : "outline"}
              colorScheme="pink"
              onClick={() => setIsShopMode(false)}
              _hover={{
                transform: 'translateY(-2px)',
                boxShadow: '0 4px 12px rgba(236, 72, 153, 0.3)',
              }}
              transition="all 0.3s"
            >
              👤 Пользователь
            </Button>
            <Button
              size="sm"
              variant={isShopMode ? "solid" : "outline"}
              colorScheme="purple"
              onClick={() => setIsShopMode(true)}
              _hover={{
                transform: 'translateY(-2px)',
                boxShadow: '0 4px 12px rgba(147, 51, 234, 0.3)',
              }}
              transition="all 0.3s"
            >
              🏪 Магазин
            </Button>
          </HStack>
        </motion.div>

        <HStack spacing={4}>
          <motion.div variants={itemVariants} style={{ flex: 1 }}>
            <FormControl isRequired>
              <FormLabel color="white" fontWeight="semibold" textShadow="0 1px 2px rgba(0,0,0,0.5)">
                {isShopMode ? 'Название магазина' : 'Имя'}
              </FormLabel>
              <Input
                color={fonColorForm}
                value={registerData.firstName}
                onChange={handleRegisterFieldChange('firstName')}
                placeholder={isShopMode ? "Цветочный рай" : "Иван"}
                borderColor={borderColor}
                bg="rgba(255, 255, 255, 0.1)"
                _focus={{
                  borderColor: primaryColor,
                  boxShadow: `0 0 0 1px ${primaryColor}`,
                  bg: "rgba(255, 255, 255, 0.15)",
                }}
              />
            </FormControl>
          </motion.div>
          <motion.div variants={itemVariants} style={{ flex: 1 }}>
            <FormControl isRequired>
              <FormLabel color="white" fontWeight="semibold" textShadow="0 1px 2px rgba(0,0,0,0.5)">
                {isShopMode ? 'Описание' : 'Фамилия'}
              </FormLabel>
              <Input
              color={fonColorForm}
                value={registerData.lastName}
                onChange={handleRegisterFieldChange('lastName')}
                placeholder={isShopMode ? "Краткое описание магазина" : "Иванов"}
                borderColor={borderColor}
                bg="rgba(255, 255, 255, 0.1)"
                _focus={{
                  borderColor: primaryColor,
                  boxShadow: `0 0 0 1px ${primaryColor}`,
                  bg: "rgba(255, 255, 255, 0.15)",
                }}
              />
            </FormControl>
          </motion.div>
        </HStack>

        <motion.div variants={itemVariants}>
          <FormControl isRequired>
            <FormLabel color="white" fontWeight="semibold" textShadow="0 1px 2px rgba(0,0,0,0.5)">Email</FormLabel>
            <Input
              color={fonColorForm}
              type="email"
              value={registerData.email}
              onChange={handleRegisterFieldChange('email')}
              placeholder="your@email.com"
              borderColor={borderColor}
              bg="rgba(255, 255, 255, 0.1)"
              _focus={{
                borderColor: primaryColor,
                boxShadow: `0 0 0 1px ${primaryColor}`,
                bg: "rgba(255, 255, 255, 0.15)",
              }}
            />
          </FormControl>
        </motion.div>

        <motion.div variants={itemVariants}>
          <FormControl isRequired>
            <FormLabel color="white" fontWeight="semibold" textShadow="0 1px 2px rgba(0,0,0,0.5)">Пароль</FormLabel>
            <InputGroup>
              <Input
                color={fonColorForm}
                type={showPassword ? 'text' : 'password'}
                value={registerData.password}
                onChange={handleRegisterFieldChange('password')}
                placeholder="Минимум 6 символов"
                borderColor={borderColor}
                bg="rgba(255, 255, 255, 0.1)"
                _focus={{
                  borderColor: primaryColor,
                  boxShadow: `0 0 0 1px ${primaryColor}`,
                  bg: "rgba(255, 255, 255, 0.15)",
                }}
              />
              <InputRightElement>
                <IconButton
                  aria-label={showPassword ? 'Скрыть пароль' : 'Показать пароль'}
                  icon={showPassword ? <ViewOffIcon /> : <ViewIcon />}
                  onClick={togglePasswordVisibility}
                  variant="ghost"
                  size="sm"
                  color="white"
                  _hover={{ bg: 'rgba(255, 255, 255, 0.1)' }}
                />
              </InputRightElement>
            </InputGroup>
          </FormControl>
        </motion.div>

        {/* Показываем дополнительные поля только для пользователей */}
        {!isShopMode && (
          <>
            <HStack spacing={4}>
              <motion.div variants={itemVariants} style={{ flex: 1 }}>
                <FormControl isRequired>
                  <FormLabel color="white" fontWeight="semibold" textShadow="0 1px 2px rgba(0,0,0,0.5)">Дата рождения</FormLabel>
                  <Input
                    color={fonColorForm}
                    type="date"
                    value={registerData.birthDate}
                    onChange={handleRegisterFieldChange('birthDate')}
                    borderColor={borderColor}
                    bg="rgba(255, 255, 255, 0.1)"
                    _focus={{
                      borderColor: primaryColor,
                      boxShadow: `0 0 0 1px ${primaryColor}`,
                      bg: "rgba(255, 255, 255, 0.15)",
                    }}
                  />
                </FormControl>
              </motion.div>
              <motion.div variants={itemVariants} style={{ flex: 1 }}>
                <FormControl isRequired>
                  <FormLabel color="white" fontWeight="semibold" textShadow="0 1px 2px rgba(0,0,0,0.5)">Телефон</FormLabel>
                  <Input
                    color={fonColorForm}
                    value={registerData.phone}
                    onChange={handleRegisterFieldChange('phone')}
                    placeholder="+7 (999) 123-45-67"
                    borderColor={borderColor}
                    bg="rgba(255, 255, 255, 0.1)"
                    _focus={{
                      borderColor: primaryColor,
                      boxShadow: `0 0 0 1px ${primaryColor}`,
                      bg: "rgba(255, 255, 255, 0.15)",
                    }}
                  />
                </FormControl>
              </motion.div>
            </HStack>

            <motion.div variants={itemVariants}>
              <FormControl isRequired>
                <FormLabel color="white" fontWeight="semibold" textShadow="0 1px 2px rgba(0,0,0,0.5)">Город</FormLabel>
                <Select
                  color={fonColorForm}
                  value={registerData.city}
                  onChange={handleRegisterFieldChange('city')}
                  placeholder="Выберите город"
                  borderColor={borderColor}
                  bg="rgba(255, 255, 255, 0.1)"
                  _focus={{
                    borderColor: primaryColor,
                    boxShadow: `0 0 0 1px ${primaryColor}`,
                    bg: "rgba(255, 255, 255, 0.15)",
                  }}
                >
                  <option value="Москва">Москва</option>
                  <option value="Санкт-Петербург">Санкт-Петербург</option>
                  <option value="Новосибирск">Новосибирск</option>
                  <option value="Екатеринбург">Екатеринбург</option>
                  <option value="Казань">Казань</option>
                  <option value="Нижний Новгород">Нижний Новгород</option>
                  <option value="Челябинск">Челябинск</option>
                  <option value="Самара">Самара</option>
                  <option value="Уфа">Уфа</option>
                  <option value="Ростов-на-Дону">Ростов-на-Дону</option>
                </Select>
              </FormControl>
            </motion.div>
          </>
        )}

        {/* Показываем поля для магазина */}
        {isShopMode && (
          <>
            <motion.div variants={itemVariants}>
              <FormControl isRequired>
                <FormLabel color="white" fontWeight="semibold" textShadow="0 1px 2px rgba(0,0,0,0.5)">Адрес магазина</FormLabel>
                <Input
                  color={fonColorForm}
                  value={registerData.city}
                  onChange={handleRegisterFieldChange('city')}
                  placeholder="г. Москва, ул. Цветочная, 15"
                  borderColor={borderColor}
                  bg="rgba(255, 255, 255, 0.1)"
                  _focus={{
                    borderColor: primaryColor,
                    boxShadow: `0 0 0 1px ${primaryColor}`,
                    bg: "rgba(255, 255, 255, 0.15)",
                  }}
                />
              </FormControl>
            </motion.div>

            <motion.div variants={itemVariants}>
              <FormControl isRequired>
                <FormLabel color="white" fontWeight="semibold" textShadow="0 1px 2px rgba(0,0,0,0.5)">Телефон магазина</FormLabel>
                <Input
                  color={fonColorForm}
                  value={registerData.phone}
                  onChange={handleRegisterFieldChange('phone')}
                  placeholder="+7 (495) 123-45-67"
                  borderColor={borderColor}
                  bg="rgba(255, 255, 255, 0.1)"
                  _focus={{
                    borderColor: primaryColor,
                    boxShadow: `0 0 0 1px ${primaryColor}`,
                    bg: "rgba(255, 255, 255, 0.15)",
                  }}
                />
              </FormControl>
            </motion.div>
          </>
        )}

        <motion.div variants={itemVariants}>
          <Checkbox
            isChecked={Boolean(registerData.personalData)}
            onChange={handlePersonalDataChange}
            colorScheme="pink"
          >
            <Text fontSize="sm" color="gray.300">
              {isShopMode 
                ? 'Я согласен на обработку персональных данных магазина'
                : 'Я согласен на обработку персональных данных'
              }
            </Text>
          </Checkbox>
        </motion.div>

        <motion.div variants={itemVariants}>
          <Flex justifyContent="center">
            <Button
              colorScheme="pink"
              size="lg"
              onClick={handleRegister}
              isLoading={isLoading}
              loadingText="Отправка..."
              isDisabled={!Boolean(registerData.personalData)}
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
              {isShopMode ? 'Зарегистрировать магазин' : 'Зарегистрироваться'}
            </Button>
          </Flex>
        </motion.div>

        <motion.div variants={itemVariants}>
          <Text textAlign="center" color="gray.300">
            {isShopMode ? 'Уже есть аккаунт магазина?' : 'Уже есть аккаунт?'}{' '}
            <Button
              variant="link"
              color={primaryColor}
              onClick={() => {
                setIsLogin(true);
                setIsShopMode(isShopMode); // Сохраняем текущий режим
              }}
              _hover={{ color: secondaryColor }}
            >
              {isShopMode ? 'Войти в магазин' : 'Войти'}
            </Button>
          </Text>
        </motion.div>
      </VStack>
    </motion.div>
  ), [registerData, showPassword, isLoading, handleRegister, handleRegisterFieldChange, handlePersonalDataChange, togglePasswordVisibility, switchToLogin, primaryColor, secondaryColor, borderColor, isShopMode]);

  const VerifyForm = useMemo(() => (
    <motion.div
      variants={containerVariants}
      initial="hidden"
      animate="visible"
    >
      <VStack spacing={6} align="stretch">
        <motion.div variants={itemVariants}>
          <Heading size="lg" textAlign="center" color={primaryColor}>
            {isShopMode ? 'Подтверждение email магазина' : 'Подтверждение email'}
          </Heading>
          <Text textAlign="center" color="gray.300" fontSize="sm">
            Введите код, отправленный на {verifyData.email}
          </Text>
        </motion.div>

        <motion.div variants={itemVariants}>
          <FormControl isRequired>
            <FormLabel color="white" fontWeight="semibold" textShadow="0 1px 2px rgba(0,0,0,0.5)">Код подтверждения</FormLabel>
            <Input
              color={fonColorForm}
              value={verifyData.code}
              onChange={handleVerifyFieldChange('code')}
              placeholder="123456"
              maxLength={6}
              textAlign="center"
              fontSize="xl"
              letterSpacing="0.5em"
              borderColor={borderColor}
              bg="rgba(255, 255, 255, 0.1)"
              _focus={{
                borderColor: primaryColor,
                boxShadow: `0 0 0 1px ${primaryColor}`,
                bg: "rgba(255, 255, 255, 0.15)",
              }}
            />
          </FormControl>
        </motion.div>

        <motion.div variants={itemVariants}>
          <Flex justifyContent="center">
            <Button
              colorScheme="pink"
              size="lg"
              onClick={handleVerify}
              isLoading={isLoading}
              loadingText="Проверка..."
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
              {isShopMode ? 'Подтвердить магазин' : 'Подтвердить'}
            </Button>
          </Flex>
        </motion.div>

        <motion.div variants={itemVariants}>
          <Text textAlign="center" color="gray.300">
            Не получили код?{' '}
            <Button
              variant="link"
              color={primaryColor}
              onClick={() => {
                setIsVerifying(false);
                setIsRegistering(true);
                setIsShopMode(isShopMode); // Сохраняем текущий режим
              }}
              _hover={{ color: secondaryColor }}
            >
              Отправить повторно
            </Button>
          </Text>
        </motion.div>
      </VStack>
    </motion.div>
  ), [verifyData, isLoading, handleVerify, handleVerifyFieldChange, primaryColor, secondaryColor, borderColor, isShopMode]);

  return (
    <Box
      minH="100vh"
      bg="gray.900"
      py={10}
      position="relative"
      overflow="hidden"
    >
      <FlowerBackground />

      {/* Glow эффекты */}
      <motion.div
        variants={glowVariants}
        initial="initial"
        animate="animate"
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
      />
      <motion.div
        variants={glowVariants}
        initial="initial"
        animate="animate"
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
      />

      <Container maxW="lg" position="relative" zIndex={1}>
        {/* Иконка дома в левом углу */}
        <Box position="absolute" top={4} left={4} zIndex={2}>
          <IconButton
            aria-label="На главную"
            icon={<FaHome />}
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
          />
        </Box>

        <Flex direction="column" align="center" mb={8}>
          <motion.div
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ duration: 0.5, type: "spring" }}
          >
            <Box
              position="relative"
              mb={4}
            >
              <Text
                fontSize="4xl"
                fontWeight="bold"
                bgGradient={`linear(to-r, ${primaryColor}, ${secondaryColor})`}
                bgClip="text"
                textAlign="center"
              >
                ❃ Flower Shop
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
            Мир прекрасных цветов
          </Badge>
        </Flex>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
        >
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
            {/* Контейнер для содержимого формы */}
            <Box position="relative" zIndex={1}>
              {isLogin && !isVerifying && LoginForm}
              {!isLogin && !isVerifying && RegisterForm}
              {isVerifying && VerifyForm}
            </Box>
          </Box>
        </motion.div>
      </Container>
    </Box>
  );
};

export default React.memo(OptimizedAuthForms); 