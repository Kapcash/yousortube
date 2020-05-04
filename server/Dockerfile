# docker run -d -p 27017:27017 -v ~/mongo_data:/data/db mongo
FROM node:12-alpine

WORKDIR /app

COPY --chown=node:node . ./

RUN yarn && yarn build

USER node

EXPOSE 3000

ENTRYPOINT ["yarn", "start:prod"]
