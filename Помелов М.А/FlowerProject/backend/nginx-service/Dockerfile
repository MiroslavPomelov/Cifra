FROM nginx:alpine

# Копируем конфиг
COPY nginx-static/default.conf /etc/nginx/conf.d/default.conf

# Копируем build фронтенда (SPA) из локальной папки build
COPY build/ /usr/share/nginx/html/

# (опционально) Копируем дополнительные статические файлы
COPY nginx-static/ /usr/share/nginx/html/



