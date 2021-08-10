'use strict';

const http = require('http');
const express = require('express');
const bodyParser = require('body-parser');
const morgan = require('morgan');
const cors = require('cors');
const app = express();

const HOST = '0.0.0.0';
const PORT = 8082;

app.use(bodyParser.json({ limit: '100mb' }));
app.use(bodyParser.urlencoded({ limit: '100mb', extended: true }));
app.use(morgan('dev'))
app.use(cors('*'))

app.get('/product', (req, res) => {
  res.send({ message: 'Welcome to home page product service' });
})

app.get('/products', (req, res) => {
  res.send({
    data: [
      {
        id: '1',
        name: 'iphone'
      },
      {
        id: '2',
        name: 'samsung'
      }
    ]
  })
})

app.post('/product', (req, res) => {
  res.send({ message: 'Create Product Success' });
})

const server = http.createServer(app);

server.listen(PORT, HOST, () => {
  console.log(`Server start on ${HOST}:${PORT}`)
})