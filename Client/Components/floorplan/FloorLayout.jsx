import React from 'react';
import RoomBlock from './RoomBlock';
import { Skeleton } from "@/components/ui/skeleton";

const Wing = ({ rooms, residents, title }) => (
    <div className="flex flex-col gap-1">
        {title && <h4 className="text-sm font-semibold text-center mb-2 text-gray-600">{title}</h4>}
        <div className="flex flex-col gap-1 p-2 bg-gray-200 border-2 border-gray-300 rounded-lg">
            {rooms.map(roomConfig => {
                const resident = roomConfig.type === 'Bedroom' ? residents.find(r => r.room_number === roomConfig.room.room_number) : null;
                return <RoomBlock key={roomConfig.id} {...roomConfig} resident={resident} />;
            })}
        </div>
    </div>
);

const CommonArea = ({ room }) => (
    <div className="p-2 bg-gray-200 border-2 border-gray-300 rounded-lg">
        <RoomBlock {...room} />
    </div>
);

const getFloor1Config = (rooms) => {
    const findRoom = (num) => rooms.find(r => r.room_number === `${num}`) || { room_number: `${num}`, occupancy_status: 'vacant' };
    return {
        leftWing: {
            bedrooms: [
                { id: 'br5', type: 'Bedroom', room: findRoom(5) },
                { id: 'br4', type: 'Bedroom', room: findRoom(4) },
                { id: 'br3', type: 'Bedroom', room: findRoom(3) },
                { id: 'br2', type: 'Bedroom', room: findRoom(2) },
                { id: 'br1', type: 'Bedroom', room: findRoom(1) },
            ],
            bathrooms: [
                { id: 'bath3', type: 'Bathroom', room: { room_number: 'Bath 3' } },
                { id: 'bath1', type: 'Bathroom', room: { room_number: 'Bath 1' } },
            ]
        },
        centerTop: [
            { id: 'lounge', type: 'Common Area', room: { room_number: 'Lounge/TV' }, className: 'h-24' },
            { id: 'multi', type: 'Common Area', room: { room_number: 'Multipurpose' }, className: 'h-20' },
        ],
        centerMain: [
            { id: 'dining', type: 'Common Area', room: { room_number: 'Dining/Kitchen' }, className: 'h-48 w-64' },
            { id: 'lobby', type: 'Common Area', room: { room_number: 'Lobby/Office' }, className: 'h-32 w-40' },
        ],
        rightWing: {
            bathrooms: [
                { id: 'bath4', type: 'Bathroom', room: { room_number: 'Bath 4' } },
                { id: 'bath5', type: 'Bathroom', room: { room_number: 'Bath 5' } },
                { id: 'bath2', type: 'Bathroom', room: { room_number: 'Bath 2' } },
            ],
            bedrooms: [
                { id: 'br10', type: 'Bedroom', room: findRoom(10) },
                { id: 'br9', type: 'Bedroom', room: findRoom(9) },
                { id: 'br8', type: 'Bedroom', room: findRoom(8) },
                { id: 'br7', type: 'Bedroom', room: findRoom(7) },
                { id: 'br6', type: 'Bedroom', room: findRoom(6) },
            ],
        },
    };
};

