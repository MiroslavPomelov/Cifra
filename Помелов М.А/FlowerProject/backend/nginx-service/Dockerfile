# FROM nginx:alpine

# # Копируем конфиг
# COPY nginx-static/default.conf /etc/nginx/conf.d/default.conf

# COPY build/ /usr/share/nginx/html/

# COPY nginx-static/ /usr/share/nginx/html/

FROM nginx:alpine

# Копируем статику фронта
COPY build /usr/share/nginx/html

# Директория для изображений магазинов
# Каталог изображений будет примонтирован с хоста, но на всякий случай создадим
RUN mkdir -p /usr/share/nginx/images && chmod -R 777 /usr/share/nginx/images

# Копируем конфиг
COPY nginx-static/default.conf /etc/nginx/conf.d/

