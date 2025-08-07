'use client';
import React from 'react';
import {
  Box,
  Container,
  Text,
  VStack,
  HStack,
  Icon,
  Link,
  Divider,
} from '@chakra-ui/react';
import { motion } from 'framer-motion';
import { FaHeart, FaPhone, FaEnvelope, FaMapMarkerAlt } from 'react-icons/fa';

const Footer: React.FC = () => {
  return (
    <Box
      as="footer"
      bg="rgba(0, 0, 0, 0.8)"
      backdropFilter="blur(10px)"
      borderTop="1px solid rgba(255, 255, 255, 0.1)"
      py={12}
      position="relative"
      overflow="hidden"
    >
      {/* Фоновый эффект */}
      <motion.div
        style={{
          position: 'absolute',
          bottom: '10%',
          left: '10%',
          width: '200px',
          height: '200px',
          background: 'radial-gradient(circle, rgba(236, 72, 153, 0.05), transparent)',
          borderRadius: '50%',
          filter: 'blur(40px)',
          willChange: 'transform',
        }}
        animate={{
          scale: [1, 1.3, 1],
          opacity: [0.1, 0.2, 0.1],
        }}
        transition={{
          duration: 10,
          repeat: Infinity,
          ease: "easeInOut",
        }}
      />

      <Container maxW="7xl" position="relative" zIndex={1}>
        <VStack spacing={8}>
          {/* Основная информация */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <VStack spacing={6} textAlign="center">
              <Text
                fontSize={{ base: '2xl', md: '3xl' }}
                fontWeight="bold"
                bgGradient="linear(to-r, white, pink.200)"
                bgClip="text"
              >
                Цветочный рай
              </Text>
              
              <Text
                fontSize={{ base: 'md', md: 'lg' }}
                color="gray.300"
                maxW="600px"
                lineHeight="1.6"
              >
                Создаем незабываемые моменты с помощью прекрасных букетов и композиций. 
                Каждый цветок рассказывает свою историю любви и красоты.
              </Text>
            </VStack>
          </motion.div>

          <Divider borderColor="rgba(255, 255, 255, 0.1)" />

          {/* Контактная информация */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            <VStack spacing={4}>
              <HStack spacing={8} flexWrap="wrap" justify="center">
                <HStack spacing={2}>
                  <Icon as={FaPhone} color="pink.300" boxSize={4} />
                  <Text color="gray.300" fontSize="sm">
                    +7 (495) 123-45-67
                  </Text>
                </HStack>
                
                <HStack spacing={2}>
                  <Icon as={FaEnvelope} color="pink.300" boxSize={4} />
                  <Text color="gray.300" fontSize="sm">
                    info@flowerparadise.ru
                  </Text>
                </HStack>
                
                <HStack spacing={2}>
                  <Icon as={FaMapMarkerAlt} color="pink.300" boxSize={4} />
                  <Text color="gray.300" fontSize="sm">
                    г. Москва, ул. Цветочная, 15
                  </Text>
                </HStack>
              </HStack>
            </VStack>
          </motion.div>

          <Divider borderColor="rgba(255, 255, 255, 0.1)" />

          {/* Нижняя часть */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.4 }}
          >
            <VStack spacing={4}>
              <HStack spacing={6} flexWrap="wrap" justify="center">
                <Link
                  href="/about"
                  color="gray.300"
                  fontSize="sm"
                  _hover={{ color: 'pink.300' }}
                  transition="color 0.3s ease"
                >
                  О нас
                </Link>
                <Link
                  href="/delivery"
                  color="gray.300"
                  fontSize="sm"
                  _hover={{ color: 'pink.300' }}
                  transition="color 0.3s ease"
                >
                  Доставка
                </Link>
                <Link
                  href="/contacts"
                  color="gray.300"
                  fontSize="sm"
                  _hover={{ color: 'pink.300' }}
                  transition="color 0.3s ease"
                >
                  Контакты
                </Link>
                <Link
                  href="/privacy"
                  color="gray.300"
                  fontSize="sm"
                  _hover={{ color: 'pink.300' }}
                  transition="color 0.3s ease"
                >
                  Политика конфиденциальности
                </Link>
              </HStack>
              
              <HStack spacing={2}>
                <Text color="gray.400" fontSize="sm">
                  Создано с
                </Text>
                <Icon as={FaHeart} color="pink.400" boxSize={3} />
                <Text color="gray.400" fontSize="sm">
                  для любителей цветов
                </Text>
              </HStack>
              
              <Text color="gray.500" fontSize="xs">
                © 2025 Цветочный рай. Все права защищены.
              </Text>
            </VStack>
          </motion.div>
        </VStack>
      </Container>
    </Box>
  );
};

export default Footer;

