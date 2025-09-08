import React from 'react';
import HoverCard from "@/components/ui/hover-card";
import { User, Bed, Bath, Tv, BookOpen, Dumbbell, Briefcase, Wrench, XCircle } from "lucide-react";

export default function RoomBlock({ style, room, resident, type, className }) {
  const statusClasses = {
    occupied: 'bg-pink-100/60 border-pink-300 hover:bg-pink-200/80 shadow-lg',
    vacant: 'bg-green-100/60 border-green-300 hover:bg-green-200/80 shadow-lg',
    maintenance: 'bg-orange-100/60 border-orange-300 hover:bg-orange-200/80 shadow-lg',
    reserved: 'bg-purple-100/60 border-purple-300 hover:bg-purple-200/80 shadow-lg'
  };

  const typeIcons = {
    'Bedroom': <Bed className="h-5 w-5 text-pink-400 mr-1" />,
    'Bathroom': <Bath className="h-5 w-5 text-yellow-400 mr-1" />,
    'Common Area': <Tv className="h-5 w-5 text-blue-400 mr-1" />,
    'Lobby/Office': <Briefcase className="h-5 w-5 text-green-400 mr-1" />,
    'Hallway': <BookOpen className="h-5 w-5 text-gray-400 mr-1" />,
    'Office': <Briefcase className="h-5 w-5 text-orange-400 mr-1" />,
    'Utility': <Wrench className="h-5 w-5 text-slate-400 mr-1" />,
  };
  const typeClasses = {
    'Bedroom': 'bg-pink-100/60 border-pink-300 text-pink-800',
    'Bathroom': 'bg-yellow-100/60 border-yellow-300 text-yellow-800',
    'Common Area': 'bg-blue-100/60 border-blue-300 text-blue-800',
    'Lobby/Office': 'bg-green-100/60 border-green-300 text-green-800',
    'Hallway': 'bg-gray-100/60 border-gray-300 text-gray-700',
    'Office': 'bg-orange-100/60 border-orange-300 text-orange-800',
    'Utility': 'bg-slate-100/60 border-slate-400 text-slate-800',
  };

  const isBedroom = type === 'Bedroom';
  const baseClass = isBedroom ? statusClasses[room.occupancy_status] : typeClasses[type];
  
  const roomName = isBedroom ? `Bedroom ${room.room_number}` : room.room_number;

  const content = (
    <div
      style={{
        ...style,
        boxShadow: '0 8px 32px 0 rgba(31, 38, 135, 0.15)',
        backdropFilter: 'blur(8px)',
        border: '1.5px solid rgba(255,255,255,0.18)',
        transition: 'box-shadow 0.2s',
      }}
      className={`flex flex-col justify-center items-center text-center p-3 rounded-2xl border text-xs font-semibold ${baseClass} ${className} hover:scale-105 hover:shadow-2xl duration-200`}
    >
      <div className="flex items-center justify-center mb-1">
        {typeIcons[type]}
        <span className="text-[11px] sm:text-xs leading-tight font-bold tracking-wide">{roomName}</span>
      </div>
      {isBedroom && <span className="text-[9px] sm:text-[11px] opacity-70">200 ft²</span>}
      <span className={`mt-1 px-2 py-0.5 rounded-full text-[10px] font-bold ${room.occupancy_status === 'occupied' ? 'bg-pink-200 text-pink-700' : room.occupancy_status === 'vacant' ? 'bg-green-200 text-green-700' : room.occupancy_status === 'maintenance' ? 'bg-orange-200 text-orange-700' : 'bg-purple-200 text-purple-700'}`}>{room.occupancy_status}</span>
    </div>
  );

  return (
    <HoverCard trigger={<div>{content}</div>}>
      <div className="w-64 p-4 rounded-2xl bg-white/90 shadow-xl border border-blue-100">
        <div className="flex items-center mb-2">
          {typeIcons[type]}
          <h4 className="text-base font-bold ml-2 text-blue-700">{roomName}</h4>
        </div>
        <p className="text-sm mb-1">
          <span className="font-semibold">Type:</span> {type}
        </p>
        {isBedroom && (
          <>
            <p className="text-sm mb-1">
              <span className="font-semibold">Status:</span> <span className={`font-bold capitalize px-2 py-0.5 rounded-full ${room.occupancy_status === 'occupied' ? 'bg-pink-200 text-pink-700' : room.occupancy_status === 'vacant' ? 'bg-green-200 text-green-700' : room.occupancy_status === 'maintenance' ? 'bg-orange-200 text-orange-700' : 'bg-purple-200 text-purple-700'}`}>{room.occupancy_status}</span>
            </p>
            {room.occupancy_status === 'occupied' && resident && (
              <div className="flex items-center pt-2">
                <User className="mr-2 h-4 w-4 opacity-70" />
                <span className="text-xs text-muted-foreground">
                  Occupant: {resident.first_name} {resident.last_name}
                </span>
              </div>
            )}
            {room.occupancy_status === 'maintenance' && room.maintenance_notes && (
              <div className="flex items-center pt-2">
                <Wrench className="mr-2 h-4 w-4 opacity-70" />
                <span className="text-xs text-muted-foreground">
                  {room.maintenance_notes}
                </span>
              </div>
            )}
          </>
        )}
      </div>
    </HoverCard>
  );
}