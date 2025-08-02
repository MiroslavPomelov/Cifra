-- Создание базы данных для order-service
CREATE DATABASE orderdb;

-- Создание пользователя для order-service
CREATE USER order_user WITH PASSWORD 'order_password';

-- Предоставление прав пользователю
GRANT ALL PRIVILEGES ON DATABASE orderdb TO order_user;

-- Подключение к базе данных orderdb
\c orderdb;

-- Предоставление прав на схему public
GRANT ALL ON SCHEMA public TO order_user; 