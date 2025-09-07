const express = require('express')
const MR = require('../models/MaintenanceRequest')
const router = express.Router()

router.get('/', async (req, res) => {
  const items = await MR.find().limit(100)
  res.json(items)
})

router.post('/', async (req, res) => {
  const item = new MR(req.body)
  await item.save()
  res.status(201).json(item)
})

module.exports = router
