import React from "react";
import { Card, CardContent } from "@/components/ui/card";
import Badge from "@/components/ui/badge";
import { Phone, Mail, User, ShieldCheck } from "lucide-react";

export default function StaffCard({ staffMember }) {
  return (
    <Card className="hover:shadow-lg transition-shadow duration-300">
      <CardContent className="p-6">
        <div className="space-y-4">
          <div className="flex items-start justify-between">
            <div className="flex items-center gap-4">
              <div className="w-12 h-12 bg-slate-100 rounded-full flex items-center justify-center">
                <User className="w-6 h-6 text-slate-600" />
              </div>
              <div>
                <h3 className="font-bold text-slate-900">{staffMember.first_name} {staffMember.last_name}</h3>
                <p className="text-sm text-slate-500">{staffMember.position}</p>
              </div>
            </div>
            {staffMember.veteran_status && (
              <Badge variant="outline" className="bg-blue-50 text-blue-700 border-blue-200 flex items-center gap-1">
                <ShieldCheck className="w-3 h-3" />
                Veteran
              </Badge>
            )}
          </div>

          <div className="flex items-center gap-2">
            <Badge variant="secondary">{staffMember.employment_type}</Badge>
            <Badge variant="secondary" className={staffMember.status === 'Active' ? 'bg-green-100 text-green-800' : 'bg-gray-100 text-gray-800'}>
              {staffMember.status}
            </Badge>
          </div>

          <div className="space-y-2 text-sm pt-2 border-t">
            {staffMember.phone && (
              <div className="flex items-center gap-2 text-slate-600">
                <Phone className="w-4 h-4" />
                <span>{staffMember.phone}</span>
              </div>
            )}
            {staffMember.email && (
              <div className="flex items-center gap-2 text-slate-600">
                <Mail className="w-4 h-4" />
                <span className="truncate">{staffMember.email}</span>
              </div>
            )}
          </div>
        </div>
      </CardContent>
    </Card>
  );
}