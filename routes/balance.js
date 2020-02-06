const router = require('express').Router()
const User = require('../models/User')
const passport = require('../helpers/passport')

router.get('/:id', passport.authenticate('local'), (req,res,next) => {
  User.findById(req.params.id)
})