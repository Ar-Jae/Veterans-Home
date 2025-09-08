import React, { useState } from "react";
import Popover from "../ui/popover";
import Button from "@/components/ui/button";
import Input from "@/components/ui/input";
import Label from "@/components/ui/label";
import Textarea from "@/components/ui/textarea";
import Modal from "../ui/modal";
import { Plus, X } from "lucide-react";

const INCIDENT_TYPES = ["Medical Emergency", "Behavioral Issue", "Property Damage", "Policy Violation", "Safety Concern", "Other"];
const SEVERITY_LEVELS = ["Low", "Medium", "High", "Critical"];

export default function AddIncidentDialog({ open, onClose, onSubmit }) {
  const [formData, setFormData] = useState({
    date: new Date().toISOString().slice(0, 10),
    time: new Date().toTimeString().slice(0, 5),
    type: "",
    severity: "",
    description: "",
    actions_taken: "",
    reporting_staff: ""
  });
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleInputChange = (field, value) => setFormData(prev => ({ ...prev, [field]: value }));

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    await onSubmit(formData);
    setFormData({ date: new Date().toISOString().slice(0, 10), time: new Date().toTimeString().slice(0, 5), type: "", severity: "", description: "", actions_taken: "", reporting_staff: "" });
    setIsSubmitting(false);
  };

  return (
    <Modal open={open} onClose={onClose} title="Log New Incident" size="lg">
      <form onSubmit={handleSubmit} className="space-y-6 mt-2">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div><Label htmlFor="date">Date *</Label><Input id="date" type="date" value={formData.date} onChange={(e) => handleInputChange('date', e.target.value)} required /></div>
            <div><Label htmlFor="time">Time *</Label><Input id="time" type="time" value={formData.time} onChange={(e) => handleInputChange('time', e.target.value)} required /></div>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <Label htmlFor="type">Incident Type *</Label>
              <select id="type" value={formData.type} onChange={e => handleInputChange('type', e.target.value)} required className="px-3 py-2 border rounded w-full">
                <option value="" disabled>Select type</option>
                {INCIDENT_TYPES.map(t => (
                  <option key={t} value={t}>{t}</option>
                ))}
              </select>
            </div>
            <div>
              <Label htmlFor="severity">Severity *</Label>
              <select id="severity" value={formData.severity} onChange={e => handleInputChange('severity', e.target.value)} required className="px-3 py-2 border rounded w-full">
                <option value="" disabled>Select severity</option>
                {SEVERITY_LEVELS.map(s => (
                  <option key={s} value={s}>{s}</option>
                ))}
              </select>
            </div>
          </div>
          <div><Label htmlFor="description">Description *</Label><Textarea id="description" value={formData.description} onChange={(e) => handleInputChange('description', e.target.value)} required /></div>
          <div><Label htmlFor="actions_taken">Actions Taken</Label><Textarea id="actions_taken" value={formData.actions_taken} onChange={(e) => handleInputChange('actions_taken', e.target.value)} /></div>
          <div><Label htmlFor="reporting_staff">Reporting Staff *</Label><Input id="reporting_staff" value={formData.reporting_staff} onChange={(e) => handleInputChange('reporting_staff', e.target.value)} required /></div>
          <div className="flex justify-end gap-4 pt-6 border-t">
            <Button type="button" variant="outline" onClick={onClose}><X className="w-4 h-4 mr-2" />Cancel</Button>
            <Button type="submit" disabled={isSubmitting} className="bg-red-600 hover:bg-red-700"><Plus className="w-4 h-4 mr-2" />{isSubmitting ? "Logging..." : "Log Incident"}</Button>
          </div>
        </form>
    </Modal>
  );
}