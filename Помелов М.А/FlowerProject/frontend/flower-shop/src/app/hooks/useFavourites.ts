'use client';
import { useState, useEffect, useCallback } from 'react';
import { useToast } from '@chakra-ui/react';
import { apiService } from '../../services/api';

export interface FavouriteProduct {
  id: number;
  productId: number;
  productName: string;
  productDescription?: string;
  productPrice?: number;
  productImage?: string;
  addedDate: string;
}

export const useFavourites = () => {
  const [favouriteProducts, setFavouriteProducts] = useState<FavouriteProduct[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const toast = useToast();

  // Получение ID пользователя из токена
  const getUserId = useCallback((): number | null => {
    try {
      const token = localStorage.getItem('token');
      if (!token) return null;
      
      console.log('🔍 getUserId - token:', token.substring(0, 50) + '...');
      
      // Проверяем формат JWT токена
      const parts = token.split('.');
      if (parts.length !== 3) {
        console.error('❌ getUserId - Неверный формат JWT токена:', parts.length, 'частей');
        return null;
      }
      
      const payload = JSON.parse(atob(parts[1]));
      console.log('🔍 getUserId - payload:', payload);
      
      // Проверяем время истечения токена
      if (payload.exp) {
        const now = Math.floor(Date.now() / 1000);
        const expiresAt = payload.exp;
        console.log('🔍 getUserId - Токен истекает:', new Date(expiresAt * 1000).toLocaleString());
        console.log('🔍 getUserId - Текущее время:', new Date(now * 1000).toLocaleString());
        console.log('🔍 getUserId - Токен истек:', now > expiresAt);
        
        if (now > expiresAt) {
          console.error('❌ getUserId - Токен истек!');
          // Удаляем истекший токен
          localStorage.removeItem('token');
          return null;
        }
      }
      
      const userId = payload.sub || null;
      console.log('🔍 getUserId - extracted userId:', userId);
      
      return userId;
    } catch (error) {
      console.error('❌ Ошибка получения ID пользователя:', error);
      return null;
    }
  }, []);

  // Получение токена
  const getToken = useCallback((): string | null => {
    const token = localStorage.getItem('token');
    console.log('🔍 getToken - token exists:', !!token, 'length:', token?.length);
    
    if (token) {
      // Проверяем, не истек ли токен
      try {
        const parts = token.split('.');
        if (parts.length === 3) {
          const payload = JSON.parse(atob(parts[1]));
          if (payload.exp) {
            const now = Math.floor(Date.now() / 1000);
            if (now > payload.exp) {
              console.error('❌ getToken - Токен истек, удаляем его');
              localStorage.removeItem('token');
              setIsAuthenticated(false);
              return null;
            }
          }
        }
        setIsAuthenticated(true);
      } catch (error) {
        console.error('❌ getToken - Ошибка проверки токена:', error);
        localStorage.removeItem('token');
        setIsAuthenticated(false);
        return null;
      }
    } else {
      setIsAuthenticated(false);
    }
    
    return token;
  }, []);

  // Загрузка избранных товаров
  const loadFavourites = useCallback(async () => {
    const userId = getUserId();
    const token = getToken();
    
    console.log('🔍 loadFavourites - userId:', userId);
    console.log('🔍 loadFavourites - token length:', token?.length);
    
    if (!userId || !token) {
      console.log('🔍 loadFavourites - Нет userId или token, очищаем избранное');
      setFavouriteProducts([]);
      setIsAuthenticated(false);
      return;
    }

    setIsLoading(true);
    try {
      console.log('🔍 loadFavourites - Загружаем избранные товары...');
      const favourites = await apiService.getFavouriteProducts(userId, token);
      console.log('🔍 loadFavourites - Получены избранные товары:', favourites);
      setFavouriteProducts(favourites);
    } catch (error) {
      console.error('❌ loadFavourites - Ошибка загрузки избранных товаров:', error);
      toast({
        title: 'Ошибка',
        description: 'Не удалось загрузить избранные товары',
        status: 'error',
        duration: 3000,
        isClosable: true,
      });
    } finally {
      setIsLoading(false);
    }
  }, [getUserId, getToken, toast]);

//   // Функция для перенаправления на страницу входа
//   const redirectToLogin = useCallback(() => {
//     console.log('🔍 redirectToLogin - Перенаправляем на страницу входа');
//     // Можно использовать router.push('/login') если есть доступ к Next.js router
//     window.location.href = '/login';
//   }, []);

  // Добавление товара в избранное
  const addToFavourites = useCallback(async (product: any) => {
    const userId = getUserId();
    const token = getToken();
    
    console.log('🔍 addToFavourites - userId:', userId);
    console.log('🔍 addToFavourites - token length:', token?.length);
    console.log('🔍 addToFavourites - product:', product);
    
    // Проверяем роль пользователя
    const userRole = localStorage.getItem('userRole');
    console.log('🔍 addToFavourites - userRole:', userRole);
    
    if (!userId || !token) {
      toast({
        title: 'Ошибка авторизации',
        description: 'Необходимо войти в систему',
        status: 'warning',
        duration: 3000,
        isClosable: true,
      });
      

      
      return false;
    }
    
    if (userRole === 'shop') {
      toast({
        title: 'Ошибка',
        description: 'Магазины не могут добавлять товары в избранное',
        status: 'error',
        duration: 3000,
        isClosable: true,
      });
      return false;
    }

    try {
      // Проверяем, что у продукта есть все необходимые поля
      if (!product.id || !product.name || !product.price) {
        console.error('❌ addToFavourites - Неполные данные продукта:', product);
        toast({
          title: 'Ошибка',
          description: 'Неполные данные продукта',
          status: 'error',
          duration: 3000,
          isClosable: true,
        });
        return false;
      }

      const productPrice = parseFloat(product.price);
      if (isNaN(productPrice)) {
        console.error('❌ addToFavourites - Некорректная цена:', product.price);
        toast({
          title: 'Ошибка',
          description: 'Некорректная цена продукта',
          status: 'error',
          duration: 3000,
          isClosable: true,
        });
        return false;
      }

      const favouriteData = {
        productId: product.id,
        productName: product.name,
        productDescription: product.description || '',
        productPrice: productPrice,
        productImage: product.imageUrl || '',
      };

      console.log('🔍 addToFavourites - favouriteData:', favouriteData);
      console.log('🔍 addToFavourites - API call starting...');

      const result = await apiService.addFavouriteProduct(userId, favouriteData, token);
      
      console.log('🔍 addToFavourites - API result:', result);
      
      // Обновляем локальное состояние
      const newFavourite: FavouriteProduct = {
        id: Date.now(), // Временный ID
        productId: product.id,
        productName: product.name,
        productDescription: product.description || '',
        productPrice: productPrice,
        productImage: product.imageUrl || '',
        addedDate: new Date().toISOString(),
      };
      
      setFavouriteProducts(prev => [...prev, newFavourite]);
      
      toast({
        title: 'Добавлено в избранное',
        description: `${product.name} добавлен в избранное`,
        status: 'success',
        duration: 2000,
        isClosable: true,
        position: 'top-right',
      });
      
      return true;
    } catch (error) {
      console.error('Ошибка добавления в избранное:', error);
      toast({
        title: 'Ошибка',
        description: 'Не удалось добавить товар в избранное',
        status: 'error',
        duration: 3000,
        isClosable: true,
      });
      return false;
    }
  }, [getUserId, getToken, toast]);

  // Удаление товара из избранного
  const removeFromFavourites = useCallback(async (productId: number) => {
    const userId = getUserId();
    const token = getToken();
    
    console.log('🔍 removeFromFavourites - productId:', productId);
    console.log('🔍 removeFromFavourites - userId:', userId);
    console.log('🔍 removeFromFavourites - token length:', token?.length);
    
    if (!userId || !token) {
      console.log('🔍 removeFromFavourites - Нет userId или token');
      return false;
    }

    try {
      // Находим ID записи в избранном
      const favouriteItem = favouriteProducts.find(item => item.productId === productId);
      console.log('🔍 removeFromFavourites - найденный favouriteItem:', favouriteItem);
      
      if (!favouriteItem) {
        console.log('🔍 removeFromFavourites - favouriteItem не найден');
        return false;
      }

      console.log('🔍 removeFromFavourites - Удаляем из API...');
      await apiService.removeFavouriteProduct(userId, favouriteItem.id, token);
      
      // Обновляем локальное состояние
      setFavouriteProducts(prev => prev.filter(item => item.productId !== productId));
      
      toast({
        title: 'Удалено из избранного',
        description: 'Товар удален из избранного',
        status: 'info',
        duration: 2000,
        isClosable: true,
      });
      
      return true;
    } catch (error) {
      console.error('❌ removeFromFavourites - Ошибка удаления из избранного:', error);
      toast({
        title: 'Ошибка',
        description: 'Не удалось удалить товар из избранного',
        status: 'error',
        duration: 3000,
        isClosable: true,
      });
      return false;
    }
  }, [getUserId, getToken, favouriteProducts, toast]);

  // Проверка, находится ли товар в избранном
  const isFavourite = useCallback((productId: number): boolean => {
    const result = favouriteProducts.some(item => item.productId === productId);
    console.log('🔍 isFavourite - productId:', productId, 'result:', result, 'total favourites:', favouriteProducts.length);
    return result;
  }, [favouriteProducts]);

  // Переключение состояния избранного
  const toggleFavourite = useCallback(async (product: any) => {
    console.log('🔍 toggleFavourite - product:', product);
    const currentlyFavourite = isFavourite(product.id);
    console.log('🔍 toggleFavourite - currentlyFavourite:', currentlyFavourite);
    
    if (currentlyFavourite) {
      console.log('🔍 toggleFavourite - Удаляем из избранного');
      return await removeFromFavourites(product.id);
    } else {
      console.log('🔍 toggleFavourite - Добавляем в избранное');
      return await addToFavourites(product);
    }
  }, [isFavourite, addToFavourites, removeFromFavourites]);

  // Инициализация при монтировании
  useEffect(() => {
    console.log('🔍 useFavourites - useEffect triggered, загружаем избранное...');
    loadFavourites();
  }, [loadFavourites]);

  return {
    favouriteProducts,
    isLoading,
    isAuthenticated,
    addToFavourites,
    removeFromFavourites,
    isFavourite,
    toggleFavourite,
    loadFavourites,
  };
};
