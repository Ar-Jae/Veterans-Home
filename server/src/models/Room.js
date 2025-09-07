const { Schema, model } = require('mongoose')

const RoomSchema = new Schema({
  room_number: String,
  floor: Number,
  capacity: Number,
  occupied: { type: Number, default: 0 },
  maintenance: { type: Boolean, default: false },
})

module.exports = model('Room', RoomSchema)
