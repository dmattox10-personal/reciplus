const express = require('express')
const router = express.Router()
const passport = require('passport')
const { body } = require('express-validator/check')
const mongoose = require('mongoose')
const Entry = require('../models/entry')
const async = require('async')


router.post('/enter', passport.authenticate('jwt', { session: false }), [
    body('entry').isLength({ min: 3 }).trim(),
    body('stardate').isNumeric().trim().escape()
  ],
  (req, res, next)  => {
    console.log(req.body.entry)
    console.log(req.body.stardate)
    let id = mongoose.Types.ObjectId()
    let entry = new Entry(
        {
            _id: id,
            title: req.body.title,
            entry: req.body.entry,
            stardate: req.body.stardate
        }
    )
    entry.save((err) => {
        if (err) { return next(err) }
        res.redirect('/')
    })
    
})

router.get('/list', (req, res, next) => {
    async.parallel({

        entries_list: (callback) => {
          Entry.find()
          .sort('-date')
          .exec(callback)
        }
      }, (err, results) => {
        if (err) { console.log(err) }
        mongoose.connection.db.listCollections({name: 'entries'})
        .next(function (err, collinfo) {
          if (err) { return next(err) }
          if (collinfo) {
            let jsonEntries = [results.entries_list.length]
            for ( let i = 0; i < results.entries_list.length; i++ ) {
              jsonEntries[i] = results.entries_list[i]._doc
            }
            res.json({
                entries_list: jsonEntries
            })
          }
          else {
            res.json({
                error: "No entries exist"
            })
          }
        })
    })
})


module.exports = router

