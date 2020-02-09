const mongoose = require('mongoose')

const debitCardSchema = new mongoose.Schema({
  name: String,
  amount: Number,
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

module.exports = mongoose.model('DebitCard', debitCardSchema)
