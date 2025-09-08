import React from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import Badge from "@/components/ui/badge";
import { Calendar, User } from "lucide-react";
import { format } from "date-fns";

const severityColors = {
  'Low': 'bg-green-100 text-green-800',
  'Medium': 'bg-yellow-100 text-yellow-800',
  'High': 'bg-orange-100 text-orange-800',
  'Critical': 'bg-red-100 text-red-800'
};

const statusColors = {
  'Open': 'bg-blue-100 text-blue-800',
  'Under Investigation': 'bg-purple-100 text-purple-800',
  'Resolved': 'bg-gray-100 text-gray-800',
  'Closed': 'bg-gray-100 text-gray-800'
};

export default function IncidentCard({ incident }) {
  return (
    <Card className="flex flex-col h-full">
      <CardHeader>
        <CardTitle className="text-lg">{incident.type}</CardTitle>
        <div className="flex items-center gap-2">
          <Badge className={severityColors[incident.severity]}>{incident.severity}</Badge>
          <Badge className={statusColors[incident.status]}>{incident.status}</Badge>
        </div>
      </CardHeader>
      <CardContent className="flex-grow space-y-4">
        <p className="text-sm text-slate-600 line-clamp-3">{incident.description}</p>
        <div className="text-xs text-slate-500 space-y-1 pt-4 border-t">
          <div className="flex items-center gap-2"><Calendar className="w-3 h-3" /><span>{format(new Date(incident.date), "MMM d, yyyy")} at {incident.time}</span></div>
          <div className="flex items-center gap-2"><User className="w-3 h-3" /><span>Reported by: {incident.reporting_staff}</span></div>
        </div>
      </CardContent>
    </Card>
  );
}