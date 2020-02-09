const router = require('express').Router()
const CreditCard = require('../models/CreditCard')

function isAuth(req, res, next) {
  if(req.isAuthenticated()) return next()
  else res.status(401).json({message: 'Unauthorized you must login'})
}

router.post('/create_credit_card', isAuth, (req, res, next) => {
  req.body.user = req.user.id
  CreditCard.create(req.body)
    .then(creditCard => {
      return res.status(200).json(creditCard)
    })
    .catch(error => next(error))
})

router.get('/user_credit_cards', isAuth, (req, res, next) => {
  CreditCard.find({ user: req.user.id })
    .then(creditCards => {
      return res.status(200).json(creditCards)
    })
    .catch(error => next(error))
})

router.put('/:id', isAuth, (req, res, next) => {
  CreditCard.findByIdAndUpdate(req.params.id, req.body, { new: true })
    .then(creditCard => {
      return res.status(200).json(creditCard)
    })
    .catch(error => next(error))
})

router.delete('/:id', isAuth, (req, res, next) => {
  CreditCard.findByIdAndDelete(req.params.id)
    .then(() => {
      return res.send('deleted')
    })
    .catch(error => next(error))
})

module.exports = router
