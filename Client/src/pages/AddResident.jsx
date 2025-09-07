import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const ROOM_STORAGE_KEY = 'vh_rooms_v1';
const RESIDENT_STORAGE_KEY = 'vh_residents_v1';

function getStoredRooms() {
  try {
    const raw = localStorage.getItem(ROOM_STORAGE_KEY);
    if (raw) return JSON.parse(raw);
  } catch {}
  return [];
}

function getStoredResidents() {
  try {
    const raw = localStorage.getItem(RESIDENT_STORAGE_KEY);
    if (raw) return JSON.parse(raw);
  } catch {}
  return [];
}

export default function AddResident() {
  const navigate = useNavigate();
  const [form, setForm] = useState({
    first_name: '',
    last_name: '',
    date_of_birth: '',
    service_branch: '',
    emergency_contact_name: '',
    emergency_contact_phone: '',
    medical_notes: '',
    move_in_date: '',
    move_out_date: '',
    status: 'active',
  });
  const [error, setError] = useState('');

  function handleFormChange(e){
    const { name, value } = e.target;
    setForm(prev => ({ ...prev, [name]: value }));
  }

  function handleAddResident(e){
    e.preventDefault();
    const rooms = getStoredRooms();
    const availableRoom = rooms.find(r => !r.occupied);
    if (!availableRoom) {
      setError('No available rooms!');
      return;
    }
    const floor = Number(availableRoom.number[0]);
    const newResident = {
      id: Date.now(),
      first_name: form.first_name,
      last_name: form.last_name,
      room_number: availableRoom.number,
      floor,
      date_of_birth: form.date_of_birth,
      service_branch: form.service_branch,
      emergency_contact_name: form.emergency_contact_name,
      emergency_contact_phone: form.emergency_contact_phone,
      medical_notes: form.medical_notes,
      move_in_date: form.move_in_date || new Date().toISOString().slice(0,10),
      move_out_date: form.move_out_date,
      status: form.status,
    };
    // Save resident
    const residents = getStoredResidents();
    localStorage.setItem(RESIDENT_STORAGE_KEY, JSON.stringify([newResident, ...residents]));
    // Mark room as occupied
    const updatedRooms = rooms.map(r => r.id === availableRoom.id ? { ...r, occupied: true } : r);
    localStorage.setItem(ROOM_STORAGE_KEY, JSON.stringify(updatedRooms));
    navigate('/residents');
  }

  return (
  <div style={{minHeight:'100vh',background:'#f8fafc',padding:'0',position:'relative'}}>
    <div style={{maxWidth:900,margin:'0 auto',paddingTop:'2.5rem'}}>
      <h1 style={{fontSize:'2rem',fontWeight:700,color:'#222',marginBottom:32,letterSpacing:'-1px'}}>Add New Resident</h1>
  <form onSubmit={handleAddResident} style={{background:'#fff',borderRadius:12,padding:'2.5rem',display:'grid',gridTemplateColumns:'1fr 1fr',gap:'32px 24px',border:'1px solid #e0e7ff'}}>
          <div style={{display:'flex',flexDirection:'column',gap:6}}>
            <label style={{fontWeight:600,color:'#222',marginBottom:4}}>First Name *</label>
            <input name="first_name" value={form.first_name} onChange={handleFormChange} required style={{padding:'0.85rem 1rem',borderRadius:8,border:'1px solid #e0e7ff',fontSize:'1rem',background:'#fff',outline:'none',width:'100%'}} placeholder="First name" />
          </div>
          <div style={{display:'flex',flexDirection:'column',gap:6}}>
            <label style={{fontWeight:600,color:'#222',marginBottom:4}}>Last Name *</label>
            <input name="last_name" value={form.last_name} onChange={handleFormChange} required style={{padding:'0.85rem 1rem',borderRadius:8,border:'1px solid #e0e7ff',fontSize:'1rem',background:'#fff',outline:'none',width:'100%'}} placeholder="Last name" />
          </div>
          <div style={{display:'flex',flexDirection:'column',gap:6}}>
            <label style={{fontWeight:600,color:'#222',marginBottom:4}}>Date of Birth</label>
            <input name="date_of_birth" value={form.date_of_birth} onChange={handleFormChange} type="date" style={{padding:'0.85rem 1rem',borderRadius:8,border:'1px solid #e0e7ff',fontSize:'1rem',background:'#fff',outline:'none',width:'100%'}} />
          </div>
          <div style={{display:'flex',flexDirection:'column',gap:6}}>
            <label style={{fontWeight:600,color:'#222',marginBottom:4}}>Service Branch</label>
            <select name="service_branch" value={form.service_branch} onChange={handleFormChange} style={{padding:'0.85rem 1rem',borderRadius:8,border:'1px solid #e0e7ff',fontSize:'1rem',background:'#fff',outline:'none',width:'100%'}}>
              <option value="">Select branch</option>
              <option value="Air Force">Air Force</option>
              <option value="Army">Army</option>
              <option value="Coast Guard">Coast Guard</option>
              <option value="Marines">Marines</option>
              <option value="Navy">Navy</option>
              <option value="Space Force">Space Force</option>
            </select>
          </div>
          <div style={{display:'flex',flexDirection:'column',gap:6}}>
            <label style={{fontWeight:600,color:'#222',marginBottom:4}}>Emergency Contact Name</label>
            <input name="emergency_contact_name" value={form.emergency_contact_name} onChange={handleFormChange} style={{padding:'0.85rem 1rem',borderRadius:8,border:'1px solid #e0e7ff',fontSize:'1rem',background:'#fff',outline:'none',width:'100%'}} placeholder="Contact name" />
          </div>
          <div style={{display:'flex',flexDirection:'column',gap:6}}>
            <label style={{fontWeight:600,color:'#222',marginBottom:4}}>Emergency Contact Phone</label>
            <input name="emergency_contact_phone" value={form.emergency_contact_phone} onChange={handleFormChange} type="tel" style={{padding:'0.85rem 1rem',borderRadius:8,border:'1px solid #e0e7ff',fontSize:'1rem',background:'#fff',outline:'none',width:'100%'}} placeholder="Phone number" />
          </div>
          <div style={{gridColumn:'1/3',display:'flex',flexDirection:'column',gap:6}}>
            <label style={{fontWeight:600,color:'#222',marginBottom:4}}>Medical Notes</label>
            <textarea name="medical_notes" value={form.medical_notes} onChange={handleFormChange} style={{padding:'0.85rem 1rem',borderRadius:8,border:'1px solid #e0e7ff',fontSize:'1rem',background:'#fff',outline:'none',width:'100%',minHeight:60}} placeholder="Any important medical information, allergies, or care instructions..." />
          </div>
          <div style={{display:'flex',flexDirection:'column',gap:6}}>
            <label style={{fontWeight:600,color:'#222',marginBottom:4}}>Move-in Date</label>
            <input name="move_in_date" value={form.move_in_date} onChange={handleFormChange} type="date" style={{padding:'0.85rem 1rem',borderRadius:8,border:'1px solid #e0e7ff',fontSize:'1rem',background:'#fff',outline:'none',width:'100%'}} />
          </div>
          <div style={{display:'flex',flexDirection:'column',gap:6}}>
            <label style={{fontWeight:600,color:'#222',marginBottom:4}}>Move-out Date</label>
            <input name="move_out_date" value={form.move_out_date} onChange={handleFormChange} type="date" style={{padding:'0.85rem 1rem',borderRadius:8,border:'1px solid #e0e7ff',fontSize:'1rem',background:'#fff',outline:'none',width:'100%'}} />
          </div>
          <div style={{display:'flex',flexDirection:'column',gap:6}}>
            <label style={{fontWeight:600,color:'#222',marginBottom:4}}>Status</label>
            <select name="status" value={form.status} onChange={handleFormChange} style={{padding:'0.85rem 1rem',borderRadius:8,border:'1px solid #e0e7ff',fontSize:'1rem',background:'#fff',outline:'none',width:'100%'}}>
              <option value="checked_in">Checked In</option>
              <option value="checked_out">Checked Out</option>
            </select>
          </div>
          {error && <div style={{gridColumn:'1/3',color:'#ef4444',fontWeight:600,background:'#fff',borderRadius:6,padding:'0.75rem 1.2rem',marginBottom:8}}>{error}</div>}
          <div style={{gridColumn:'1/3',display:'flex',justifyContent:'flex-end',gap:12,marginTop:32}}>
            <button type="button" onClick={()=>navigate('/residents')} style={{background:'#fff',color:'#374151',fontWeight:600,fontSize:'1rem',border:'1px solid #e0e7ff',borderRadius:8,padding:'0.75rem 1.5rem',cursor:'pointer'}}>Cancel</button>
            <button type="submit" style={{background:'#2563eb',color:'#fff',fontWeight:700,fontSize:'1rem',border:'none',borderRadius:8,padding:'0.75rem 1.5rem',cursor:'pointer',display:'flex',alignItems:'center',gap:8}}>
              <span style={{display:'inline-block',fontSize:'1.2em'}}>👤</span> Add Resident
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
