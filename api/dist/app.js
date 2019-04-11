'use strict';

var express = require('express');
var mongoose = require('mongoose');
var bodyParser = require('body-parser');
var passport = require('passport');
var config = require('./db');

var users = require('./routes/user');

mongoose.connect(config.DB, { useNewUrlParser: true }).then(function () {
    console.log('Database is connected');
}, function (err) {
    console.log('Can not connect to the database' + err);
});

var app = express();
app.use(passport.initialize());
require('./passport')(passport);

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

app.use('/api/users', users);

app.get('/', function (req, res) {
    res.send('hello');
});

var PORT = process.env.PORT || 5000;

app.listen(PORT, function () {
    console.log('Server is running on PORT ' + PORT);
});