const getFloor2Config = (rooms) => {
    const findRoom = (num) => rooms.find(r => r.room_number === `${num}`) || { room_number: `${num}`, occupancy_status: 'vacant' };
    return {
        leftWing: [
            { id: 'counseling', type: 'Office', room: { room_number: 'Counseling' }, className: 'h-40 w-48' },
            { id: 'library', type: 'Common Area', room: { room_number: 'Library' }, className: 'h-32 w-40' },
            { id: 'gym', type: 'Common Area', room: { room_number: 'Gym' }, className: 'h-40 w-48' },
        ],
        centerWing: {
            bedrooms: [
                { id: 'br15', type: 'Bedroom', room: findRoom(15) },
                { id: 'br14', type: 'Bedroom', room: findRoom(14) },
                { id: 'br13', type: 'Bedroom', room: findRoom(13) },
                { id: 'br12', type: 'Bedroom', room: findRoom(12) },
                { id: 'br11', type: 'Bedroom', room: findRoom(11) },
            ],
            bathrooms: [
                { id: 'bath8', type: 'Bathroom', room: { room_number: 'Bath 8' } },
                { id: 'bath6', type: 'Bathroom', room: { room_number: 'Bath 6' } },
            ]
        },
        rightWing: {
            main: [
                { id: 'storage', type: 'Utility', room: { room_number: 'Storage' }, className: 'h-32 w-32' },
                { id: 'lounge2', type: 'Common Area', room: { room_number: 'Lounge' }, className: 'h-40 w-40' },
            ],
            bedrooms: [
                { id: 'br20', type: 'Bedroom', room: findRoom(20) },
                { id: 'br19', type: 'Bedroom', room: findRoom(19) },
                { id: 'br18', type: 'Bedroom', room: findRoom(18) },
                { id: 'br17', type: 'Bedroom', room: findRoom(17) },
                { id: 'br16', type: 'Bedroom', room: findRoom(16) },
            ],
            bathrooms: [
                 { id: 'bath9', type: 'Bathroom', room: { room_number: 'Bath 9' } },
                 { id: 'bath7', type: 'Bathroom', room: { room_number: 'Bath 7' } },
            ]
        },
        bottomBath: [
             { id: 'bath10', type: 'Bathroom', room: { room_number: 'Bath 10' } },
        ]
    };
};

const Floor1Layout = ({ rooms, residents }) => {
    const config = getFloor1Config(rooms);
    return (
        <div className="flex flex-row justify-around items-start gap-4 p-4">
            <div className="flex flex-row items-end gap-1">
                <Wing rooms={config.leftWing.bedrooms} residents={residents} />
                <div className="flex flex-col justify-between h-full pb-1 pt-12 gap-1">
                    {config.leftWing.bathrooms.map(b => <CommonArea key={b.id} room={b} />)}
                </div>
            </div>

            <div className="flex flex-col items-center gap-4 pt-10">
                 <div className="flex flex-col items-center gap-1">
                    {config.centerTop.map(c => <CommonArea key={c.id} room={c} />)}
                </div>
                {config.centerMain.map(c => <CommonArea key={c.id} room={c} />)}
            </div>
            
            <div className="flex flex-row items-end gap-1">
                 <div className="flex flex-col justify-around h-full pb-1 pt-12 gap-1">
                    {config.rightWing.bathrooms.map(b => <CommonArea key={b.id} room={b} />)}
                </div>
                <Wing rooms={config.rightWing.bedrooms} residents={residents} />
            </div>
        </div>
    );
};

const Floor2Layout = ({ rooms, residents }) => {
    const config = getFloor2Config(rooms);
    return (
         <div className="flex flex-row justify-around items-start gap-4 p-4">
             <div className="flex flex-col items-center gap-4 pt-10">
                {config.leftWing.map(c => <CommonArea key={c.id} room={c} />)}
             </div>

            <div className="flex flex-row items-end gap-1">
                <Wing rooms={config.centerWing.bedrooms} residents={residents} />
                <div className="flex flex-col justify-between h-full pb-1 pt-12 gap-1">
                    {config.centerWing.bathrooms.map(b => <CommonArea key={b.id} room={b} />)}
                </div>
            </div>

             <div className="flex flex-col items-center gap-4 pt-10">
                <div className="flex flex-row items-end gap-1">
                    <div className="flex flex-col items-center gap-2">
                        {config.rightWing.main.map(c => <CommonArea key={c.id} room={c} />)}
                    </div>
                     <div className="flex flex-col justify-between h-full pb-1 pt-12 gap-1">
                        {config.rightWing.bathrooms.map(b => <CommonArea key={b.id} room={b} />)}
                    </div>
                    <Wing rooms={config.rightWing.bedrooms} residents={residents} />
                </div>
                <div className="flex flex-row gap-1">
                     {config.bottomBath.map(c => <CommonArea key={c.id} room={c} />)}
                </div>
             </div>
        </div>
    );
};


export default function FloorLayout({ floor, rooms, residents, isLoading }) {
  if (isLoading) {
    return (
        <div className="flex justify-center items-center h-96">
            <Skeleton className="w-3/4 h-3/4" />
        </div>
    )
  }

  if (floor === 1) {
      return <Floor1Layout rooms={rooms} residents={residents} />;
  }
  
  return <Floor2Layout rooms={rooms} residents={residents} />;
}