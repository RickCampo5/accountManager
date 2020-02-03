const mongoose = require('mongoose')

const expenseSchema = mongoose.Schema({
  name: String,
  date: Date,
  expenseType: String,
  timestamps: {
    createdAt: 'created_at',
    updatedAt: 'updated_at'
  }
})

module.exports = mongoose.model('Expense', expenseSchema)