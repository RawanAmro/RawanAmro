
FROM node:18-alpine

WORKDIR /app

COPY package.json .
COPY config ./
COPY .env /app/

#RUN npm install purest
RUN npm install
RUN npm update

# Uncomment if you need these packages.
#RUN npm install strapi@latest -g
#RUN  npm i ioredis moment --save
#RUN  npm install axios


COPY . .

EXPOSE 1337

RUN npm install purest
