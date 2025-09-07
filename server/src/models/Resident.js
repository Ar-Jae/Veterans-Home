const { Schema, model } = require('mongoose')

const ResidentSchema = new Schema({
  firstName: String,
  lastName: String,
  room: String,
  moveInDate: Date,
  notes: String,
})

module.exports = model('Resident', ResidentSchema)
