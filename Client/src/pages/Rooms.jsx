import React, { useEffect, useState } from 'react'

const STORAGE_KEY = 'vh_rooms_v1'

export default function Rooms(){
  const [rooms, setRooms] = useState(() => {
    try {
      const raw = localStorage.getItem(STORAGE_KEY)
      return raw ? JSON.parse(raw) : [
  { id: 1, number: '101A', type: 'Single', capacity: 1, occupied: true, occupant: 'John Doe' },
  { id: 2, number: '203B', type: 'Double', capacity: 2, occupied: false, occupant: '' }
      ]
    } catch (e) { return [] }
  })

  const [form, setForm] = useState({ number: '', type: 'Single', capacity: 1, occupant: '' })

  useEffect(() => {
    try { localStorage.setItem(STORAGE_KEY, JSON.stringify(rooms)) } catch (e) {}
  }, [rooms])

  function handleChange(e){
    const { name, value } = e.target
    setForm(prev => ({ ...prev, [name]: name === 'capacity' ? Number(value) : value }))
  }

  function addRoom(e){
    e.preventDefault()
    if (!form.number) return
    const id = Date.now()
    setRooms(prev => [ { id, ...form, occupied: false, occupant: '' }, ...prev ])
    setForm({ number: '', type: 'Single', capacity: 1, occupant: '' })
  }

  function removeRoom(id){ setRooms(prev => prev.filter(r => r.id !== id)) }

  function toggleOccupied(id){
    setRooms(prev => prev.map(r => {
      if (r.id === id) {
        if (!r.occupied) {
          const occupant = prompt('Enter occupant name:') || ''
          return { ...r, occupied: true, occupant }
        } else {
          return { ...r, occupied: false, occupant: '' }
        }
      }
      return r
    }))
  }

  return (
    <div style={{
      minHeight:'100vh',
      background:'linear-gradient(120deg,#f3f4f6 0%,#e0e7ff 100%)',
      padding:'0',
    }}>
      <div style={{maxWidth:1200,margin:'0 auto',padding:'0'}}>
        <h1 style={{
          fontSize:'2.2rem',
          fontWeight:800,
          background:'linear-gradient(90deg,#6366f1 0%,#60a5fa 100%)',
          WebkitBackgroundClip:'text',
          WebkitTextFillColor:'transparent',
          marginBottom:24,
          letterSpacing:'-1px',
        }}>Rooms</h1>



        <section>
          <h2 style={{fontWeight:700,fontSize:'1.1rem',marginBottom:10,color:'#374151'}}>Room list</h2>
          {rooms.length === 0 ? (
            <p style={{fontSize:'1rem',color:'#64748b'}}>No rooms configured.</p>
          ) : (
            <ul style={{display:'flex',flexDirection:'column',gap:16}}>
              {rooms.map(r => (
                <li key={r.id} style={{padding:'1.2rem',background:'#fff',borderRadius:12,boxShadow:'0 2px 8px 0 rgba(60,72,100,0.04)',display:'flex',justifyContent:'space-between',alignItems:'center'}}>
                  <div>
                    <div style={{fontWeight:600,fontSize:'1.08rem',color:'#374151'}}>{r.number} <span style={{fontSize:'0.98rem',color:'#6366f1',marginLeft:8}}>{r.type}</span></div>
                    <div style={{fontSize:'0.98rem',color:'#64748b',marginTop:4}}>Capacity: {r.capacity} • <span style={{color:r.occupied?'#34d399':'#fbbf24',fontWeight:600}}>{r.occupied ? 'Occupied' : 'Available'}</span></div>
                    {r.occupied && r.occupant && (
                      <div style={{fontSize:'0.98rem',color:'#2563eb',marginTop:4}}><strong>Occupant:</strong> {r.occupant}</div>
                    )}
                  </div>
                  <div style={{display:'flex',gap:10}}>
                    <button onClick={() => toggleOccupied(r.id)} style={{fontSize:'0.98rem',color:r.occupied?'#fbbf24':'#34d399',fontWeight:600,background:'none',border:'none',cursor:'pointer',textDecoration:'underline'}}>{r.occupied ? 'Vacate' : 'Occupy'}</button>
                    <button onClick={() => removeRoom(r.id)} style={{fontSize:'0.98rem',color:'#ef4444',fontWeight:600,background:'none',border:'none',cursor:'pointer',textDecoration:'underline'}}>Remove</button>
                  </div>
                </li>
              ))}
            </ul>
          )}
        </section>
      </div>
    </div>
  )
}
