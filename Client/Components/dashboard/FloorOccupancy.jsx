import React from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Building, User } from "lucide-react";
import { Skeleton } from "@/components/ui/skeleton";

export default function FloorOccupancy({ residents, rooms, isLoading }) {
  const getFloorData = (floorNumber) => {
    const floorRooms = rooms.filter(room => room.floor === floorNumber);
    const floorResidents = residents.filter(resident => resident.floor === floorNumber);
    
    return {
      totalRooms: floorRooms.length,
      occupiedRooms: floorRooms.filter(room => room.occupancy_status === 'occupied').length,
      residents: floorResidents,
      maintenanceRooms: floorRooms.filter(room => room.occupancy_status === 'maintenance').length
    };
  };

  const floor1 = getFloorData(1);
  const floor2 = getFloorData(2);

  const FloorCard = ({ floorNumber, data, description }) => (
    <Card className="shadow-md">
      <CardHeader className="pb-4">
        <CardTitle className="flex items-center gap-2 text-lg">
          <Building className="w-5 h-5 text-blue-600" />
          Floor {floorNumber}
        </CardTitle>
        <p className="text-sm text-gray-600">{description}</p>
      </CardHeader>
      <CardContent>
        {isLoading ? (
          <div className="space-y-3">
            <Skeleton className="h-4 w-full" />
            <Skeleton className="h-4 w-3/4" />
            <Skeleton className="h-4 w-1/2" />
          </div>
        ) : (
          <>
            <div className="flex items-center justify-between mb-4">
              <span className="text-sm text-gray-600">Occupancy Rate</span>
              <Badge variant={data.occupiedRooms === 10 ? "default" : "secondary"}>
                {data.occupiedRooms}/10 rooms
              </Badge>
            </div>
            
            <div className="w-full bg-gray-200 rounded-full h-2 mb-4">
              <div 
                className="bg-blue-600 h-2 rounded-full transition-all duration-300" 
                style={{ width: `${(data.occupiedRooms / 10) * 100}%` }}
              />
            </div>

            {data.maintenanceRooms > 0 && (
              <div className="flex items-center gap-2 mb-3">
                <Badge variant="destructive" className="text-xs">
                  {data.maintenanceRooms} room{data.maintenanceRooms > 1 ? 's' : ''} in maintenance
                </Badge>
              </div>
            )}

            <div className="space-y-2">
              <h4 className="font-medium text-sm text-gray-700">Recent Residents:</h4>
              {data.residents.slice(0, 3).map((resident, index) => (
                <div key={index} className="flex items-center gap-2 text-sm">
                  <User className="w-4 h-4 text-gray-400" />
                  <span className="font-medium">{resident.first_name} {resident.last_name}</span>
                  <span className="text-gray-500">- Room {resident.room_number}</span>
                </div>
              ))}
              {data.residents.length > 3 && (
                <p className="text-xs text-gray-500">
                  +{data.residents.length - 3} more residents
                </p>
              )}
            </div>
          </>
        )}
      </CardContent>
    </Card>
  );

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