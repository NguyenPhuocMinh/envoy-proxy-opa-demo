FROM node:alpine

WORKDIR /app

COPY ./user-service/package.json package.json 
COPY ./user-service/package-lock.json package-lock.json 

RUN npm install

COPY ./user-service .

EXPOSE 8081

CMD [ "node", "server.js" ]