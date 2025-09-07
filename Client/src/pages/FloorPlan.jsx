
import React, { useState, useEffect } from "react";
import { Tabs, TabList, TabPanels, Tab, TabPanel } from "@chakra-ui/react";
import { Card, CardHeader, CardBody, CardFooter } from "@chakra-ui/react";
import { Skeleton } from "@chakra-ui/react";
import { Building, Users, Wrench, CheckCircle } from "lucide-react";

import FloorLayout from "@/Components/floorplan/FloorLayout";
import Legend from "@/Components/floorplan/Legend";

export default function FloorPlanPage() {
  const [rooms, setRooms] = useState([]);
  const [residents, setResidents] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    loadData();
  }, []);

  const loadData = async () => {
    setIsLoading(true);
    try {
      const [roomsData, residentsData] = await Promise.all([
        Room.list(),
        Resident.list(),
      ]);
      setRooms(roomsData);
      setResidents(residentsData);
    } catch (error) {
      console.error("Error loading floor plan data:", error);
    }
    setIsLoading(false);
  };

  const floor1Rooms = rooms.filter(r => r.floor === 1);
  const floor2Rooms = rooms.filter(r => r.floor === 2);
  const occupiedCount = rooms.filter(r => r.occupancy_status === 'occupied').length;
  const vacantCount = rooms.filter(r => r.occupancy_status === 'vacant').length;
  const maintenanceCount = rooms.filter(r => r.occupancy_status === 'maintenance').length;
  
  return (
    <div className="p-4 md:p-6 bg-gradient-to-br from-blue-50 to-indigo-50 min-h-screen">
      <div className="max-w-screen-2xl mx-auto">
        {/* Header */}
        <div className="mb-6">
          <h1 className="text-2xl md:text-3xl font-bold text-gray-900 mb-2">Interactive Floor Plan</h1>
          <p className="text-gray-600">Visualize facility layout and room status.</p>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6">
            <Card>
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                    <CardTitle className="text-sm font-medium">Occupied</CardTitle>
                    <Users className="h-4 w-4 text-muted-foreground" />
                </CardHeader>
                <CardContent>
                    <div className="text-2xl font-bold">{isLoading ? <Skeleton className="h-8 w-12"/> : `${occupiedCount} / 20`}</div>
                </CardContent>
            </Card>
            <Card>
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                    <CardTitle className="text-sm font-medium">Vacant</CardTitle>
                    <CheckCircle className="h-4 w-4 text-muted-foreground" />
                </CardHeader>
                <CardContent>
                    <div className="text-2xl font-bold">{isLoading ? <Skeleton className="h-8 w-12"/> : vacantCount}</div>
                </CardContent>
            </Card>
            <Card>
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                    <CardTitle className="text-sm font-medium">Maintenance</CardTitle>
                    <Wrench className="h-4 w-4 text-muted-foreground" />
                </CardHeader>
                <CardContent>
                    <div className="text-2xl font-bold">{isLoading ? <Skeleton className="h-8 w-12"/> : maintenanceCount}</div>
                </CardContent>
            </Card>
        </div>


        <div className="bg-white rounded-lg shadow-lg overflow-x-auto">
            <Tabs variant="enclosed" colorScheme="blue" isFitted>
              <TabList>
                <Tab><Building className="w-4 h-4 mr-2" /> First Floor</Tab>
                <Tab><Building className="w-4 h-4 mr-2" /> Second Floor</Tab>
              </TabList>
              <Legend />
              <TabPanels>
                <TabPanel className="min-w-[1000px]">
                  <FloorLayout 
                    floor={1} 
                    rooms={floor1Rooms} 
                    residents={residents}
                    isLoading={isLoading} 
                  />
                </TabPanel>
                <TabPanel className="min-w-[1000px]">
                  <FloorLayout 
                    floor={2} 
                    rooms={floor2Rooms} 
                    residents={residents} 
                    isLoading={isLoading}
                  />
                </TabPanel>
              </TabPanels>
            </Tabs>
        </div>
      </div>
    </div>
  );
}
