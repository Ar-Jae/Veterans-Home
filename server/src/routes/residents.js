
const express = require('express')
const Resident = require('../models/Resident')
const router = express.Router()

// Delete all residents
router.delete('/', async (req, res) => {
  try {
    await Resident.deleteMany({});
    res.json({ message: 'All residents deleted.' });
  } catch (err) {
    console.error('DELETE /residents error:', err);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

router.get('/', async (req, res) => {
  try {
    const items = await Resident.find().limit(100);
    res.json(items);
  } catch (err) {
    console.error('GET /residents error:', err);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

router.post('/', async (req, res) => {
  try {
    // Map frontend fields to backend schema
    const data = {
      first_name: req.body.first_name || (req.body.name ? req.body.name.split(' ')[0] : ''),
      last_name: req.body.last_name || (req.body.name ? req.body.name.split(' ').slice(1).join(' ') : ''),
      name: req.body.name,
      room_number: req.body.room_number || req.body.room,
      room: req.body.room,
      floor: req.body.floor,
      date_of_birth: req.body.date_of_birth,
      age: req.body.age,
      service_branch: req.body.service_branch || req.body.branch,
      branch: req.body.branch,
      emergency_contact_name: req.body.emergency_contact_name || req.body.emergency,
      emergency: req.body.emergency,
      emergency_contact_phone: req.body.emergency_contact_phone,
      medical_notes: req.body.medical_notes || req.body.notes,
      notes: req.body.notes,
      move_in_date: req.body.move_in_date,
      movedIn: req.body.movedIn,
      move_out_date: req.body.move_out_date,
      status: req.body.status,
      tenure: req.body.tenure,
    };
    const item = new Resident(data);
    await item.save();
    res.status(201).json(item);
  } catch (err) {
    console.error('POST /residents error:', err);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});


// Assign a room to a resident
const Room = require('../models/Room');
router.patch('/:id/assign-room', async (req, res) => {
  try {
    const residentId = req.params.id;
    const { roomId } = req.body;
    if (!roomId) return res.status(400).json({ error: 'roomId required' });

    // Find room
    const room = await Room.findById(roomId);
    if (!room) return res.status(404).json({ error: 'Room not found' });

    // Update resident with room info
    const roomNumber = room.room_number || room.number;
    const resident = await Resident.findByIdAndUpdate(
      residentId,
      { room_number: roomNumber, room: roomNumber },
      { new: true }
    );
    if (!resident) return res.status(404).json({ error: 'Resident not found' });

    // Mark room as occupied
    room.occupied = 1;
    await room.save();

    res.json({ resident, room });
  } catch (err) {
    console.error('PATCH /residents/:id/assign-room error:', err);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

module.exports = router
