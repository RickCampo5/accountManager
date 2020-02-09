const router = require('express').Router()
const DebitCard = require('../models/DebitCard')

function isAuth(req, res, next) {
  if(req.isAuthenticated()) return next()
  else res.status(401).json({message: 'Unauthorized you must login'})
}

router.post('/create_debit_card', isAuth, (req, res, next) => {
  req.body.user = req.user.id
  DebitCard.create(req.body)
    .then(debitCard => {
      return res.status(200).json(debitCard)
    })
    .catch(error => next(error))
})

router.get('/user_debit_cards', isAuth, (req,res,next) => {
  DebitCard.find({ user: req.user.id })
    .then(debitCards => {
      return res.status(200).json(debitCards)
    })
    .catch(error => next(error))
})

router.put('/:id', isAuth, (req, res, next) => {
  DebitCard.findByIdAndUpdate(req.params.id, req.body, { new: true })
    .then(debitCard => {
      return res.status(200).json(debitCard)
    })
    .catch(error => next(error))
})

router.delete('/:id', isAuth, (req, res, next) => {
  DebitCard.findByIdAndDelete(req.params.id)
    .then(debitCard => {
      return res.send('deleted')
    })
    .catch(error => next(error))
})

module.exports = router
