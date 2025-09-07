import React from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Users, Building, Calendar, Wrench } from "lucide-react";
import { Skeleton } from "@/components/ui/skeleton";

export default function StatsOverview({ stats, isLoading }) {
  const statItems = [
    {
      title: "Total Residents",
      value: stats.totalResidents,
      max: 20,
      icon: Users,
      bgColor: "bg-blue-500",
      description: "Currently housed"
    },
    {
      title: "Room Occupancy",
      value: `${stats.occupiedRooms}/${stats.totalRooms}`,
      icon: Building,
      bgColor: "bg-green-500",
      description: "Rooms occupied"
    },
    {
      title: "Upcoming Activities",
      value: stats.upcomingActivities,
      icon: Calendar,
      bgColor: "bg-purple-500",
      description: "This week"
    },
    {
      title: "Open Maintenance",
      value: stats.openMaintenance,
      icon: Wrench,
      bgColor: "bg-orange-500",
      description: "Requests pending"
    }
  ];

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
      {statItems.map((item, index) => (
        <Card key={index} className="relative overflow-hidden border-0 shadow-lg hover:shadow-xl transition-shadow duration-300">
          <div className={`absolute top-0 right-0 w-24 h-24 transform translate-x-6 -translate-y-6 ${item.bgColor} rounded-full opacity-10`} />
          <CardContent className="p-6">
            <div className="flex justify-between items-start">
              <div className="flex-1">
                <p className="text-sm font-medium text-gray-600 mb-2">{item.title}</p>
                {isLoading ? (
                  <Skeleton className="h-8 w-16 mb-2" />
                ) : (
                  <h3 className="text-2xl font-bold text-gray-900 mb-1">
                    {item.value}
                    {item.max && (
                      <span className="text-sm font-normal text-gray-500 ml-1">
                        /{item.max}
                      </span>
                    )}
                  </h3>
                )}
                <p className="text-xs text-gray-500">{item.description}</p>
              </div>
              <div className={`p-3 rounded-xl ${item.bgColor} bg-opacity-15`}>
                <item.icon className={`w-5 h-5 ${item.bgColor.replace('bg-', 'text-')}`} />
              </div>
            </div>
          </CardContent>
        </Card>
      ))}
    </div>
  );
}