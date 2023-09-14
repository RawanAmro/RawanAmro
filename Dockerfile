## Use the official Node.js 18 Alpine Linux image as the base image
#FROM node:18-alpine
#
## Installing libvips-dev for sharp Compatibility
#RUN apk update && apk add --no-cache build-base gcc autoconf automake zlib-dev libpng-dev nasm bash vips-dev
#
## Set the NODE_ENV environment variable (default to development)
#ARG NODE_ENV=development
#ENV NODE_ENV=${NODE_ENV}
#
## Set the working directory to /opt/
#WORKDIR /opt/
#
## Copy package.json and package-lock.json to the working directory
#COPY package.json package-lock.json ./
#COPY config ./
#
## Remove existing node_modules and package-lock.json (if any)
#RUN rm -rf node_modules
#
#RUN rm package-lock.json
#
#
## Configure npm to increase the maximum timeout for fetching packages
#RUN npm config set fetch-retry-maxtimeout 600000 -g
#
## Install project dependencies
#RUN npm cache clean --force
#RUN npm install -g npm@latest
#RUN apk add --no-cache redis
#RUN node -v
#RUN npm -v
#RUN npm config set registry https://registry.npmjs.org/
#
#
#
#
## Add the solution for the missing sift module
#RUN npm install sift
#
## Add the solution for the missing sharp module
#
#RUN npm install sharp
#RUN npm rebuild sharp --verbose
#RUN npm  install --arch=arm64 --platform=linux --libc=musl sharp
#
## Add the solution for the missing sharp module
#RUN npm install --ignore-scripts=false --foreground-scripts --verbose sharp
#
#
## Set the PATH environment variable
#ENV PATH /opt/node_modules/.bin:$PATH
#
## Set the working directory to /opt/app
#WORKDIR /opt/app
#
## Copy the project source code to the working directory
#COPY . .
#
## Change ownership of /opt/app to the 'node' user
##RUN chown -R node:node /opt/app
## Switch to the 'node' user for security reasons
##USER node
#
## Run the Strapi build command
#RUN ["npm", "run", "build"]
#
## Expose port 1337 (default Strapi port)
#EXPOSE 1337
#
## Set the default command to run the Strapi application using 'npm run develop'
#CMD ["npm", "run", "develop"]
FROM node:18-alpine

WORKDIR /app

COPY package.json .


RUN npm install

COPY . .

EXPOSE 1337

CMD ["npm", "start"]