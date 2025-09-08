import React from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import Badge from "@/components/ui/badge";
import { Calendar, Clock, MapPin, Users } from "lucide-react";
import Skeleton from "@/components/ui/skeleton";
import { format, isToday, isTomorrow, parseISO } from "date-fns";

const categoryColors = {
  Exercise: "bg-green-100 text-green-800 border-green-200",
  Social: "bg-blue-100 text-blue-800 border-blue-200",
  Educational: "bg-purple-100 text-purple-800 border-purple-200",
  Therapy: "bg-pink-100 text-pink-800 border-pink-200",
  Medical: "bg-red-100 text-red-800 border-red-200",
  Recreation: "bg-orange-100 text-orange-800 border-orange-200",
  Meals: "bg-yellow-100 text-yellow-800 border-yellow-200",
  Other: "bg-gray-100 text-gray-800 border-gray-200"
};

export default function RecentActivities({ activities, isLoading }) {
  const upcomingActivities = activities
    .filter(activity => new Date(activity.date) >= new Date())
    .slice(0, 6);

  const getDateLabel = (dateStr) => {
    const date = parseISO(dateStr);
    if (isToday(date)) return "Today";
    if (isTomorrow(date)) return "Tomorrow";
    return format(date, "MMM d");
  };

  return (
    <Card className="shadow-md">
      <CardHeader>
        <CardTitle className="flex items-center gap-2 text-lg">
          <Calendar className="w-5 h-5 text-purple-600" />
          Upcoming Activities
        </CardTitle>
      </CardHeader>
      <CardContent>
        {isLoading ? (
          <div className="grid md:grid-cols-2 gap-4">
            {Array(4).fill(0).map((_, i) => (
              <div key={i} className="space-y-2 p-4 border rounded-lg">
                <Skeleton className="h-4 w-3/4" />
                <Skeleton className="h-3 w-1/2" />
                <Skeleton className="h-3 w-full" />
              </div>
            ))}
          </div>
        ) : upcomingActivities.length === 0 ? (
          <div className="text-center py-8">
            <Calendar className="w-12 h-12 text-gray-300 mx-auto mb-3" />
            <p className="text-gray-500">No upcoming activities scheduled</p>
            <p className="text-xs text-gray-400 mt-1">Schedule some activities to get started!</p>
          </div>
        ) : (
          <div className="grid md:grid-cols-2 gap-4">
            {upcomingActivities.map((activity, index) => (
              <div key={index} className="p-4 border border-gray-100 rounded-lg hover:shadow-md transition-shadow">
                <div className="flex items-start justify-between mb-3">
                  <h4 className="font-semibold text-gray-900 flex-1">
                    {activity.title}
                  </h4>
                  <Badge 
                    className={`text-xs ${categoryColors[activity.category]} ml-2`}
                    variant="outline"
                  >
                    {activity.category}
                  </Badge>
                </div>
                
                <div className="space-y-2 text-sm text-gray-600">
                  <div className="flex items-center gap-2">
                    <Calendar className="w-4 h-4" />
                    <span className="font-medium">{getDateLabel(activity.date)}</span>
                  </div>
                  
                  <div className="flex items-center gap-2">
                    <Clock className="w-4 h-4" />
                    <span>{activity.start_time} - {activity.end_time}</span>
                  </div>
                  
                  <div className="flex items-center gap-2">
                    <MapPin className="w-4 h-4" />
                    <span>{activity.location}</span>
                  </div>
                  
                  {activity.max_participants && (
                    <div className="flex items-center gap-2">
                      <Users className="w-4 h-4" />
                      <span>Max {activity.max_participants} participants</span>
                    </div>
                  )}
                </div>
                
                {activity.description && (
                  <p className="text-xs text-gray-500 mt-3 line-clamp-2">
                    {activity.description}
                  </p>
                )}
              </div>
            ))}
          </div>
        )}
      </CardContent>
    </Card>
  );
}