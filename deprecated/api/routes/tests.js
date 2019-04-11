const express = require('express');

const router = express.Router();

router.get('/one', function(req, res) {
    res.json({
        message: 'Welcome!'
    })
})
  
router.get('/two', function(req, res) {
    res.json({
        message: 'We will put stats here'
    })
})

router.get('/yes', function(req, res) {
res.json({
    logged_in: true
    })
})

router.get('/no', function(req, res) {
res.json({
    logged_in: false
    })
})
module.exports = router