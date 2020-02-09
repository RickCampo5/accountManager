const mongoose = require('mongoose')

const expenseSchema = new mongoose.Schema({
  name: String,
  date: Date,
  amount: Number,
  expenseType: String,
  cash: Boolean,
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User'
  },
  card: {
    type: mongoose.Schema.Types.ObjectId,
    refPath: 'onModel'
  },
  onModel: {
    type: String,
    enum: ['CreditCard', 'DebitCard']
  }
},{
  timestamps: {
    createdAt: 'created_at',
    updatedAt: 'updated_at'
  }
})

module.exports = mongoose.model('Expense', expenseSchema)