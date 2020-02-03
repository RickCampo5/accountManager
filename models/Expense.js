const mongoose = require('mongoose')

const expenseSchema = new mongoose.Schema({
  name: String,
  date: Date,
  amount: Number,
  expenseType: String,
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User'
  }
},{
  timestamps: {
    createdAt: 'created_at',
    updatedAt: 'updated_at'
  }
})

module.exports = mongoose.model('Expense', expenseSchema)