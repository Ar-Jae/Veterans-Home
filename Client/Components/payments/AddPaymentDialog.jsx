import React, { useState } from "react";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import { Switch } from "@/components/ui/switch";
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
    <Dialog open={open} onOpenChange={onClose}>
      <DialogContent className="max-w-2xl max-h-[80vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="text-2xl font-bold">Record New Payment</DialogTitle>
        </DialogHeader>

        <form onSubmit={handleSubmit} className="space-y-6 mt-6">
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
              <Select onValueChange={(value) => handleInputChange('payment_source', value)} required>
                <SelectTrigger>
                  <SelectValue placeholder="Select payment source" />
                </SelectTrigger>
                <SelectContent>
                  {PAYMENT_SOURCES.map((source) => (
                    <SelectItem key={source} value={source}>{source}</SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
            <div>
              <Label htmlFor="payment_method">Payment Method</Label>
              <Select onValueChange={(value) => handleInputChange('payment_method', value)}>
                <SelectTrigger>
                  <SelectValue placeholder="Select payment method" />
                </SelectTrigger>
                <SelectContent>
                  {PAYMENT_METHODS.map((method) => (
                    <SelectItem key={method} value={method}>{method}</SelectItem>
                  ))}
                </SelectContent>
              </Select>
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
              <Select onValueChange={(value) => handleInputChange('resident_id', value)}>
                <SelectTrigger>
                  <SelectValue placeholder="Select resident" />
                </SelectTrigger>
                <SelectContent>
                  {residents.map((resident) => (
                    <SelectItem key={resident.id} value={resident.id}>
                      {resident.first_name} {resident.last_name}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
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
              <Select value={formData.status} onValueChange={(value) => handleInputChange('status', value)}>
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  {PAYMENT_STATUSES.map((status) => (
                    <SelectItem key={status} value={status}>{status}</SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
            <div className="flex items-center space-x-2 mt-6">
              <Switch
                id="recurring"
                checked={formData.recurring}
                onCheckedChange={(checked) => handleInputChange('recurring', checked)}
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
      </DialogContent>
    </Dialog>
  );
}