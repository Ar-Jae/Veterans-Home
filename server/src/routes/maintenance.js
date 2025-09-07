const express = require('express')
const MR = require('../models/MaintenanceRequest')
const Room = require('../models/Room')
const router = express.Router()

router.get('/', async (req, res) => {
  try {
    const items = await MR.find().limit(100);
    res.json(items);
  } catch (err) {
    console.error('GET /maintenance error:', err);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

router.post('/', async (req, res) => {
  try {
    const item = new MR(req.body);
    await item.save();
    res.status(201).json(item);
  } catch (err) {
    console.error('POST /maintenance error:', err);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

// PATCH endpoint to set room maintenance status
router.patch('/room/:room_number', async (req, res) => {
  try {
    const { room_number } = req.params;
    const { maintenance } = req.body;
    const room = await Room.findOneAndUpdate(
      { room_number },
      { maintenance: !!maintenance },
      { new: true }
    );
    if (!room) return res.status(404).json({ error: 'Room not found' });
    res.json(room);
  } catch (err) {
    console.error('PATCH /maintenance/room/:room_number error:', err);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

module.exports = router
