import React, { useEffect, useState } from 'react'

const STORAGE_KEY = 'vh_maintenance_v1'

export default function Maintenance(){
  const [requests, setRequests] = useState(() => {
    try {
      const raw = localStorage.getItem(STORAGE_KEY)
      return raw ? JSON.parse(raw) : [
        { id: 1, resident: 'John Doe', room: '101A', issue: 'Leaky faucet', priority: 'Low', date: '2025-09-07', notes: '', resolved: false },
        { id: 2, resident: 'Mary Smith', room: '203B', issue: 'AC not cooling', priority: 'High', date: '2025-09-06', notes: 'Third floor', resolved: false }
      ]
    } catch (e) {
      return []
    }
  })

  const [form, setForm] = useState({ resident: '', room: '', issue: '', priority: 'Low', date: '', notes: '' })

  useEffect(() => {
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(requests))
    } catch (e) {
      // ignore
    }
  }, [requests])

  function handleChange(e){
    const { name, value } = e.target
    setForm(prev => ({ ...prev, [name]: value }))
  }

  function handleAdd(e){
    e.preventDefault()
    if (!form.resident || !form.room || !form.issue) return
    const id = Date.now()
    setRequests(prev => [ { id, ...form, resolved: false }, ...prev ])
    setForm({ resident: '', room: '', issue: '', priority: 'Low', date: '', notes: '' })
  }

  function handleRemove(id){
    setRequests(prev => prev.filter(r => r.id !== id))
  }

  function toggleResolved(id){
    setRequests(prev => prev.map(r => r.id === id ? { ...r, resolved: !r.resolved } : r))
  }

  return (
    <div style={{minHeight:'100vh',background:'#fff',fontFamily:'inherit'}}>
      <div style={{maxWidth:900,margin:'0 auto',padding:'2.5rem 0'}}>
        <h1 style={{fontSize:'2rem',fontWeight:700,color:'#222',marginBottom:32,letterSpacing:'-1px'}}>Maintenance</h1>

        <section style={{marginBottom:36}}>
          <h2 style={{fontWeight:600,fontSize:'1.08rem',color:'#2563eb',marginBottom:16}}>New maintenance request</h2>
          <form onSubmit={handleAdd} style={{background:'#fff',borderRadius:12,border:'1px solid #e0e7ff',padding:'0',display:'grid',gridTemplateColumns:'1fr 1fr',gap:'24px 18px'}}>
            <div style={{display:'flex',flexDirection:'column',gap:8}}>
              <label style={{fontWeight:500,color:'#222',marginBottom:4}}>Resident</label>
              <input name="resident" value={form.resident} onChange={handleChange} required style={{padding:'0.85rem 1.2rem',borderRadius:8,border:'1px solid #e0e7ff',fontSize:'1rem',background:'#fff',outline:'none',width:'100%'}} placeholder="Full name" />
            </div>
            <div style={{display:'flex',flexDirection:'column',gap:8}}>
              <label style={{fontWeight:500,color:'#222',marginBottom:4}}>Room</label>
              <input name="room" value={form.room} onChange={handleChange} required style={{padding:'0.85rem 1.2rem',borderRadius:8,border:'1px solid #e0e7ff',fontSize:'1rem',background:'#fff',outline:'none',width:'100%'}} placeholder="e.g. 101A" />
            </div>
            <div style={{display:'flex',flexDirection:'column',gap:8}}>
              <label style={{fontWeight:500,color:'#222',marginBottom:4}}>Priority</label>
              <select name="priority" value={form.priority} onChange={handleChange} style={{padding:'0.85rem 1.2rem',borderRadius:8,border:'1px solid #e0e7ff',fontSize:'1rem',background:'#fff',outline:'none',width:'100%'}}>
                <option>Low</option>
                <option>Medium</option>
                <option>High</option>
              </select>
            </div>
            <div style={{display:'flex',flexDirection:'column',gap:8}}>
              <label style={{fontWeight:500,color:'#222',marginBottom:4}}>Date</label>
              <input name="date" value={form.date} onChange={handleChange} type="date" style={{padding:'0.85rem 1.2rem',borderRadius:8,border:'1px solid #e0e7ff',fontSize:'1rem',background:'#fff',outline:'none',width:'100%'}} />
            </div>
            <div style={{gridColumn:'1/3',display:'flex',flexDirection:'column',gap:8}}>
              <label style={{fontWeight:500,color:'#222',marginBottom:4}}>Issue</label>
              <input name="issue" value={form.issue} onChange={handleChange} required style={{padding:'0.85rem 1.2rem',borderRadius:8,border:'1px solid #e0e7ff',fontSize:'1rem',background:'#fff',outline:'none',width:'100%'}} placeholder="Brief description" />
            </div>
            <div style={{gridColumn:'1/3',display:'flex',flexDirection:'column',gap:8}}>
              <label style={{fontWeight:500,color:'#222',marginBottom:4}}>Notes (optional)</label>
              <input name="notes" value={form.notes} onChange={handleChange} style={{padding:'0.85rem 1.2rem',borderRadius:8,border:'1px solid #e0e7ff',fontSize:'1rem',background:'#fff',outline:'none',width:'100%'}} placeholder="Additional details" />
            </div>
            <div style={{gridColumn:'1/3',display:'flex',justifyContent:'flex-end',marginTop:12}}>
              <button type="submit" style={{background:'#2563eb',color:'#fff',fontWeight:600,fontSize:'1rem',border:'none',borderRadius:8,padding:'0.75rem 1.5rem',cursor:'pointer'}}>Submit Request</button>
            </div>
          </form>
        </section>

        <section>
          <h2 style={{fontWeight:600,fontSize:'1.08rem',color:'#2563eb',marginBottom:16}}>Open requests</h2>
          {requests.length === 0 ? (
            <p style={{fontSize:'1rem',color:'#64748b'}}>No maintenance requests.</p>
          ) : (
            <ul style={{display:'flex',flexDirection:'column',gap:18}}>
              {requests.map(r => (
                <li key={r.id} style={{background:'#fff',border:'1px solid #e0e7ff',borderRadius:12,padding:'1.2rem 1.5rem',display:'flex',justifyContent:'space-between',alignItems:'start',boxShadow:r.resolved?'none':'0 2px 8px 0 rgba(60,72,100,0.08)',opacity:r.resolved?0.6:1}}>
                  <div>
                    <div style={{fontWeight:600,fontSize:'1.08rem',color:r.resolved?'#64748b':'#2563eb',marginBottom:2,textDecoration:r.resolved?'line-through':'none'}}>{r.issue} <span style={{fontWeight:400,fontSize:'0.95rem',color:'#64748b'}}>({r.priority})</span></div>
                    <div style={{fontSize:'0.98rem',color:'#64748b'}}>{r.resident} — {r.room} {r.date ? `• ${r.date}` : ''}</div>
                    {r.notes && <div style={{fontSize:'0.98rem',color:'#222',marginTop:6}}>{r.notes}</div>}
                  </div>
                  <div style={{display:'flex',flexDirection:'column',alignItems:'end',gap:8}}>
                    <button onClick={() => toggleResolved(r.id)} style={{fontSize:'0.98rem',color:'#22c55e',background:'none',border:'none',fontWeight:500,cursor:'pointer',textDecoration:'underline',padding:0}}>
                      {r.resolved ? 'Reopen' : 'Mark resolved'}
                    </button>
                    <button onClick={() => handleRemove(r.id)} style={{fontSize:'0.98rem',color:'#ef4444',background:'none',border:'none',fontWeight:500,cursor:'pointer',textDecoration:'underline',padding:0}}>Remove</button>
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
