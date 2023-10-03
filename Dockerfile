
FROM node:18-alpine

WORKDIR /app

COPY package.json .
COPY config ./
COPY .env /app/

RUN npm install
RUN npm update

COPY . .

EXPOSE 1337

