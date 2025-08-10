'use client';
import React from 'react';
import {
  Box,
  Container,
  Text,
  VStack,
  Badge,
  Button,
  Flex,
  SimpleGrid,
} from '@chakra-ui/react';
import { motion } from 'framer-motion';

const AboutSection: React.FC = () => {
  const features = [
    {
      id: 1,
      icon: '🌱',
      title: 'Свежие цветы',
      description: 'Мы работаем только с проверенными поставщиками и гарантируем свежесть каждого цветка',
    },
    {
      id: 2,
      icon: '🚚',
      title: 'Быстрая доставка',
      description: 'Доставляем букеты в день заказа по всему городу',
    },
    {
      id: 3,
      icon: '💝',
      title: 'Подарочная упаковка',
      description: 'Каждый букет упаковываем в красивую подарочную бумагу',
    },
    {
      id: 4,
      icon: '🎨',
      title: 'Индивидуальный подход',
      description: 'Создаем уникальные композиции по вашим пожеланиям',
    },
  ];

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 50 },
    visible: { opacity: 1, y: 0 },
  };

  return (
    <Box
      py={20}
      position="relative"
      overflow="hidden"
    >
      {/* Фоновые эффекты */}
      <motion.div
        style={{
          position: 'absolute',
          top: '20%',
          left: '5%',
          width: '250px',
          height: '250px',
          background: 'radial-gradient(circle, rgba(236, 72, 153, 0.05), transparent)',
          borderRadius: '50%',
          filter: 'blur(40px)',
        }}
        animate={{
          scale: [1, 1.3, 1],
          opacity: [0.2, 0.4, 0.2],
        }}
        transition={{
          duration: 5,
          repeat: Infinity,
          ease: "easeInOut",
        }}
      />

      <Container maxW="7xl" position="relative" zIndex={1}>
        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.3 }}
        >
          <VStack spacing={16}>
            {/* Заголовок секции */}
            <motion.div variants={itemVariants}>
              <VStack spacing={4} textAlign="center">
                <Badge
                  bgGradient="linear(to-r, pink.400, purple.500)"
                  color="white"
                  px={4}
                  py={2}
                  borderRadius="full"
                  fontSize="sm"
                  fontWeight="semibold"
                  letterSpacing="wide"
                >
                  🌸 О нас
                </Badge>
                
                <Text
                  fontSize={{ base: '3xl', md: '4xl', lg: '5xl' }}
                  fontWeight="bold"
                  bgGradient="linear(to-r, white, pink.100)"
                  bgClip="text"
                  textShadow="0 4px 8px rgba(0,0,0,0.3)"
                >
                  Мы создаем
                  <br />
                  <Text
                    as="span"
                    bgGradient="linear(to-r, pink.400, purple.500)"
                    bgClip="text"
                  >
                    красоту каждый день
                  </Text>
                </Text>
                
                <Text
                  fontSize={{ base: 'lg', md: 'xl' }}
                  color="gray.300"
                  maxW="800px"
                  lineHeight="1.6"
                >
                  Flower Shop — это место, где рождаются самые красивые букеты. 
                  Мы влюблены в цветы и хотим поделиться этой любовью с вами. 
                  Каждый наш букет — это произведение искусства, созданное с душой и вниманием к деталям.
                </Text>
              </VStack>
            </motion.div>

            {/* Основной контент */}
            <Flex
              direction={{ base: 'column', lg: 'row' }}
              align="center"
              justify="space-between"
              gap={12}
              w="full"
            >
              {/* Левая колонка - изображение */}
              <motion.div
                variants={itemVariants}
                style={{ flex: 1 }}
              >
                <Box
                  position="relative"
                  display="flex"
                  justifyContent="center"
                  alignItems="center"
                  height="400px"
                >
                  <motion.div
                    animate={{
                      scale: [1, 1.05, 1],
                      rotate: [0, 2, 0],
                    }}
                    transition={{
                      duration: 6,
                      repeat: Infinity,
                      ease: "easeInOut",
                    }}
                    style={{
                      fontSize: '12rem',
                      filter: 'drop-shadow(0 15px 30px rgba(236, 72, 153, 0.4))',
                    }}
                  >
                    🌸
                  </motion.div>
                  
                  {/* Дополнительные цветы */}
                  <motion.div
                    style={{
                      position: 'absolute',
                      top: '10%',
                      right: '20%',
                      fontSize: '3rem',
                    }}
                    animate={{
                      y: [0, -15, 0],
                      rotate: [0, 5, 0],
                    }}
                    transition={{
                      duration: 4,
                      repeat: Infinity,
                      ease: "easeInOut",
                      delay: 1,
                    }}
                  >
                    🌹
                  </motion.div>
                  
                  <motion.div
                    style={{
                      position: 'absolute',
                      bottom: '20%',
                      left: '10%',
                      fontSize: '2.5rem',
                    }}
                    animate={{
                      y: [0, 15, 0],
                      rotate: [0, -3, 0],
                    }}
                    transition={{
                      duration: 5,
                      repeat: Infinity,
                      ease: "easeInOut",
                      delay: 2,
                    }}
                  >
                    🌺
                  </motion.div>
                </Box>
              </motion.div>

              {/* Правая колонка - текст */}
              <motion.div
                variants={itemVariants}
                style={{ flex: 1 }}
              >
                <VStack spacing={8} align="stretch">
                  <Text
                    fontSize={{ base: 'lg', md: 'xl' }}
                    color="gray.300"
                    lineHeight="1.8"
                  >
                    Наша миссия — дарить радость и красоту через цветы. 
                    Мы верим, что каждый букет может рассказать историю, 
                    передать эмоции и создать незабываемые моменты.
                  </Text>

                  <Text
                    fontSize={{ base: 'lg', md: 'xl' }}
                    color="gray.300"
                    lineHeight="1.8"
                  >
                    Мы гордимся тем, что помогаем нашим клиентам выражать 
                    свои чувства через искусство флористики. Каждый заказ 
                    для нас — это возможность создать что-то особенное.
                  </Text>

                  <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
                    <Button
                      size="lg"
                      bgGradient="linear(to-r, pink.400, purple.500)"
                      color="white"
                      _hover={{
                        bgGradient: "linear(to-r, pink.500, purple.600)",
                        transform: 'translateY(-3px)',
                        boxShadow: '0 12px 30px rgba(236, 72, 153, 0.4)',
                      }}
                      _active={{
                        transform: 'translateY(-1px)',
                      }}
                      transition="all 0.3s cubic-bezier(0.4, 0, 0.2, 1)"
                      px={8}
                      py={6}
                      fontSize="lg"
                      fontWeight="semibold"
                      letterSpacing="wide"
                    >
                      Узнать больше
                    </Button>
                  </motion.div>
                </VStack>
              </motion.div>
            </Flex>

            {/* Особенности */}
            <motion.div variants={itemVariants}>
              <SimpleGrid
                columns={{ base: 1, md: 2, lg: 4 }}
                spacing={8}
                w="full"
                alignItems="stretch"
              >
                {features.map((feature, index) => (
                  <motion.div
                    key={feature.id}
                    initial={{ opacity: 0, y: 50 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true, amount: 0.3 }}
                    transition={{ delay: index * 0.1 }}
                  >
                    <FeatureCard feature={feature} />
                  </motion.div>
                ))}
              </SimpleGrid>
            </motion.div>
          </VStack>
        </motion.div>
      </Container>
    </Box>
  );
};

