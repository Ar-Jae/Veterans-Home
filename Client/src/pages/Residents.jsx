import React, { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom';



function getStoredResidents() {
  try {
    const raw = localStorage.getItem(RESIDENT_STORAGE_KEY);
    if (raw) return JSON.parse(raw);
  } catch {}
  return [];
}

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
  const [rooms, setRooms] = useState([]);
  const [residents, setResidents] = useState([]);
  const navigate = useNavigate();
  const [form, setForm] = useState({ name:'', age:'', branch:'', emergency:'', notes:'' });
  const [search, setSearch] = useState('');

  useEffect(() => {
    fetch('http://localhost:4000/api/rooms')
      .then(res => res.json())
      .then(data => setRooms(data));
  }, []);
  useEffect(() => {
    fetch('http://localhost:4000/api/residents')
      .then(res => res.json())
      .then(data => setResidents(data));
  }, []);

  function handleFormChange(e){
    const { name, value } = e.target;
    setForm(prev => ({ ...prev, [name]: value }));
  }

  function handleAddResident(e){
    e.preventDefault();
  // Find first available room (occupied can be boolean or number)
  const availableRoom = rooms.find(r => !r.occupied);
    if (!availableRoom) {
      alert('No available rooms!');
      return;
    }
    // Add resident to backend
    fetch('http://localhost:4000/api/residents', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        name: form.name,
        age: form.age,
        branch: form.branch,
        room_number: availableRoom.room_number || availableRoom.number,
        status: 'active',
        movedIn: new Date().toLocaleString('default', { month: 'short', year: 'numeric' }),
        tenure: 'New',
        emergency: form.emergency,
        notes: form.notes,
      })
    })
      .then(res => res.json())
      .then(newResident => {
        // Refetch residents from backend to ensure state is up to date
        fetch('http://localhost:4000/api/residents')
          .then(res => res.json())
          .then(data => setResidents(data));
        // Update room occupancy in backend
        fetch(`http://localhost:4000/api/rooms/${availableRoom._id}`, {
          method: 'PUT',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ occupied: 1 })
        })
          .then(() => {
            // Refetch rooms from backend to ensure state is up to date
            fetch('http://localhost:4000/api/rooms')
              .then(res => res.json())
              .then(data => setRooms(data));
          });
        setForm({ name:'', age:'', branch:'', emergency:'', notes:'' });
        setShowForm(false);
      });
  }

  const filteredResidents = residents.filter(r => {
    const q = search.toLowerCase();
    return (
      (r.name && r.name.toLowerCase().includes(q)) ||
      (r.room && r.room.toLowerCase().includes(q)) ||
      (r.branch && r.branch.toLowerCase().includes(q))
    );
  });

  return (
    <div style={{
      minHeight:'100vh',
      background:'linear-gradient(120deg,#f3f4f6 0%,#e0e7ff 100%)',
      paddingBottom:'2.5rem',
      paddingTop:'0px',
      marginTop:'0px',
    }}>
      <div style={{maxWidth:1200,margin:'0 auto',padding:'0 2rem'}}>
        <div style={{display:'flex',justifyContent:'space-between',alignItems:'center',marginBottom:28}}>
          <div>
            <h1 style={{
              fontSize:'2.2rem',
              fontWeight:800,
              background:'linear-gradient(90deg,#6366f1 0%,#60a5fa 100%)',
              WebkitBackgroundClip:'text',
              WebkitTextFillColor:'transparent',
              marginBottom:6,
              letterSpacing:'-1px',
            }}>Residents</h1>
            <p style={{color:'#64748b',fontSize:'1.1rem',marginTop:2}}>Manage veteran residents and their information</p>
          </div>
          <div>
            <button onClick={()=>navigate('/add-resident')} style={{
              background:'linear-gradient(90deg,#6366f1 0%,#60a5fa 100%)',
              color:'#fff',
              fontWeight:700,
              fontSize:'1rem',
              border:'none',
              borderRadius:10,
              padding:'0.75rem 1.5rem',
              boxShadow:'0 2px 8px 0 rgba(60,72,100,0.08)',
              cursor:'pointer',
              transition:'box-shadow 0.2s',
            }}>+  Add New Resident</button>
          </div>
        </div>



        <div style={{marginBottom:24,display:'flex',gap:20}}>
          <StatCard title="Active Residents" value={residents.length} />
          <StatCard title="Available Rooms" value={rooms.filter(r => !r.occupied).length} />
          <StatCard title="Occupied Rooms" value={rooms.filter(r => r.occupied).length} />
          <StatCard title="Total Rooms" value={rooms.length} />
        </div>

        <div style={{display:'flex',gap:12,alignItems:'center',marginBottom:18}}>
          <input value={search} onChange={e=>setSearch(e.target.value)} style={{
            flex:1,
            padding:'0.85rem 1.2rem',
            borderRadius:10,
            border:'1px solid #e0e7ff',
            fontSize:'1rem',
            color:'#374151',
            background:'#fff',
            boxShadow:'0 2px 8px 0 rgba(60,72,100,0.04)',
            outline:'none',
            transition:'border 0.2s',
          }} placeholder="Search residents by name, room, or service branch..." />
        </div>

        <div style={{display:'grid',gridTemplateColumns:'repeat(auto-fit,minmax(340px,1fr))',gap:24}}>
          {filteredResidents.map(r=> <ResidentCard key={r.id} r={r} />)}
        </div>
      </div>
    </div>
  )
}
