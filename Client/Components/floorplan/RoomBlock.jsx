import React from 'react';
import { HoverCard, HoverCardContent, HoverCardTrigger } from "@/components/ui/hover-card";
import { User, Bed, Bath, Tv, BookOpen, Dumbbell, Briefcase, Wrench, XCircle } from "lucide-react";

export default function RoomBlock({ style, room, resident, type, className }) {
  const statusClasses = {
    occupied: 'bg-pink-200 border-pink-300 hover:bg-pink-300',
    vacant: 'bg-green-300 border-green-400 hover:bg-green-400',
    maintenance: 'bg-orange-300 border-orange-400 hover:bg-orange-400',
    reserved: 'bg-purple-300 border-purple-400 hover:bg-purple-400'
  };

  const typeClasses = {
    'Bedroom': 'bg-pink-200 border-pink-300 text-pink-800',
    'Bathroom': 'bg-yellow-200 border-yellow-300 text-yellow-800',
    'Common Area': 'bg-blue-200 border-blue-300 text-blue-800',
    'Lobby/Office': 'bg-green-200 border-green-300 text-green-800',
    'Hallway': 'bg-gray-200 border-gray-300 text-gray-700',
    'Office': 'bg-orange-200 border-orange-300 text-orange-800',
    'Utility': 'bg-slate-300 border-slate-400 text-slate-800',
  };

  const isBedroom = type === 'Bedroom';
  const baseClass = isBedroom ? statusClasses[room.occupancy_status] : typeClasses[type];
  
  const roomName = isBedroom ? `Bedroom ${room.room_number}` : room.room_number;

  const content = (
    <div style={style} className={`flex flex-col justify-center items-center text-center p-2 rounded-md border text-xs font-semibold transition-all duration-200 ${baseClass} ${className}`}>
      <span className="text-[10px] sm:text-xs leading-tight">{roomName}</span>
      {isBedroom && <span className="text-[8px] sm:text-[10px] opacity-70">200 ft²</span>}
    </div>
  );

  return (
    <HoverCard openDelay={100} closeDelay={100}>
      <HoverCardTrigger asChild>
        <div>{content}</div>
      </HoverCardTrigger>
      <HoverCardContent className="w-60">
        <div className="flex justify-between space-x-4">
          <div className="space-y-1">
            <h4 className="text-sm font-semibold">{roomName}</h4>
            <p className="text-sm">
              Type: <span className="font-medium">{type}</span>
            </p>
            {isBedroom && (
              <>
                <p className="text-sm">
                  Status: <span className={`font-medium capitalize text-${room.occupancy_status === 'occupied' ? 'pink' : room.occupancy_status === 'vacant' ? 'green' : 'orange'}-600`}>{room.occupancy_status}</span>
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
        </div>
      </HoverCardContent>
    </HoverCard>
  );
}