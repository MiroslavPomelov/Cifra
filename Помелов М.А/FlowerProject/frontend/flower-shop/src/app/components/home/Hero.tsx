'use client';
import React, { useState, useEffect } from 'react';
import {
  Box,
  Container,
  Flex,
  Text,
  Button,
  VStack,
  HStack,
  Badge,
} from '@chakra-ui/react';
import { motion } from 'framer-motion';

const Hero: React.FC = () => {
  const [isReducedMotion, setIsReducedMotion] = useState(false);

  useEffect(() => {
    const mediaQuery = window.matchMedia('(prefers-reduced-motion: reduce)');
    setIsReducedMotion(mediaQuery.matches);

    const handleChange = (e: MediaQueryListEvent) => setIsReducedMotion(e.matches);
    mediaQuery.addEventListener('change', handleChange);

    return () => mediaQuery.removeEventListener('change', handleChange);
  }, []);

  const containerVariants = {
    hidden: { opacity: 0, y: isReducedMotion ? 0 : 50 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: isReducedMotion ? 0.3 : 0.8,
        staggerChildren: isReducedMotion ? 0 : 0.2,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: isReducedMotion ? 0 : 30 },
    visible: { opacity: 1, y: 0 },
  };

  const [bouquetDataUrl, setBouquetDataUrl] = useState<string | null>(null);
  const [blossomDataUrl, setBlossomDataUrl] = useState<string | null>(null);
  const [hibiscusDataUrl, setHibiscusDataUrl] = useState<string | null>(null);

  useEffect(() => {
    const renderEmoji = (emoji: string, cssPx: number): string | null => {
      try {
        const dpr = Math.max(window.devicePixelRatio || 1, 1);
        const canvas = document.createElement('canvas');
        const width = Math.ceil(cssPx * dpr);
        const height = Math.ceil(cssPx * dpr);
        canvas.width = width;
        canvas.height = height;
        const ctx = canvas.getContext('2d');
        if (!ctx) return null;
        ctx.scale(dpr, dpr);
        ctx.clearRect(0, 0, cssPx, cssPx);
        ctx.textAlign = 'center';
        ctx.textBaseline = 'middle';
        ctx.font = `${Math.floor(cssPx * 0.8)}px system-ui, "Apple Color Emoji", "Segoe UI Emoji", "Segoe UI Symbol", sans-serif`;
        ctx.fillText(emoji, cssPx / 2, cssPx / 2);
        return canvas.toDataURL('image/png');
      } catch {
        return null;
      }
    };

    // CSS размеры (в пикселях): 8rem ≈ 128px, 3.5rem ≈ 56px
    setBouquetDataUrl(renderEmoji('💐', 128));
    setBlossomDataUrl(renderEmoji('🌸', 64));
    setHibiscusDataUrl(renderEmoji('🌺', 56));
  }, []);

  

  return (
    <Box
      minH="100vh"
      display="flex"
      alignItems="center"
      position="relative"
      overflow="hidden"
      pt={{ base: "80px", md: "100px" }}
    >
      {!isReducedMotion && (
        <motion.div
          style={{
            position: 'absolute',
            top: '20%',
            left: '10%',
            width: '300px',
            height: '300px',
            background: 'radial-gradient(circle, rgba(236, 72, 153, 0.08), transparent)',
            borderRadius: '50%',
            filter: 'blur(40px)',
            willChange: 'transform',
          }}
          animate={{
            scale: [1, 1.1, 1],
            opacity: [0.2, 0.4, 0.2],
          }}
          transition={{
            duration: 6,
            repeat: Infinity,
            ease: "easeInOut",
          }}
        />
      )}

      <Container maxW="7xl" position="relative" zIndex={1}>
        <Flex
          direction={{ base: 'column', lg: 'row' }}
          align="center"
          justify="space-between"
          gap={12}
        >
          <motion.div
            variants={containerVariants}
            initial="hidden"
            animate="visible"
            style={{ flex: 1 }}
          >
            <VStack align={{ base: 'center', lg: 'start' }} spacing={8}>
              <motion.div variants={itemVariants}>
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
                  ✨ Добро пожаловать в мир цветов
                </Badge>
              </motion.div>

              <motion.div variants={itemVariants}>
                <Text
                  fontSize={{ base: '4xl', md: '6xl', lg: '7xl' }}
                  fontWeight="bold"
                  textAlign={{ base: 'center', lg: 'left' }}
                  lineHeight="1.1"
                  bgGradient="linear(to-r, white, pink.100)"
                  bgClip="text"
                  textShadow="0 4px 8px rgba(0,0,0,0.3)"
                >
                  Откройте для себя
                  <br />
                  <Text
                    as="span"
                    bgGradient="linear(to-r, pink.400, purple.500)"
                    bgClip="text"
                  >
                    красоту природы
                  </Text>
                </Text>
              </motion.div>

              <motion.div variants={itemVariants}>
                <Text
                  fontSize={{ base: 'lg', md: 'xl' }}
                  color="gray.300"
                  textAlign={{ base: 'center', lg: 'left' }}
                  maxW="600px"
                  lineHeight="1.6"
                >
                  Подарите себе и близким незабываемые эмоции с нашими
                  эксклюзивными букетами. Каждый цветок — это история любви,
                  радости и вдохновения.
                </Text>
              </motion.div>

              <motion.div variants={itemVariants}>
                <HStack spacing={6} flexWrap="wrap" justify={{ base: 'center', lg: 'start' }}>
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
                      Смотреть каталог
                    </Button>
                  </motion.div>

                  <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
                    <Button
                      size="lg"
                      variant="outline"
                      color="white"
                      borderColor="rgba(255, 255, 255, 0.3)"
                      _hover={{
                        bg: 'rgba(255, 255, 255, 0.1)',
                        borderColor: 'pink.300',
                        color: 'pink.300',
                      }}
                      transition="all 0.3s ease"
                      px={8}
                      py={6}
                      fontSize="lg"
                      fontWeight="semibold"
                    >
                      Узнать больше
                    </Button>
                  </motion.div>
                </HStack>
              </motion.div>

              <motion.div variants={itemVariants}>
                <HStack spacing={8} color="gray.400" fontSize="sm">
                  <HStack spacing={2}>
                    <Text fontSize="2xl">🌹</Text>
                    <Text>Свежие цветы</Text>
                  </HStack>
                  <HStack spacing={2}>
                    <Text fontSize="2xl">🚚</Text>
                    <Text>Быстрая доставка</Text>
                  </HStack>
                  <HStack spacing={2}>
                    <Text fontSize="2xl">💝</Text>
                    <Text>Подарочная упаковка</Text>
                  </HStack>
                </HStack>
              </motion.div>
            </VStack>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 100 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 1, delay: 0.5 }}
            style={{ flex: 1 }}
          >
            <Box
              position="relative"
              display={{ base: 'none', lg: 'block' }}
            >
              {!isReducedMotion ? (
                <>
                  <motion.div
                    style={{
                      position: 'absolute',
                      top: '15%',
                      right: '25%',
                      width: '4rem',
                      height: '4rem',
                      willChange: 'transform',
                    }}
                    animate={{
                      y: [0, -10, 0],
                      rotate: [0, 3, 0],
                    }}
                    transition={{
                      duration: 4,
                      repeat: Infinity,
                      ease: "easeInOut",
                    }}
                  >
                    {blossomDataUrl ? (
                      <Box as="img" src={blossomDataUrl} alt="blossom" w="4rem" h="4rem" />
                    ) : (
                      '🌸'
                    )}
                  </motion.div>

                  <motion.div
                    style={{
                      position: 'absolute',
                      bottom: '20%',
                      right: '15%',
                      width: '3.5rem',
                      height: '3.5rem',
                      willChange: 'transform',
                    }}
                    animate={{
                      y: [0, 10, 0],
                      rotate: [0, -3, 0],
                    }}
                    transition={{
                      duration: 5,
                      repeat: Infinity,
                      ease: "easeInOut",
                      delay: 2,
                    }}
                  >
                    {hibiscusDataUrl ? (
                      <Box as="img" src={hibiscusDataUrl} alt="hibiscus" w="3.5rem" h="3.5rem" />
                    ) : (
                      '🌺'
                    )}
                  </motion.div>
                </>
              ) : (
                <>
                  <Box
                    position="absolute"
                    top="15%"
                    right="25%"
                    w="4rem"
                    h="4rem"
                    opacity={0.3}
                  >
                    {blossomDataUrl ? (
                      <Box as="img" src={blossomDataUrl} alt="blossom" w="4rem" h="4rem" />
                    ) : (
                      '🌸'
                    )}
                  </Box>
                  <Box
                    position="absolute"
                    bottom="20%"
                    right="15%"
                    w="3.5rem"
                    h="3.5rem"
                    opacity={0.2}
                  >
                    {hibiscusDataUrl ? (
                      <Box as="img" src={hibiscusDataUrl} alt="hibiscus" w="3.5rem" h="3.5rem" />
                    ) : (
                      '🌺'
                    )}
                  </Box>
                </>
              )}

              {/* Центральный элемент */}
              <Box
                w="300px"
                h="300px"
                mx="auto"
                position="relative"
                display="flex"
                alignItems="center"
                justifyContent="center"
              >
                {!isReducedMotion ? (
                  <motion.div
                    animate={{
                      scale: [1, 1.05, 1],
                      rotate: [0, 3, 0],
                    }}
                    transition={{
                      duration: 8,
                      repeat: Infinity,
                      ease: "easeInOut",
                    }}
                    style={{
                      willChange: 'transform',
                    }}
                  >
                    <Box
                      as="img"
                      src={bouquetDataUrl || ''}
                      alt="bouquet"
                      width="8rem"
                      height="8rem"
                      style={{ filter: 'drop-shadow(0 8px 16px rgba(236, 72, 153, 0.2))' }}
                      onError={(e: any) => { e.currentTarget.style.display = 'none'; e.currentTarget.parentElement.innerText = '💐'; }}
                    />
                  </motion.div>
                ) : (
                  <Box
                    as="img"
                    src={bouquetDataUrl || ''}
                    alt="bouquet"
                    width="8rem"
                    height="8rem"
                    style={{ filter: 'drop-shadow(0 8px 16px rgba(236, 72, 153, 0.2))' }}
                    onError={(e: any) => { e.currentTarget.style.display = 'none'; (e.currentTarget.parentElement as HTMLElement).innerText = '💐'; }}
                  />
                )}
              </Box>
            </Box>
          </motion.div>
        </Flex>
      </Container>
    </Box>
  );
};

export default Hero;
