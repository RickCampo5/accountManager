const router = require('express').Router()
const User = require('../models/User')

function isAuth(req, res, next) {
  if(req.isAuthenticated()) return next()
  else res.status(401).json({message: 'Unauthorized you must login'})
}

router.get('/', isAuth, (req,res,next) => {
  User.findById(req.user.id)
    .then(user => {
      return res.status(200).json(user)
    })
    .catch(error => next(error))
})

router.put('/update_cash_income', isAuth, (req, res, next) => {
  User.findByIdAndUpdate(req.user.id, {cash: req.body.cash})
    .then(user => {
      return res.status(200).json(user)
    })
    .catch(error => next(error))
})

router.put('/update_transport_card', isAuth, (req,res,next) => {
  User.findByIdAndUpdate(req.user.id, {transportCard: req.body.transportCard})
    .then(user =>{
      return res.status(200).json(user)
    })
    .catch(error => next(error))
})

module.exports = router
