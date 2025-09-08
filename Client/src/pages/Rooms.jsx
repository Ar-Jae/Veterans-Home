
import React, { useEffect, useState } from 'react';
import { Stack, Avatar, Button, Box } from "@chakra-ui/react";
import { Select } from "@chakra-ui/react";
import { SimpleGrid } from "@chakra-ui/react";
import logo from "@/assets/Honor Haven Veterans Home Logo2.jpg";

export default function Rooms() {
  const [assigning, setAssigning] = useState({});
  const [selectedResident, setSelectedResident] = useState({});

  const handleAssign = async (roomId, roomNumber) => {
    const residentId = selectedResident[roomId];
    if (!residentId) return;
    setAssigning(prev => ({ ...prev, [roomId]: true }));
    try {
      // Assign resident to room
      await fetch(`http://localhost:4000/api/residents/${residentId}/assign-room`, {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ roomId: roomId })
      });
      // Mark room as occupied in the database
      await fetch(`http://localhost:4000/api/rooms/${roomId}`, {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ occupied: true })
      });
      // Refresh rooms and residents
      const roomsRes = await fetch('http://localhost:4000/api/rooms');
      const roomsData = await roomsRes.json();
      setRooms(roomsData.map(room => ({
        id: room._id,
        number: room.room_number || room.number,
        type: room.type || (room.capacity === 2 ? 'Double' : 'Single'),
        capacity: room.capacity,
        occupied: room.occupied,
        occupant: '',
      })));
      const resRes = await fetch('http://localhost:4000/api/residents');
      const resData = await resRes.json();
      setResidents(resData);
    } catch (e) {
      alert('Failed to assign resident.');
    }
    setAssigning(prev => ({ ...prev, [roomId]: false }));
  };
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
  <Box minHeight="100vh" width="auto" bgGradient="linear(to-br, #f3f4f6, #e0e7ff, #c7d2fe)" fontFamily="inherit">
      <Box maxWidth="1200px" mx="auto" py="10">
        <Box display="flex" justifyContent="center" mb="6">
          <img src={logo} alt="Honor Haven Veterans Home Logo" style={{ height: 80 }} />
        </Box>
        <Box as="h1" fontSize="2xl" fontWeight="bold" color="#222" mb="8" letterSpacing="-1px">Rooms</Box>
        <Box as="section">
          {rooms.length === 0 ? (
            <Box fontSize="md" color="gray.500">No rooms configured.</Box>
          ) : (
            <Stack direction="row" gap="8" alignItems="flex-start" mt="2">
              {["1", "2"].map(floor => (
                <Box key={floor} flex="1">
                  <Box as="h3" fontWeight="bold" fontSize="md" mb="2" color="purple.500">
                    {floor === "1" ? "First Floor (1A–1J)" : "Second Floor (2A–2J)"}
                  </Box>
                  <SimpleGrid columns={3} spacing={4}>
                    {rooms.filter(r => new RegExp(`^${floor}[A-J]$`).test(r.number)).map(r => {
                      const occupant = residents.find(res => (res.room_number === r.number || res.room === r.number));
                      const isOccupied = r.occupied && occupant;
                      return (
                        <Box
                          key={r.id}
                          width="180px"
                          p="2"
                          bg="#fff"
                          borderRadius="md"
                          boxShadow="sm"
                          border={isOccupied ? "2px solid #34d399" : "2px solid #e5e7eb"}
                          display="flex"
                          flexDirection="column"
                          alignItems="flex-start"
                          minHeight="60px"
                        >
                          <Stack direction="row" alignItems="center" mb="1">
                            <Avatar name={isOccupied && occupant ? (occupant.name || (occupant.first_name + ' ' + occupant.last_name)) : r.number} size="sm" />
                            <Box fontWeight="semibold" fontSize="md" color="gray.700" ml="1">{r.number}</Box>
                            <Box fontSize="sm" color="purple.500" ml="1">{r.type}</Box>
                          </Stack>
                          <Box fontSize="xs" color="gray.500" mb="0.5">Capacity: {r.capacity}</Box>
                          <Box fontSize="xs" color={isOccupied ? "#34d399" : "#fbbf24"} fontWeight="bold" mb="0.5">{isOccupied ? "Occupied" : "Available"}</Box>
                          {isOccupied && (
                            <Box fontSize="xs" color="blue.600" mb="1">
                              <strong>Occupant:</strong> {occupant.name || (occupant.first_name + ' ' + occupant.last_name)}
                            </Box>
                          )}
                          {!isOccupied && (
                            <>
                              <Select
                                placeholder="Select resident"
                                size="sm"
                                mb="1"
                                value={selectedResident[r.id] || ""}
                                onChange={e => setSelectedResident(prev => ({ ...prev, [r.id]: e.target.value }))}
                              >
                                {residents.map(res => (
                                  <option value={res._id} key={res._id}>
                                    {res.name || (res.first_name + ' ' + res.last_name)}
                                  </option>
                                ))}
                              </Select>
                              <Box width="100%" display="flex" justifyContent="center" mt="auto">
                                <Button
                                  colorScheme="blue"
                                  size="sm"
                                  isLoading={assigning[r.id]}
                                  onClick={() => handleAssign(r.id, r.number)}
                                  isDisabled={!selectedResident[r.id]}
                                >
                                  Assign Room
                                </Button>
                              </Box>
                            </>
                          )}
                        </Box>
                      );
                    })}
                  </SimpleGrid>
                </Box>
              ))}
            </Stack>
          )}
        </Box>
      </Box>
    </Box>
  );
}
