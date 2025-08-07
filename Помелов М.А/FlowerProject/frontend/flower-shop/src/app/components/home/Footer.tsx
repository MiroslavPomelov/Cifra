'use client';
import React from 'react';
import {
  Box,
  Container,
  Text,
  VStack,
  HStack,
  SimpleGrid,
  Link,
  useColorModeValue,
} from '@chakra-ui/react';
import { motion } from 'framer-motion';

const Footer: React.FC = () => {
  const footerLinks = {
    company: [
      { name: 'О нас', href: '#about' },
      { name: 'Наша команда', href: '#team' },
      { name: 'Карьера', href: '#careers' },
      { name: 'Блог', href: '#blog' },
    ],
    services: [
      { name: 'Букеты', href: '#bouquets' },
      { name: 'Доставка', href: '#delivery' },
      { name: 'Подарочные сертификаты', href: '#gifts' },
      { name: 'Корпоративные заказы', href: '#corporate' },
    ],
    support: [
      { name: 'Помощь', href: '#help' },
      { name: 'Контакты', href: '#contact' },
      { name: 'FAQ', href: '#faq' },
      { name: 'Возврат', href: '#returns' },
    ],
    legal: [
      { name: 'Политика конфиденциальности', href: '#privacy' },
      { name: 'Условия использования', href: '#terms' },
      { name: 'Политика возврата', href: '#refund' },
      { name: 'Безопасность', href: '#security' },
    ],
  };

  const socialLinks = [
    { name: 'Instagram', icon: '📷', href: '#instagram' },
    { name: 'Facebook', icon: '📘', href: '#facebook' },
    { name: 'Twitter', icon: '🐦', href: '#twitter' },
    { name: 'YouTube', icon: '📺', href: '#youtube' },
  ];

  return (
    <Box
      bg="rgba(0, 0, 0, 0.8)"
      backdropFilter="blur(10px)"
      borderTop="1px solid rgba(255, 255, 255, 0.1)"
      position="relative"
      overflow="hidden"
    >
      {/* Фоновые эффекты */}
      <motion.div
        style={{
          position: 'absolute',
          top: '10%',
          right: '10%',
          width: '200px',
          height: '200px',
          background: 'radial-gradient(circle, rgba(236, 72, 153, 0.05), transparent)',
          borderRadius: '50%',
          filter: 'blur(30px)',
        }}
        animate={{
          scale: [1, 1.2, 1],
          opacity: [0.2, 0.4, 0.2],
        }}
        transition={{
          duration: 6,
          repeat: Infinity,
          ease: "easeInOut",
        }}
      />

      <Container maxW="7xl" position="relative" zIndex={1}>
        <VStack spacing={12} py={16}>
          {/* Основной контент футера */}
          <SimpleGrid
            columns={{ base: 1, md: 2, lg: 4 }}
            spacing={8}
            w="full"
          >
            {/* Компания */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.1 }}
            >
              <VStack align="start" spacing={4}>
                <Text
                  fontSize="xl"
                  fontWeight="bold"
                  bgGradient="linear(to-r, pink.400, purple.500)"
                  bgClip="text"
                >
                  ❃ Flower Shop
                </Text>
                <Text color="gray.400" fontSize="sm" lineHeight="1.6">
                  Мы создаем красоту и дарим радость через цветы. 
                  Каждый букет — это произведение искусства.
                </Text>
                <HStack spacing={4}>
                  {socialLinks.map((social, index) => (
                    <motion.div
                      key={social.name}
                      whileHover={{ scale: 1.2, y: -2 }}
                      transition={{ duration: 0.2 }}
                    >
                      <Link
                        href={social.href}
                        color="gray.400"
                        _hover={{ color: 'pink.300' }}
                        transition="color 0.3s ease"
                        fontSize="xl"
                      >
                        {social.icon}
                      </Link>
                    </motion.div>
                  ))}
                </HStack>
              </VStack>
            </motion.div>

            {/* Компания */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.2 }}
            >
              <VStack align="start" spacing={4}>
                <Text fontSize="lg" fontWeight="semibold" color="white">
                  Компания
                </Text>
                <VStack align="start" spacing={2}>
                  {footerLinks.company.map((link) => (
                    <Link
                      key={link.name}
                      href={link.href}
                      color="gray.400"
                      fontSize="sm"
                      _hover={{ color: 'pink.300' }}
                      transition="color 0.3s ease"
                    >
                      {link.name}
                    </Link>
                  ))}
                </VStack>
              </VStack>
            </motion.div>

            {/* Услуги */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.3 }}
            >
              <VStack align="start" spacing={4}>
                <Text fontSize="lg" fontWeight="semibold" color="white">
                  Услуги
                </Text>
                <VStack align="start" spacing={2}>
                  {footerLinks.services.map((link) => (
                    <Link
                      key={link.name}
                      href={link.href}
                      color="gray.400"
                      fontSize="sm"
                      _hover={{ color: 'pink.300' }}
                      transition="color 0.3s ease"
                    >
                      {link.name}
                    </Link>
                  ))}
                </VStack>
              </VStack>
            </motion.div>

            {/* Поддержка */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.4 }}
            >
              <VStack align="start" spacing={4}>
                <Text fontSize="lg" fontWeight="semibold" color="white">
                  Поддержка
                </Text>
                <VStack align="start" spacing={2}>
                  {footerLinks.support.map((link) => (
                    <Link
                      key={link.name}
                      href={link.href}
                      color="gray.400"
                      fontSize="sm"
                      _hover={{ color: 'pink.300' }}
                      transition="color 0.3s ease"
                    >
                      {link.name}
                    </Link>
                  ))}
                </VStack>
              </VStack>
            </motion.div>
          </SimpleGrid>

          {/* Разделитель */}
          <Box
            w="full"
            h="1px"
            bgGradient="linear(to-r, transparent, rgba(236, 72, 153, 0.3), transparent)"
          />

          {/* Нижняя часть футера */}
          <SimpleGrid
            columns={{ base: 1, md: 2 }}
            spacing={8}
            w="full"
          >
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.5 }}
            >
              <VStack align={{ base: 'center', md: 'start' }} spacing={2}>
                <Text color="gray.400" fontSize="sm">
                  © 2024 Flower Shop. Все права защищены.
                </Text>
                <HStack spacing={4} flexWrap="wrap" justify={{ base: 'center', md: 'start' }}>
                  {footerLinks.legal.map((link) => (
                    <Link
                      key={link.name}
                      href={link.href}
                      color="gray.500"
                      fontSize="xs"
                      _hover={{ color: 'pink.300' }}
                      transition="color 0.3s ease"
                    >
                      {link.name}
                    </Link>
                  ))}
                </HStack>
              </VStack>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.6 }}
            >
              <VStack align={{ base: 'center', md: 'end' }} spacing={4}>
                <Text color="gray.400" fontSize="sm" textAlign={{ base: 'center', md: 'right' }}>
                  Следите за нами в социальных сетях
                </Text>
                <HStack spacing={4}>
                  {socialLinks.map((social) => (
                    <motion.div
                      key={social.name}
                      whileHover={{ scale: 1.1, y: -2 }}
                      transition={{ duration: 0.2 }}
                    >
                      <Link
                        href={social.href}
                        color="gray.400"
                        _hover={{ color: 'pink.300' }}
                        transition="color 0.3s ease"
                        fontSize="lg"
                      >
                        {social.icon}
                      </Link>
                    </motion.div>
                  ))}
                </HStack>
              </VStack>
            </motion.div>
          </SimpleGrid>
        </VStack>
      </Container>
    </Box>
  );
};

export default Footer;
