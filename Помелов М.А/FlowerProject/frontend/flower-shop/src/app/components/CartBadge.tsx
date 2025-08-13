'use client';
import React from 'react';
import { Box, Badge } from '@chakra-ui/react';
import { FaShoppingCart } from 'react-icons/fa';
import { useCart } from '../hooks/useCart';

interface CartBadgeProps {
  onClick?: () => void;
}

const CartBadge: React.FC<CartBadgeProps> = ({ onClick }) => {
  const { cartItemCount } = useCart();

  return (
    <Box position="relative" cursor="pointer" onClick={onClick}>
      <FaShoppingCart size={20} color="white" />
      <Badge
        position="absolute"
        top="-8px"
        right="-8px"
        colorScheme="pink"
        borderRadius="full"
        fontSize="xs"
        minW="20px"
        h="20px"
        display="flex"
        alignItems="center"
        justifyContent="center"
      >
        {cartItemCount}
      </Badge>
    </Box>
  );
};

export default CartBadge;
