const { Schema, model } = require('mongoose')

const ResidentSchema = new Schema({
  first_name: { type: String, required: true },
  last_name: { type: String, required: true },
  room_number: { type: String, required: true },
  floor: { type: Number, default: 1 },
  date_of_birth: { type: Date },
  service_branch: { type: String },
  emergency_contact_name: { type: String },
  emergency_contact_phone: { type: String },
  medical_notes: { type: String },
  move_in_date: { type: Date },
  move_out_date: { type: Date },
  status: { type: String, default: 'active' },
})

module.exports = model('Resident', ResidentSchema)
