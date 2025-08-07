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

  React.useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
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

          {/* Кнопки действий */}
          <HStack spacing={4} display={{ base: 'none', md: 'flex' }}>
            <motion.div whileHover={{ scale: 1.05 }}>
              <Button
                variant="ghost"
                color="white"
                _hover={{
                  bg: 'rgba(255, 255, 255, 0.1)',
                  color: 'pink.300',
                }}
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
                  bgGradient: "linear(to-r, pink.500, purple.600)",
                  transform: 'translateY(-2px)',
                  boxShadow: '0 8px 25px rgba(236, 72, 153, 0.3)',
                }}
                transition="all 0.3s ease"
                onClick={() => router.push('/login')}
              >
                Регистрация
              </Button>
            </motion.div>
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
                    _hover={{
                      bgGradient: "linear(to-r, pink.500, purple.600)",
                    }}
                    onClick={() => {
                      router.push('/login');
                      onClose();
                    }}
                  >
                    Регистрация
                  </Button>
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
