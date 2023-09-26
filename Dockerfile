
FROM node:18-alpine

WORKDIR /app

COPY package.json .
COPY config ./
COPY .env /app/

RUN rm -rf .cache build

RUN npm install purest
RUN rm -rf node_modules
RUN rm package-lock.json
RUN npm install
RUN npm update

# Uncomment if you need these packages.
#RUN npm install strapi@latest -g
#RUN  npm i ioredis moment --save
RUN npm install @strapi/plugin-i18n
RUN  npm install keycloak-connect
#RUN  npm install axios

RUN npm run build

COPY . .

EXPOSE 1337

CMD ["npm", "start"]
