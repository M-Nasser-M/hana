# Creating multi-stage build for production
FROM node:18.18.0-alpine as build
RUN apk update && apk add --no-cache build-base gcc autoconf automake zlib-dev libpng-dev vips-dev > /dev/null 2>&1
ARG NODE_ENV=production
ENV NODE_ENV=${NODE_ENV}

WORKDIR /hanaart-backend/
COPY package.json package-lock.json ./
RUN npm install -g node-gyp
RUN npm config set fetch-retry-maxtimeout 600000 -g && npm install --only=production
ENV PATH /hanaart-backend/node_modules/.bin:$PATH
WORKDIR /hanaart-backend/app
COPY . .
RUN npm run build

# Creating final production image
FROM node:18.18.0-alpine
RUN apk add --no-cache vips-dev
ARG NODE_ENV=production
ENV NODE_ENV=${NODE_ENV}
WORKDIR /hanaart-backend/
COPY --from=build /hanaart-backend/node_modules ./node_modules
WORKDIR /hanaart-backend/app
COPY --from=build /hanaart-backend/app ./
ENV PATH /hanaart-backend/node_modules/.bin:$PATH

RUN chown -R node:node /hanaart-backend/app
USER node
EXPOSE 1337
CMD ["npm", "run", "start"]
