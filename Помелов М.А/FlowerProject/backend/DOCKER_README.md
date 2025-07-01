# FlowerProject - Docker Setup

Этот проект содержит два микросервиса: `auth-service` и `users-service`, которые работают с базой данных PostgreSQL.

## Структура проекта

```
FlowerProject/
├── auth-service/          # Сервис аутентификации
├── users-service/         # Сервис пользователей
├── docker-compose.yaml    # Production конфигурация
├── docker-compose.dev.yaml # Development конфигурация
└── README.md
```

## Быстрый старт

### Production режим

1. **Запуск всех сервисов:**
   ```bash
   docker-compose up -d
   ```

2. **Просмотр логов:**
   ```bash
   docker-compose logs -f
   ```

3. **Остановка сервисов:**
   ```bash
   docker-compose down
   ```

### Development режим

1. **Запуск в режиме разработки:**
   ```bash
   docker-compose -f docker-compose.dev.yaml up -d
   ```

2. **Просмотр логов:**
   ```bash
   docker-compose -f docker-compose.dev.yaml logs -f
   ```

3. **Остановка:**
   ```bash
   docker-compose -f docker-compose.dev.yaml down
   ```

## Доступные сервисы

| Сервис | Порт | Описание |
|--------|------|----------|
| auth-service | 3000 | API аутентификации |
| users-service | 3001 | API пользователей |
| PostgreSQL | 5432 | База данных |

## Переменные окружения

### auth-service
- `ENV_TOKEN` - токен для доступа к users-service
- `ENV_KEY` - секретный ключ для JWT
- `USERS_SERVICE_URL` - URL users-service

### users-service
- `DB_HOST` - хост базы данных
- `DB_PORT` - порт базы данных
- `DB_USERNAME` - имя пользователя БД
- `DB_PASSWORD` - пароль БД
- `DB_NAME` - имя базы данных

## Команды для разработки

### Пересборка образов
```bash
# Production
docker-compose build --no-cache

# Development
docker-compose -f docker-compose.dev.yaml build --no-cache
```

### Очистка
```bash
# Удаление контейнеров и образов
docker-compose down --rmi all --volumes

# Удаление всех неиспользуемых ресурсов
docker system prune -a
```

### Просмотр состояния
```bash
# Статус контейнеров
docker-compose ps

# Использование ресурсов
docker stats
```

## Troubleshooting

### Проблемы с подключением к БД
1. Убедитесь, что PostgreSQL запущен:
   ```bash
   docker-compose logs usersdb
   ```

2. Проверьте переменные окружения в файлах `.env`

### Проблемы с сетью
1. Проверьте, что все сервисы в одной сети:
   ```bash
   docker network ls
   docker network inspect flowerproject_app_network
   ```

### Проблемы с портами
1. Убедитесь, что порты 3000, 3001, 5432 не заняты:
   ```bash
   netstat -tulpn | grep :3000
   netstat -tulpn | grep :3001
   netstat -tulpn | grep :5432
   ```

## Health Checks

Все сервисы имеют health checks:
- **usersdb**: проверка готовности PostgreSQL
- **users-service**: проверка HTTP endpoint `/health`
- **auth-service**: проверка HTTP endpoint `/health`

## Мониторинг

### Логи в реальном времени
```bash
# Все сервисы
docker-compose logs -f

# Конкретный сервис
docker-compose logs -f auth-service
docker-compose logs -f users-service
```

### Метрики
```bash
# Использование ресурсов
docker stats

# Информация о контейнерах
docker-compose ps
```

## Безопасность

- Все сервисы запускаются под непривилегированным пользователем
- Используются секретные ключи для JWT
- База данных изолирована в отдельной сети
- Health checks предотвращают запуск неготовых сервисов 