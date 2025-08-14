import { useState, useEffect, useCallback, useRef } from 'react';
import { apiService, UserOrder } from '../../services/api';

// Отладочная функция для проверки JWT токена
const debugJWT = () => {
  const token = localStorage.getItem('token');
  
  if (!token) {
    console.log('❌ JWT токен не найден в localStorage');
    return null;
  }
  
  console.log('🔍 JWT токен найден:');
  console.log('Длина токена:', token.length);
  console.log('Начинается с:', token.substring(0, 20));
  console.log('Заканчивается на:', token.substring(token.length - 20));
  console.log('Содержит точки:', token.includes('.'));
  console.log('Количество точек:', (token.match(/\./g) || []).length);
  
  // Проверяем формат JWT
  const parts = token.split('.');
  if (parts.length === 3) {
    console.log('✅ JWT формат корректен (3 части)');
  } else {
    console.log('❌ JWT формат некорректен:', parts.length, 'частей');
  }
  
  return token;
};

export const useOrders = (userId: number) => {
  const [orders, setOrders] = useState<UserOrder[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const loadingRef = useRef(false);

  // Загрузка заказов через API
  const loadOrdersFromAPI = useCallback(async () => {
    // Предотвращаем дублирование запросов
    if (loadingRef.current) {
      console.log('🚫 Запрос уже выполняется, пропускаем');
      return;
    }
    
    try {
      loadingRef.current = true;
      setIsLoading(true);
      setError(null);
      
      const token = localStorage.getItem('token');
      if (!token) {
        throw new Error('Токен не найден');
      }

      // Отладочная информация
      console.log('🚀 Загружаем заказы для пользователя:', userId);
      const debugToken = debugJWT();
      if (debugToken) {
        console.log('📤 Отправляем запрос с токеном длиной:', debugToken.length);
      }

      // Загружаем заказы через API
      const apiOrders = await apiService.getUserOrders(userId, token);
      setOrders(apiOrders);
      
      // Сохраняем в localStorage как кэш
      try {
        localStorage.setItem(`orders_${userId}`, JSON.stringify(apiOrders));
      } catch (localError) {
        console.warn('Не удалось сохранить заказы в localStorage:', localError);
      }
      
    } catch (apiError) {
      console.error('Ошибка загрузки заказов из API:', apiError);
      setError('Не удалось загрузить заказы с сервера');
      
      // Fallback: загружаем из localStorage
      try {
        const savedOrders = localStorage.getItem(`orders_${userId}`);
        if (savedOrders) {
          const parsedOrders = JSON.parse(savedOrders);
          setOrders(parsedOrders);
        }
      } catch (localError) {
        console.error('Ошибка загрузки заказов из localStorage:', localError);
        setOrders([]);
      }
    } finally {
      setIsLoading(false);
      loadingRef.current = false;
    }
  }, [userId]);

  // Загрузка заказов из localStorage (только как fallback)
  const loadOrdersFromLocal = () => {
    try {
      const savedOrders = localStorage.getItem(`orders_${userId}`);
      if (savedOrders) {
        const parsedOrders = JSON.parse(savedOrders);
        setOrders(parsedOrders);
      }
    } catch (error) {
      console.error('Ошибка загрузки заказов из localStorage:', error);
      setOrders([]);
    } finally {
      setIsLoading(false);
    }
  };

  // Основная функция загрузки заказов
  const loadOrders = async () => {
    await loadOrdersFromAPI();
  };

  // Сохранение заказов в localStorage (только как кэш)
  const saveOrdersToLocal = (newOrders: UserOrder[]) => {
    try {
      localStorage.setItem(`orders_${userId}`, JSON.stringify(newOrders));
    } catch (error) {
      console.warn('Не удалось сохранить заказы в localStorage:', error);
    }
  };

  // Добавление нового заказа (через API)
  const addOrder = async (order: UserOrder) => {
    try {
      const token = localStorage.getItem('token');
      if (token) {
        // Пытаемся создать заказ через API
        await apiService.createOrder({
          userId: userId,
          items: order.items.map(item => ({
            productId: item.id,
            productName: item.productName,
            quantity: item.quantity,
            price: item.price,
            shopId: 1, // Временное значение, должно приходить из контекста
            shopName: order.shopName,
          })),
          totalAmount: order.totalAmount,
          deliveryAddress: order.deliveryAddress,
          customerName: 'Пользователь', // Должно приходить из профиля
          customerEmail: 'user@example.com', // Должно приходить из профиля
          customerPhone: '+7 999 999 99 99', // Должно приходить из профиля
          deliveryMethod: 'courier',
          paymentMethod: 'card',
        }, token);
        
        // Обновляем список заказов
        await loadOrdersFromAPI();
      } else {
        // Если токена нет, сохраняем локально
        const newOrders = [order, ...orders];
        setOrders(newOrders);
        saveOrdersToLocal(newOrders);
      }
    } catch (error) {
      console.error('Ошибка создания заказа через API:', error);
      // Fallback: сохраняем локально
      const newOrders = [order, ...orders];
      setOrders(newOrders);
      saveOrdersToLocal(newOrders);
    }
  };

  // Обновление статуса заказа (через API)
  const updateOrderStatus = async (orderId: string, newStatus: UserOrder['status']) => {
    try {
      const token = localStorage.getItem('token');
      if (token) {
        // Пытаемся обновить статус через API
        await apiService.updateOrderStatus(orderId, { status: newStatus }, token);
        
        // Обновляем список заказов
        await loadOrdersFromAPI();
      } else {
        // Если токена нет, обновляем локально
        const updatedOrders = orders.map(order => 
          order.id === orderId ? { ...order, status: newStatus } : order
        );
        setOrders(updatedOrders);
        saveOrdersToLocal(updatedOrders);
      }
    } catch (error) {
      console.error('Ошибка обновления статуса заказа через API:', error);
      // Fallback: обновляем локально
      const updatedOrders = orders.map(order => 
        order.id === orderId ? { ...order, status: newStatus } : order
      );
      setOrders(updatedOrders);
      saveOrdersToLocal(updatedOrders);
    }
  };

  // Удаление заказа (через API)
  const removeOrder = async (orderId: string) => {
    try {
      const token = localStorage.getItem('token');
      if (token) {
        // Пытаемся удалить заказ через API
        await apiService.deleteOrder(orderId, token);
        
        // Обновляем список заказов
        await loadOrdersFromAPI();
      } else {
        // Если токена нет, удаляем локально
        const filteredOrders = orders.filter(order => order.id !== orderId);
        setOrders(filteredOrders);
        saveOrdersToLocal(filteredOrders);
      }
    } catch (error) {
      console.error('Ошибка удаления заказа через API:', error);
      // Fallback: удаляем локально
      const filteredOrders = orders.filter(order => order.id !== orderId);
      setOrders(filteredOrders);
      saveOrdersToLocal(filteredOrders);
    }
  };

  // Генерация уникального ID заказа
  const generateOrderId = () => {
    const timestamp = Date.now();
    const random = Math.floor(Math.random() * 1000);
    return `ORD-${timestamp}-${random}`;
  };

  // Создание нового заказа
  const createOrder = async (orderData: {
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

    await addOrder(newOrder);
    return newOrder;
  };

  useEffect(() => {
    // При инициализации пытаемся загрузить из API
    const token = localStorage.getItem('token');
    if (token) {
      loadOrdersFromAPI();
    } else {
      // Если токена нет, загружаем из localStorage
      loadOrdersFromLocal();
    }
  }, [userId, loadOrdersFromAPI]);

  return {
    orders,
    isLoading,
    error,
    addOrder,
    updateOrderStatus,
    removeOrder,
    createOrder,
    loadOrders,
  };
};
