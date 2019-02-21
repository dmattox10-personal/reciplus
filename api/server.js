const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const passport = require('passport');
const app = express();
const UserModel = require('./models/user');

//My iMac
mongoose.connect('mongodb://10.0.0.158/passport-jwt')
//USING my iMac
//mongoose.connect('mongodb://127.0.0.1/passport-jwt')
mongoose.connection.on('error', error => console.log(error) );
mongoose.Promise = global.Promise;

require('./config/passport');

app.use( bodyParser.urlencoded({ extended : false }) );

const routes = require('./routes/user');
const secureRoute = require('./routes/dashboard'); // Our secure route

app.use('/', routes);
//We plugin our jwt strategy as a middleware so only verified users can access this route
app.use('/user', passport.authenticate('jwt', { session : false }), secureRoute );

//Handle errors
app.use(function(err, req, res, next) {
  res.status(err.status || 500);
  res.json({ error : err });
});

app.listen(3000, () => {
  console.log('Server started')
});