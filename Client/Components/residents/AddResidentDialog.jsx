import React, { useState } from "react";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import { Plus, X } from "lucide-react";

const MILITARY_BRANCHES = ["Army", "Navy", "Air Force", "Marines", "Coast Guard", "Space Force"];
const DISCHARGE_TYPES = ["Honorable", "General", "Other Than Honorable", "Bad Conduct", "Dishonorable"];
const EMPLOYMENT_STATUS = ["Unemployed", "Part-time", "Full-time", "Disability", "Retired"];
const REFERRAL_SOURCES = ["VA Hospital", "Shelter", "Self-referral", "Family", "Probation", "Other"];

export default function AddResidentDialog({ open, onClose, onSubmit }) {
  const [formData, setFormData] = useState({
    first_name: "",
    last_name: "",
    date_of_birth: "",
    phone: "",
    email: "",
    emergency_contact_name: "",
    emergency_contact_phone: "",
    military_branch: "",
    service_dates: "",
    discharge_type: "",
    housing_status: "Active",
    move_in_date: "",
    room_assignment: "",
    case_manager: "",
    medical_conditions: "",
    medications: "",
    mental_health_needs: "",
    substance_abuse_history: "",
    va_benefits_status: "",
    employment_status: "",
    referral_source: "",
    notes: ""
  });
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleInputChange = (field, value) => {
    setFormData(prev => ({
      ...prev,
      [field]: value
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    
    try {
      await onSubmit(formData);
      setFormData({
        first_name: "",
        last_name: "",
        date_of_birth: "",
        phone: "",
        email: "",
        emergency_contact_name: "",
        emergency_contact_phone: "",
        military_branch: "",
        service_dates: "",
        discharge_type: "",
        housing_status: "Active",
        move_in_date: "",
        room_assignment: "",
        case_manager: "",
        medical_conditions: "",
        medications: "",
        mental_health_needs: "",
        substance_abuse_history: "",
        va_benefits_status: "",
        employment_status: "",
        referral_source: "",
        notes: ""
      });
    } catch (error) {
      console.error('Error adding resident:', error);
    }
    
    setIsSubmitting(false);
  };

  return (
    <Dialog open={open} onOpenChange={onClose}>
      <DialogContent className="max-w-4xl max-h-[80vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="text-2xl font-bold">Add New Resident</DialogTitle>
        </DialogHeader>

        <form onSubmit={handleSubmit} className="space-y-6 mt-6">
          {/* Personal Information */}
          <div>
            <h3 className="text-lg font-semibold mb-4">Personal Information</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <Label htmlFor="first_name">First Name *</Label>
                <Input
                  id="first_name"
                  value={formData.first_name}
                  onChange={(e) => handleInputChange('first_name', e.target.value)}
                  required
                />
              </div>
              <div>
                <Label htmlFor="last_name">Last Name *</Label>
                <Input
                  id="last_name"
                  value={formData.last_name}
                  onChange={(e) => handleInputChange('last_name', e.target.value)}
                  required
                />
              </div>
              <div>
                <Label htmlFor="date_of_birth">Date of Birth</Label>
                <Input
                  id="date_of_birth"
                  type="date"
                  value={formData.date_of_birth}
                  onChange={(e) => handleInputChange('date_of_birth', e.target.value)}
                />
              </div>
              <div>
                <Label htmlFor="phone">Phone Number</Label>
                <Input
                  id="phone"
                  value={formData.phone}
                  onChange={(e) => handleInputChange('phone', e.target.value)}
                />
              </div>
              <div>
                <Label htmlFor="email">Email Address</Label>
                <Input
                  id="email"
                  type="email"
                  value={formData.email}
                  onChange={(e) => handleInputChange('email', e.target.value)}
                />
              </div>
            </div>
          </div>

          {/* Emergency Contact */}
          <div>
            <h3 className="text-lg font-semibold mb-4">Emergency Contact</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <Label htmlFor="emergency_contact_name">Contact Name</Label>
                <Input
                  id="emergency_contact_name"
                  value={formData.emergency_contact_name}
                  onChange={(e) => handleInputChange('emergency_contact_name', e.target.value)}
                />
              </div>
              <div>
                <Label htmlFor="emergency_contact_phone">Contact Phone</Label>
                <Input
                  id="emergency_contact_phone"
                  value={formData.emergency_contact_phone}
                  onChange={(e) => handleInputChange('emergency_contact_phone', e.target.value)}
                />
              </div>
            </div>
          </div>

          {/* Military Service */}
          <div>
            <h3 className="text-lg font-semibold mb-4">Military Service</h3>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div>
                <Label htmlFor="military_branch">Branch</Label>
                <Select onValueChange={(value) => handleInputChange('military_branch', value)}>
                  <SelectTrigger>
                    <SelectValue placeholder="Select branch" />
                  </SelectTrigger>
                  <SelectContent>
                    {MILITARY_BRANCHES.map((branch) => (
                      <SelectItem key={branch} value={branch}>{branch}</SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
              <div>
                <Label htmlFor="service_dates">Service Dates</Label>
                <Input
                  id="service_dates"
                  placeholder="e.g. 2010-2018"
                  value={formData.service_dates}
                  onChange={(e) => handleInputChange('service_dates', e.target.value)}
                />
              </div>
              <div>
                <Label htmlFor="discharge_type">Discharge Type</Label>
                <Select onValueChange={(value) => handleInputChange('discharge_type', value)}>
                  <SelectTrigger>
                    <SelectValue placeholder="Select type" />
                  </SelectTrigger>
                  <SelectContent>
                    {DISCHARGE_TYPES.map((type) => (
                      <SelectItem key={type} value={type}>{type}</SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
            </div>
          </div>

          {/* Program Information */}
          <div>
            <h3 className="text-lg font-semibold mb-4">Program Information</h3>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div>
                <Label htmlFor="move_in_date">Move-in Date</Label>
                <Input
                  id="move_in_date"
                  type="date"
                  value={formData.move_in_date}
                  onChange={(e) => handleInputChange('move_in_date', e.target.value)}
                />
              </div>
              <div>
                <Label htmlFor="room_assignment">Room Assignment</Label>
                <Input
                  id="room_assignment"
                  placeholder="Room/Bed number"
                  value={formData.room_assignment}
                  onChange={(e) => handleInputChange('room_assignment', e.target.value)}
                />
              </div>
              <div>
                <Label htmlFor="case_manager">Case Manager</Label>
                <Input
                  id="case_manager"
                  value={formData.case_manager}
                  onChange={(e) => handleInputChange('case_manager', e.target.value)}
                />
              </div>
            </div>
          </div>

          {/* Additional Information */}
          <div>
            <h3 className="text-lg font-semibold mb-4">Additional Information</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <Label htmlFor="employment_status">Employment Status</Label>
                <Select onValueChange={(value) => handleInputChange('employment_status', value)}>
                  <SelectTrigger>
                    <SelectValue placeholder="Select status" />
                  </SelectTrigger>
                  <SelectContent>
                    {EMPLOYMENT_STATUS.map((status) => (
                      <SelectItem key={status} value={status}>{status}</SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
              <div>
                <Label htmlFor="referral_source">Referral Source</Label>
                <Select onValueChange={(value) => handleInputChange('referral_source', value)}>
                  <SelectTrigger>
                    <SelectValue placeholder="How did they find us?" />
                  </SelectTrigger>
                  <SelectContent>
                    {REFERRAL_SOURCES.map((source) => (
                      <SelectItem key={source} value={source}>{source}</SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
            </div>
            
            <div className="mt-4">
              <Label htmlFor="notes">Notes</Label>
              <Textarea
                id="notes"
                placeholder="Any additional notes about the resident..."
                value={formData.notes}
                onChange={(e) => handleInputChange('notes', e.target.value)}
                className="h-24"
              />
            </div>
          </div>

          <div className="flex justify-end gap-4 pt-6 border-t">
            <Button type="button" variant="outline" onClick={onClose}>
              <X className="w-4 h-4 mr-2" />
              Cancel
            </Button>
            <Button type="submit" disabled={isSubmitting} className="bg-navy-600 hover:bg-navy-700">
              <Plus className="w-4 h-4 mr-2" />
              {isSubmitting ? "Adding..." : "Add Resident"}
            </Button>
          </div>
        </form>
      </DialogContent>
      
      <style jsx>{`
        .bg-navy-600 {
          background-color: #475569;
        }
        
        .hover\\:bg-navy-700:hover {
          background-color: #334155;
        }
      `}</style>
    </Dialog>
  );
}
