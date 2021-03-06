FROM node:14-alpine

WORKDIR /app

COPY package* ./
RUN npm install

COPY src src/

USER node
EXPOSE 4000
ENTRYPOINT [ "node", "src" ]
