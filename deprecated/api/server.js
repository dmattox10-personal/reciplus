const express = require('express')
const mongoose = require('mongoose')
const bodyParser = require('body-parser')
//const cookieParser = require('cookie-parser');
const passport = require('passport')
const app = express()
app.use(passport.initialize())
const users = require('./routes/user')
require('./config/passport')//(passport);

const configDB = require('./config/database.js')
//const UserModel = require('./models/user');

//mongoose.connect('mongodb://127.0.0.1/passport-jwt')
//mongoose.connection.on('error', error => console.log(error) );

mongoose.connect(configDB.url, { useNewUrlParser: true }).then(
  () => {console.log('Database is connected') },
  err => { console.log('Can not connect to the database'+ err)}
)
mongoose.Promise = global.Promise
app.use( bodyParser.urlencoded({ extended : false }) )
app.use(bodyParser.json())



app.use(function(req, res, next) {
  res.header("Access-Control-Allow-Origin", "*")
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept")
  next()
})

app.use('/api/users', users)

app.get('/', function(req, res) {
    res.send('hello');
});

//Handle errors
app.use(function(err, req, res, next) {
  res.status(err.status || 500);
  res.json({ error : err });
});

app.listen(3000, () => {
  console.log('Server started')
});