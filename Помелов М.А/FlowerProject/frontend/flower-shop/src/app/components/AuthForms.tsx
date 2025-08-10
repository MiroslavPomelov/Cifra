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
  Divider,
  Heading,
  useColorModeValue,
  Container,
  Flex,
  Badge,
} from '@chakra-ui/react';
import { motion } from 'framer-motion';
// Простые иконки для показа/скрытия пароля
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
import FlowerBackground from './FlowerBackground';
import { API_CONFIG } from '../../config/api';
import { api, AuthResponse } from '../../config/axios';

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
  firstName: string;
  lastName: string;
  birthDate: string;
  phone: string;
  city: string;
  personalData: boolean;
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
  personalData: boolean;
}

const AuthForms: React.FC = () => {
  const [isLogin, setIsLogin] = useState(true);
  const [isRegistering, setIsRegistering] = useState(false);
  const [isVerifying, setIsVerifying] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  
  const toast = useToast();
  
  // Цвета для цветочной темы
  const bgColor = useColorModeValue('white', 'gray.800');
  const borderColor = useColorModeValue('pink.200', 'pink.600');
  const primaryColor = 'pink.500';
  const secondaryColor = 'purple.500';
  const accentColor = 'rose.400';

  // Оптимизированные обработчики изменения полей
  const handleLoginEmailChange = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
    setLoginData(prev => ({ ...prev, email: e.target.value }));
  }, []);

  const handleLoginPasswordChange = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
    setLoginData(prev => ({ ...prev, password: e.target.value }));
  }, []);

  const handleRegisterFieldChange = useCallback((field: keyof RegisterFormData) => (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    setRegisterData(prev => ({ ...prev, [field]: e.target.value }));
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

  const handleLogin = useCallback(async () => {
    setIsLoading(true);
    try {
      const response = await api.post<AuthResponse>(API_CONFIG.AUTH.LOGIN, loginData);
      
      toast({
        title: 'Успешный вход!',
        description: 'Добро пожаловать в мир цветов!',
        status: 'success',
        duration: 2000,
        isClosable: true,
      });
      
      localStorage.setItem('token', response.data.accessToken);
      
      // Перенаправляем на главную страницу
      setTimeout(() => {
        window.location.href = '/';
      }, 2000);
      
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
  }, [loginData, toast]);

  const handleRegister = useCallback(async () => {
    setIsLoading(true);
    try {
      await api.post(API_CONFIG.AUTH.REGISTRATION, registerData);
      
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
        ...registerData,
        code: ''
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
  }, [registerData, toast]);

  const handleVerify = useCallback(async () => {
    setIsLoading(true);
    try {
      const response = await api.post<AuthResponse>(API_CONFIG.AUTH.VERIFY, verifyData);
      
      toast({
        title: 'Регистрация завершена!',
        description: 'Добро пожаловать в мир цветов!',
        status: 'success',
        duration: 3000,
        isClosable: true,
      });
      
      // Сохраняем токен
      localStorage.setItem('token', response.data.accessToken);
      
      // Автоматически входим в систему
      try {
        const loginResponse = await api.post<AuthResponse>(API_CONFIG.AUTH.LOGIN, {
          email: verifyData.email,
          password: verifyData.password
        });
        
        if (loginResponse.data.accessToken) {
          localStorage.setItem('token', loginResponse.data.accessToken);
          
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
  }, [verifyData, toast]);

  const LoginForm = () => (
    <motion.div
      variants={containerVariants}
      initial="hidden"
      animate="visible"
    >
      <VStack spacing={6} align="stretch">
        <motion.div variants={itemVariants}>
          <Heading size="lg" textAlign="center" color={primaryColor}>
            Добро пожаловать в мир цветов
          </Heading>
        </motion.div>

        <motion.div variants={itemVariants}>
          <FormControl isRequired>
            <FormLabel color="gray.600">Email</FormLabel>
            <Input
              type="email"
              value={loginData.email}
              onChange={handleLoginEmailChange}
              placeholder="your@email.com"
              borderColor={borderColor}
              _focus={{
                borderColor: primaryColor,
                boxShadow: `0 0 0 1px ${primaryColor}`,
              }}
            />
          </FormControl>
        </motion.div>

        <motion.div variants={itemVariants}>
          <FormControl isRequired>
            <FormLabel color="gray.600">Пароль</FormLabel>
            <InputGroup>
              <Input
                type={showPassword ? 'text' : 'password'}
                value={loginData.password}
                onChange={handleLoginPasswordChange}
                placeholder="Введите пароль"
                borderColor={borderColor}
                _focus={{
                  borderColor: primaryColor,
                  boxShadow: `0 0 0 1px ${primaryColor}`,
                }}
              />
              <InputRightElement>
                <IconButton
                  aria-label={showPassword ? 'Скрыть пароль' : 'Показать пароль'}
                  icon={showPassword ? <ViewOffIcon /> : <ViewIcon />}
                  onClick={() => setShowPassword(!showPassword)}
                  variant="ghost"
                  size="sm"
                />
              </InputRightElement>
            </InputGroup>
          </FormControl>
        </motion.div>

        <motion.div variants={itemVariants}>
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
            Войти
          </Button>
        </motion.div>

        <motion.div variants={itemVariants}>
          <Text textAlign="center" color="gray.500">
            Нет аккаунта?{' '}
            <Button
              variant="link"
              color={primaryColor}
              onClick={() => setIsLogin(false)}
              _hover={{ color: secondaryColor }}
            >
              Зарегистрироваться
            </Button>
          </Text>
        </motion.div>
      </VStack>
    </motion.div>
  );

  const RegisterForm = () => (
    <motion.div
      variants={containerVariants}
      initial="hidden"
      animate="visible"
    >
      <VStack spacing={6} align="stretch">
        <motion.div variants={itemVariants}>
          <Heading size="lg" textAlign="center" color={primaryColor}>
            Создайте аккаунт
          </Heading>
          <Text textAlign="center" color="gray.500" fontSize="sm">
            Присоединяйтесь к миру прекрасных цветов
          </Text>
        </motion.div>

        <HStack spacing={4}>
          <motion.div variants={itemVariants} style={{ flex: 1 }}>
            <FormControl isRequired>
              <FormLabel color="gray.600">Имя</FormLabel>
              <Input
                value={registerData.firstName}
                onChange={(e) => setRegisterData({...registerData, firstName: e.target.value})}
                placeholder="Иван"
                borderColor={borderColor}
                _focus={{
                  borderColor: primaryColor,
                  boxShadow: `0 0 0 1px ${primaryColor}`,
                }}
              />
            </FormControl>
          </motion.div>
          <motion.div variants={itemVariants} style={{ flex: 1 }}>
            <FormControl isRequired>
              <FormLabel color="gray.600">Фамилия</FormLabel>
              <Input
                value={registerData.lastName}
                onChange={(e) => setRegisterData({...registerData, lastName: e.target.value})}
                placeholder="Иванов"
                borderColor={borderColor}
                _focus={{
                  borderColor: primaryColor,
                  boxShadow: `0 0 0 1px ${primaryColor}`,
                }}
              />
            </FormControl>
          </motion.div>
        </HStack>

        <motion.div variants={itemVariants}>
          <FormControl isRequired>
            <FormLabel color="gray.600">Email</FormLabel>
            <Input
              type="email"
              value={registerData.email}
              onChange={(e) => setRegisterData({...registerData, email: e.target.value})}
              placeholder="your@email.com"
              borderColor={borderColor}
              _focus={{
                borderColor: primaryColor,
                boxShadow: `0 0 0 1px ${primaryColor}`,
              }}
            />
          </FormControl>
        </motion.div>

        <motion.div variants={itemVariants}>
          <FormControl isRequired>
            <FormLabel color="gray.600">Пароль</FormLabel>
            <InputGroup>
              <Input
                type={showPassword ? 'text' : 'password'}
                value={registerData.password}
                onChange={(e) => setRegisterData({...registerData, password: e.target.value})}
                placeholder="Минимум 6 символов"
                borderColor={borderColor}
                _focus={{
                  borderColor: primaryColor,
                  boxShadow: `0 0 0 1px ${primaryColor}`,
                }}
              />
              <InputRightElement>
                <IconButton
                  aria-label={showPassword ? 'Скрыть пароль' : 'Показать пароль'}
                  icon={showPassword ? <ViewOffIcon /> : <ViewIcon />}
                  onClick={() => setShowPassword(!showPassword)}
                  variant="ghost"
                  size="sm"
                />
              </InputRightElement>
            </InputGroup>
          </FormControl>
        </motion.div>

        <HStack spacing={4}>
          <motion.div variants={itemVariants} style={{ flex: 1 }}>
            <FormControl isRequired>
              <FormLabel color="gray.600">Дата рождения</FormLabel>
              <Input
                type="date"
                value={registerData.birthDate}
                onChange={(e) => setRegisterData({...registerData, birthDate: e.target.value})}
                borderColor={borderColor}
                _focus={{
                  borderColor: primaryColor,
                  boxShadow: `0 0 0 1px ${primaryColor}`,
                }}
              />
            </FormControl>
          </motion.div>
          <motion.div variants={itemVariants} style={{ flex: 1 }}>
            <FormControl isRequired>
              <FormLabel color="gray.600">Телефон</FormLabel>
              <Input
                value={registerData.phone}
                onChange={(e) => setRegisterData({...registerData, phone: e.target.value})}
                placeholder="+7 (999) 123-45-67"
                borderColor={borderColor}
                _focus={{
                  borderColor: primaryColor,
                  boxShadow: `0 0 0 1px ${primaryColor}`,
                }}
              />
            </FormControl>
          </motion.div>
        </HStack>

        <motion.div variants={itemVariants}>
          <FormControl isRequired>
            <FormLabel color="gray.600">Город</FormLabel>
            <Select
              value={registerData.city}
              onChange={(e) => setRegisterData({...registerData, city: e.target.value})}
              placeholder="Выберите город"
              borderColor={borderColor}
              _focus={{
                borderColor: primaryColor,
                boxShadow: `0 0 0 1px ${primaryColor}`,
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

        <motion.div variants={itemVariants}>
          <Checkbox
            isChecked={registerData.personalData}
            onChange={(e) => setRegisterData({...registerData, personalData: e.target.checked})}
            colorScheme="pink"
          >
            <Text fontSize="sm" color="gray.600">
              Я согласен на обработку персональных данных
            </Text>
          </Checkbox>
        </motion.div>

        <motion.div variants={itemVariants}>
          <Button
            colorScheme="pink"
            size="lg"
            onClick={handleRegister}
            isLoading={isLoading}
            loadingText="Отправка..."
            isDisabled={!registerData.personalData}
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
            Зарегистрироваться
          </Button>
        </motion.div>

        <motion.div variants={itemVariants}>
          <Text textAlign="center" color="gray.500">
            Уже есть аккаунт?{' '}
            <Button
              variant="link"
              color={primaryColor}
              onClick={() => setIsLogin(true)}
              _hover={{ color: secondaryColor }}
            >
              Войти
            </Button>
          </Text>
        </motion.div>
      </VStack>
    </motion.div>
  );

  const VerifyForm = () => (
    <motion.div
      variants={containerVariants}
      initial="hidden"
      animate="visible"
    >
      <VStack spacing={6} align="stretch">
        <motion.div variants={itemVariants}>
          <Heading size="lg" textAlign="center" color={primaryColor}>
            Подтверждение email
          </Heading>
          <Text textAlign="center" color="gray.500" fontSize="sm">
            Введите код, отправленный на {verifyData.email}
          </Text>
        </motion.div>

        <motion.div variants={itemVariants}>
          <FormControl isRequired>
            <FormLabel color="gray.600">Код подтверждения</FormLabel>
            <Input
              value={verifyData.code}
              onChange={(e) => setVerifyData({...verifyData, code: e.target.value})}
              placeholder="123456"
              maxLength={6}
              textAlign="center"
              fontSize="xl"
              letterSpacing="0.5em"
              borderColor={borderColor}
              _focus={{
                borderColor: primaryColor,
                boxShadow: `0 0 0 1px ${primaryColor}`,
              }}
            />
          </FormControl>
        </motion.div>

        <motion.div variants={itemVariants}>
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
            Подтвердить
          </Button>
        </motion.div>

        <motion.div variants={itemVariants}>
          <Text textAlign="center" color="gray.500">
            Не получили код?{' '}
            <Button
              variant="link"
              color={primaryColor}
              onClick={() => {
                setIsVerifying(false);
                setIsRegistering(true);
              }}
              _hover={{ color: secondaryColor }}
            >
              Отправить повторно
            </Button>
          </Text>
        </motion.div>
      </VStack>
    </motion.div>
  );

  return (
    <Box
      minH="100vh"
      bgGradient={`linear(to-br, ${primaryColor}10, ${secondaryColor}10, ${accentColor}10)`}
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

      <Container maxW="md" position="relative" zIndex={1}>
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
                🌸 Flower Shop
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
            colorScheme="pink"
            variant="subtle"
            px={3}
            py={1}
            borderRadius="full"
            fontSize="sm"
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
            bg={bgColor}
            p={8}
            borderRadius="2xl"
            boxShadow="0 20px 40px rgba(0, 0, 0, 0.1)"
            border="1px solid"
            borderColor={borderColor}
            position="relative"
            overflow="hidden"
          >
            {/* Дополнительный glow эффект для формы */}
            <motion.div
              style={{
                position: 'absolute',
                top: '-50%',
                left: '-50%',
                width: '200%',
                height: '200%',
                background: `conic-gradient(from 0deg, transparent, ${primaryColor}10, transparent)`,
                borderRadius: '50%',
                zIndex: -1,
              }}
              animate={{
                rotate: 360,
              }}
              transition={{
                duration: 20,
                repeat: Infinity,
                ease: "linear"
              }}
            />

            {isLogin && !isVerifying && <LoginForm />}
            {!isLogin && !isVerifying && <RegisterForm />}
            {isVerifying && <VerifyForm />}
          </Box>
        </motion.div>
      </Container>
    </Box>
  );
};

export default React.memo(AuthForms); 