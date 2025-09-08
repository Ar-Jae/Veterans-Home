import React, { useState } from "react";
import Button from "@/components/ui/button";
import Input from "@/components/ui/input";
import Label from "@/components/ui/label";
// import { Switch } from "@/components/ui/switch"; // Removed, use checkbox instead
import { Plus, X } from "lucide-react";
import Modal from "../ui/modal";

const POSITIONS = ["Executive Director", "Program Director", "Case Manager", "House Manager", "Peer Support Mentor", "Cook", "Housekeeper", "Mental Health Liaison"];
const EMPLOYMENT_TYPES = ["Full-time", "Part-time", "Contractor"];

export default function AddStaffDialog({ open, onClose, onSubmit }) {
  const [formData, setFormData] = useState({
    first_name: "",
    last_name: "",
    position: "",
    employment_type: "",
    phone: "",
    email: "",
    hire_date: "",
    veteran_status: false,
    status: "Active"
  });
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleInputChange = (field, value) => setFormData(prev => ({ ...prev, [field]: value }));

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    await onSubmit(formData);
    setFormData({ first_name: "", last_name: "", position: "", employment_type: "", phone: "", email: "", hire_date: "", veteran_status: false, status: "Active" });
    setIsSubmitting(false);
  };

  return (
    <Modal open={open} onClose={onClose} title="Add New Staff Member" size="lg">
      <form onSubmit={handleSubmit} className="space-y-6 mt-2">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div><Label htmlFor="first_name">First Name *</Label><Input id="first_name" value={formData.first_name} onChange={(e) => handleInputChange('first_name', e.target.value)} required /></div>
            <div><Label htmlFor="last_name">Last Name *</Label><Input id="last_name" value={formData.last_name} onChange={(e) => handleInputChange('last_name', e.target.value)} required /></div>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <Label htmlFor="position">Position *</Label>
              <select id="position" value={formData.position} onChange={e => handleInputChange('position', e.target.value)} required className="px-3 py-2 border rounded w-full">
                <option value="" disabled>Select position</option>
                {POSITIONS.map(p => <option key={p} value={p}>{p}</option>)}
              </select>
            </div>
            <div>
              <Label htmlFor="employment_type">Employment Type *</Label>
              <select id="employment_type" value={formData.employment_type} onChange={e => handleInputChange('employment_type', e.target.value)} required className="px-3 py-2 border rounded w-full">
                <option value="" disabled>Select type</option>
                {EMPLOYMENT_TYPES.map(t => <option key={t} value={t}>{t}</option>)}
              </select>
            </div>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div><Label htmlFor="phone">Phone</Label><Input id="phone" type="tel" value={formData.phone} onChange={(e) => handleInputChange('phone', e.target.value)} /></div>
            <div><Label htmlFor="email">Email</Label><Input id="email" type="email" value={formData.email} onChange={(e) => handleInputChange('email', e.target.value)} /></div>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 items-center">
            <div><Label htmlFor="hire_date">Hire Date</Label><Input id="hire_date" type="date" value={formData.hire_date} onChange={(e) => handleInputChange('hire_date', e.target.value)} /></div>
            <div className="flex items-center space-x-2 mt-6">
              <input
                id="veteran_status"
                type="checkbox"
                checked={formData.veteran_status}
                onChange={e => handleInputChange('veteran_status', e.target.checked)}
                style={{ width: 18, height: 18 }}
              />
              <Label htmlFor="veteran_status">Is a Veteran?</Label>
            </div>
          </div>
          <div className="flex justify-end gap-4 pt-6 border-t">
            <Button type="button" variant="outline" onClick={onClose}><X className="w-4 h-4 mr-2" />Cancel</Button>
            <Button type="submit" disabled={isSubmitting} className="bg-navy-600 hover:bg-navy-700"><Plus className="w-4 h-4 mr-2" />{isSubmitting ? "Saving..." : "Save Staff Member"}</Button>
          </div>
        </form>
    </Modal>
  );
}