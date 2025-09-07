
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

module.exports = router
