const passportLocalMongoose = require('passport-local-mongoose')
const mongoose = require('mongoose')

const userSchema = new mongoose.Schema({
  username: String,
  email: String,
  cash: Number,
  transportCard: Number,
  savings: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Saving'
    }
  ],
  debitCards: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'DebitCard'
    }
  ],
  creditCards: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'CreditCard'
    }
  ],
  expenses: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Expense'
    }
  ]
}, {
  timestamps: {
    createdAt: 'created_at',
    updateAt: 'uptadet_at'
  }
})

userSchema.plugin(passportLocalMongoose, {usernameField: 'email'})

module.exports = mongoose.model('User', userSchema)