const { Schema, model } = require('mongoose')

const ResidentSchema = new Schema({
  first_name: { type: String },
  last_name: { type: String },
  name: { type: String },
  room_number: { type: String },
  room: { type: String },
  floor: { type: Number, default: 1 },
  date_of_birth: { type: Date },
  age: { type: Number },
  service_branch: { type: String },
  branch: { type: String },
  emergency_contact_name: { type: String },
  emergency: { type: String },
  emergency_contact_phone: { type: String },
  medical_notes: { type: String },
  notes: { type: String },
  move_in_date: { type: Date },
  movedIn: { type: String },
  move_out_date: { type: Date },
  status: { type: String, default: 'active' },
  tenure: { type: String },
})

module.exports = model('Resident', ResidentSchema)