interface Feature {
  id: number;
  icon: string;
  title: string;
  description: string;
}

interface FeatureCardProps {
  feature: Feature;
}

const FeatureCard: React.FC<FeatureCardProps> = ({ feature }) => {
  return (
    <motion.div
      whileHover={{ y: -5 }}
      transition={{ duration: 0.3 }}
    >
      <Box
        bg="rgba(255, 255, 255, 0.05)"
        backdropFilter="blur(10px)"
        borderRadius="xl"
        p={6}
        border="1px solid rgba(255, 255, 255, 0.1)"
        position="relative"
        overflow="hidden"
        height="100%"
        _before={{
          content: '""',
          position: 'absolute',
          top: 0,
          left: 0,
          right: 0,
          bottom: 0,
          borderRadius: 'xl',
          padding: '1px',
          background: 'linear-gradient(45deg, rgba(236, 72, 153, 0.2), rgba(147, 51, 234, 0.2))',
          WebkitMask: 'linear-gradient(#fff 0 0) content-box, linear-gradient(#fff 0 0)',
          WebkitMaskComposite: 'xor',
          maskComposite: 'exclude',
          zIndex: 0
        }}
      >
        <VStack spacing={4} align="center" position="relative" zIndex={1}>
          <motion.div
            whileHover={{ scale: 1.2, rotate: 10 }}
            transition={{ duration: 0.3 }}
            style={{
              fontSize: '3rem',
              filter: 'drop-shadow(0 8px 16px rgba(236, 72, 153, 0.3))',
            }}
          >
            {feature.icon}
          </motion.div>

          <Text
            fontSize="lg"
            fontWeight="bold"
            color="white"
            textAlign="center"
          >
            {feature.title}
          </Text>

          <Text
            fontSize="sm"
            color="gray.300"
            textAlign="center"
            lineHeight="1.6"
          >
            {feature.description}
          </Text>
        </VStack>

        {/* Фоновые эффекты */}
        <motion.div
          style={{
            position: 'absolute',
            top: '50%',
            left: '50%',
            width: '100px',
            height: '100px',
            background: 'radial-gradient(circle, rgba(236, 72, 153, 0.1), transparent)',
            borderRadius: '50%',
            filter: 'blur(20px)',
            transform: 'translate(-50%, -50%)',
            zIndex: 0,
          }}
          animate={{
            scale: [1, 1.2, 1],
            opacity: [0.2, 0.5, 0.2],
          }}
          transition={{
            duration: 4,
            repeat: Infinity,
            ease: "easeInOut",
          }}
        />
      </Box>
    </motion.div>
  );
};

export default AboutSection;
