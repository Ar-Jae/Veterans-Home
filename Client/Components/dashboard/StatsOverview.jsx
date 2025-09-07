import React from 'react';
import { Users, Bed, Calendar, Wrench } from 'lucide-react';

const StatCard = ({ title, value, total, subtext, icon, bgColor, gradient }) => (
  <div
    style={{
      background: '#fff',
      borderRadius: '1rem',
      boxShadow: '0 8px 32px 0 rgba(60,72,100,0.10)',
      border: '1px solid #e6eef8',
      padding: '1.5rem',
      display: 'flex',
      alignItems: 'center',
      flex: 1,
      minWidth: 0,
      transition: 'box-shadow 0.2s',
      cursor: 'pointer',
    }}
    role="region"
    aria-label={title}
    onMouseEnter={e => e.currentTarget.style.boxShadow = '0 12px 36px 0 rgba(60,72,100,0.18)'}
    onMouseLeave={e => e.currentTarget.style.boxShadow = '0 8px 32px 0 rgba(60,72,100,0.10)'}
  >
    <span style={{
      fontSize: 28,
      marginRight: 18,
      background: gradient || bgColor,
      borderRadius: '9999px',
      width: 48,
      height: 48,
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      boxShadow: '0 2px 8px 0 rgba(60,72,100,0.10)',
    }}>{React.cloneElement(icon, { size: 28, 'aria-hidden': true })}</span>
    <div style={{flex:1}}>
      <div style={{fontSize:'1rem',fontWeight:600,color:'#374151',marginBottom:8}}>{title}</div>
      <div style={{fontSize:'2rem',fontWeight:700,color:'#0f172a',marginTop:2}}>
        {value}
        {total && <span style={{color:'#9ca3af',fontSize:'1.125rem',fontWeight:500}}>/ {total}</span>}
      </div>
      {subtext && <div style={{fontSize:'0.85rem',color:'#6b7280',marginTop:4}}>{subtext}</div>}
    </div>
  </div>
);

export default function StatsOverview() {
  const stats = [
    {
      title: 'Total Residents',
      value: '5',
      total: '20',
      subtext: 'Currently housed',
      icon: <Users className="text-blue-500" />,
      bgColor: '#eff6ff',
      gradient: 'linear-gradient(135deg,#6366f1 0%,#60a5fa 100%)',
    },
    {
      title: 'Room Occupancy',
      value: '4',
      total: '6',
      subtext: 'Rooms occupied',
      icon: <Bed className="text-emerald-500" />,
      bgColor: '#f0fdf4',
      gradient: 'linear-gradient(135deg,#34d399 0%,#6ee7b7 100%)',
    },
    {
      title: 'Upcoming Activities',
      value: '0',
      subtext: 'This week',
      icon: <Calendar className="text-purple-500" />,
      bgColor: '#faf5ff',
      gradient: 'linear-gradient(135deg,#a855f7 0%,#c4b5fd 100%)',
    },
    {
      title: 'Open Maintenance',
      value: '2',
      subtext: 'Requests pending',
      icon: <Wrench className="text-orange-500" />,
      bgColor: '#fff7ed',
      gradient: 'linear-gradient(135deg,#f97316 0%,#fdba74 100%)',
    },
  ];

  return (
    <div
      style={{
        display: 'flex',
        flexDirection: 'row',
        gap: '24px',
        width: '100%',
        marginTop: '0',
        marginBottom: '0',
      }}
      role="grid"
      aria-label="Statistics Overview"
    >
      {stats.map((stat) => (
        <div role="gridcell" key={stat.title} style={{flex: 1, minWidth: 0}}>
          <StatCard {...stat} />
        </div>
      ))}
    </div>
  );
}
