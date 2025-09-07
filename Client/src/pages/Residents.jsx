import React from 'react'

const sample = [
  {id:1, name:'Robert Johnson', room:'1A', age:70, branch:'Army', status:'active', movedIn:'Aug 2023', tenure:'2 years, 1 months', emergency:'Mary Johnson', notes:'Diabetes Type 2 - requires regular monitoring'},
  {id:2, name:'Patricia Williams', room:'1B', age:63, branch:'Navy', status:'active', movedIn:'Sep 2023', tenure:'2 years in facility', emergency:'David Williams', notes:'No major health issues'},
  {id:4, name:'Michael Davis', room:'2A', age:69, branch:'Air Force', status:'active', movedIn:'Aug 2023', tenure:'2 years', emergency:'', notes:''},
  {id:5, name:'Linda Brown', room:'2B', age:85, branch:'Marines', status:'active', movedIn:'Jul 2023', tenure:'2 years', emergency:'', notes:''},
]

function StatCard({title, value}){
  // Emoji and color mapping for each stat card
  const emojiMap = {
    'Active Residents': { emoji: '🟢', color: '#34d399', bg: '#ecfdf5' },
    'On Leave': { emoji: '🟡', color: '#fbbf24', bg: '#fef3c7' },
    'Total Residents': { emoji: '🔵', color: '#60a5fa', bg: '#eff6ff' },
  }
  const emoji = emojiMap[title]?.emoji || '';
  const bg = emojiMap[title]?.bg || '#f3f4f6';
  return (
    <div
      className="card"
      style={{
        background: '#fff',
        borderRadius: '0.75rem',
        boxShadow: '0 2px 8px 0 rgba(0,0,0,0.04)',
        padding: '1.25rem 2rem',
        display: 'flex',
        alignItems: 'center',
        flex: 1,
        marginRight: 16,
        marginLeft: 0,
      }}
    >
      <span style={{fontSize:28,marginRight:18}}>{emoji}</span>
      <div style={{flex:1}}>
        <div className="text-sm text-gray-500" style={{marginBottom:8}}>{title}</div>
        <div className="text-2xl font-bold" style={{marginTop:2}}>{value}</div>
      </div>
    </div>
  )
}

function ResidentCard({r}){
  const initials = r.name.split(' ').map(n=>n[0]).slice(0,2).join('')
  return (
    <div className="resident-card card">
      <button className="edit-btn" title="Edit">✏️</button>
      <div style={{display:'flex',gap:12,alignItems:'flex-start'}}>
        <div className="avatar">{initials}</div>
        <div style={{flex:1}}>
          <div style={{display:'flex',alignItems:'center',gap:8,justifyContent:'space-between'}}>
            <div>
              <div className="font-medium" style={{fontSize:18}}>{r.name}</div>
              <div style={{marginTop:6}}>
                <span className="pill" style={{background:'#d1fae5',color:'#065f46',marginRight:6}}>active</span>
                {r.branch && <span className="pill" style={{background:'#e6f7ff',color:'#0f172a'}}>{r.branch}</span>}
              </div>
            </div>
          </div>

          <div style={{marginTop:12}}>
            <div className="text-sm text-gray-600">📍 Room {r.room} · Floor {r.room && r.room[0]}</div>
            {r.age>0 && <div className="text-sm text-gray-600">👤 {r.age} years old</div>}
            <div className="text-sm text-gray-600">📅 Moved in {r.movedIn}</div>
            <div className="text-sm text-gray-600">⭐ {r.tenure}</div>
            {r.emergency && <div className="text-sm text-gray-600">📞 Emergency: {r.emergency}</div>}
            {r.notes && <div className="text-sm text-gray-600">📝 {r.notes}</div>}
          </div>
        </div>
      </div>
    </div>
  )
}

export default function Residents(){
  return (
    <div className="page-content">
      <div style={{display:'flex',justifyContent:'space-between',alignItems:'center',marginBottom:18}}>
        <div>
          <h1 className="text-3xl font-bold">Residents</h1>
          <p className="text-gray-600 mt-1">Manage veteran residents and their information</p>
        </div>
        <div>
          <button className="primary-btn">+  Add New Resident</button>
        </div>
      </div>

      <div className="stats-row" style={{marginBottom:16, display:'flex', gap:20}}>
        <StatCard title="Active Residents" value={5} />
        <StatCard title="On Leave" value={0} />
        <StatCard title="Total Residents" value={5} />
      </div>

      <div style={{display:'flex',gap:12,alignItems:'center',marginBottom:14}}>
        <input className="search-input" placeholder="Search residents by name, room, or service branch..." />
      </div>

      <div className="res-grid">
        {sample.map(r=> <ResidentCard key={r.id} r={r} />)}
      </div>
    </div>
  )
}
