const mongoose = require('mongoose')
const debug = (msg) => console.log('[db]', msg)

async function connect(uri) {
  if (!uri) throw new Error('DATABASE_URL is required')
  try {
    await mongoose.connect(uri, { dbName: 'veterans_home' })
    debug('connected to MongoDB')
  } catch (err) {
    debug('error connecting to MongoDB: ' + err.message)
    throw err
  }
}

module.exports = { connect, mongoose }
