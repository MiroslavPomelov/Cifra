'use client';
import React from 'react';
import {
  Box,
  Container,
  Text,
  VStack,
  HStack,
  useDisclosure,
} from '@chakra-ui/react';
import { motion } from 'framer-motion';
import { FaStore, FaShoppingCart, FaUsers, FaChartLine } from 'react-icons/fa';
import ChakraWrapper from '../components/ChakraWrapper';
import ShopRegistrationForm from '../components/ShopRegistrationForm';

const ShopRegistrationPage: React.FC = () => {
  const { isOpen, onOpen, onClose } = useDisclosure();

  const features = [
    {
      icon: FaStore,
      title: 'Простое управление',
      description: 'Интуитивная панель управления для вашего магазина'
    },
    {
      icon: FaShoppingCart,
      title: 'Продажи онлайн',
      description: 'Принимайте заказы 24/7 через наш сайт'
    },
    {
      icon: FaUsers,
      title: 'Больше клиентов',
      description: 'Доступ к тысячам покупателей на нашей платформе'
    },
    {
      icon: FaChartLine,
      title: 'Аналитика',
      description: 'Отслеживайте продажи и рост вашего бизнеса'
    }
  ];

  return (
    <ChakraWrapper>
      <Box
        minH="100vh"
        bg="linear-gradient(135deg, #1a202c 0%, #2d3748 50%, #4a5568 100%)"
        position="relative"
        overflow="hidden"
      >
        {/* Фоновые эффекты */}
        <motion.div
          style={{
            position: 'absolute',
            top: '20%',
            left: '10%',
            width: '300px',
            height: '300px',
            background: 'radial-gradient(circle, rgba(236, 72, 153, 0.1), transparent)',
            borderRadius: '50%',
            filter: 'blur(40px)',
          }}
          animate={{
            scale: [1, 1.3, 1],
            opacity: [0.3, 0.6, 0.3],
          }}
          transition={{
            duration: 8,
            repeat: Infinity,
            ease: "easeInOut",
          }}
        />

        <motion.div
          style={{
            position: 'absolute',
            bottom: '20%',
            right: '10%',
            width: '250px',
            height: '250px',
            background: 'radial-gradient(circle, rgba(147, 51, 234, 0.1), transparent)',
            borderRadius: '50%',
            filter: 'blur(40px)',
          }}
          animate={{
            scale: [1, 1.2, 1],
            opacity: [0.2, 0.5, 0.2],
          }}
          transition={{
            duration: 6,
            repeat: Infinity,
            ease: "easeInOut",
            delay: 1,
          }}
        />

        <Container maxW="7xl" position="relative" zIndex={1} py={20}>
          <VStack spacing={16}>
            {/* Заголовок страницы */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
            >
              <VStack spacing={6} textAlign="center">
                <motion.div
                  initial={{ scale: 0.8 }}
                  animate={{ scale: 1 }}
                  transition={{ 
                    duration: 0.6, 
                    type: "spring", 
                    stiffness: 100 
                  }}
                >
                  <Box
                    p={6}
                    borderRadius="full"
                    bgGradient="linear(to-r, pink.400, purple.500)"
                    boxShadow="0 8px 32px rgba(236, 72, 153, 0.3)"
                  >
                    <FaStore size={48} color="white" />
                  </Box>
                </motion.div>

                <Text
                  fontSize={{ base: '4xl', md: '5xl', lg: '6xl' }}
                  fontWeight="bold"
                  bgGradient="linear(to-r, white, pink.100)"
                  bgClip="text"
                  textShadow="0 4px 8px rgba(0,0,0,0.3)"
                >
                  Откройте свой
                  <br />
                  <Text
                    as="span"
                    bgGradient="linear(to-r, pink.400, purple.500)"
                    bgClip="text"
                  >
                    цветочный магазин
                  </Text>
                </Text>
                
                <Text
                  fontSize={{ base: 'lg', md: 'xl' }}
                  color="gray.300"
                  maxW="800px"
                  lineHeight="1.6"
                >
                  Присоединяйтесь к крупнейшей платформе по продаже цветов. 
                  Простая регистрация, удобное управление и тысячи клиентов ждут вас!
                </Text>

                <motion.div
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  <motion.button
                    onClick={onOpen}
                    style={{
                      background: 'linear-gradient(45deg, #ec4899, #9333ea)',
                      color: 'white',
                      padding: '16px 32px',
                      borderRadius: '12px',
                      border: 'none',
                      fontSize: '18px',
                      fontWeight: '600',
                      cursor: 'pointer',
                      boxShadow: '0 8px 25px rgba(236, 72, 153, 0.3)',
                    }}
                    whileHover={{
                      boxShadow: '0 12px 35px rgba(236, 72, 153, 0.4)',
                      y: -2,
                    }}
                  >
                    🌸 Зарегистрировать магазин
                  </motion.button>
                </motion.div>
              </VStack>
            </motion.div>

            {/* Преимущества */}
            <motion.div
              initial={{ opacity: 0, y: 50 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.3 }}
            >
              <VStack spacing={12}>
                <Text
                  fontSize="3xl"
                  fontWeight="bold"
                  color="white"
                  textAlign="center"
                >
                  Почему выбирают нас?
                </Text>

                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ duration: 0.8, delay: 0.5 }}
                >
                  <HStack
                    spacing={8}
                    wrap="wrap"
                    justify="center"
                    align="stretch"
                  >
                    {features.map((feature, index) => (
                      <motion.div
                        key={feature.title}
                        initial={{ opacity: 0, y: 30 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ 
                          duration: 0.6, 
                          delay: 0.6 + index * 0.1 
                        }}
                        whileHover={{ y: -10, scale: 1.02 }}
                      >
                        <Box
                          bg="rgba(255, 255, 255, 0.05)"
                          backdropFilter="blur(10px)"
                          borderRadius="2xl"
                          p={8}
                          border="1px solid rgba(255, 255, 255, 0.1)"
                          maxW="280px"
                          textAlign="center"
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
                            padding: '1px',
                            background: 'linear-gradient(45deg, rgba(236, 72, 153, 0.3), rgba(147, 51, 234, 0.3))',
                            WebkitMask: 'linear-gradient(#fff 0 0) content-box, linear-gradient(#fff 0 0)',
                            WebkitMaskComposite: 'xor',
                            maskComposite: 'exclude',
                            zIndex: 0
                          }}
                        >
                          <VStack spacing={4} position="relative" zIndex={1}>
                            <Box
                              p={4}
                              borderRadius="full"
                              bgGradient="linear(to-r, pink.400, purple.500)"
                            >
                              <feature.icon size={32} color="white" />
                            </Box>
                            
                            <Text
                              fontSize="xl"
                              fontWeight="bold"
                              color="white"
                            >
                              {feature.title}
                            </Text>
                            
                            <Text
                              color="gray.300"
                              fontSize="sm"
                              lineHeight="1.6"
                            >
                              {feature.description}
                            </Text>
                          </VStack>
                        </Box>
                      </motion.div>
                    ))}
                  </HStack>
                </motion.div>
              </VStack>
            </motion.div>

            {/* Призыв к действию */}
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.8, delay: 0.8 }}
            >
              <Box
                bg="rgba(236, 72, 153, 0.1)"
                borderRadius="2xl"
                p={12}
                border="1px solid rgba(236, 72, 153, 0.2)"
                textAlign="center"
                position="relative"
                overflow="hidden"
                maxW="600px"
              >
                <motion.div
                  style={{
                    position: 'absolute',
                    top: '50%',
                    left: '50%',
                    width: '150px',
                    height: '150px',
                    background: 'radial-gradient(circle, rgba(236, 72, 153, 0.15), transparent)',
                    borderRadius: '50%',
                    filter: 'blur(25px)',
                    transform: 'translate(-50%, -50%)',
                  }}
                  animate={{
                    scale: [1, 1.3, 1],
                    opacity: [0.4, 0.7, 0.4],
                  }}
                  transition={{
                    duration: 5,
                    repeat: Infinity,
                    ease: "easeInOut",
                  }}
                />

                <VStack spacing={6} position="relative" zIndex={1}>
                  <Text
                    fontSize="2xl"
                    fontWeight="bold"
                    color="white"
                  >
                    Готовы начать?
                  </Text>
                  
                  <Text
                    color="gray.300"
                    fontSize="lg"
                    lineHeight="1.6"
                  >
                    Регистрация займет всего несколько минут. 
                    Начните продавать цветы уже сегодня!
                  </Text>

                  <motion.div
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                  >
                    <motion.button
                      onClick={onOpen}
                      style={{
                        background: 'linear-gradient(45deg, #ec4899, #9333ea)',
                        color: 'white',
                        padding: '14px 28px',
                        borderRadius: '12px',
                        border: 'none',
                        fontSize: '16px',
                        fontWeight: '600',
                        cursor: 'pointer',
                        boxShadow: '0 8px 25px rgba(236, 72, 153, 0.3)',
                      }}
                      whileHover={{
                        boxShadow: '0 12px 35px rgba(236, 72, 153, 0.4)',
                        y: -2,
                      }}
                    >
                      Создать магазин сейчас
                    </motion.button>
                  </motion.div>
                </VStack>
              </Box>
            </motion.div>
          </VStack>
        </Container>

        {/* Модальное окно регистрации */}
        <ShopRegistrationForm isOpen={isOpen} onClose={onClose} />
      </Box>
    </ChakraWrapper>
  );
};

export default ShopRegistrationPage;

