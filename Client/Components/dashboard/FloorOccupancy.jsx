import React from "react";
import { Card, CardHeader, CardBody, CardFooter, Avatar, Button } from "@chakra-ui/react";
import { Badge, Stack } from "@chakra-ui/react";
import { HiAtSymbol, HiStar } from "react-icons/hi";
import { useState, useEffect } from "react";
// Demo badges for UI reference
export function BadgeDemo() {
  return (
    <Stack align="flex-start" mb={6}>
      <Badge variant="solid" colorScheme="blue" px={2} py={1} fontSize="md">
        <HiStar style={{ marginRight: 4 }} />
        New
      </Badge>
      <Badge variant="solid" colorScheme="green" px={2} py={1} fontSize="md">
        New
        <HiAtSymbol style={{ marginLeft: 4 }} />
      </Badge>
    </Stack>
  )
}
import { Building, User } from "lucide-react";
import { Skeleton } from "@chakra-ui/react";



export default function FloorOccupancy() {
  const [residents, setResidents] = useState([]);
  const [rooms, setRooms] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    Promise.all([
      fetch('http://localhost:4000/api/residents').then(res => res.json()),
      fetch('http://localhost:4000/api/rooms').then(res => res.json())
    ]).then(([residentsData, roomsData]) => {
      setResidents(residentsData);
      setRooms(roomsData);
      setIsLoading(false);
    });
  }, []);

  const getFloorData = (floorNumber) => {
    const floorRooms = Array.isArray(rooms) ? rooms.filter(room => room.floor === floorNumber) : [];
    const floorResidents = Array.isArray(residents) ? residents.filter(resident => resident.floor === floorNumber) : [];
    return {
      totalRooms: floorRooms.length,
      occupiedRooms: floorRooms.filter(room => room.occupied > 0).length,
      residents: floorResidents,
      maintenanceRooms: floorRooms.filter(room => room.maintenance === true).length
    };
  };

  const floor1 = getFloorData(1);
  const floor2 = getFloorData(2);

  const FloorCard = ({ floorNumber, data, description }) => {
    const accentGradients = [
      'linear-gradient(135deg,#6366f1 0%,#60a5fa 100%)',
      'linear-gradient(135deg,#34d399 0%,#6ee7b7 100%)'
    ];
    const accent = accentGradients[floorNumber-1] || accentGradients[0];
    const occupancyPercent = data.totalRooms ? Math.round((data.occupiedRooms / data.totalRooms) * 100) : 0;
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
        }}
        onMouseEnter={e => e.currentTarget.style.boxShadow = '0 12px 36px 0 rgba(60,72,100,0.18)'}
        onMouseLeave={e => e.currentTarget.style.boxShadow = '0 8px 32px 0 rgba(60,72,100,0.10)'}
      >
        <div style={{display:'flex',alignItems:'center',gap:10,marginBottom:6}}>
          <span style={{background: accent, borderRadius: '9999px', width: 32, height: 32, display: 'flex', alignItems: 'center', justifyContent: 'center', boxShadow: '0 2px 8px 0 rgba(60,72,100,0.10)'}}>
            <Building style={{color:'#fff'}} size={18} />
          </span>
          <h3 style={{fontWeight:600,fontSize:'1.1rem',color:'#374151'}}>Floor {floorNumber}</h3>
        </div>
        <p style={{fontSize:'0.95rem',color:'#6b7280',marginBottom:10}}>{description}</p>

        <div style={{marginBottom:18}}>
          <div style={{display:'flex',alignItems:'center',justifyContent:'space-between',marginBottom:6}}>
            <span style={{fontSize:'0.95rem',color:'#6b7280'}}>Occupancy Rate</span>
            <span style={{fontSize:'0.95rem',fontWeight:600,color:'#374151'}}>{data.occupiedRooms}/{data.totalRooms} rooms</span>
          </div>
          <div style={{width:'100%',background:'#f3f4f6',borderRadius:8,height:8,overflow:'hidden'}}>
            <div style={{background: accent, height:8, borderRadius:8, width:`${occupancyPercent}%`, transition:'width 0.4s'}} />
          </div>
          {data.maintenanceRooms > 0 && (
            <span style={{display:'inline-block',marginTop:8,padding:'2px 10px',borderRadius:8,background:'#fee2e2',color:'#b91c1c',fontWeight:500,fontSize:'0.85rem'}}>
              {data.maintenanceRooms} room{data.maintenanceRooms>1?'s':''} in maintenance
            </span>
          )}
        </div>

        <div>
          <h4 style={{fontSize:'0.95rem',color:'#374151',marginBottom:8,fontWeight:600}}>Recent Residents:</h4>
          <div style={{display:'flex',flexDirection:'column',gap:8}}>
            {data.residents.length === 0 ? (
              <span style={{color:'#9ca3af',fontSize:'0.95rem'}}>No residents</span>
            ) : (
              data.residents.slice(0,3).map((resident, idx) => (
                <div key={resident._id || idx} style={{display:'flex',alignItems:'center',gap:8}}>
                  <User style={{color:'#6366f1'}} size={16} />
                  <span style={{fontWeight:500,color:'#374151',fontSize:'0.95rem'}}>{resident.name}</span>
                  <span style={{color:'#6b7280',fontSize:'0.95rem'}}>— Room {resident.room_number}</span>
                </div>
              ))
            )}
          </div>
        </div>
      </div>
    );
  };

  if (isLoading) {
    return <Skeleton height="200px" />;
  }

  return (
    <div className="space-y-6">
      <FloorCard 
        floorNumber={1} 
        data={floor1}
        description="Main hub: meals, gatherings, and staff spaces"
      />
      <FloorCard 
        floorNumber={2} 
        data={floor2}
        description="Quiet spaces: rest, therapy, and personal growth"
      />
    </div>
  );
}