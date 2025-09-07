const { Schema, model } = require('mongoose')

const MaintenanceSchema = new Schema({
  title: String,
  description: String,
  priority: { type: String, enum: ['low','medium','high'], default: 'low' },
  location: String,
  status: { type: String, enum: ['open','in_progress','closed'], default: 'open' },
  createdAt: { type: Date, default: Date.now }
})

module.exports = model('MaintenanceRequest', MaintenanceSchema)
