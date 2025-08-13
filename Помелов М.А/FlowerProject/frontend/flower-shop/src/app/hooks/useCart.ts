'use client';
import { useState, useEffect, useCallback } from 'react';
import { useToast } from '@chakra-ui/react';

export interface CartItem {
  id: number;
  name: string;
  price: number;
  quantity: number;
  imageUrl: string;
  shopName: string;
}

export const useCart = () => {
  const [cartItems, setCartItems] = useState<CartItem[]>([]);
  const [cartItemCount, setCartItemCount] = useState(0);
  const toast = useToast();

  // Загрузка корзины из localStorage
  const loadCart = useCallback(() => {
    try {
      const savedCart = localStorage.getItem('cart');
      if (savedCart) {
        const items = JSON.parse(savedCart);
        setCartItems(items);
        const totalCount = items.reduce((sum: number, item: CartItem) => sum + (item.quantity || 0), 0);
        setCartItemCount(totalCount);
      } else {
        setCartItems([]);
        setCartItemCount(0);
      }
    } catch (error) {
      console.error('Ошибка загрузки корзины:', error);
      setCartItems([]);
      setCartItemCount(0);
    }
  }, []);

  // Сохранение корзины в localStorage
  const saveCart = useCallback((items: CartItem[]) => {
    localStorage.setItem('cart', JSON.stringify(items));
    window.dispatchEvent(new Event('cartUpdated'));
  }, []);

  // Добавление товара в корзину
  const addToCart = useCallback((product: any) => {
    try {
      const savedCart = localStorage.getItem('cart');
      let currentCart = savedCart ? JSON.parse(savedCart) : [];

      const existingItemIndex = currentCart.findIndex((item: CartItem) => item.id === product.id);

      if (existingItemIndex !== -1) {
        // Если товар уже есть, увеличиваем количество
        currentCart[existingItemIndex].quantity += 1;
      } else {
        // Если товара нет, добавляем новый
        const newItem: CartItem = {
          id: product.id,
          name: product.name,
          price: parseFloat(product.price),
          quantity: 1,
          imageUrl: product.imageUrl || '',
          shopName: product.shopName || 'Магазин цветов',
        };
        currentCart.push(newItem);
      }

      saveCart(currentCart);
      setCartItems(currentCart);
      const totalCount = currentCart.reduce((sum: number, item: CartItem) => sum + (item.quantity || 0), 0);
      setCartItemCount(totalCount);

      toast({
        title: 'Товар добавлен в корзину',
        description: `${product.name} успешно добавлен в корзину`,
        status: 'success',
        duration: 2000,
        isClosable: true,
        position: 'top-right',
      });

    } catch (error) {
      console.error('Ошибка добавления товара в корзину:', error);
      toast({
        title: 'Ошибка',
        description: 'Не удалось добавить товар в корзину',
        status: 'error',
        duration: 3000,
        isClosable: true,
      });
    }
  }, [saveCart, toast]);

  // Обновление количества товара
  const updateQuantity = useCallback((itemId: number, newQuantity: number) => {
    if (newQuantity <= 0) {
      removeFromCart(itemId);
      return;
    }
    
    const updatedItems = cartItems.map(item =>
      item.id === itemId ? { ...item, quantity: newQuantity } : item
    );
    setCartItems(updatedItems);
    saveCart(updatedItems);
    
    const totalCount = updatedItems.reduce((sum: number, item: CartItem) => sum + (item.quantity || 0), 0);
    setCartItemCount(totalCount);
  }, [cartItems, saveCart]);

  // Удаление товара из корзины
  const removeFromCart = useCallback((itemId: number) => {
    const updatedItems = cartItems.filter(item => item.id !== itemId);
    setCartItems(updatedItems);
    saveCart(updatedItems);
    
    const totalCount = updatedItems.reduce((sum: number, item: CartItem) => sum + (item.quantity || 0), 0);
    setCartItemCount(totalCount);

    toast({
      title: 'Товар удален',
      description: 'Товар был удален из корзины',
      status: 'info',
      duration: 2000,
      isClosable: true,
    });
  }, [cartItems, saveCart, toast]);

  // Очистка корзины
  const clearCart = useCallback(() => {
    setCartItems([]);
    setCartItemCount(0);
    localStorage.removeItem('cart');
    window.dispatchEvent(new Event('cartUpdated'));

    toast({
      title: 'Корзина очищена',
      description: 'Все товары были удалены из корзины',
      status: 'info',
      duration: 2000,
      isClosable: true,
    });
  }, [toast]);

  // Расчет общей суммы
  const getTotalAmount = useCallback(() => {
    return cartItems.reduce((sum, item) => sum + (item.price * item.quantity), 0);
  }, [cartItems]);

  // Инициализация при монтировании
  useEffect(() => {
    loadCart();

    // Слушаем изменения в localStorage
    const handleStorageChange = (e: StorageEvent) => {
      if (e.key === 'cart') {
        loadCart();
      }
    };

    // Слушаем события обновления корзины
    const handleCartUpdate = () => {
      loadCart();
    };

    window.addEventListener('storage', handleStorageChange);
    window.addEventListener('cartUpdated', handleCartUpdate);

    return () => {
      window.removeEventListener('storage', handleStorageChange);
      window.removeEventListener('cartUpdated', handleCartUpdate);
    };
  }, [loadCart]);

  return {
    cartItems,
    cartItemCount,
    addToCart,
    updateQuantity,
    removeFromCart,
    clearCart,
    getTotalAmount,
    loadCart,
  };
};
