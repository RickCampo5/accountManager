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
      name: String,
      amount: Number
    }

  ],
  creditCards: [
    {
      type: Schema.Types.ObjectId,
      ref: 'CreditCard'
    }
  ],
  expenses: [
    {
      type: Schema.Types.ObjectId,
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