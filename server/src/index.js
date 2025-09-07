require('dotenv').config()
const express = require('express')
const cors = require('cors')
const { connect } = require('./db')

const residents = require('./routes/residents')
const rooms = require('./routes/rooms')
const maintenance = require('./routes/maintenance')
const info = require('./routes/info')

const app = express()
app.use(cors())
app.use(express.json())

app.use('/api/residents', residents)
app.use('/api/rooms', rooms)
app.use('/api/maintenance', maintenance)
app.use('/api/info', info)

const PORT = process.env.PORT || 4000

async function start(){
  await connect(process.env.DATABASE_URL || process.env.ATLAS_URL)
  app.listen(PORT, ()=> console.log('Server listening on', PORT))
}

start().catch(err => {
  console.error(err)
  process.exit(1)
})
