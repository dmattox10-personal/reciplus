const express = require('express');
const checkAuth = require('../checkAuth')

const router = express.Router();

//Lets say the route below is very sensitive and we want only authorized users to have access

//Displays information tailored according to the logged in user
router.get('/profile', checkAuth, (req, res, next) => {
  //We'll just send back the user details and the token
  res.json({
    message : 'You made it to the secure route',
    user : req.user,
    token : req.query.secret_token
  })
})

router.get('/one', checkAuth, function(req, res, next) {
  res.json({
      message: 'Welcome!'
  })
})

router.get('/two', checkAuth, function(req, res, next) {
  res.json({
      message: 'We will put stats here'
  })
})

router.get('/yes', checkAuth, function(req, res, next) {
res.json({
  logged_in: true
  })
})

router.get('/no', function(req, res) {
res.json({
  logged_in: false
  })
})

module.exports = router;