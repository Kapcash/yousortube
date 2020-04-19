FROM node:12-alpine

WORKDIR /app

COPY --chown=node:node . ./

RUN yarn && yarn build

USER node

EXPOSE 3000

ENTRYPOINT ["yarn", "start:prod"]
