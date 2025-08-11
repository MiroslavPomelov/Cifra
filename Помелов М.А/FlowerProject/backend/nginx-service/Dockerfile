# FROM nginx:alpine

# # Копируем конфиг
# COPY nginx-static/default.conf /etc/nginx/conf.d/default.conf

# COPY build/ /usr/share/nginx/html/

# COPY nginx-static/ /usr/share/nginx/html/

FROM nginx:alpine

# Копируем статику фронта
COPY build /usr/share/nginx/html

# Копируем медиа-файлы
COPY nginx-static/photo /usr/share/nginx/html/photo

# Копируем конфиг
COPY nginx-static/default.conf /etc/nginx/conf.d/

