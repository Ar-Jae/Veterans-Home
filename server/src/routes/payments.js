const express = require('express')
const router = express.Router()

// POST /api/payments/session
router.post('/session', async (req, res) => {
  const stripeSecret = process.env.STRIPE_SECRET
  if (!stripeSecret) return res.status(500).json({ error: 'Stripe secret not configured' })

  const Stripe = require('stripe')
  const stripe = Stripe(stripeSecret)

  const { amount = 5000 } = req.body // amount in cents (default $50.00)

  try {
    const session = await stripe.checkout.sessions.create({
      payment_method_types: ['card'],
      line_items: [{ price_data: { currency: 'usd', product_data: { name: 'Donation to Honor Haven' }, unit_amount: amount }, quantity: 1 }],
      mode: 'payment',
      success_url: req.body.success_url || `${req.headers.origin}/?success=true`,
      cancel_url: req.body.cancel_url || `${req.headers.origin}/?canceled=true`,
    })

    res.json({ url: session.url })
  } catch (err) {
    console.error('Stripe session error', err)
    res.status(500).json({ error: 'Failed to create session' })
  }
})

module.exports = router
