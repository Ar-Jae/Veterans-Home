import React, { useEffect, useState } from 'react'

const STORAGE_KEY = 'vh_activities_v1'

export default function Activities(){
  const [activities, setActivities] = useState(() => {
    try {
      const raw = localStorage.getItem(STORAGE_KEY)
      return raw ? JSON.parse(raw) : [
        { id: 1, title: 'Morning Stretch', date: '2025-09-08', time: '09:00', notes: 'Group in rec room' },
        { id: 2, title: 'Bingo', date: '2025-09-09', time: '14:00', notes: 'Prizes provided' }
      ]
    } catch (e) {
      return []
    }
  })

  const [form, setForm] = useState({ title: '', date: '', time: '', notes: '' })

  useEffect(() => {
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(activities))
    } catch (e) {
      // ignore write errors
    }
  }, [activities])

  function handleChange(e){
    const { name, value } = e.target
    setForm(prev => ({ ...prev, [name]: value }))
  }

  function handleAdd(e){
    e.preventDefault()
    if (!form.title || !form.date) return
    const id = Date.now()
    setActivities(prev => [
      { id, title: form.title.trim(), date: form.date, time: form.time, notes: form.notes },
      ...prev
    ])
    setForm({ title: '', date: '', time: '', notes: '' })
  }

  function handleRemove(id){
    setActivities(prev => prev.filter(a => a.id !== id))
  }

  return (
    <div style={{minHeight:'100vh',background:'#fff',padding:'0',fontFamily:'inherit'}}>
      <div style={{maxWidth:900,margin:'0 auto',padding:'2.5rem 0'}}>
        <h1 style={{fontSize:'2rem',fontWeight:700,color:'#222',marginBottom:32,letterSpacing:'-1px'}}>Activities</h1>

        <section style={{marginBottom:36}}>
          <h2 style={{fontWeight:600,fontSize:'1.08rem',color:'#222',marginBottom:16}}>Schedule a new activity</h2>
          <form onSubmit={handleAdd} style={{background:'#fff',borderRadius:12,border:'1px solid #e0e7ff',padding:'0',display:'grid',gridTemplateColumns:'1fr 1fr',gap:'24px 18px'}}>
            <div style={{display:'flex',flexDirection:'column',gap:8}}>
              <label style={{fontWeight:500,color:'#222',marginBottom:4}}>Title</label>
              <input name="title" value={form.title} onChange={handleChange} required style={{padding:'0.85rem 1.2rem',borderRadius:8,border:'1px solid #e0e7ff',fontSize:'1rem',background:'#fff',outline:'none',width:'100%'}} placeholder="e.g. Gardening" />
            </div>
            <div style={{display:'flex',flexDirection:'column',gap:8}}>
              <label style={{fontWeight:500,color:'#222',marginBottom:4}}>Date</label>
              <input name="date" value={form.date} onChange={handleChange} type="date" required style={{padding:'0.85rem 1.2rem',borderRadius:8,border:'1px solid #e0e7ff',fontSize:'1rem',background:'#fff',outline:'none',width:'100%'}} />
            </div>
            <div style={{display:'flex',flexDirection:'column',gap:8}}>
              <label style={{fontWeight:500,color:'#222',marginBottom:4}}>Time</label>
              <input name="time" value={form.time} onChange={handleChange} type="time" style={{padding:'0.85rem 1.2rem',borderRadius:8,border:'1px solid #e0e7ff',fontSize:'1rem',background:'#fff',outline:'none',width:'100%'}} />
            </div>
            <div style={{gridColumn:'1/3',display:'flex',flexDirection:'column',gap:8}}>
              <label style={{fontWeight:500,color:'#222',marginBottom:4}}>Notes (optional)</label>
              <input name="notes" value={form.notes} onChange={handleChange} style={{padding:'0.85rem 1.2rem',borderRadius:8,border:'1px solid #e0e7ff',fontSize:'1rem',background:'#fff',outline:'none',width:'100%'}} placeholder="Room, special instructions, etc." />
            </div>
            <div style={{gridColumn:'1/3',display:'flex',justifyContent:'flex-end',marginTop:12}}>
              <button type="submit" style={{background:'#2563eb',color:'#fff',fontWeight:600,fontSize:'1rem',border:'none',borderRadius:8,padding:'0.75rem 1.5rem',cursor:'pointer'}}>Add Activity</button>
            </div>
          </form>
        </section>

        <section>
          <h2 style={{fontWeight:600,fontSize:'1.08rem',color:'#222',marginBottom:16}}>Upcoming activities</h2>
          {activities.length === 0 ? (
            <p style={{fontSize:'1rem',color:'#64748b'}}>No scheduled activities.</p>
          ) : (
            <ul style={{display:'flex',flexDirection:'column',gap:18}}>
              {activities.map(act => (
                <li key={act.id} style={{background:'#fff',border:'1px solid #e0e7ff',borderRadius:12,padding:'1.2rem 1.5rem',display:'flex',justifyContent:'space-between',alignItems:'start'}}>
                  <div>
                    <div style={{fontWeight:600,fontSize:'1.08rem',color:'#222',marginBottom:2}}>{act.title}</div>
                    <div style={{fontSize:'0.98rem',color:'#64748b'}}>{act.date} {act.time ? `• ${act.time}` : ''}</div>
                    {act.notes && <div style={{fontSize:'0.98rem',color:'#222',marginTop:6}}>{act.notes}</div>}
                  </div>
                  <div>
                    <button onClick={() => handleRemove(act.id)} style={{fontSize:'0.98rem',color:'#ef4444',background:'none',border:'none',fontWeight:500,cursor:'pointer',textDecoration:'underline',padding:0}}>Remove</button>
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
