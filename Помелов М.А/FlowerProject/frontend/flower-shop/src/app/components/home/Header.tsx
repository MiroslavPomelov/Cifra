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
} from '@chakra-ui/react';
import { motion } from 'framer-motion';

const Header: React.FC = () => {
  const router = useRouter();
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [isScrolled, setIsScrolled] = useState(false);
  const [authName, setAuthName] = useState<string | null>(null);
  const [authEmail, setAuthEmail] = useState<string | null>(null);
  const [authRole, setAuthRole] = useState<'user' | 'shop' | null>(null);
  
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
      router.push('/home');
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

  const bgColor = isScrolled 
    ? 'rgba(0, 0, 0, 0.8)' 
    : 'rgba(0, 0, 0, 0.3)';

  const navItems = [
    { name: 'Главная', href: '#home' },
    { name: 'Каталог', href: '#catalog' },
    { name: 'О нас', href: '#about' },
    { name: 'Контакты', href: '#contact' },
  ];

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
                >
                  {item.name}
                </Text>
              </motion.div>
            ))}
          </HStack>

          {/* Кнопки действий / Профиль */}
          <HStack spacing={4} display={{ base: 'none', md: 'flex' }}>
            {authName ? (
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
                <MenuList bg="rgba(0, 0, 0, 0.9)" border="1px solid rgba(255,255,255,0.08)" backdropFilter="blur(10px)">
                  <MenuItem onClick={handleProfile} _hover={{ bg: 'rgba(255,255,255,0.06)' }} color="white">
                    Профиль
                  </MenuItem>
                  <MenuItem onClick={handleLogout} _hover={{ bg: 'rgba(255,255,255,0.06)' }} color="white">
                    Выйти
                  </MenuItem>
                </MenuList>
              </Menu>
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
                  {navItems.map((item) => (
                    <Text
                      key={item.name}
                      color="white"
                      fontSize="lg"
                      fontWeight="medium"
                      cursor="pointer"
                      _hover={{ color: 'pink.300' }}
                      onClick={onClose}
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
