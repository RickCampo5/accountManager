const mongoose = require('mongoose')

const savingsSchema = new mongoose.Schema({
  name: String,
  image: String,
  amount: Number
}, {
  timestapms: {
    createdAt: 'created_at',
    updatedAt: 'updated_at'
  }
})

module.exports = mongoose.model('Saving', savingsSchema)
