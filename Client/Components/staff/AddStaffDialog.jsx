import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
// import { Switch } from "@/components/ui/switch"; // Removed, use checkbox instead
import { Plus, X } from "lucide-react";
import Popover from "../ui/popover";

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
    <Popover trigger={<Button><Plus className="w-4 h-4 mr-2" />Add Staff</Button>}>
      <div className="max-w-2xl p-4">
        <div className="text-2xl font-bold mb-2">Add New Staff Member</div>
        <form onSubmit={handleSubmit} className="space-y-6 mt-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div><Label htmlFor="first_name">First Name *</Label><Input id="first_name" value={formData.first_name} onChange={(e) => handleInputChange('first_name', e.target.value)} required /></div>
            <div><Label htmlFor="last_name">Last Name *</Label><Input id="last_name" value={formData.last_name} onChange={(e) => handleInputChange('last_name', e.target.value)} required /></div>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div><Label htmlFor="position">Position *</Label><Select onValueChange={(v) => handleInputChange('position', v)} required><SelectTrigger><SelectValue placeholder="Select position" /></SelectTrigger><SelectContent>{POSITIONS.map(p => <SelectItem key={p} value={p}>{p}</SelectItem>)}</SelectContent></Select></div>
            <div><Label htmlFor="employment_type">Employment Type *</Label><Select onValueChange={(v) => handleInputChange('employment_type', v)} required><SelectTrigger><SelectValue placeholder="Select type" /></SelectTrigger><SelectContent>{EMPLOYMENT_TYPES.map(t => <SelectItem key={t} value={t}>{t}</SelectItem>)}</SelectContent></Select></div>
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
      </div>
    </Popover>
  );
}