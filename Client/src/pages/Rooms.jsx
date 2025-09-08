
import React, { useEffect, useState } from 'react';

export default function Rooms() {
  const [rooms, setRooms] = useState([]);
  const [residents, setResidents] = useState([]);
  useEffect(() => {
    fetch('http://localhost:4000/api/rooms')
      .then(res => res.json())
      .then(data => {
        setRooms(data.map(room => ({
          id: room._id,
          number: room.room_number || room.number,
          type: room.type || (room.capacity === 2 ? 'Double' : 'Single'),
          capacity: room.capacity,
          occupied: room.occupied,
          occupant: '',
        })));
      });
    fetch('http://localhost:4000/api/residents')
      .then(res => res.json())
      .then(data => setResidents(data));
  }, []);

  return (
    <div style={{minHeight:'100vh',background:'#fff',fontFamily:'inherit'}}>
      <div style={{maxWidth:1200,margin:'0 auto',padding:'2.5rem 0'}}>
        <h1 style={{fontSize:'2rem',fontWeight:700,color:'#222',marginBottom:32,letterSpacing:'-1px'}}>Rooms</h1>
        <section>
          {rooms.length === 0 ? (
            <p style={{fontSize:'1rem',color:'#64748b'}}>No rooms configured.</p>
          ) : (
            <div style={{display:'flex',gap:'32px',marginTop:'8px',alignItems:'flex-start'}}>
              <div style={{flex:1}}>
                <h3 style={{fontWeight:700,fontSize:'1rem',marginBottom:8,color:'#6366f1'}}>First Floor (1A–1J)</h3>
                <div style={{display:'grid',gridTemplateColumns:'repeat(2, minmax(160px, 1fr))',gap:'18px'}}>
                  {rooms.filter(r => /^1[A-J]$/.test(r.number)).map(r => {
                    const occupant = residents.find(res => (res.room_number === r.number || res.room === r.number));
                    const isOccupied = r.occupied && occupant;
                    return (
                      <div key={r.id} style={{padding:'1rem',background:'#fff',borderRadius:10,boxShadow:'0 2px 8px 0 rgba(60,72,100,0.07)',display:'flex',flexDirection:'column',alignItems:'flex-start',justifyContent:'space-between',minHeight:90,border:isOccupied?'2px solid #34d399':'2px solid #e5e7eb'}}>
                        <div style={{fontWeight:600,fontSize:'1.08rem',color:'#374151',marginBottom:2}}>{r.number} <span style={{fontSize:'0.98rem',color:'#6366f1',marginLeft:8}}>{r.type}</span></div>
                        <div style={{fontSize:'0.95rem',color:'#64748b',marginBottom:4}}>Capacity: {r.capacity}</div>
                        <div style={{fontSize:'0.95rem',color:isOccupied?'#34d399':'#fbbf24',fontWeight:600,marginBottom:4}}>{isOccupied?'Occupied':'Available'}</div>
                        {isOccupied && (
                          <div style={{fontSize:'0.95rem',color:'#2563eb',marginBottom:2}}>
                            <strong>Occupant:</strong> {occupant.name || occupant.first_name + ' ' + occupant.last_name}
                          </div>
                        )}
                      </div>
                    );
                  })}
                </div>
              </div>
              <div style={{flex:1}}>
                <h3 style={{fontWeight:700,fontSize:'1rem',marginBottom:8,color:'#6366f1'}}>Second Floor (2A–2J)</h3>
                <div style={{display:'grid',gridTemplateColumns:'repeat(2, minmax(160px, 1fr))',gap:'18px'}}>
                  {rooms.filter(r => /^2[A-J]$/.test(r.number)).map(r => {
                    const occupant = residents.find(res => (res.room_number === r.number || res.room === r.number));
                    const isOccupied = r.occupied && occupant;
                    return (
                      <div key={r.id} style={{padding:'1rem',background:'#fff',borderRadius:10,boxShadow:'0 2px 8px 0 rgba(60,72,100,0.07)',display:'flex',flexDirection:'column',alignItems:'flex-start',justifyContent:'space-between',minHeight:90,border:isOccupied?'2px solid #34d399':'2px solid #e5e7eb'}}>
                        <div style={{fontWeight:600,fontSize:'1.08rem',color:'#374151',marginBottom:2}}>{r.number} <span style={{fontSize:'0.98rem',color:'#6366f1',marginLeft:8}}>{r.type}</span></div>
                        <div style={{fontSize:'0.95rem',color:'#64748b',marginBottom:4}}>Capacity: {r.capacity}</div>
                        <div style={{fontSize:'0.95rem',color:isOccupied?'#34d399':'#fbbf24',fontWeight:600,marginBottom:4}}>{isOccupied?'Occupied':'Available'}</div>
                        {isOccupied && (
                          <div style={{fontSize:'0.95rem',color:'#2563eb',marginBottom:2}}>
                            <strong>Occupant:</strong> {occupant.name || occupant.first_name + ' ' + occupant.last_name}
                          </div>
                        )}
                      </div>
                    );
                  })}
                </div>
              </div>
            </div>
          )}
        </section>
      </div>
    </div>
  );
}
