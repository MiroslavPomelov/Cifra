import React, { useState } from 'react';
import {
  Box,
  VStack,
  HStack,
  Text,
  Button,
  FormControl,
  FormLabel,
  Input,
  FormErrorMessage,
  useToast,
  Card,
  CardBody,
  Badge,
  Spinner,
} from '@chakra-ui/react';
import { FaCreditCard, FaLock, FaCheck } from 'react-icons/fa';
import { apiService } from '../../../services/api';

interface PaymentFormProps {
  amount: number;
  onPaymentSuccess: (paymentId: string) => void;
  onPaymentError: (error: string) => void;
  isLoading?: boolean;
}

interface PaymentFormData {
  cardNumber: string;
  cardHolder: string;
  expiry: string;
  cvc: string;
}

const PaymentForm: React.FC<PaymentFormProps> = ({
  amount,
  onPaymentSuccess,
  onPaymentError,
  isLoading = false,
}) => {
  const toast = useToast();
  const [formData, setFormData] = useState<PaymentFormData>({
    cardNumber: '',
    cardHolder: '',
    expiry: '',
    cvc: '',
  });
  const [errors, setErrors] = useState<Partial<PaymentFormData>>({});
  const [isValidating, setIsValidating] = useState(false);
  const [isProcessing, setIsProcessing] = useState(false);
  const [cardType, setCardType] = useState<string>('');

  const handleInputChange = (field: keyof PaymentFormData, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }));
    
    // Очищаем ошибку при вводе
    if (errors[field]) {
      setErrors(prev => ({ ...prev, [field]: undefined }));
    }

    // Определяем тип карты
    if (field === 'cardNumber' && value.length >= 4) {
      const type = determineCardType(value);
      setCardType(type);
    }
  };

  const determineCardType = (cardNumber: string): string => {
    if (cardNumber.startsWith('4')) return 'Visa';
    if (cardNumber.startsWith('5')) return 'MasterCard';
    if (cardNumber.startsWith('34') || cardNumber.startsWith('37')) return 'American Express';
    if (cardNumber.startsWith('6')) return 'Discover';
    return '';
  };

  const validateForm = (): boolean => {
    const newErrors: Partial<PaymentFormData> = {};

    // Валидация номера карты
    if (!formData.cardNumber) {
      newErrors.cardNumber = 'Номер карты обязателен';
    } else if (formData.cardNumber.length < 13 || formData.cardNumber.length > 19) {
      newErrors.cardNumber = 'Неверная длина номера карты';
    }

    // Валидация имени держателя
    if (!formData.cardHolder) {
      newErrors.cardHolder = 'Имя держателя карты обязательно';
    }

    // Валидация срока действия
    if (!formData.expiry) {
      newErrors.expiry = 'Срок действия обязателен';
    } else if (!/^(0[1-9]|1[0-2])\/([0-9]{2})$/.test(formData.expiry)) {
      newErrors.expiry = 'Формат: MM/YY';
    }

    // Валидация CVC
    if (!formData.cvc) {
      newErrors.cvc = 'CVC код обязателен';
    } else if (formData.cvc.length < 3 || formData.cvc.length > 4) {
      newErrors.cvc = 'CVC код должен содержать 3-4 цифры';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleValidateCard = async () => {
    if (!validateForm()) return;

    setIsValidating(true);
    try {
      const token = localStorage.getItem('token');
      if (!token) {
        throw new Error('Токен не найден');
      }

      const validationResult = await apiService.validateCard(formData, token);
      
      if (validationResult.isValid) {
        toast({
          title: 'Карта валидна',
          description: `Тип карты: ${validationResult.cardType || 'Неизвестно'}`,
          status: 'success',
          duration: 3000,
          isClosable: true,
        });
      } else {
        toast({
          title: 'Ошибка валидации',
          description: validationResult.errors.join(', '),
          status: 'error',
          duration: 5000,
          isClosable: true,
        });
      }
    } catch (error) {
      console.error('Error validating card:', error);
      toast({
        title: 'Ошибка валидации',
        description: 'Не удалось проверить карту',
        status: 'error',
        duration: 3000,
        isClosable: true,
      });
    } finally {
      setIsValidating(false);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!validateForm()) return;

    setIsProcessing(true);
    try {
      const token = localStorage.getItem('token');
      if (!token) {
        throw new Error('Токен не найден');
      }

      const paymentData = {
        amount: amount,
        cardNumber: formData.cardNumber,
        cardHolder: formData.cardHolder,
        expiry: formData.expiry,
        cvc: formData.cvc,
        description: `Оплата заказа на сумму ${amount} ₽`,
        email: 'customer@example.com', // Можно получать из профиля пользователя
      };

      const result = await apiService.createPayment(paymentData, token);
      
      if (result.success) {
        toast({
          title: 'Оплата прошла успешно!',
          description: result.message,
          status: 'success',
          duration: 5000,
          isClosable: true,
        });
        onPaymentSuccess(result.paymentId);
      } else {
        toast({
          title: 'Ошибка оплаты',
          description: result.message,
          status: 'error',
          duration: 5000,
          isClosable: true,
        });
        onPaymentError(result.message);
      }
    } catch (error: any) {
      console.error('Error processing payment:', error);
      const errorMessage = error.response?.data?.message || 'Ошибка обработки платежа';
      toast({
        title: 'Ошибка оплаты',
        description: errorMessage,
        status: 'error',
        duration: 5000,
        isClosable: true,
      });
      onPaymentError(errorMessage);
    } finally {
      setIsProcessing(false);
    }
  };

  const formatCardNumber = (value: string) => {
    const v = value.replace(/\s+/g, '').replace(/[^0-9]/gi, '');
    const matches = v.match(/\d{4,16}/g);
    const match = matches && matches[0] || '';
    const parts = [];
    
    for (let i = 0, len = match.length; i < len; i += 4) {
      parts.push(match.substring(i, i + 4));
    }
    
    if (parts.length) {
      return parts.join(' ');
    } else {
      return v;
    }
  };

  const formatExpiry = (value: string) => {
    const v = value.replace(/\s+/g, '').replace(/[^0-9]/gi, '');
    if (v.length >= 2) {
      return v.substring(0, 2) + '/' + v.substring(2, 4);
    }
    return v;
  };

  return (
    <Card>
      <CardBody>
        <VStack spacing={6} align="stretch">
          <HStack justify="space-between" align="center">
            <Text fontSize="lg" fontWeight="bold" color="gray.800">
              <FaCreditCard style={{ display: 'inline', marginRight: '8px' }} />
              Оплата картой
            </Text>
            <Badge colorScheme="green" variant="subtle">
              {amount.toLocaleString('ru-RU')} ₽
            </Badge>
          </HStack>

          <form onSubmit={handleSubmit}>
            <VStack spacing={4} align="stretch">
              {/* Номер карты */}
              <FormControl isInvalid={!!errors.cardNumber}>
                <FormLabel>Номер карты</FormLabel>
                <Input
                  placeholder="1234 5678 9012 3456"
                  value={formData.cardNumber}
                  onChange={(e) => handleInputChange('cardNumber', formatCardNumber(e.target.value))}
                  maxLength={19}
                />
                {cardType && (
                  <Text fontSize="sm" color="blue.500" mt={1}>
                    {cardType}
                  </Text>
                )}
                <FormErrorMessage>{errors.cardNumber}</FormErrorMessage>
              </FormControl>

              {/* Имя держателя */}
              <FormControl isInvalid={!!errors.cardHolder}>
                <FormLabel>Имя держателя карты</FormLabel>
                <Input
                  placeholder="IVAN IVANOV"
                  value={formData.cardHolder}
                  onChange={(e) => handleInputChange('cardHolder', e.target.value.toUpperCase())}
                />
                <FormErrorMessage>{errors.cardHolder}</FormErrorMessage>
              </FormControl>

              <HStack spacing={4}>
                {/* Срок действия */}
                <FormControl isInvalid={!!errors.expiry}>
                  <FormLabel>Срок действия</FormLabel>
                  <Input
                    placeholder="MM/YY"
                    value={formData.expiry}
                    onChange={(e) => handleInputChange('expiry', formatExpiry(e.target.value))}
                    maxLength={5}
                  />
                  <FormErrorMessage>{errors.expiry}</FormErrorMessage>
                </FormControl>

                {/* CVC */}
                <FormControl isInvalid={!!errors.cvc}>
                  <FormLabel>CVC</FormLabel>
                  <Input
                    placeholder="123"
                    value={formData.cvc}
                    onChange={(e) => handleInputChange('cvc', e.target.value.replace(/\D/g, ''))}
                    maxLength={4}
                  />
                  <FormErrorMessage>{errors.cvc}</FormErrorMessage>
                </FormControl>
              </HStack>

              {/* Кнопки */}
              <VStack spacing={3} pt={4}>
                <Button
                  type="button"
                  variant="outline"
                  colorScheme="blue"
                  size="sm"
                  onClick={handleValidateCard}
                  isLoading={isValidating}
                  loadingText="Проверяем..."
                  leftIcon={<FaCheck />}
                  width="100%"
                >
                  Проверить карту
                </Button>

                <Button
                  type="submit"
                  colorScheme="green"
                  size="lg"
                  isLoading={isProcessing || isLoading}
                  loadingText="Обрабатываем платеж..."
                  leftIcon={<FaLock />}
                  width="100%"
                >
                  Оплатить {amount.toLocaleString('ru-RU')} ₽
                </Button>
              </VStack>
            </VStack>
          </form>

          {/* Информация о безопасности */}
          <Box p={4} bg="gray.50" borderRadius="md">
            <Text fontSize="sm" color="gray.600" textAlign="center">
              <FaLock style={{ display: 'inline', marginRight: '4px' }} />
              Ваши данные защищены SSL-шифрованием
            </Text>
          </Box>
        </VStack>
      </CardBody>
    </Card>
  );
};

export default PaymentForm;
