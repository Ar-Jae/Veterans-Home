import { useState } from 'react'

export default function GetInvolved() {
  const [amount, setAmount] = useState(50)
  const [loading, setLoading] = useState(false)

  async function donate(e) {
    e.preventDefault()
    setLoading(true)
    try {
      const res = await fetch('/api/payments/session', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ amount: Math.round(amount * 100) }),
      })
      const data = await res.json()
      if (data.url) window.location.href = data.url
      else alert(data.error || 'Payment initiation failed')
    } catch (err) {
      console.error(err)
      alert('Payment initiation failed')
    } finally {
      setLoading(false)
    }
  }

  return (
    <div>
      <h2>Get Involved</h2>
      <p>Ways to support Honor Haven Veterans Home:</p>
      <ul>
        <li>Volunteer</li>
        <li>Partner with us</li>
      </ul>

      <section style={{ marginTop: 16 }}>
        <h3>Donate</h3>
        <form onSubmit={donate}>
          <label>
            Amount (USD):
            <input type="number" value={amount} onChange={e => setAmount(Number(e.target.value))} min="1" step="1" style={{ marginLeft: 8 }} />
          </label>
          <div style={{ marginTop: 12 }}>
            <button type="submit" disabled={loading}>{loading ? 'Processing...' : 'Donate with Card'}</button>
          </div>
        </form>
      </section>
    </div>
  )
}
