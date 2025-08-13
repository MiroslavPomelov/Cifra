'use client';
import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import {
  Box,
  Container,
  VStack,
  HStack,
  Text,
  Button,
  useToast,
  Card,
  CardBody,
  CardHeader,
  FormControl,
  FormLabel,
  Input,
  Textarea,
  Select,
  Divider,
  Badge,
  Image,
  Heading,
  Alert,
  AlertIcon,
  Spinner,
} from '@chakra-ui/react';
import { motion } from 'framer-motion';
import { FaArrowLeft, FaCreditCard, FaMapMarkerAlt, FaPhone, FaUser, FaEnvelope } from 'react-icons/fa';
import { FiHome } from 'react-icons/fi';
import { Icon } from '@chakra-ui/react';
import { apiService } from '../../services/api';
import { useOrders } from '../hooks/useOrders';
import PaymentForm from './components/PaymentForm';

interface CartItem {
  id: number;
  name: string;
  price: number;
  quantity: number;
  imageUrl: string;
  shopName: string;
  shopId?: number;
}

interface CheckoutForm {
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  address: string;
  deliveryNotes: string;
  deliveryMethod: string;
  paymentMethod: string;
}

const CheckoutPage: React.FC = () => {
  const router = useRouter();
  const toast = useToast();
  const [cartItems, setCartItems] = useState<CartItem[]>([]);
  const [loading, setLoading] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const [userId, setUserId] = useState<number | null>(null);
  const { createOrder: createLocalOrder } = useOrders(userId || 0);
  const [paymentStep, setPaymentStep] = useState(false);
  const [paymentId, setPaymentId] = useState<string | null>(null);
  const [form, setForm] = useState<CheckoutForm>({
    firstName: '',
    lastName: '',
    email: '',
    phone: '',
    address: '',
    deliveryNotes: '',
    deliveryMethod: 'standard',
    paymentMethod: 'card',
  });

  // Загрузка корзины из localStorage
  useEffect(() => {
    // Проверяем авторизацию пользователя
    const token = localStorage.getItem('token');
    if (!token) {
      toast({
        title: 'Требуется авторизация',
        description: 'Для оформления заказа необходимо войти в систему',
        status: 'warning',
        duration: 4000,
        isClosable: true,
      });
      router.push('/login');
      return;
    }

    // Декодируем JWT для получения ID пользователя
    const payload = parseJwt(token);
    if (payload && payload.sub) {
      setUserId(payload.sub);
    }

    const savedCart = localStorage.getItem('cart');
    if (savedCart) {
      try {
        const items = JSON.parse(savedCart);
        setCartItems(items);
        
        // Если корзина пуста, перенаправляем обратно
        if (items.length === 0) {
          toast({
            title: 'Корзина пуста',
            description: 'Добавьте товары в корзину для оформления заказа',
            status: 'warning',
            duration: 3000,
            isClosable: true,
          });
          router.push('/cart');
          return;
        }
      } catch (error) {
        console.error('Ошибка загрузки корзины:', error);
        router.push('/cart');
      }
    } else {
      router.push('/cart');
    }
  }, [router, toast]);

  // Расчет общей суммы
  const totalAmount = cartItems.reduce((sum, item) => sum + (item.price * item.quantity), 0);
  const deliveryCost = form.deliveryMethod === 'express' ? 500 : 0;
  const finalTotal = totalAmount + deliveryCost;

  // Обработка изменения формы
  const handleFormChange = (field: keyof CheckoutForm, value: string) => {
    setForm(prev => ({ ...prev, [field]: value }));
  };

    // Обработка отправки формы
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!form.firstName || !form.lastName || !form.email || !form.phone || !form.address) {
      toast({
        title: 'Заполните обязательные поля',
        description: 'Пожалуйста, заполните все обязательные поля формы',
        status: 'warning',
        duration: 3000,
        isClosable: true,
      });
      return;
    }

    // Если выбран способ оплаты картой, переходим к оплате
    if (form.paymentMethod === 'card') {
      setPaymentStep(true);
      return;
    }

    // Для оплаты наличными сразу создаем заказ
    await createOrder();
  };

  // Создание заказа
  const createOrder = async () => {
    setSubmitting(true);
    
    try {
      const token = localStorage.getItem('token');
      if (!token) {
        throw new Error('Токен не найден');
      }

      // Декодируем JWT для получения ID пользователя
      const payload = parseJwt(token);
      if (!payload || !payload.sub) {
        throw new Error('Неверный токен');
      }

      // Подготавливаем данные заказа
      const orderData = {
        userId: payload.sub,
        items: cartItems.map(item => ({
          productId: item.id,
          productName: item.name,
          quantity: item.quantity,
          price: item.price,
          shopId: item.shopId || 1,
          shopName: item.shopName || 'Цветочный магазин',
        })),
        totalAmount: finalTotal,
        deliveryAddress: form.address,
        customerName: `${form.firstName} ${form.lastName}`,
        customerEmail: form.email,
        customerPhone: form.phone,
        deliveryNotes: form.deliveryNotes,
        deliveryMethod: form.deliveryMethod,
        paymentMethod: form.paymentMethod,
      };

      // Создаем заказ локально
      const localOrder = createLocalOrder(orderData);
      
      // Пытаемся создать заказ через API
      try {
        const result = await apiService.createOrder(orderData, token);
        toast({
          title: 'Заказ оформлен успешно!',
          description: `Заказ №${result.orderId} создан. Мы свяжемся с вами в ближайшее время.`,
          status: 'success',
          duration: 5000,
          isClosable: true,
        });
      } catch (apiError) {
        toast({
          title: 'Заказ создан!',
          description: `Заказ №${localOrder.orderNumber} сохранен локально. В реальном приложении он будет отправлен на сервер.`,
          status: 'info',
          duration: 5000,
          isClosable: true,
        });
      }
      
      // Очищаем корзину после успешного заказа
      localStorage.removeItem('cart');
      window.dispatchEvent(new Event('cartUpdated'));
      
      // Перенаправляем на профиль для просмотра заказа
      setTimeout(() => {
        router.push('/profile');
      }, 2000);
      
    } catch (error) {
      console.error('Ошибка создания заказа:', error);
      toast({
        title: 'Ошибка оформления заказа',
        description: 'Произошла ошибка при оформлении заказа. Попробуйте еще раз.',
        status: 'error',
        duration: 5000,
        isClosable: true,
      });
    } finally {
      setSubmitting(false);
    }
  };

  // Обработка успешной оплаты
  const handlePaymentSuccess = async (paymentId: string) => {
    setPaymentId(paymentId);
    
    // После успешной оплаты создаем заказ
    await createOrder();
  };

  // Обработка ошибки оплаты
  const handlePaymentError = (error: string) => {
    toast({
      title: 'Ошибка оплаты',
      description: error,
      status: 'error',
      duration: 5000,
      isClosable: true,
    });
  };

  // Функция для декодирования JWT
  const parseJwt = (token: string): any | null => {
    try {
      const base64Url = token.split('.')[1];
      const base64 = base64Url.replace(/-/g, '+').replace(/_/g, '/');
      const jsonPayload = decodeURIComponent(
        atob(base64)
          .split('')
          .map((c) => '%' + ('00' + c.charCodeAt(0).toString(16)).slice(-2))
          .join(''),
      );
      return JSON.parse(jsonPayload);
    } catch {
      return null;
    }
  };

  if (loading) {
    return (
      <Box minH="100vh" bg="gray.50" display="flex" alignItems="center" justifyContent="center">
        <Spinner size="xl" color="pink.500" />
      </Box>
    );
  }

  return (
    <Box minH="100vh" bg="gray.50">
      <Container maxW="6xl" py={8}>
        <VStack spacing={8} align="stretch">
          {/* Заголовок и навигация */}
          <HStack justify="space-between" align="center">
            <HStack spacing={4}>
              <Button
                leftIcon={<Icon as={FiHome} />}
                colorScheme="pink"
                variant="outline"
                onClick={() => router.push('/')}
                size="md"
              >
                На главную
              </Button>
              <Button
                leftIcon={<FaArrowLeft />}
                variant="ghost"
                onClick={() => router.push('/cart')}
              >
                Назад к корзине
              </Button>
            </HStack>
            
            <Heading size="lg" color="gray.700">
              💳 Оформление заказа
            </Heading>
          </HStack>

                     <HStack spacing={8} align="start">
             {/* Форма оформления заказа или оплаты */}
             <VStack spacing={6} flex={1} align="stretch">
                              {!paymentStep ? (
                 <>
                   <Card>
                     <CardHeader>
                       <Heading size="md" color="gray.700">
                         <FaUser style={{ display: 'inline', marginRight: '8px' }} />
                         Контактная информация
                       </Heading>
                     </CardHeader>
                     <CardBody>
                       <VStack spacing={4} align="stretch">
                         <HStack spacing={4}>
                           <FormControl isRequired>
                             <FormLabel>Имя</FormLabel>
                             <Input
                               placeholder="Введите ваше имя"
                               value={form.firstName}
                               onChange={(e) => handleFormChange('firstName', e.target.value)}
                             />
                           </FormControl>
                           <FormControl isRequired>
                             <FormLabel>Фамилия</FormLabel>
                             <Input
                               placeholder="Введите вашу фамилию"
                               value={form.lastName}
                               onChange={(e) => handleFormChange('lastName', e.target.value)}
                             />
                           </FormControl>
                         </HStack>
                         
                         <HStack spacing={4}>
                           <FormControl isRequired>
                             <FormLabel>Email</FormLabel>
                             <Input
                               type="email"
                               placeholder="your@email.com"
                               value={form.email}
                               onChange={(e) => handleFormChange('email', e.target.value)}
                             />
                           </FormControl>
                           <FormControl isRequired>
                             <FormLabel>Телефон</FormLabel>
                             <Input
                               placeholder="+7 (999) 123-45-67"
                               value={form.phone}
                               onChange={(e) => handleFormChange('phone', e.target.value)}
                             />
                           </FormControl>
                         </HStack>
                       </VStack>
                     </CardBody>
                   </Card>

                   <Card>
                     <CardHeader>
                       <Heading size="md" color="gray.700">
                         <FaMapMarkerAlt style={{ display: 'inline', marginRight: '8px' }} />
                         Адрес доставки
                       </Heading>
                     </CardHeader>
                     <CardBody>
                       <VStack spacing={4} align="stretch">
                         <FormControl isRequired>
                           <FormLabel>Адрес доставки</FormLabel>
                           <Textarea
                             placeholder="Введите полный адрес доставки"
                             value={form.address}
                             onChange={(e) => handleFormChange('address', e.target.value)}
                             rows={3}
                           />
                         </FormControl>
                         
                         <FormControl>
                           <FormLabel>Примечания к доставке</FormLabel>
                           <Textarea
                             placeholder="Дополнительная информация для курьера"
                             value={form.deliveryNotes}
                             onChange={(e) => handleFormChange('deliveryNotes', e.target.value)}
                             rows={2}
                           />
                         </FormControl>
                       </VStack>
                     </CardBody>
                   </Card>

                   <Card>
                     <CardHeader>
                       <Heading size="md" color="gray.700">
                         🚚 Способ доставки
                       </Heading>
                     </CardHeader>
                     <CardBody>
                       <VStack spacing={4} align="stretch">
                         <FormControl>
                           <FormLabel>Выберите способ доставки</FormLabel>
                           <Select
                             value={form.deliveryMethod}
                             onChange={(e) => handleFormChange('deliveryMethod', e.target.value)}
                           >
                             <option value="standard">Стандартная доставка (1-2 дня) - Бесплатно</option>
                             <option value="express">Экспресс доставка (в день заказа) - 500 ₽</option>
                           </Select>
                         </FormControl>
                       </VStack>
                     </CardBody>
                   </Card>

                   <Card>
                     <CardHeader>
                       <Heading size="md" color="gray.700">
                         <FaCreditCard style={{ display: 'inline', marginRight: '8px' }} />
                         Способ оплаты
                       </Heading>
                     </CardHeader>
                     <CardBody>
                       <VStack spacing={4} align="stretch">
                         <FormControl>
                           <FormLabel>Выберите способ оплаты</FormLabel>
                           <Select
                             value={form.paymentMethod}
                             onChange={(e) => handleFormChange('paymentMethod', e.target.value)}
                           >
                             <option value="card">Банковская карта</option>
                             <option value="cash">Наличными при получении</option>
                           </Select>
                         </FormControl>
                       </VStack>
                     </CardBody>
                   </Card>
                 </>
               ) : (
                 <PaymentForm
                   amount={finalTotal}
                   onPaymentSuccess={handlePaymentSuccess}
                   onPaymentError={handlePaymentError}
                   isLoading={submitting}
                 />
               )}
            </VStack>

            {/* Сводка заказа */}
            <Card w="400px" position="sticky" top="20px">
              <CardHeader>
                <Heading size="md" color="gray.700">
                  📋 Сводка заказа
                </Heading>
              </CardHeader>
              <CardBody>
                <VStack spacing={4} align="stretch">
                  {/* Товары */}
                  <VStack spacing={3} align="stretch">
                    <Text fontWeight="semibold" color="gray.700">
                      Товары в заказе:
                    </Text>
                    {cartItems.map((item) => (
                      <HStack key={item.id} spacing={3} align="start">
                        <Image
                          src={item.imageUrl}
                          alt={item.name}
                          borderRadius="md"
                          boxSize="50px"
                          objectFit="cover"
                        />
                        <VStack align="start" flex={1} spacing={1}>
                          <Text fontSize="sm" fontWeight="medium" noOfLines={2}>
                            {item.name}
                          </Text>
                          <Badge colorScheme="purple" variant="subtle" fontSize="xs">
                            {item.shopName}
                          </Badge>
                          <Text fontSize="xs" color="gray.500">
                            {item.quantity} × {item.price.toLocaleString('ru-RU')} ₽
                          </Text>
                        </VStack>
                        <Text fontSize="sm" fontWeight="semibold">
                          {(item.price * item.quantity).toLocaleString('ru-RU')} ₽
                        </Text>
                      </HStack>
                    ))}
                  </VStack>

                  <Divider />

                  {/* Расчет стоимости */}
                  <VStack spacing={2} align="stretch">
                    <HStack justify="space-between">
                      <Text color="gray.600">Товары:</Text>
                      <Text>{totalAmount.toLocaleString('ru-RU')} ₽</Text>
                    </HStack>
                    
                    <HStack justify="space-between">
                      <Text color="gray.600">Доставка:</Text>
                      <Text>{deliveryCost === 0 ? 'Бесплатно' : `${deliveryCost} ₽`}</Text>
                    </HStack>
                    
                    <Divider />
                    
                    <HStack justify="space-between">
                      <Text fontSize="lg" fontWeight="bold" color="gray.700">
                        Итого к оплате:
                      </Text>
                      <Text fontSize="xl" fontWeight="bold" color="pink.500">
                        {finalTotal.toLocaleString('ru-RU')} ₽
                      </Text>
                    </HStack>
                  </VStack>

                                     {/* Кнопка оформления */}
                   <Button
                     leftIcon={<FaCreditCard />}
                     colorScheme="pink"
                     size="lg"
                     onClick={handleSubmit}
                     isLoading={submitting}
                     loadingText="Оформляем заказ..."
                     width="100%"
                   >
                     {paymentStep ? 'Вернуться к форме' : 'Перейти к оплате'}
                   </Button>

                  <Text fontSize="xs" color="gray.500" textAlign="center">
                    Нажимая кнопку, вы соглашаетесь с условиями покупки
                  </Text>
                </VStack>
              </CardBody>
            </Card>
          </HStack>
        </VStack>
      </Container>
    </Box>
  );
};

export default CheckoutPage;
