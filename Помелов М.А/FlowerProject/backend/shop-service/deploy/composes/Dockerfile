FROM node:alpine

# Устанавливаем wget для healthcheck
RUN apk add --no-cache wget

WORKDIR /usr/src/app
COPY package.json ./

RUN npm install --legacy-peer-deps
COPY . .

RUN npm run build

CMD [ "npm", "run", "start:prod" ] 