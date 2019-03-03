const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser');
const passport = require('passport');
const app = express();
const UserModel = require('./models/user');

mongoose.connect('mongodb://127.0.0.1/passport-jwt')
mongoose.connection.on('error', error => console.log(error) );
mongoose.Promise = global.Promise;

require('./config/passport');

app.use( bodyParser.urlencoded({ extended : false }) );
app.use( cookieParser())
const routes = require('./routes/user')
const tests = require('./routes/tests')
const secureRoute = require('./routes/dashboard'); // Our secure route
app.use(function(req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
  next();
});
app.use('/', routes);
app.use('/api/tests/', tests)
//We plugin our jwt strategy as a middleware so only verified users can access this route
//app.use('/user', passport.authenticate('jwt', { session : true }), secureRoute );
app.use('/user', secureRoute)
//Handle errors
app.use(function(err, req, res, next) {
  res.status(err.status || 500);
  res.json({ error : err });
});

app.listen(3000, () => {
  console.log('Server started')
});