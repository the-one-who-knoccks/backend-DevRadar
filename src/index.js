const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const http = require('http');
const routes = require('./routes');
const { setupWebsocket } = require('./websocket');

const app = express();

const server = http.Server(app);

setupWebsocket(server);



mongoose.connect('mongodb+srv://omnistack:omnistack@cluster0-iwgz9.mongodb.net/week10t?retryWrites=true&w=majority', {
  useNewUrlParser: true, useUnifiedTopology: true, useCreateIndex: true
});

app.use(cors()); 
app.use(express.json()); // App use serve para todos os métodos. E json() converte em json para o express entender.
app.use(routes);

server.listen(3333);      

