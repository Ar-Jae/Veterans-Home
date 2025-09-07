
import React from 'react';
import { Wrench } from 'lucide-react';


export default function MaintenanceAlerts() {
  const alerts = [
    {
      id: 1,
      issue: 'HVAC Not Working',
      location: 'Floor 1 - Lounge',
      date: 'Sep 7',
      priority: 'high',
      details: 'Heating system not working properly in common lounge',
    },
    {
      id: 2,
      issue: 'Light Bulb Replacement',
      location: 'Floor 2 - Hallway',
      date: 'Sep 7',
      priority: 'low',
      details: 'Several light bulbs need replacement in hallway',
    },
  ];

  return (
    <div
      style={{
        background: '#fff',
        borderRadius: '1rem',
        boxShadow: '0 8px 32px 0 rgba(60,72,100,0.10)',
        border: '1px solid #e6eef8',
        padding: '1.5rem',
        transition: 'box-shadow 0.2s',
        marginBottom: '0.5rem',
        position: 'relative',
        cursor: 'pointer',
        minWidth: 0,
      }}
      onMouseEnter={e => e.currentTarget.style.boxShadow = '0 12px 36px 0 rgba(60,72,100,0.18)'}
      onMouseLeave={e => e.currentTarget.style.boxShadow = '0 8px 32px 0 rgba(60,72,100,0.10)'}
    >
      <div style={{display:'flex',alignItems:'center',justifyContent:'space-between',marginBottom:18}}>
        <div style={{display:'flex',alignItems:'center',gap:10}}>
          <span style={{background:'linear-gradient(135deg,#f97316 0%,#fdba74 100%)',borderRadius:'9999px',width:32,height:32,display:'flex',alignItems:'center',justifyContent:'center',boxShadow:'0 2px 8px 0 rgba(60,72,100,0.10)'}}>
            <Wrench style={{color:'#fff'}} size={18} />
          </span>
          <h3 style={{fontWeight:600,fontSize:'1.1rem',color:'#374151'}}>Maintenance Alerts</h3>
        </div>
        <span style={{background:'#f3f4f6',color:'#374151',fontSize:'0.95rem',padding:'2px 10px',borderRadius:8,fontWeight:500}}>{alerts.length}</span>
      </div>

      <div style={{display:'flex',flexDirection:'column',gap:18}}>
        {alerts.map(alert => (
          <div key={alert.id} style={{background:'#f9fafb',borderRadius:12,padding:'1rem 1.2rem',boxShadow:'0 2px 8px 0 rgba(60,72,100,0.04)'}}>
            <div style={{display:'flex',alignItems:'center',justifyContent:'space-between',marginBottom:6}}>
              <h4 style={{fontWeight:600,color:'#374151',fontSize:'1rem'}}>{alert.issue}</h4>
              <span style={{
                fontSize:'0.85rem',
                padding:'2px 12px',
                borderRadius:8,
                fontWeight:600,
                background: alert.priority==='high' ? 'linear-gradient(90deg,#fee2e2 0%,#fca5a5 100%)' : '#f3f4f6',
                color: alert.priority==='high' ? '#b91c1c' : '#374151',
                boxShadow: alert.priority==='high' ? '0 2px 8px 0 rgba(220,38,38,0.08)' : 'none',
              }}>{alert.priority}</span>
            </div>
            <div style={{display:'flex',alignItems:'center',gap:10,fontSize:'0.95rem',color:'#6b7280',marginBottom:4}}>
              <span>{alert.location}</span>
              <span style={{fontWeight:700}}>&bull;</span>
              <span>{alert.date}</span>
            </div>
            <p style={{fontSize:'0.95rem',color:'#6b7280'}}>{alert.details}</p>
          </div>
        ))}
      </div>
    </div>
  );
}
