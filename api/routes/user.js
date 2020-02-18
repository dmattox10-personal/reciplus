const express = require('express');
const router = express.Router();
const mongoose = require('mongoose')
const gravatar = require('gravatar');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const passport = require('passport');
const validateRegisterInput = require('../validation/register');
const validateLoginInput = require('../validation/login');
const async = require('async')
const User = require('../models/User'); // I changed this from "User"
const Entry = require('../models/entry')
const maxSignups = 2
router.post('/register', function(req, res) {

    const { errors, isValid } = validateRegisterInput(req.body);
    if(!isValid) {
        return res.status(400).json(errors);
    }
    User.findOne({
        email: req.body.email
    }).then(user => {
        if(user) {
            return res.status(400).json({
                email: 'Email already exists'
            });
        }
        else {
            const avatar = gravatar.url(req.body.email, {
                s: '200',
                r: 'pg',
                d: 'mm'
            });
            const newUser = new User({
                name: req.body.name,
                email: req.body.email,
                password: req.body.password,
                avatar
            });
            
            bcrypt.genSalt(10, (err, salt) => {
                if(err) console.error('There was an error', err);
                else {
                    bcrypt.hash(newUser.password, salt, (err, hash) => {
                        if(err) console.error('There was an error', err);
                        else {
                            newUser.password = hash;
                            newUser
                                .save()
                                .then(user => {
                                    res.json(user)
                                }); 
                        }
                    })
                }
            })
        }
    })  
})

router.post('/login', (req, res) => {

    const { errors, isValid } = validateLoginInput(req.body);

    if(!isValid) {
        return res.status(400).json(errors);
    }

    const email = req.body.email;
    const password = req.body.password;

    User.findOne({email})
        .then(user => {
            if(!user) {
                errors.email = 'User not found'
                return res.status(404).json(errors);
            }
            bcrypt.compare(password, user.password)
                    .then(isMatch => {
                        if(isMatch) {
                            if(user.Approved) {
                                const payload = {
                                    id: user.id,
                                    name: user.name,
                                    avatar: user.avatar
                                }
                                jwt.sign(payload, 'secret', { // use an actual secret here
                                    expiresIn: 7200
                                }, (err, token) => {
                                    if(err) console.error('There is some error in token', err);
                                    else {
                                        res.json({
                                            success: true,
                                            token: 'JWT ' + token
                                        });
                                    }
                                })
                            }
                            else {
                                errors.password = 'Admin Approval Required'
                                return res.status(400).json(errors)
                            }
                        }
                        else {
                            errors.password = 'Incorrect Password'
                            return res.status(400).json(errors)
                        }
                    });
        });
});

router.get('/me', passport.authenticate('jwt', { session: false }), (req, res) => {
    return res.json({
        id: req.user.id,
        name: req.user.name,
        email: req.user.email
    });
});

router.get('/settings', (req, res) => {
    User
        .estimatedDocumentCount()
        .then(count => {
            return res.json({
                maxSignups: maxSignups,
                numSignups: count
            })
        })
})

router.get('/:id/recipes', (req, res) => {
    async.parallel({

        recipes_list: (callback) => {
          Entry.find({ user: req.params.id })
          .sort('-date')
          .exec(callback)
        }
      }, (err, results) => {
        if (err) { console.log(err) }
        mongoose.connection.db.listCollections({name: 'entries'})
        .next(function (err, collinfo) {
          if (err) { return next(err) }
          if (collinfo) {
            let jsonEntries = [results.recipes_list.length]
            for ( let i = 0; i < results.recipes_list.length; i++ ) {
              jsonEntries[i] = results.recipes_list[i]._doc
            }
            res.json({
                recipes_list: jsonEntries
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

module.exports = router;

