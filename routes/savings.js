const router = require('express').Router()
const Saving = require('../models/Saving')

function isAuth(req, res, next) {
  if(req.isAuthenticated()) return next()
  else res.status(401).json({message: 'Unauthorized you must login'})
}

router.post('/create_saving', isAuth, (req, res, next) => {
  req.body.user = req.user.id
  Saving.create(req.body)
    .then(saving => {
      return res.status(200).json(saving)
    })
    .catch(error => next(error))
})

router.get('/user_savings', isAuth, (req,res,next) => {
  Saving.find({ user: req.user.id })
    .then(savings => {
      return res.status(200).json(savings)
    })
    .catch(error => next(error))
})

router.put('/:id', isAuth, (req, res, next) => {
  Saving.findByIdAndUpdate(req.params.id, req.body, { new: true })
    .then(saving => {
      return res.status(200).json(saving)
    })
    .catch(error => next(error))
})

router.delete('/:id', isAuth, (req, res, next) => {
  Saving.findByIdAndDelete(req.params.id)
    .then(saving => {
      return res.send('deleted')
    })
    .catch(error => next(error))
})

module.exports = router
