const express = require('express')
const Room = require('../models/Room')
const router = express.Router()

router.get('/', async (req, res) => {
  const items = await Room.find().limit(100)
  res.json(items)
})

router.post('/', async (req, res) => {
  const item = new Room(req.body)
  await item.save()
  res.status(201).json(item)
})

module.exports = router
