const express = require('express');
const router = express.Router();

// Filler facility info for dashboard/sidebar
router.get('/', async (req, res) => {
  try {
    res.json({
  facilityName: 'Honor Haven Veterans Home',
      description: 'Management System',
      totalCapacity: 20,
      floors: 2,
      totalSpace: '10,000 ft²',
      staff: {
        name: 'Staff Member',
  role: 'Honor Haven Staff',
        avatar: 'S'
      }
    });
  } catch (err) {
    console.error('GET /info error:', err);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

module.exports = router;
