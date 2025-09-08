import React, { useState } from "react";
import Popover from "../ui/popover";
import Button from "@/components/ui/button";
import Input from "@/components/ui/input";
import Label from "@/components/ui/label";
import Textarea from "@/components/ui/textarea";
import Modal from "../ui/modal";
import { Plus, X } from "lucide-react";

const PAYMENT_SOURCES = ["VA Per Diem", "State Housing Voucher", "Grant Funding", "Resident Fee", "Donation", "Fundraising", "Other"];
const PAYMENT_METHODS = ["Check", "Bank Transfer", "Credit Card", "Cash", "Online Payment", "Other"];
const PAYMENT_STATUSES = ["Pending", "Received", "Processed", "Failed"];

export default function AddPaymentDialog({ open, onClose, onSubmit, residents = [] }) {
  const [formData, setFormData] = useState({
    date_received: new Date().toISOString().slice(0, 10),
    amount: "",
    payment_source: "",
    payment_method: "",
    resident_id: "",
    payer_name: "",
    reference_number: "",
    description: "",
    grant_name: "",
    recurring: false,
    status: "Received"
  });
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleInputChange = (field, value) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    
    try {
      const submitData = { ...formData, amount: parseFloat(formData.amount) };
      // Remove empty fields
      Object.keys(submitData).forEach(key => {
        if (!submitData[key] && submitData[key] !== false) {
          delete submitData[key];
        }
      });
      
      await onSubmit(submitData);
      setFormData({
        date_received: new Date().toISOString().slice(0, 10),
        amount: "",
        payment_source: "",
        payment_method: "",
        resident_id: "",
        payer_name: "",
        reference_number: "",
        description: "",
        grant_name: "",
        recurring: false,
        status: "Received"
      });
    } catch (error) {
      console.error('Error adding payment:', error);
    }
    
    setIsSubmitting(false);
  };

  const showResidentField = formData.payment_source === "Resident Fee";
  const showGrantField = formData.payment_source === "Grant Funding";

  return (
    <Modal open={open} onClose={onClose} title="Record New Payment" size="lg">
      <form onSubmit={handleSubmit} className="space-y-6 mt-2">
          {/* Basic Payment Info */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <Label htmlFor="date_received">Date Received *</Label>
              <Input
                id="date_received"
                type="date"
                value={formData.date_received}
                onChange={(e) => handleInputChange('date_received', e.target.value)}
                required
              />
            </div>
            <div>
              <Label htmlFor="amount">Amount *</Label>
              <Input
                id="amount"
                type="number"
                step="0.01"
                value={formData.amount}
                onChange={(e) => handleInputChange('amount', e.target.value)}
                placeholder="$0.00"
                required
              />
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <Label htmlFor="payment_source">Payment Source *</Label>
              <select id="payment_source" value={formData.payment_source} onChange={e => handleInputChange('payment_source', e.target.value)} required className="px-3 py-2 border rounded w-full">
                <option value="" disabled>Select payment source</option>
                {PAYMENT_SOURCES.map((source) => (
                  <option key={source} value={source}>{source}</option>
                ))}
              </select>
            </div>
            <div>
              <Label htmlFor="payment_method">Payment Method</Label>
              <select id="payment_method" value={formData.payment_method} onChange={e => handleInputChange('payment_method', e.target.value)} className="px-3 py-2 border rounded w-full">
                <option value="" disabled>Select payment method</option>
                {PAYMENT_METHODS.map((method) => (
                  <option key={method} value={method}>{method}</option>
                ))}
              </select>
            </div>
          </div>

          {/* Payer Information */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <Label htmlFor="payer_name">Payer Name *</Label>
              <Input
                id="payer_name"
                value={formData.payer_name}
                onChange={(e) => handleInputChange('payer_name', e.target.value)}
                placeholder="Organization or person name"
                required
              />
            </div>
            <div>
              <Label htmlFor="reference_number">Reference Number</Label>
              <Input
                id="reference_number"
                value={formData.reference_number}
                onChange={(e) => handleInputChange('reference_number', e.target.value)}
                placeholder="Check #, Transaction ID, etc."
              />
            </div>
          </div>

          {/* Conditional Fields */}
          {showResidentField && (
            <div>
              <Label htmlFor="resident_id">Associated Resident</Label>
              <select id="resident_id" value={formData.resident_id} onChange={e => handleInputChange('resident_id', e.target.value)} className="px-3 py-2 border rounded w-full">
                <option value="" disabled>Select resident</option>
                {residents.map((resident) => (
                  <option key={resident.id} value={resident.id}>{resident.first_name} {resident.last_name}</option>
                ))}
              </select>
            </div>
          )}

          {showGrantField && (
            <div>
              <Label htmlFor="grant_name">Grant Name</Label>
              <Input
                id="grant_name"
                value={formData.grant_name}
                onChange={(e) => handleInputChange('grant_name', e.target.value)}
                placeholder="e.g. HUD-VASH, SAMHSA Grant"
              />
            </div>
          )}

          <div>
            <Label htmlFor="description">Description/Notes</Label>
            <Textarea
              id="description"
              value={formData.description}
              onChange={(e) => handleInputChange('description', e.target.value)}
              placeholder="Additional details about this payment..."
              className="h-20"
            />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 items-center">
            <div>
              <Label htmlFor="status">Status</Label>
              <select id="status" value={formData.status} onChange={e => handleInputChange('status', e.target.value)} className="px-3 py-2 border rounded w-full">
                {PAYMENT_STATUSES.map((status) => (
                  <option key={status} value={status}>{status}</option>
                ))}
              </select>
            </div>
            <div className="flex items-center space-x-2 mt-6">
              <input
                id="recurring"
                type="checkbox"
                checked={formData.recurring}
                onChange={e => handleInputChange('recurring', e.target.checked)}
                style={{ width: 18, height: 18 }}
              />
              <Label htmlFor="recurring">Recurring Payment?</Label>
            </div>
          </div>

          <div className="flex justify-end gap-4 pt-6 border-t">
            <Button type="button" variant="outline" onClick={onClose}>
              <X className="w-4 h-4 mr-2" />
              Cancel
            </Button>
            <Button type="submit" disabled={isSubmitting} className="bg-green-600 hover:bg-green-700">
              <Plus className="w-4 h-4 mr-2" />
              {isSubmitting ? "Recording..." : "Record Payment"}
            </Button>
          </div>
        </form>
    </Modal>
  );
}