// Отладочный файл для проверки JWT токена
export const debugJWT = () => {
  const token = localStorage.getItem('token');
  
  if (!token) {
    console.log('❌ JWT токен не найден в localStorage');
    return;
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
    console.log('Header:', parts[0]);
    console.log('Payload:', parts[1]);
    console.log('Signature:', parts[2]);
    
    try {
      const payload = JSON.parse(atob(parts[1]));
      console.log('📋 JWT Payload:', payload);
    } catch (e) {
      console.log('❌ Ошибка декодирования payload:', e);
    }
  } else {
    console.log('❌ JWT формат некорректен:', parts.length, 'частей');
  }
  
  // Проверяем заголовки для API запроса
  const headers = {
    'Authorization': `Bearer ${token}`,
    'Content-Type': 'application/json',
  };
  
  console.log('📤 Заголовки для API запроса:', headers);
  
  return {
    token,
    isValid: parts.length === 3,
    parts: parts.length,
    headers
  };
};



