FROM node:16.14-alpine

RUN mkdir -p /home/node/app/node_modules && chown -R node:node /home/node/app

WORKDIR /home/node/app

COPY package*.json ./

COPY yarn.lock ./

USER node

RUN yarn install

COPY --chown=node:node . .

EXPOSE ${PORT}

CMD [ "yarn", "run","dev" ]