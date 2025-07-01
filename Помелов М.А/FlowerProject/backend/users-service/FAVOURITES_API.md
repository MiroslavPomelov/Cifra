# API для работы с избранными товарами

## Эндпоинты

### Получение всех избранных товаров пользователя
```
GET /users/:userId/favourites
```

### Получение конкретного избранного товара
```
GET /users/:userId/favourites/:id
```

### Проверка, находится ли товар в избранном
```
GET /users/:userId/favourites/check/:productId
```
Возвращает `true` или `false`

### Добавление товара в избранное
```
POST /users/:userId/favourites
```

Тело запроса:
```json
{
  "productId": 123,
  "productName": "Название товара",
  "productDescription": "Описание товара",
  "productPrice": 999.99,
  "productImage": "https://example.com/image.jpg"
}
```

### Обновление избранного товара
```
PATCH /users/:userId/favourites/:id
```

### Удаление избранного товара по ID
```
DELETE /users/:userId/favourites/:id
```

### Удаление избранного товара по ID товара
```
DELETE /users/:userId/favourites/product/:productId
```

### Получение пользователя с избранными товарами
```
GET /users/:id/with-favourites
```

## Структура данных

### FavouriteProduct
```typescript
{
  id: number;
  userId: number;
  productId: number;
  productName: string;
  productDescription?: string;
  productPrice?: number;
  productImage?: string;
  addedDate: Date;
}
```

## Примеры использования

### Добавление товара в избранное
```bash
curl -X POST http://localhost:3000/users/1/favourites \
  -H "Content-Type: application/json" \
  -d '{
    "productId": 123,
    "productName": "Красивый цветок",
    "productDescription": "Роза красная",
    "productPrice": 299.99,
    "productImage": "https://example.com/rose.jpg"
  }'
```

### Получение всех избранных товаров пользователя
```bash
curl http://localhost:3000/users/1/favourites
```

### Проверка, находится ли товар в избранном
```bash
curl http://localhost:3000/users/1/favourites/check/123
```

### Получение пользователя с избранными товарами
```bash
curl http://localhost:3000/users/1/with-favourites
``` 