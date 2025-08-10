'use client';
import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import {
  Box,
  Flex,
  Text,
  Button,
  HStack,
  VStack,
  IconButton,
  Avatar,
  Menu,
  MenuButton,
  MenuList,
  MenuItem,
  useDisclosure,
  Drawer,
  DrawerBody,
  DrawerHeader,
  DrawerOverlay,
  DrawerContent,
  DrawerCloseButton,
  Badge,
  Divider,
} from '@chakra-ui/react';
import { motion } from 'framer-motion';
import { FaShoppingCart, FaTrash, FaEye } from 'react-icons/fa';

const Header: React.FC = () => {
  const router = useRouter();
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [isScrolled, setIsScrolled] = useState(false);
  const [authName, setAuthName] = useState<string | null>(null);
  const [authEmail, setAuthEmail] = useState<string | null>(null);
  const [authRole, setAuthRole] = useState<'user' | 'shop' | null>(null);
  const [cartItemCount, setCartItemCount] = useState(0);
  const [cartItems, setCartItems] = useState<any[]>([]);
  
  const handleLogout = () => {
    try {
      localStorage.removeItem('token');
      localStorage.removeItem('shop');
    } catch {}
    setAuthName(null);
    setAuthEmail(null);
    setAuthRole(null);
    router.push('/home');
  };

  const handleProfile = () => {
    if (authRole === 'shop') {
      router.push('/shop/dashboard');
    } else {
      router.push('/profile');
    }
  };

  // Функция для загрузки корзины
  const loadCart = () => {
    try {
      console.log('Header: Загрузка корзины...');
      const savedCart = localStorage.getItem('cart');
      console.log('Header: Данные из localStorage:', savedCart);
      
      if (savedCart) {
        const items = JSON.parse(savedCart);
        console.log('Header: Парсинг корзины:', items);
        setCartItems(items);
        const totalCount = items.reduce((sum: number, item: any) => sum + (item.quantity || 0), 0);
        console.log('Header: Общее количество товаров:', totalCount);
        setCartItemCount(totalCount);
      } else {
        console.log('Header: Корзина пуста');
        setCartItems([]);
        setCartItemCount(0);
      }
    } catch (error) {
      console.error('Header: Ошибка загрузки корзины:', error);
      setCartItems([]);
      setCartItemCount(0);
    }
  };

  // Функция для удаления товара из корзины
  const removeFromCart = (itemId: number) => {
    try {
      const updatedCart = cartItems.filter(item => item.id !== itemId);
      localStorage.setItem('cart', JSON.stringify(updatedCart));
      setCartItems(updatedCart);
      const totalCount = updatedCart.reduce((sum: number, item: any) => sum + (item.quantity || 0), 0);
      setCartItemCount(totalCount);
      window.dispatchEvent(new Event('cartUpdated'));
    } catch (error) {
      console.error('Ошибка удаления товара:', error);
    }
  };

  // Функция для очистки корзины
  const clearCart = () => {
    try {
      localStorage.removeItem('cart');
      setCartItems([]);
      setCartItemCount(0);
      window.dispatchEvent(new Event('cartUpdated'));
    } catch (error) {
      console.error('Ошибка очистки корзины:', error);
    }
  };

  React.useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Простая функция декодирования JWT без зависимостей
  function parseJwt(token: string): any | null {
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
  }

  // Инициализация отображаемого имени из localStorage (token + shop)
  React.useEffect(() => {
    const token = typeof window !== 'undefined' ? localStorage.getItem('token') : null;
    if (!token) {
      setAuthName(null);
      setAuthEmail(null);
      setAuthRole(null);
      return;
    }
    const payload = parseJwt(token);
    if (payload) {
      const email: string | undefined = payload.email;
      const role: string | undefined = payload.role;
      setAuthEmail(email ?? null);
      if (role === 'shop') {
        setAuthRole('shop');
        // Пытаемся взять имя магазина из localStorage
        try {
          const shopRaw = localStorage.getItem('shop');
          if (shopRaw) {
            const shop = JSON.parse(shopRaw);
            setAuthName(shop?.name || email?.split('@')[0] || 'Магазин');
          } else {
            setAuthName(email?.split('@')[0] || 'Магазин');
          }
        } catch {
          setAuthName(email?.split('@')[0] || 'Магазин');
        }
      } else {
        setAuthRole('user');
        const firstName: string | undefined = payload.firstName;
        const lastName: string | undefined = payload.lastName;
        const fullName = [firstName, lastName].filter(Boolean).join(' ').trim();
        setAuthName(fullName || email?.split('@')[0] || 'Пользователь');
      }
    }
  }, []);

  // Загрузка корзины при монтировании и при изменениях
  React.useEffect(() => {
    loadCart();

    // Слушаем изменения в localStorage для обновления корзины
    const handleStorageChange = (e: StorageEvent) => {
      console.log('Header: Storage event:', e);
      if (e.key === 'cart') {
        console.log('Header: Обнаружено изменение корзины в localStorage');
        loadCart();
      }
    };

    window.addEventListener('storage', handleStorageChange);
    
    // Также слушаем изменения в текущем окне
    const handleCartUpdate = () => {
      console.log('Header: Получено событие cartUpdated');
      loadCart();
    };

    window.addEventListener('cartUpdated', handleCartUpdate);

    return () => {
      window.removeEventListener('storage', handleStorageChange);
      window.removeEventListener('cartUpdated', handleCartUpdate);
    };
  }, []);

  const bgColor = isScrolled 
    ? 'rgba(0, 0, 0, 0.8)' 
    : 'rgba(0, 0, 0, 0.3)';

  const navItems = [
    { name: 'Главная', href: '#home' },
    { name: 'Каталог', href: '#catalog' },
    { name: 'О нас', href: '#about' },
    { name: 'Контакты', href: '#contact' },
  ];

  const scrollToSection = (href: string) => {
    const element = document.querySelector(href);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <motion.div
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      transition={{ duration: 0.6 }}
    >
      <Box
        position="fixed"
        top={0}
        left={0}
        right={0}
        zIndex={1000}
        bg={bgColor}
        backdropFilter="blur(10px)"
        borderBottom="1px solid rgba(255, 255, 255, 0.1)"
        transition="all 0.3s ease"
      >
        <Flex
          maxW="7xl"
          mx="auto"
          px={6}
          py={4}
          align="center"
          justify="space-between"
        >
          {/* Логотип */}
          <motion.div
            whileHover={{ scale: 1.05 }}
            transition={{ duration: 0.2 }}
          >
            <Text
              fontSize="2xl"
              fontWeight="bold"
              bgGradient="linear(to-r, pink.400, purple.500)"
              bgClip="text"
              cursor="pointer"
              onClick={() => router.push('/home')}
            >
              ❃ Flower Shop
            </Text>
          </motion.div>

          {/* Десктопная навигация */}
          <HStack spacing={8} display={{ base: 'none', md: 'flex' }}>
            {navItems.map((item) => (
              <motion.div
                key={item.name}
                whileHover={{ y: -2 }}
                transition={{ duration: 0.2 }}
              >
                <Text
                  color="white"
                  fontSize="md"
                  fontWeight="medium"
                  cursor="pointer"
                  _hover={{
                    color: 'pink.300',
                    textShadow: '0 0 8px rgba(236, 72, 153, 0.5)',
                  }}
                  transition="all 0.3s ease"
                  onClick={() => scrollToSection(item.href)}
                >
                  {item.name}
                </Text>
              </motion.div>
            ))}
          </HStack>

          {/* Кнопки действий / Профиль и Корзина */}
          <HStack spacing={4} display={{ base: 'none', md: 'flex' }}>
            {authName ? (
              <>
                {/* Профиль */}
                <Menu placement="bottom-end" autoSelect={false}>
                  <MenuButton as={Button} variant="ghost" p={0} _hover={{ bg: 'rgba(255,255,255,0.06)' }}>
                    <HStack spacing={3} color="white" px={3} py={1.5}>
                      <Avatar name={authName} size="sm" bg="pink.400" color="white" />
                      <VStack spacing={0} align="start">
                        <Text fontSize="sm" fontWeight="semibold" noOfLines={1} maxW="180px">
                          {authName}
                        </Text>
                        {authRole === 'shop' && (
                          <Text fontSize="xs" color="pink.300">Магазин</Text>
                        )}
                      </VStack>
                    </HStack>
                  </MenuButton>
                  <MenuList 
                    bg="rgba(255, 255, 255, 0.95)" 
                    border="1px solid rgba(236, 72, 153, 0.2)" 
                    backdropFilter="blur(10px)"
                    boxShadow="0 8px 32px rgba(0, 0, 0, 0.1)"
                    borderRadius="12px"
                    py={2}
                  >
                    <MenuItem 
                      onClick={handleProfile} 
                      _hover={{ 
                        bg: 'rgba(236, 72, 153, 0.1)', 
                        color: 'pink.600',
                        transform: 'translateX(4px)'
                      }} 
                      color="gray.700"
                      fontWeight="medium"
                      transition="all 0.2s ease"
                      px={4}
                      py={3}
                    >
                      Профиль
                    </MenuItem>
                    <MenuItem 
                      onClick={handleLogout} 
                      _hover={{ 
                        bg: 'rgba(236, 72, 153, 0.1)', 
                        color: 'pink.600',
                        transform: 'translateX(4px)'
                      }} 
                      color="gray.700"
                      fontWeight="medium"
                      transition="all 0.2s ease"
                      px={4}
                      py={3}
                    >
                      Выйти
                    </MenuItem>
                  </MenuList>
                </Menu>

                {/* Корзина */}
                <Menu placement="bottom-end" autoSelect={false}>
                  <MenuButton as={IconButton} variant="ghost" p={0} _hover={{ bg: 'rgba(255,255,255,0.06)' }}>
                    <Box position="relative">
                      <FaShoppingCart size={20} color="white" />
                      <Badge
                        position="absolute"
                        top="-8px"
                        right="-8px"
                        colorScheme="pink"
                        borderRadius="full"
                        fontSize="xs"
                        minW="20px"
                        h="20px"
                        display="flex"
                        alignItems="center"
                        justifyContent="center"
                      >
                        {cartItemCount}
                      </Badge>
                    </Box>
                  </MenuButton>
                  <MenuList 
                    bg="rgba(255, 255, 255, 0.95)" 
                    border="1px solid rgba(236, 72, 153, 0.2)" 
                    backdropFilter="blur(10px)"
                    boxShadow="0 8px 32px rgba(0, 0, 0, 0.1)"
                    borderRadius="12px"
                    py={2}
                    minW="300px"
                  >
                    {cartItems.length === 0 ? (
                      <Box px={4} py={6} textAlign="center">
                        <Text color="gray.500" fontSize="sm">Корзина пуста</Text>
                      </Box>
                    ) : (
                      <>
                        <Box px={4} py={2}>
                          <Text fontSize="sm" fontWeight="semibold" color="gray.700">
                            Товары в корзине ({cartItemCount})
                          </Text>
                        </Box>
                        <Divider />
                        <Box maxH="300px" overflowY="auto">
                          {cartItems.map((item, index) => (
                            <Box key={item.id || index} px={4} py={2}>
                              <HStack justify="space-between" align="start">
                                <VStack align="start" spacing={1} flex={1}>
                                  <Text fontSize="sm" fontWeight="medium" color="gray.700" noOfLines={2}>
                                    {item.name}
                                  </Text>
                                  <Text fontSize="xs" color="gray.500">
                                    {item.quantity} шт. × {item.price} ₽
                                  </Text>
                                </VStack>
                                <IconButton
                                  aria-label="Удалить товар"
                                  icon={<FaTrash size={12} />}
                                  size="sm"
                                  variant="ghost"
                                  color="red.400"
                                  _hover={{ bg: 'red.50' }}
                                  onClick={() => removeFromCart(item.id)}
                                />
                              </HStack>
                              {index < cartItems.length - 1 && <Divider mt={2} />}
                            </Box>
                          ))}
                        </Box>
                        <Divider />
                        <Box px={4} py={2}>
                          <HStack justify="space-between" spacing={2}>
                            <Button
                              size="sm"
                              variant="ghost"
                              color="red.500"
                              _hover={{ bg: 'red.50' }}
                              onClick={clearCart}
                              leftIcon={<FaTrash />}
                            >
                              Очистить
                            </Button>
                            <Button
                              size="sm"
                              bgGradient="linear(to-r, pink.400, purple.500)"
                              color="white"
                              _hover={{
                                bgGradient: 'linear(to-r, pink.500, purple.600)',
                              }}
                              onClick={() => router.push('/cart')}
                              leftIcon={<FaEye />}
                            >
                              Перейти к корзине
                            </Button>
                          </HStack>
                        </Box>
                      </>
                    )}
                  </MenuList>
                </Menu>
              </>
            ) : (
              <>
                <motion.div whileHover={{ scale: 1.05 }}>
                  <Button
                    variant="ghost"
                    color="white"
                    _hover={{ bg: 'rgba(255, 255, 255, 0.1)', color: 'pink.300' }}
                    transition="all 0.3s ease"
                    onClick={() => router.push('/login')}
                  >
                    Войти
                  </Button>
                </motion.div>
                <motion.div whileHover={{ scale: 1.05 }}>
                  <Button
                    bgGradient="linear(to-r, pink.400, purple.500)"
                    color="white"
                    _hover={{
                      bgGradient: 'linear(to-r, pink.500, purple.600)',
                      transform: 'translateY(-2px)',
                      boxShadow: '0 8px 25px rgba(236, 72, 153, 0.3)',
                    }}
                    transition="all 0.3s ease"
                    onClick={() => router.push('/login')}
                  >
                    Регистрация
                  </Button>
                </motion.div>
              </>
            )}
          </HStack>

          {/* Мобильное меню */}
          <IconButton
            display={{ base: 'flex', md: 'none' }}
            onClick={onOpen}
            icon={
              <Box>
                <Box w="6" h="0.5" bg="white" mb="1" />
                <Box w="6" h="0.5" bg="white" mb="1" />
                <Box w="6" h="0.5" bg="white" />
              </Box>
            }
            variant="ghost"
            aria-label="Открыть меню"
            _hover={{ bg: 'rgba(255, 255, 255, 0.1)' }}
          />

          {/* Мобильное меню drawer */}
          <Drawer isOpen={isOpen} placement="right" onClose={onClose}>
            <DrawerOverlay />
            <DrawerContent bg="rgba(0, 0, 0, 0.9)" backdropFilter="blur(10px)">
              <DrawerCloseButton color="white" />
              <DrawerHeader>
                <Text
                  fontSize="xl"
                  fontWeight="bold"
                  bgGradient="linear(to-r, pink.400, purple.500)"
                  bgClip="text"
                >
                  ❃ Flower Shop
                </Text>
              </DrawerHeader>
              <DrawerBody>
                <VStack spacing={6} align="stretch">
                  {/* Корзина в мобильном меню */}
                  <Button
                    variant="ghost"
                    color="white"
                    _hover={{ bg: 'rgba(255, 255, 255, 0.1)' }}
                    onClick={() => {
                      router.push('/cart');
                      onClose();
                    }}
                    leftIcon={<FaShoppingCart />}
                    justifyContent="flex-start"
                    w="full"
                  >
                    Корзина
                  </Button>
                  
                  {navItems.map((item) => (
                    <Text
                      key={item.name}
                      color="white"
                      fontSize="lg"
                      fontWeight="medium"
                      cursor="pointer"
                      _hover={{ color: 'pink.300' }}
                      onClick={() => {
                        scrollToSection(item.href);
                        onClose();
                      }}
                    >
                      {item.name}
                    </Text>
                  ))}
                  {authName ? (
                    <>
                      <HStack spacing={3} color="white">
                        <Avatar name={authName} size="sm" bg="pink.400" color="white" />
                        <VStack spacing={0} align="start">
                          <Text fontSize="md" fontWeight="semibold">{authName}</Text>
                          {authRole === 'shop' && (
                            <Text fontSize="xs" color="pink.300">Магазин</Text>
                          )}
                        </VStack>
                      </HStack>
                      <Button
                        variant="ghost"
                        color="white"
                        _hover={{ bg: 'rgba(255, 255, 255, 0.1)' }}
                        onClick={() => {
                          handleProfile();
                          onClose();
                        }}
                      >
                        Профиль
                      </Button>
                      <Button
                        variant="ghost"
                        color="white"
                        _hover={{ bg: 'rgba(255, 255, 255, 0.1)' }}
                        onClick={() => {
                          handleLogout();
                          onClose();
                        }}
                      >
                        Выйти
                      </Button>
                    </>
                  ) : (
                    <>
                      <Button
                        variant="ghost"
                        color="white"
                        _hover={{ bg: 'rgba(255, 255, 255, 0.1)' }}
                        onClick={() => {
                          router.push('/login');
                          onClose();
                        }}
                      >
                        Войти
                      </Button>
                      <Button
                        bgGradient="linear(to-r, pink.400, purple.500)"
                        color="white"
                        _hover={{ bgGradient: 'linear(to-r, pink.500, purple.600)' }}
                        onClick={() => {
                          router.push('/login');
                          onClose();
                        }}
                      >
                        Регистрация
                      </Button>
                    </>
                  )}
                </VStack>
              </DrawerBody>
            </DrawerContent>
          </Drawer>
        </Flex>
      </Box>
    </motion.div>
  );
};

export default Header;
