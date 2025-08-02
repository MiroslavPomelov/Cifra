-- Создание базы данных для payment-service
-- Этот скрипт выполняется автоматически при первом запуске контейнера

-- Создание таблицы платежей (если не существует)
-- Entity Framework автоматически создаст таблицу на основе модели Payment

-- Проверка подключения
SELECT version();

-- Проверка существования таблицы
SELECT EXISTS (
    SELECT FROM information_schema.tables 
    WHERE table_schema = 'public' 
    AND table_name = 'payments'
);

-- Комментарий: Entity Framework автоматически создаст таблицу при первом запуске приложения
-- на основе модели Payment в файле Models/Payment.cs 