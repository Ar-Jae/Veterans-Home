import React, { useState } from "react";
import Popover from "../ui/popover";
import Button from "@/components/ui/button";
import Input from "@/components/ui/input";
import Label from "@/components/ui/label";
import Textarea from "@/components/ui/textarea";
import Modal from "../ui/modal";
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
    <Modal open={open} onClose={onClose} title="Add New Resident" size="lg">
      <form onSubmit={handleSubmit} className="space-y-6 mt-2">
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
                  <select id="military_branch" value={formData.military_branch} onChange={e => handleInputChange('military_branch', e.target.value)}>
                    <option value="" disabled>Select branch</option>
                    {MILITARY_BRANCHES.map((branch) => (
                      <option key={branch} value={branch}>{branch}</option>
                    ))}
                  </select>
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
                  <select id="discharge_type" value={formData.discharge_type} onChange={e => handleInputChange('discharge_type', e.target.value)}>
                    <option value="" disabled>Select type</option>
                    {DISCHARGE_TYPES.map((type) => (
                      <option key={type} value={type}>{type}</option>
                    ))}
                  </select>
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
                <select id="employment_status" value={formData.employment_status} onChange={e => handleInputChange('employment_status', e.target.value)} className="px-3 py-2 border rounded w-full">
                  <option value="" disabled>Select status</option>
                  {EMPLOYMENT_STATUS.map((status) => (
                    <option key={status} value={status}>{status}</option>
                  ))}
                </select>
              </div>
              <div>
                <Label htmlFor="referral_source">Referral Source</Label>
                <select id="referral_source" value={formData.referral_source} onChange={e => handleInputChange('referral_source', e.target.value)} className="px-3 py-2 border rounded w-full">
                  <option value="" disabled>How did they find us?</option>
                  {REFERRAL_SOURCES.map((source) => (
                    <option key={source} value={source}>{source}</option>
                  ))}
                </select>
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
    </Modal>
  );
}
