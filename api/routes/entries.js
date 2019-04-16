const express = require('express')
const router = express.Router()
const passport = require('passport')
const { body } = require('express-validator/check')
const mongoose = require('mongoose')
const Entry = require('../models/entry')
const User = require('../models/User')
const async = require('async')
const Jimp = require('jimp')
const multer = require('multer')
const upload = multer({ dest: './public/img/' })
const mv = require('mv')



router.post('/enter', passport.authenticate('jwt', { session: false }), upload.single('file'),
  (req, res, next)  => {
    console.log(req.body.title)
    console.log(req.file)
    let id = mongoose.Types.ObjectId()
    let mimetype = ''
    let fileName = ''
    if (req.file) {
      mimetype = req.file.originalname.slice(-4, req.file.originalname.length)
      fileName = id + mimetype
      mv('./public/img/' + req.file.filename, './public/img/' + fileName, (err) => {
          if (err) { console.log(err) }
          })
  }
    let entry = new Entry(
        {
            _id: id,
            title: req.body.title,
            description: req.body.description,
            ingredients: req.body.ingredients,
            instructions: req.body.instructions,
            tags: req.body.tags,
            user: req.body.user
        }
    )
    if (req.file) {
        var path = './public/img/' + fileName
        Jimp.read(path).then(function (image) {
          image.resize(512, Jimp.AUTO)            // resize
          .write(path)
        }).catch(function (err) {
          console.error(err)
        })
    }
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

router.get('/:id', (req, res) => { 
  async.parallel({
      recipe: (callback) => {
        Entry.find({ _id: req.params.id })
        .exec(callback)
      }
    }, (err, results) => {
      if (err) { console.log(err) }
      async.parallel({
        name: (callback) => {
          User.findOne({ _id: results.recipe[0]._doc.user })
          .exec(callback)
        }
      }, (err, output) => {
        if (err) { console.log(err) }
        results.recipe[0]._doc.username = output.name._doc.name
        res.json({
          recipe: results.recipe[0]._doc
        })
    })
  })
})


module.exports = router

