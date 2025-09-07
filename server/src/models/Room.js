const { Schema, model } = require('mongoose')

const RoomSchema = new Schema({
  number: String,
  floor: Number,
  capacity: Number,
  occupied: { type: Number, default: 0 },
})

module.exports = model('Room', RoomSchema)
