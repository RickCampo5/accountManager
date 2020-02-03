const mongoose = require('mongoose')

const creditCardSchema = new mongoose.Schema({
  name: String,
  limit: Number,
  expended: Number,
  minimalPay: Number,
  noTaxesPay: Number,
  dateToPay: Date,
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User'
  }
}, {
  timestamps: {
    createdAt: 'created_at',
    updatedAt: 'updated_at'
  }
})

module.exports = mongoose.model('CreditCard', creditCardSchema)
