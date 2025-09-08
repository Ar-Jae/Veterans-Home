import React from 'react';
import { Skeleton, Avatar, Button, Box, Stack } from "@chakra-ui/react";

const Wing = ({ rooms, residents, title }) => (
    <div className="flex flex-col gap-2">
        {title && <h4 className="text-lg font-bold text-center mb-3 text-blue-600 drop-shadow">{title}</h4>}
        <div className="flex flex-col gap-2 p-4 rounded-2xl border-0 bg-gradient-to-br from-blue-100/60 to-indigo-100/40 backdrop-blur-md shadow-lg">
            {rooms.map(roomConfig => {
                const resident = roomConfig.type === 'Bedroom'
                    ? residents.find(r => (r.room_number || r.room) === roomConfig.room.room_number)
                    : null;
                return <RoomBlock key={roomConfig.id} {...roomConfig} resident={resident} />;
            })}
        </div>
    </div>
);

const CommonArea = ({ room }) => (
    <div className="p-3 rounded-2xl border-0 bg-gradient-to-br from-indigo-100/60 to-blue-100/40 backdrop-blur-md shadow-md">
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
    // Find maintenance rooms on this floor
    const maintenanceRooms = rooms.filter(r => r.maintenance || r.status === 'maintenance');
    return (
    <div className="flex flex-col gap-8">
            <div className="bg-white/80 rounded-3xl shadow-xl p-8 mb-4 backdrop-blur-lg border border-blue-100">
                <div className="flex items-center gap-3 mb-2">
                    <span className="text-blue-600"><svg width="28" height="28" fill="none"><rect width="28" height="28" rx="6" fill="#EFF6FF"/><path d="M10 11V8a4 4 0 1 1 8 0v3" stroke="#2563EB" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/><rect x="7" y="13" width="14" height="11" rx="3" stroke="#2563EB" strokeWidth="2"/></svg></span>
                    <span className="font-bold text-lg text-gray-900">Floor 1</span>
                </div>
                <div className="text-gray-500 mb-2">Main hub: meals, gatherings, and staff spaces</div>
                <div className="flex items-center gap-2 mb-2">
                    <span className="text-gray-600 text-sm">Occupancy Rate</span>
                    {maintenanceRooms.length > 0 && (
                        <span className="bg-red-500 text-white text-xs font-semibold px-3 py-1 rounded-full ml-2">{maintenanceRooms.length} room{maintenanceRooms.length > 1 ? 's' : ''} in maintenance</span>
                    )}
                    <span className="ml-auto bg-gray-100 text-gray-700 text-xs font-semibold px-2 py-1 rounded">{rooms.filter(r => r.occupied).length}/10 rooms</span>
                </div>
                <div className="w-full h-2 bg-gray-200 rounded mb-4">
                    <div className="h-2 bg-blue-500 rounded" style={{ width: `${(rooms.filter(r => r.occupied).length / 10) * 100}%` }}></div>
                </div>
                <div className="text-gray-700 font-semibold mb-1">Recent Residents:</div>
                <div className="flex flex-col gap-1">
                    {residents.slice(0, 3).map((r, idx) => (
                        <div key={r.id || `${r.room || r.room_number}-${idx}`} className="flex items-center gap-2 text-gray-800">
                            <span className="text-gray-400"><svg width="18" height="18" fill="none"><circle cx="9" cy="6" r="3" fill="#CBD5E1"/><rect x="4" y="11" width="10" height="5" rx="2.5" fill="#CBD5E1"/></svg></span>
                            <span className="font-semibold">{r.name || `${r.first_name} ${r.last_name}`}</span>
                            <span className="text-gray-500">- Room {r.room || r.room_number}</span>
                        </div>
                    ))}
                </div>
            </div>
            <div className="flex flex-row justify-around items-start gap-4 p-4">
                <div className="flex flex-row items-end gap-1">
                    <Wing rooms={config.leftWing.bedrooms} residents={residents} />
                    <div className="flex flex-col justify-between h-full pb-1 pt-12 gap-1">
                        {config.leftWing.bathrooms.map((b, idx) => <CommonArea key={b.id || `bathroom-left-${idx}`} room={b} />)}
                    </div>
                </div>
                <div className="flex flex-col items-center gap-4 pt-10">
                    <div className="flex flex-col items-center gap-1">
                        {config.centerTop.map((c, idx) => <CommonArea key={c.id || `center-top-${idx}`} room={c} />)}
                    </div>
                    {config.centerMain.map((c, idx) => <CommonArea key={c.id || `center-main-${idx}`} room={c} />)}
                </div>
                <div className="flex flex-row items-end gap-1">
                    <div className="flex flex-col justify-around h-full pb-1 pt-12 gap-1">
                        {config.rightWing.bathrooms.map((b, idx) => <CommonArea key={b.id || `bathroom-right-${idx}`} room={b} />)}
                    </div>
                    <Wing rooms={config.rightWing.bedrooms} residents={residents} />
                </div>
            </div>
        </div>
    );
};

