'use client';
import React from 'react';
import {
  Box,
  Container,
  Text,
  SimpleGrid,
  VStack,
  Badge,
  Button,
} from '@chakra-ui/react';
import { motion } from 'framer-motion';

const Categories: React.FC = () => {
  const categories = [
    {
      id: 1,
      name: 'Розы',
      emoji: '🌹',
      description: 'Классические розы для особых случаев',
      count: 24,
      color: 'pink.400',
    },
    {
      id: 2,
      name: 'Тюльпаны',
      emoji: '🌷',
      description: 'Весенние тюльпаны для романтики',
      count: 18,
      color: 'purple.400',
    },
    {
      id: 3,
      name: 'Орхидеи',
      emoji: '🌺',
      description: 'Экзотические орхидеи для элегантности',
      count: 12,
      color: 'pink.500',
    },
    {
      id: 4,
      name: 'Подсолнухи',
      emoji: '🌻',
      description: 'Яркие подсолнухи для позитива',
      count: 15,
      color: 'yellow.400',
    },
    {
      id: 5,
      name: 'Пионы',
      emoji: '🌸',
      description: 'Нежные пионы для уюта',
      count: 20,
      color: 'pink.300',
    },
    {
      id: 6,
      name: 'Лилии',
      emoji: '🌼',
      description: 'Благородные лилии для торжеств',
      count: 16,
      color: 'orange.400',
    },
  ];

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
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
          bottom: '10%',
          right: '5%',
          width: '300px',
          height: '300px',
          background: 'radial-gradient(circle, rgba(147, 51, 234, 0.05), transparent)',
          borderRadius: '50%',
          filter: 'blur(40px)',
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
        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.3 }}
        >
          <VStack spacing={12}>
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
                  🌸 Категории цветов
                </Badge>
                
                <Text
                  fontSize={{ base: '3xl', md: '4xl', lg: '5xl' }}
                  fontWeight="bold"
                  bgGradient="linear(to-r, white, pink.100)"
                  bgClip="text"
                  textShadow="0 4px 8px rgba(0,0,0,0.3)"
                >
                  Выберите свой
                  <br />
                  <Text
                    as="span"
                    bgGradient="linear(to-r, pink.400, purple.500)"
                    bgClip="text"
                  >
                    любимый цветок
                  </Text>
                </Text>
                
                <Text
                  fontSize={{ base: 'lg', md: 'xl' }}
                  color="gray.300"
                  maxW="600px"
                  lineHeight="1.6"
                >
                  У нас есть цветы на любой вкус и случай. 
                  Найдите идеальный букет для себя или в подарок.
                </Text>
              </VStack>
            </motion.div>

            {/* Сетка категорий */}
            <motion.div variants={itemVariants}>
              <SimpleGrid
                columns={{ base: 1, md: 2, lg: 3 }}
                spacing={8}
                w="full"
              >
                {categories.map((category, index) => (
                  <motion.div
                    key={category.id}
                    initial={{ opacity: 0, y: 50 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true, amount: 0.3 }}
                    transition={{ delay: index * 0.1 }}
                  >
                    <CategoryCard category={category} />
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

interface Category {
  id: number;
  name: string;
  emoji: string;
  description: string;
  count: number;
  color: string;
}

interface CategoryCardProps {
  category: Category;
}

const CategoryCard: React.FC<CategoryCardProps> = ({ category }) => {
  return (
    <motion.div
      whileHover={{ y: -10, scale: 1.02 }}
      transition={{ duration: 0.3 }}
    >
      <Box
        bg="rgba(255, 255, 255, 0.05)"
        backdropFilter="blur(10px)"
        borderRadius="2xl"
        p={8}
        border="1px solid rgba(255, 255, 255, 0.1)"
        position="relative"
        overflow="hidden"
        cursor="pointer"
        _before={{
          content: '""',
          position: 'absolute',
          top: 0,
          left: 0,
          right: 0,
          bottom: 0,
          borderRadius: '2xl',
          padding: '1px',
          background: `linear-gradient(45deg, ${category.color}30, rgba(147, 51, 234, 0.3))`,
          WebkitMask: 'linear-gradient(#fff 0 0) content-box, linear-gradient(#fff 0 0)',
          WebkitMaskComposite: 'xor',
          maskComposite: 'exclude',
          zIndex: 0
        }}
      >
        <VStack spacing={6} align="center" position="relative" zIndex={1}>
          {/* Эмодзи категории */}
          <motion.div
            whileHover={{ scale: 1.2, rotate: 10 }}
            transition={{ duration: 0.3 }}
            style={{
              fontSize: '4rem',
              filter: 'drop-shadow(0 8px 16px rgba(236, 72, 153, 0.3))',
            }}
          >
            {category.emoji}
          </motion.div>

          {/* Название категории */}
          <Text
            fontSize="xl"
            fontWeight="bold"
            color="white"
            textAlign="center"
          >
            {category.name}
          </Text>

          {/* Описание */}
          <Text
            fontSize="md"
            color="gray.300"
            textAlign="center"
            lineHeight="1.6"
          >
            {category.description}
          </Text>

          {/* Количество товаров */}
          <Badge
            bg={category.color}
            color="white"
            px={4}
            py={2}
            borderRadius="full"
            fontSize="sm"
            fontWeight="semibold"
          >
            {category.count} букетов
          </Badge>

          {/* Кнопка просмотра */}
          <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
            <Button
              variant="outline"
              color="white"
              borderColor="rgba(255, 255, 255, 0.3)"
              _hover={{
                bg: 'rgba(255, 255, 255, 0.1)',
                borderColor: category.color,
                color: category.color,
              }}
              transition="all 0.3s ease"
              size="sm"
            >
              Смотреть все
            </Button>
          </motion.div>
        </VStack>

        {/* Фоновые эффекты */}
        <motion.div
          style={{
            position: 'absolute',
            top: '50%',
            left: '50%',
            width: '150px',
            height: '150px',
            background: `radial-gradient(circle, ${category.color}10, transparent)`,
            borderRadius: '50%',
            filter: 'blur(30px)',
            transform: 'translate(-50%, -50%)',
            zIndex: 0,
          }}
          animate={{
            scale: [1, 1.3, 1],
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

export default Categories;
