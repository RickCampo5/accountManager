const passportLocalMongoose = require('passport-local-mongoose')
const Schema = require('mongoose').Schema
const userSchema = new require('mongoose').Schema({
  username: String,
  email: String,
  cash: Number,
  transportCard: Number,
  savings: [
    {
      type: Schema.Types.ObjectId,
      ref: 'Saving'
    }
  ],
  debitCards: [
    {
      name: String,
      money: Number
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

module.exports = require('mongoose').model('User', userSchema)