const Floor2Layout = ({ rooms, residents }) => {
    const config = getFloor2Config(rooms);
    const maintenanceRooms = rooms.filter(r => r.maintenance || r.status === 'maintenance');
    return (
    <div className="flex flex-col gap-8">
            <div className="bg-white/80 rounded-3xl shadow-xl p-8 mb-4 backdrop-blur-lg border border-indigo-100">
                <div className="flex items-center gap-3 mb-2">
                    <span className="text-indigo-600"><svg width="28" height="28" fill="none"><rect width="28" height="28" rx="6" fill="#EFF6FF"/><path d="M10 11V8a4 4 0 1 1 8 0v3" stroke="#6366f1" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/><rect x="7" y="13" width="14" height="11" rx="3" stroke="#6366f1" strokeWidth="2"/></svg></span>
                    <span className="font-bold text-lg text-gray-900">Floor 2</span>
                </div>
                <div className="text-gray-500 mb-2">Quiet spaces: rest, therapy, and personal growth</div>
                <div className="flex items-center gap-2 mb-2">
                    <span className="text-gray-600 text-sm">Occupancy Rate</span>
                    {maintenanceRooms.length > 0 && (
                        <span className="bg-red-500 text-white text-xs font-semibold px-3 py-1 rounded-full ml-2">{maintenanceRooms.length} room{maintenanceRooms.length > 1 ? 's' : ''} in maintenance</span>
                    )}
                    <span className="ml-auto bg-gray-100 text-gray-700 text-xs font-semibold px-2 py-1 rounded">{rooms.filter(r => r.occupied).length}/10 rooms</span>
                </div>
                <div className="w-full h-2 bg-gray-200 rounded mb-4">
                    <div className="h-2 bg-blue-500 rounded" style={{ width: `${(rooms.filter(r => r.occupied).length / 10) * 100}%` }}></div>
                </div>
                <div className="text-gray-700 font-semibold mb-1">Recent Residents:</div>
                <div className="flex flex-col gap-1">
                    {residents.slice(0, 3).map((r, idx) => (
                        <div key={r.id || `${r.room || r.room_number}-${idx}`} className="flex items-center gap-2 text-gray-800">
                            <span className="text-gray-400"><svg width="18" height="18" fill="none"><circle cx="9" cy="6" r="3" fill="#CBD5E1"/><rect x="4" y="11" width="10" height="5" rx="2.5" fill="#CBD5E1"/></svg></span>
                            <span className="font-semibold">{r.name || `${r.first_name} ${r.last_name}`}</span>
                            <span className="text-gray-500">- Room {r.room || r.room_number}</span>
                        </div>
                    ))}
                </div>
            </div>
            <div className="flex flex-row justify-around items-start gap-4 p-4">
                <div className="flex flex-col items-center gap-4 pt-10">
                    {config.leftWing.map((c, idx) => <CommonArea key={c.id || `leftWing-${idx}`} room={c} />)}
                </div>
                <div className="flex flex-row items-end gap-1">
                    <Wing rooms={config.centerWing.bedrooms} residents={residents} />
                    <div className="flex flex-col justify-between h-full pb-1 pt-12 gap-1">
                        {config.centerWing.bathrooms.map((b, idx) => <CommonArea key={b.id || `centerWing-bathroom-${idx}`} room={b} />)}
                    </div>
                </div>
                <div className="flex flex-col items-center gap-4 pt-10">
                    <div className="flex flex-row items-end gap-1">
                        <div className="flex flex-col items-center gap-2">
                            {config.rightWing.main.map((c, idx) => <CommonArea key={c.id || `rightWing-main-${idx}`} room={c} />)}
                        </div>
                        <div className="flex flex-col justify-between h-full pb-1 pt-12 gap-1">
                            {config.rightWing.bathrooms.map((b, idx) => <CommonArea key={b.id || `rightWing-bathroom-${idx}`} room={b} />)}
                        </div>
                        <Wing rooms={config.rightWing.bedrooms} residents={residents} />
                    </div>
                    <div className="flex flex-row gap-1">
                        {config.bottomBath.map((c, idx) => <CommonArea key={c.id || `bottomBath-${idx}`} room={c} />)}
                    </div>
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
        );
    }
    // Chakra UI interactive floor plan demo
    return (
        <Stack gap={4} direction="row" wrap="wrap">
            {["Ballroom", "Lounge", "Hall 3", "Terrace"].map((area, idx) => (
                <Box
                    key={area}
                    width="320px"
                    borderRadius="lg"
                    boxShadow="md"
                    bg="white"
                    p={4}
                    display="flex"
                    flexDirection="column"
                    alignItems="center"
                >
                    <Avatar size="lg" name={area} mb={2} src={
                        area === "Ballroom" ? "https://images.unsplash.com/photo-1506744038136-46273834b3fb?auto=format&fit=crop&w=400&q=80"
                        : area === "Lounge" ? "https://images.unsplash.com/photo-1465101046530-73398c7f28ca?auto=format&fit=crop&w=400&q=80"
                        : area === "Hall 3" ? "https://images.unsplash.com/photo-1519125323398-675f0ddb6308?auto=format&fit=crop&w=400&q=80"
                        : "https://images.unsplash.com/photo-1465101178521-c1a9136a3c8b?auto=format&fit=crop&w=400&q=80"
                    } />
                    <Box fontWeight="bold" fontSize="lg" mb={2}>{area}</Box>
                    <Box color="gray.600" mb={4}>
                        {area === "Ballroom" && "64.7 ft x 73.5 ft · Capacity 315"}
                        {area === "Lounge" && "30 ft x 62 ft · Capacity 120"}
                        {area === "Hall 3" && "25.7 ft x 30 ft · Capacity 53"}
                        {area === "Terrace" && "Outdoor seating and garden"}
                    </Box>
                    <Stack direction="row" spacing={2} mt="auto">
                        <Button variant="outline">View</Button>
                        <Button colorScheme="blue">Book</Button>
                    </Stack>
                </Box>
            ))}
        </Stack>
    );
}