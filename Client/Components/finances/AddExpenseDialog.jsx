import React, { useState } from "react";
import Popover from "../ui/popover";
import Button from "@/components/ui/button";
import Input from "@/components/ui/input";
import Label from "@/components/ui/label";
import Textarea from "@/components/ui/textarea";
import Modal from "../ui/modal";
import { Plus, X } from "lucide-react";

const EXPENSE_CATEGORIES = ["Salaries", "Rent/Mortgage", "Utilities", "Food & Supplies", "Insurance", "Transportation", "Program Costs", "Equipment", "Training", "Other"];

export default function AddExpenseDialog({ open, onClose, onSubmit }) {
  const [formData, setFormData] = useState({
    date: new Date().toISOString().slice(0, 10),
    category: "",
    amount: "",
    description: ""
  });
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleInputChange = (field, value) => setFormData(prev => ({ ...prev, [field]: value }));

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    await onSubmit({ ...formData, amount: parseFloat(formData.amount) });
    setFormData({ date: new Date().toISOString().slice(0, 10), category: "", amount: "", description: "" });
    setIsSubmitting(false);
  };

  return (
    <Modal open={open} onClose={onClose} title="Log New Expense" size="md">
      <form onSubmit={handleSubmit} className="space-y-6 mt-2">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <Label htmlFor="date">Date *</Label>
              <Input id="date" type="date" value={formData.date} onChange={(e) => handleInputChange('date', e.target.value)} required />
            </div>
            <div>
              <Label htmlFor="amount">Amount *</Label>
              <Input id="amount" type="number" step="0.01" value={formData.amount} onChange={(e) => handleInputChange('amount', e.target.value)} placeholder="$0.00" required />
            </div>
          </div>
          <div>
            <Label htmlFor="category">Category *</Label>
            <select id="category" value={formData.category} onChange={e => handleInputChange('category', e.target.value)} required className="px-3 py-2 border rounded w-full">
              <option value="" disabled>Select a category</option>
              {EXPENSE_CATEGORIES.map(c => (
                <option key={c} value={c}>{c}</option>
              ))}
            </select>
          </div>
          <div>
            <Label htmlFor="description">Description *</Label>
            <Textarea id="description" value={formData.description} onChange={(e) => handleInputChange('description', e.target.value)} required />
          </div>
          <div className="flex justify-end gap-4 pt-6 border-t">
            <Button type="button" variant="outline" onClick={onClose}><X className="w-4 h-4 mr-2" />Cancel</Button>
            <Button type="submit" disabled={isSubmitting} className="bg-navy-600 hover:bg-navy-700"><Plus className="w-4 h-4 mr-2" />{isSubmitting ? "Saving..." : "Save Expense"}</Button>
          </div>
        </form>
    </Modal>
  );
}