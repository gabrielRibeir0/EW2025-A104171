var express = require('express');
var router = express.Router();
var userModel = require('../models/user')
var passport = require('passport')
var jwt = require('jsonwebtoken')

router.post('/register', (req, res, next) => {
    userModel.register(new userModel({
            username: req.body.username,
            name: req.body.name,
            level: req.body.level,
            active: true,
            creationDate: new Date()
        }), 
        req.body.password,
        (err, user) => {
            console.log(user)
            if (err) {
                return res.status(500).jsonp(err)
            }
            else {
                return res.send('Success')
            }
        }
    )
})

router.post('/login', passport.authenticate('local'), (req, res) => {
    jwt.sign(
        {
            username: req.user.username,
            level: req.user.level,
            sub: 'Aula EngWeb2025'
        },
        'EngWeb2025', // chave para desencriptar o token
        {
            expiresIn: 3600, // 1hora, 3600s
        },
        (err, token) => {
            if (err) {
                return res.status(500).jsonp(err)
            }
            else {
                res.status(201).jsonp({token: token})
            }
        }
    )
})

module.exports = router