'use strict';

const http = require('http');
const express = require('express');
const bodyParser = require('body-parser');
const morgan = require('morgan');
const app = express();

const HOST = '0.0.0.0';
const PORT = 8081;

app.use(bodyParser.json({ limit: '100mb' }));
app.use(bodyParser.urlencoded({ limit: '100mb', extended: true }));
app.use(morgan('dev'))

app.get('/user', (req, res) => {
  res.send({ message: 'Welcome to home page user service' });
})

app.get('/users', (req, res) => {
  res.send({
    data: [
      {
        id: '1',
        name: 'admin'
      },
      {
        id: '2',
        name: 'guest'
      }
    ]
  })
})

app.post('/user', (req, res) => {
  const body = req.body;
  res.send({
    message: 'Create User Success',
    data: body
  });
})

const server = http.createServer(app);

server.listen(PORT, HOST, () => {
  console.log(`Server start on ${HOST}:${PORT}`)
})