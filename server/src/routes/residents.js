const express = require('express')
const Resident = require('../models/Resident')
const router = express.Router()

router.get('/', async (req, res) => {
  const items = await Resident.find().limit(100)
  res.json(items)
})

router.post('/', async (req, res) => {
  const item = new Resident(req.body)
  await item.save()
  res.status(201).json(item)
})

module.exports = router
