import React from "react";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { 
  User, 
  MapPin, 
  Calendar, 
  Phone, 
  Heart, 
  Edit3,
  Star
} from "lucide-react";
import { format, parseISO, differenceInYears } from "date-fns";

const statusColors = {
  active: "bg-green-100 text-green-800 border-green-200",
  temporary_leave: "bg-yellow-100 text-yellow-800 border-yellow-200",
  medical_leave: "bg-orange-100 text-orange-800 border-orange-200",
  discharged: "bg-gray-100 text-gray-800 border-gray-200"
};

const branchColors = {
  Army: "bg-green-100 text-green-800",
  Navy: "bg-blue-100 text-blue-800",
  "Air Force": "bg-sky-100 text-sky-800",
  Marines: "bg-red-100 text-red-800",
  "Coast Guard": "bg-orange-100 text-orange-800",
  "Space Force": "bg-purple-100 text-purple-800"
};

export default function ResidentCard({ resident, onEdit }) {
  const getAge = () => {
    if (!resident.date_of_birth) return null;
    return differenceInYears(new Date(), parseISO(resident.date_of_birth));
  };

  const getTimeInFacility = () => {
    if (!resident.move_in_date) return null;
    const months = differenceInYears(new Date(), parseISO(resident.move_in_date)) * 12 +
                   (new Date().getMonth() - parseISO(resident.move_in_date).getMonth());
    if (months < 1) return "Less than 1 month";
    if (months < 12) return `${months} months`;
    const years = Math.floor(months / 12);
    const remainingMonths = months % 12;
    if (remainingMonths === 0) return `${years} year${years > 1 ? 's' : ''}`;
    return `${years} year${years > 1 ? 's' : ''}, ${remainingMonths} months`;
  };

  return (
    <Card className="hover:shadow-lg transition-shadow duration-300 border-0 shadow-md">
      <CardHeader className="pb-4">
        <div className="flex items-start justify-between">
          <div className="flex items-center gap-3">
            <div className="w-12 h-12 bg-gradient-to-r from-blue-500 to-blue-600 rounded-full flex items-center justify-center text-white font-semibold text-lg shadow-md">
              {resident.first_name[0]}{resident.last_name[0]}
            </div>
            <div>
              <h3 className="text-lg font-bold text-gray-900">
                {resident.first_name} {resident.last_name}
              </h3>
              <div className="flex items-center gap-2 mt-1">
                <Badge 
                  className={`text-xs ${statusColors[resident.status]}`}
                  variant="outline"
                >
                  {resident.status?.replace('_', ' ')}
                </Badge>
                {resident.service_branch && (
                  <Badge 
                    className={`text-xs ${branchColors[resident.service_branch]}`}
                    variant="secondary"
                  >
                    {resident.service_branch}
                  </Badge>
                )}
              </div>
            </div>
          </div>
          <Button
            variant="ghost"
            size="icon"
            onClick={() => onEdit(resident)}
            className="text-gray-400 hover:text-gray-600"
          >
            <Edit3 className="w-4 h-4" />
          </Button>
        </div>
      </CardHeader>
      
      <CardContent className="space-y-3">
        <div className="flex items-center gap-2 text-sm text-gray-600">
          <MapPin className="w-4 h-4" />
          <span>Room {resident.room_number} • Floor {resident.floor}</span>
        </div>
        
        {getAge() && (
          <div className="flex items-center gap-2 text-sm text-gray-600">
            <User className="w-4 h-4" />
            <span>{getAge()} years old</span>
          </div>
        )}
        
        {resident.move_in_date && (
          <div className="flex items-center gap-2 text-sm text-gray-600">
            <Calendar className="w-4 h-4" />
            <span>Moved in {format(parseISO(resident.move_in_date), "MMM yyyy")}</span>
          </div>
        )}
        
        {getTimeInFacility() && (
          <div className="flex items-center gap-2 text-sm text-gray-600">
            <Star className="w-4 h-4" />
            <span>{getTimeInFacility()} in facility</span>
          </div>
        )}
        
        {resident.emergency_contact_name && (
          <div className="flex items-center gap-2 text-sm text-gray-600">
            <Phone className="w-4 h-4" />
            <span>Emergency: {resident.emergency_contact_name}</span>
          </div>
        )}
        
        {resident.medical_notes && (
          <div className="flex items-start gap-2 text-sm text-gray-600">
            <Heart className="w-4 h-4 mt-0.5 flex-shrink-0" />
            <span className="line-clamp-2">{resident.medical_notes}</span>
          </div>
        )}
      </CardContent>
    </Card>
  );
}