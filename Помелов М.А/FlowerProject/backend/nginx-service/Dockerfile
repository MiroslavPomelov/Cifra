FROM nginx:alpine

# Копируем конфиг
COPY nginx-static/default.conf /etc/nginx/conf.d/default.conf

COPY build/ /usr/share/nginx/html/

COPY nginx-static/ /usr/share/nginx/html/



