FROM node:alpine

WORKDIR /app

COPY ./product-service/package.json package.json
COPY ./product-service/package-lock.json package-lock.json

RUN npm install

COPY ./product-service .

EXPOSE 8082

CMD [ "node", "server.js" ]