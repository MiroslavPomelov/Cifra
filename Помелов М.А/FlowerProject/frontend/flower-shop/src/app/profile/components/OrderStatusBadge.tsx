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
    >
      <span>{config.icon}</span>
      {config.text}
    </Badge>
  );
};

export default OrderStatusBadge;
