import { useState, useEffect, useCallback, useRef } from 'react';
import { apiService, UserOrder } from '../../services/api';


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

  const loadOrdersFromAPI = useCallback(async () => {
    // Для гостевых заказов (userId = 0) не загружаем из API
    if (userId === 0) {
      setIsLoading(false);
      return;
    }

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

      console.log('🚀 Загружаем заказы для пользователя:', userId);
      const debugToken = debugJWT();
      if (debugToken) {
        console.log('📤 Отправляем запрос с токеном длиной:', debugToken.length);
      }

      const apiOrders = await apiService.getUserOrders(userId, token);
      setOrders(apiOrders);
      
      try {
        localStorage.setItem(`orders_${userId}`, JSON.stringify(apiOrders));
      } catch (localError) {
        console.warn('Не удалось сохранить заказы в localStorage:', localError);
      }
      
    } catch (apiError) {
      console.error('Ошибка загрузки заказов из API:', apiError);
      setError('Не удалось загрузить заказы с сервера');
      
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

  const loadOrdersFromLocal = () => {
    try {
      // Для гостевых заказов загружаем из специального ключа
      const key = userId === 0 ? 'guest_orders' : `orders_${userId}`;
      const savedOrders = localStorage.getItem(key);
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


  const loadOrders = async () => {
    await loadOrdersFromAPI();
  };

  const saveOrdersToLocal = (newOrders: UserOrder[]) => {
    try {
      // Для гостевых заказов сохраняем в специальный ключ
      const key = userId === 0 ? 'guest_orders' : `orders_${userId}`;
      localStorage.setItem(key, JSON.stringify(newOrders));
    } catch (error) {
      console.warn('Не удалось сохранить заказы в localStorage:', error);
    }
  };


  const addOrder = async (order: UserOrder) => {
    try {
      const token = localStorage.getItem('token');
      
      // Для гостевых заказов (userId = 0) создаем только локальный заказ
      if (userId === 0) {
        const newOrders = [order, ...orders];
        setOrders(newOrders);
        saveOrdersToLocal(newOrders);
        return;
      }
      
      if (token) {
        await apiService.createOrder({
          userId: userId,
          items: order.items.map(item => ({
            productId: item.id,
            productName: item.productName,
            quantity: item.quantity,
            price: item.price,
            shopId: 1, // 
            shopName: order.shopName,
          })),
          totalAmount: order.totalAmount,
          deliveryAddress: order.deliveryAddress,
          customerName: 'Пользователь', 
          customerEmail: 'user@example.com', 
          customerPhone: '+7 999 999 99 99',
          deliveryMethod: 'courier',
          paymentMethod: 'card',
        }, token);
        

        await loadOrdersFromAPI();
      } else {
        const newOrders = [order, ...orders];
        setOrders(newOrders);
        saveOrdersToLocal(newOrders);
      }
    } catch (error) {
      console.error('Ошибка создания заказа через API:', error);

      const newOrders = [order, ...orders];
      setOrders(newOrders);
      saveOrdersToLocal(newOrders);
    }
  };


  const updateOrderStatus = async (orderId: string, newStatus: UserOrder['status']) => {
    try {
      const token = localStorage.getItem('token');
      if (token) {
        await apiService.updateOrderStatus(orderId, { status: newStatus }, token);
        

        await loadOrdersFromAPI();
      } else {
        const updatedOrders = orders.map(order => 
          order.id === orderId ? { ...order, status: newStatus } : order
        );
        setOrders(updatedOrders);
        saveOrdersToLocal(updatedOrders);
      }
    } catch (error) {
      console.error('Ошибка обновления статуса заказа через API:', error);
      const updatedOrders = orders.map(order => 
        order.id === orderId ? { ...order, status: newStatus } : order
      );
      setOrders(updatedOrders);
      saveOrdersToLocal(updatedOrders);
    }
  };

  const removeOrder = async (orderId: string) => {
    try {
      const token = localStorage.getItem('token');
      if (token) {
        await apiService.deleteOrder(orderId, token);
        
        await loadOrdersFromAPI();
      } else {
        const filteredOrders = orders.filter(order => order.id !== orderId);
        setOrders(filteredOrders);
        saveOrdersToLocal(filteredOrders);
      }
    } catch (error) {
      console.error('Ошибка удаления заказа через API:', error);
      const filteredOrders = orders.filter(order => order.id !== orderId);
      setOrders(filteredOrders);
      saveOrdersToLocal(filteredOrders);
    }
  };

  const generateOrderId = () => {
    const timestamp = Date.now();
    const random = Math.floor(Math.random() * 1000);
    return `ORD-${timestamp}-${random}`;
  };

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
    const token = localStorage.getItem('token');
    
    // Для гостевых заказов (userId = 0) загружаем только из localStorage
    if (userId === 0) {
      loadOrdersFromLocal();
      return;
    }
    
    if (token) {
      loadOrdersFromAPI();
    } else {
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
