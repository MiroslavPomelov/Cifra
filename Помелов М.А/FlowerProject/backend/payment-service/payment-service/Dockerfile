# Используем конкретную версию alpine для стабильности
FROM node:alpine

# Создаем и переходим в рабочую директорию
WORKDIR /app

# 1. Сначала копируем ТОЛЬКО файлы зависимостей
COPY package.json package-lock.json ./

# 2. Устанавливаем зависимости (с очисткой кэша)
RUN npm install --production --legacy-peer-deps \
    && npm cache clean --force

# 3. Копируем остальные файлы проекта
COPY . .

# 4. Сборка проекта (если нужно)
RUN npm run build

# Открываем порт
EXPOSE 3000

# Команда запуска
CMD ["node", "dist/main.js"]