'use client';
import React from 'react';
import { Box, Text, VStack, Button } from '@chakra-ui/react';
import { motion } from 'framer-motion';

interface ErrorMessageProps {
  message: string;
  onRetry?: () => void;
}

const ErrorMessage: React.FC<ErrorMessageProps> = ({ message, onRetry }) => {
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
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          transition={{ duration: 0.5 }}
        >
          <Text
            fontSize="6xl"
            color="red.400"
            filter="drop-shadow(0 4px 8px rgba(239, 68, 68, 0.3))"
          >
            ⚠️
          </Text>
        </motion.div>
        <Text
          color="red.400"
          fontSize="lg"
          fontWeight="medium"
          textAlign="center"
          maxW="400px"
        >
          {message}
        </Text>
        {onRetry && (
          <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
            <Button
              bgGradient="linear(to-r, pink.400, purple.500)"
              color="white"
              _hover={{
                bgGradient: "linear(to-r, pink.500, purple.600)",
              }}
              onClick={onRetry}
            >
              Попробовать снова
            </Button>
          </motion.div>
        )}
      </VStack>
    </Box>
  );
};

export default ErrorMessage;
