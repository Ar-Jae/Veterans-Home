import React, { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { UserPlus, X } from "lucide-react";

const SERVICE_BRANCHES = ["Army", "Navy", "Air Force", "Marines", "Coast Guard", "Space Force"];
const ROOM_OPTIONS = [
  // Floor 1 rooms
  "1A", "1B", "1C", "1D", "1E", "1F", "1G", "1H", "1I", "1J",
  // Floor 2 rooms  
  "2A", "2B", "2C", "2D", "2E", "2F", "2G", "2H", "2I", "2J"
];

export default function ResidentForm({ resident, onSubmit, onCancel }) {
  const [formData, setFormData] = useState(resident || {
    first_name: "",
    last_name: "",
    room_number: "",
    floor: 1,
    date_of_birth: "",
    service_branch: "",
    emergency_contact_name: "",
    emergency_contact_phone: "",
    medical_notes: "",
    move_in_date: "",
    status: "active"
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    
    // Auto-set floor based on room number
    const floor = formData.room_number.startsWith('1') ? 1 : 2;
    
    onSubmit({
      ...formData,
      floor
    });
  };

  const handleInputChange = (field, value) => {
    setFormData(prev => ({
      ...prev,
      [field]: value
    }));
  };

  return (
    <Card className="border-0 shadow-lg">
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <UserPlus className="w-5 h-5 text-blue-600" />
          {resident ? 'Edit Resident' : 'Add New Resident'}
        </CardTitle>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit} className="space-y-6">
          {/* Personal Information */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="space-y-2">
              <Label htmlFor="first_name">First Name *</Label>
              <Input
                id="first_name"
                value={formData.first_name}
                onChange={(e) => handleInputChange('first_name', e.target.value)}
                required
              />
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="last_name">Last Name *</Label>
              <Input
                id="last_name"
                value={formData.last_name}
                onChange={(e) => handleInputChange('last_name', e.target.value)}
                required
              />
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="date_of_birth">Date of Birth</Label>
              <Input
                id="date_of_birth"
                type="date"
                value={formData.date_of_birth}
                onChange={(e) => handleInputChange('date_of_birth', e.target.value)}
              />
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="service_branch">Service Branch</Label>
              <Select
                value={formData.service_branch}
                onValueChange={(value) => handleInputChange('service_branch', value)}
              >
                <SelectTrigger>
                  <SelectValue placeholder="Select branch" />
                </SelectTrigger>
                <SelectContent>
                  {SERVICE_BRANCHES.map((branch) => (
                    <SelectItem key={branch} value={branch}>
                      {branch}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
          </div>

          {/* Room Assignment */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="space-y-2">
              <Label htmlFor="room_number">Room Number *</Label>
              <Select
                value={formData.room_number}
                onValueChange={(value) => handleInputChange('room_number', value)}
                required
              >
                <SelectTrigger>
                  <SelectValue placeholder="Select room" />
                </SelectTrigger>
                <SelectContent>
                  {ROOM_OPTIONS.map((room) => (
                    <SelectItem key={room} value={room}>
                      Room {room} (Floor {room[0]})
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="move_in_date">Move-in Date</Label>
              <Input
                id="move_in_date"
                type="date"
                value={formData.move_in_date}
                onChange={(e) => handleInputChange('move_in_date', e.target.value)}
              />
            </div>
          </div>

          {/* Emergency Contact */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="space-y-2">
              <Label htmlFor="emergency_contact_name">Emergency Contact Name</Label>
              <Input
                id="emergency_contact_name"
                value={formData.emergency_contact_name}
                onChange={(e) => handleInputChange('emergency_contact_name', e.target.value)}
              />
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="emergency_contact_phone">Emergency Contact Phone</Label>
              <Input
                id="emergency_contact_phone"
                type="tel"
                value={formData.emergency_contact_phone}
                onChange={(e) => handleInputChange('emergency_contact_phone', e.target.value)}
              />
            </div>
          </div>

          {/* Medical Notes */}
          <div className="space-y-2">
            <Label htmlFor="medical_notes">Medical Notes</Label>
            <Textarea
              id="medical_notes"
              value={formData.medical_notes}
              onChange={(e) => handleInputChange('medical_notes', e.target.value)}
              placeholder="Any important medical information, allergies, or care instructions..."
              rows={3}
            />
          </div>

          {/* Status */}
          <div className="space-y-2">
            <Label htmlFor="status">Status</Label>
            <Select
              value={formData.status}
              onValueChange={(value) => handleInputChange('status', value)}
            >
              <SelectTrigger>
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="active">Active</SelectItem>
                <SelectItem value="temporary_leave">Temporary Leave</SelectItem>
                <SelectItem value="medical_leave">Medical Leave</SelectItem>
                <SelectItem value="discharged">Discharged</SelectItem>
              </SelectContent>
            </Select>
          </div>

          {/* Actions */}
          <div className="flex justify-end gap-3 pt-6">
            <Button
              type="button"
              variant="outline"
              onClick={onCancel}
            >
              <X className="w-4 h-4 mr-2" />
              Cancel
            </Button>
            <Button
              type="submit"
              className="bg-blue-600 hover:bg-blue-700"
            >
              <UserPlus className="w-4 h-4 mr-2" />
              {resident ? 'Update Resident' : 'Add Resident'}
            </Button>
          </div>
        </form>
      </CardContent>
    </Card>
  );
}