const mongoose = require('mongoose')

const savingsSchema = mongoose.Schema({

}, {
  timestapms: {
    createdAt: 'created_at',
    updatedAt: 'updated_at'
  }
})

module.exports = mongoose.model('Saving', savingsSchema)
