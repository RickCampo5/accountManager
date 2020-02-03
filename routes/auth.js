const router = require('express').Router
const User = require('../models/User')
const passport = require('passport')

router.get('/signup', (req,res,next) => {
  User.register(req.body, req.body.password)
  .then(user => {
    res.json(user)
  })
  .catch(error => next(error))
})

module.exports = router