import { useState, useEffect } from 'react';
import { UserOrder } from '../../services/api';

export const useOrders = (userId: number) => {
  const [orders, setOrders] = useState<UserOrder[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  // Загрузка заказов из localStorage
  const loadOrders = () => {
    try {
      const savedOrders = localStorage.getItem(`orders_${userId}`);
      if (savedOrders) {
        const parsedOrders = JSON.parse(savedOrders);
        setOrders(parsedOrders);
      }
    } catch (error) {
      console.error('Ошибка загрузки заказов из localStorage:', error);
    } finally {
      setIsLoading(false);
    }
  };

  // Сохранение заказов в localStorage
  const saveOrders = (newOrders: UserOrder[]) => {
    try {
      localStorage.setItem(`orders_${userId}`, JSON.stringify(newOrders));
      setOrders(newOrders);
    } catch (error) {
      console.error('Ошибка сохранения заказов в localStorage:', error);
    }
  };

  // Добавление нового заказа
  const addOrder = (order: UserOrder) => {
    const newOrders = [order, ...orders];
    saveOrders(newOrders);
  };

  // Обновление статуса заказа
  const updateOrderStatus = (orderId: string, newStatus: UserOrder['status']) => {
    const updatedOrders = orders.map(order => 
      order.id === orderId ? { ...order, status: newStatus } : order
    );
    saveOrders(updatedOrders);
  };

  // Удаление заказа
  const removeOrder = (orderId: string) => {
    const filteredOrders = orders.filter(order => order.id !== orderId);
    saveOrders(filteredOrders);
  };

  // Генерация уникального ID заказа
  const generateOrderId = () => {
    const timestamp = Date.now();
    const random = Math.floor(Math.random() * 1000);
    return `ORD-${timestamp}-${random}`;
  };

  // Создание нового заказа
  const createOrder = (orderData: {
    items: Array<{
      productId: number;
      productName: string;
      quantity: number;
      price: number;
      shopId: number;
      shopName: string;
    }>;
    totalAmount: number;
    deliveryAddress: string;
    customerName: string;
    customerEmail: string;
    customerPhone: string;
    deliveryNotes?: string;
    deliveryMethod: string;
    paymentMethod: string;
  }) => {
    const newOrder: UserOrder = {
      id: generateOrderId(),
      orderNumber: generateOrderId(),
      status: 'pending',
      totalAmount: orderData.totalAmount,
      orderDate: new Date().toISOString(),
      deliveryAddress: orderData.deliveryAddress,
      shopName: orderData.items[0]?.shopName || 'Цветочный магазин',
      items: orderData.items.map(item => ({
        id: item.productId,
        productName: item.productName,
        quantity: item.quantity,
        price: item.price,
        imageUrl: '/api/placeholder/150/150',
      })),
    };

    addOrder(newOrder);
    return newOrder;
  };

  useEffect(() => {
    loadOrders();
  }, [userId]);

  return {
    orders,
    isLoading,
    addOrder,
    updateOrderStatus,
    removeOrder,
    createOrder,
    loadOrders,
  };
};
