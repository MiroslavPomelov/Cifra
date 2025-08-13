import React from 'react';
import { Badge, BadgeProps } from '@chakra-ui/react';
import { UserOrder } from '../../../services/api';

interface OrderStatusBadgeProps {
  status: UserOrder['status'];
  size?: BadgeProps['size'];
}

const OrderStatusBadge: React.FC<OrderStatusBadgeProps> = ({ status, size = 'md' }) => {
  const getStatusConfig = (status: UserOrder['status']) => {
    switch (status) {
      case 'pending':
        return {
          color: 'yellow',
          text: 'Ожидает подтверждения',
          icon: '⏳',
        };
      case 'confirmed':
        return {
          color: 'blue',
          text: 'Подтвержден',
          icon: '✅',
        };
      case 'shipped':
        return {
          color: 'purple',
          text: 'Отправлен',
          icon: '📦',
        };
      case 'delivered':
        return {
          color: 'green',
          text: 'Доставлен',
          icon: '🎉',
        };
      case 'cancelled':
        return {
          color: 'red',
          text: 'Отменен',
          icon: '❌',
        };
      default:
        return {
          color: 'gray',
          text: 'Неизвестно',
          icon: '❓',
        };
    }
  };

  const config = getStatusConfig(status);

  return (
    <Badge
      colorScheme={config.color}
      fontSize={size}
      px={3}
      py={1}
      borderRadius="full"
      display="flex"
      alignItems="center"
      gap={1}
      bg="rgba(255, 255, 255, 0.1)"
      backdropFilter="blur(10px)"
      border="1px solid"
      borderColor="rgba(255, 255, 255, 0.2)"
      boxShadow="0 4px 12px rgba(0, 0, 0, 0.1)"
      _hover={{
        transform: 'scale(1.05)',
        boxShadow: '0 6px 16px rgba(0, 0, 0, 0.15)',
      }}
      transition="all 0.3s ease"
    >
      <span>{config.icon}</span>
      {config.text}
    </Badge>
  );
};

export default OrderStatusBadge;
