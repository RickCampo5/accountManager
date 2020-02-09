const router = require('express').Router()
const Expense = require('../models/Expense')

function isAuth(req, res, next) {
  if(req.isAuthenticated()) return next()
  else res.status(401).json({message: 'Unauthorized you must login'})
}

router.post('/create_expense', isAuth, (req, res, next) => {
  req.body.user = req.user.id
  Expense.create(req.body)
    .then(expense => {
      return res.status(200).json(expense)
    })
    .catch(error => next(error))
})

router.get('/user_expenses', isAuth, (req,res,next) => {
  Expense.find({ user: req.user.id })
    .then(expenses => {
      return res.status(200).json(expenses)
    })
    .catch(error => next(error))
})

router.get('/card_expenses/:id', isAuth, (req,res,next) => {
  Expense.find({ card: req.params.id })
    .then(expenses => {
      return res.status(200).json(expenses)
    })
    .catch(error => next(error))
})

router.put('/:id', isAuth, (req, res, next) => {
  Expense.findByIdAndUpdate(req.params.id, req.body, { new: true })
    .then(expense => {
      return res.status(200).json(expense)
    })
    .catch(error => next(error))
})

router.delete('/:id', isAuth, (req, res, next) => {
  Expense.findByIdAndDelete(req.params.id)
    .then(expense => {
      return res.send('deleted')
    })
    .catch(error => next(error))
})

module.exports = router
