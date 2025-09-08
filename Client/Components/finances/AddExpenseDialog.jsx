import React, { useState } from "react";
import Popover from "../ui/popover";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
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

  if (!open) return null;
  return (
    <Popover trigger={null} open={open} onOpenChange={onClose}>
      <div className="max-w-xl p-6 bg-white rounded-lg shadow-lg">
        <div className="text-2xl font-bold mb-2">Log New Expense</div>
        <form onSubmit={handleSubmit} className="space-y-6 mt-6">
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
            <Select onValueChange={(v) => handleInputChange('category', v)} required>
              <SelectTrigger><SelectValue placeholder="Select a category" /></SelectTrigger>
              <SelectContent>{EXPENSE_CATEGORIES.map(c => <SelectItem key={c} value={c}>{c}</SelectItem>)}</SelectContent>
            </Select>
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
        <style jsx>{`
          .bg-navy-600 { background-color: #475569; }
          .hover\\:bg-navy-700:hover { background-color: #334155; }
        `}</style>
      </div>
    </Popover>
  );
}