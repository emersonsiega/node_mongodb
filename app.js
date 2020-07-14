const express = require('express');
const app = express();

const repository = require('./repository/index');
repository.configure();

const bodyParser = require('body-parser');
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

const indexRoute = require('./routes/index');
const usersRoute = require('./routes/users');

app.use('/', indexRoute);
app.use('/users', usersRoute);

app.listen(3000, () => console.log("Server iniciado... Ouvindo na porta 3000!"));

module.exports = app;