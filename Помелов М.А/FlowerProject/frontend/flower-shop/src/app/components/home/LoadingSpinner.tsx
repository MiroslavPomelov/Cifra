'use client';
import React from 'react';
import { Box, Spinner, Text, VStack } from '@chakra-ui/react';
import { motion } from 'framer-motion';

interface LoadingSpinnerProps {
  message?: string;
}

const LoadingSpinner: React.FC<LoadingSpinnerProps> = ({ message = 'Загрузка...' }) => {
  return (
    <Box
      py={20}
      display="flex"
      justifyContent="center"
      alignItems="center"
      minH="400px"
    >
      <VStack spacing={6}>
        <motion.div
          animate={{
            rotate: 360,
          }}
          transition={{
            duration: 2,
            repeat: Infinity,
            ease: "linear",
          }}
        >
          <Spinner
            size="xl"
            color="pink.400"
            thickness="4px"
            speed="0.65s"
          />
        </motion.div>
        <Text
          color="gray.300"
          fontSize="lg"
          fontWeight="medium"
        >
          {message}
        </Text>
      </VStack>
    </Box>
  );
};

export default LoadingSpinner;
