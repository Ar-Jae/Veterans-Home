
import React from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { AlertTriangle, Clock, Wrench, Building } from "lucide-react";
import { Skeleton } from "@/components/ui/skeleton";
import { format } from "date-fns";

const priorityColors = {
  urgent: "bg-red-100 text-red-800 border-red-200",
  high: "bg-orange-100 text-orange-800 border-orange-200",
  medium: "bg-yellow-100 text-yellow-800 border-yellow-200",
  low: "bg-gray-100 text-gray-800 border-gray-200"
};

export default function MaintenanceAlerts({ requests, isLoading }) {
  const sortedRequests = requests
    .sort((a, b) => {
      const priorityOrder = { urgent: 0, high: 1, medium: 2, low: 3 };
      return priorityOrder[a.priority] - priorityOrder[b.priority];
    })
    .slice(0, 5);

  return (
    <Card className="shadow-md">
      <CardHeader>
        <CardTitle className="flex items-center gap-2 text-lg">
          <Wrench className="w-5 h-5 text-orange-600" />
          Maintenance Alerts
          {requests.length > 0 && (
            <Badge variant="secondary">{requests.length}</Badge>
          )}
        </CardTitle>
      </CardHeader>
      <CardContent>
        {isLoading ? (
          <div className="space-y-4">
            {Array(3).fill(0).map((_, i) => (
              <div key={i} className="space-y-2">
                <Skeleton className="h-4 w-full" />
                <Skeleton className="h-3 w-2/3" />
              </div>
            ))}
          </div>
        ) : requests.length === 0 ? (
          <div className="text-center py-6">
            <AlertTriangle className="w-8 h-8 text-gray-300 mx-auto mb-3" />
            <p className="text-gray-500 text-sm">No open maintenance requests</p>
            <p className="text-xs text-gray-400 mt-1">All systems running smoothly!</p>
          </div>
        ) : (
          <div className="space-y-3">
            {sortedRequests.map((request, index) => (
              <div key={index} className="p-3 border border-gray-100 rounded-lg hover:bg-gray-50 transition-colors">
                <div className="flex items-start justify-between mb-2">
                  <h4 className="font-medium text-sm text-gray-900 flex-1">
                    {request.title}
                  </h4>
                  <Badge 
                    className={`text-xs ${priorityColors[request.priority]} ml-2`}
                    variant="outline"
                  >
                    {request.priority}
                  </Badge>
                </div>
                <div className="flex items-center gap-2 text-xs text-gray-600">
                  <Building className="w-3 h-3" />
                  <span>{request.location}</span>
                  <Clock className="w-3 h-3 ml-2" />
                  <span>{format(new Date(request.created_date), "MMM d")}</span>
                </div>
                {request.description && (
                  <p className="text-xs text-gray-500 mt-2 line-clamp-2">
                    {request.description}
                  </p>
                )}
              </div>
            ))}
            
            {requests.length > 5 && (
              <div className="pt-2 border-t border-gray-100">
                <p className="text-xs text-gray-500 text-center">
                  +{requests.length - 5} more requests
                </p>
              </div>
            )}
          </div>
        )}
      </CardContent>
    </Card>
  );
}
