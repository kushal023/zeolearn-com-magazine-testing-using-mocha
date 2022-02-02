const express = require('express');
const app = express();
const mongoose = require('mongoose');
const morgan = require('morgan');
const bodyParser = require('body-parser');
const config = require('./config');
const env = process.env.NODE_ENV || 'development';
const Port = 3000;
let user = require('./controllers/user');

mongoose.connect(config.db[env], config.dbParams);

mongoose.connection.on('error', (err) => {
  console.log('err', err);
});

mongoose.connection.on('connected', () => {
  console.log('mongoose is connected...');
});

mongoose.connection.on('disconnected', () => {
  console.log('mongoose is disconnected...');
});

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.text());
app.use(bodyParser.json({ type: 'application/json' }));

app.get('/', (req, res) => {
  res.json({ message: 'User management app' });
});

app.route('/user').get(user.getUsers).post(user.createUser);

app.route('/user/:id').delete(user.deleteUser).put(user.updateUser);

app.listen(Port);
module.exports = app;
