const mongoose = require('mongoose')

const creditCardSchema = mongoose.Schema({

}, {
  timestamps: {
    createdAt: 'created_at',
    updatedAt: 'updated_at'
  }
})

module.exports = mongoose.model('CreditCard', creditCardSchema)
