const express = require('express')
const Room = require('../models/Room')
const router = express.Router()

router.get('/', async (req, res) => {
  try {
    const items = await Room.find().limit(100);
    res.json(items);
  } catch (err) {
    console.error('GET /rooms error:', err);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

router.post('/', async (req, res) => {
  try {
    // Map frontend fields to backend schema
    const data = {
      room_number: req.body.room_number || req.body.number,
      floor: req.body.floor,
      capacity: req.body.capacity,
      occupied: req.body.occupied,
      maintenance: req.body.maintenance || false,
    };
    const item = new Room(data);
    await item.save();
    res.status(201).json(item);
  } catch (err) {
    console.error('POST /rooms error:', err);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});


// Update room by ID
router.put('/:id', async (req, res) => {
  try {
    const update = {};
    if (req.body.occupied !== undefined) update.occupied = req.body.occupied;
    if (req.body.room_number !== undefined) update.room_number = req.body.room_number;
    if (req.body.floor !== undefined) update.floor = req.body.floor;
    if (req.body.capacity !== undefined) update.capacity = req.body.capacity;
    if (req.body.maintenance !== undefined) update.maintenance = req.body.maintenance;
    const room = await Room.findByIdAndUpdate(req.params.id, update, { new: true });
    if (!room) return res.status(404).json({ error: 'Room not found' });
    res.json(room);
  } catch (err) {
    console.error('PUT /rooms/:id error:', err);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

module.exports = router
