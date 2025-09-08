import React, { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Plus, UserCheck } from "lucide-react";
import StaffCard from "@/components/staff/StaffCard";
import AddStaffDialog from "@/components/staff/AddStaffDialog";

export default function Staff() {
  const [staff, setStaff] = useState([]);
  const [showAddDialog, setShowAddDialog] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    loadStaff();
  }, []);

  const loadStaff = async () => {
    setIsLoading(true);
    const data = await StaffMember.list();
    setStaff(data);
    setIsLoading(false);
  };

  const handleAddStaff = async (staffData) => {
    await StaffMember.create(staffData);
    loadStaff();
    setShowAddDialog(false);
  };

  return (
    <div className="p-6 bg-slate-50 min-h-screen">
      <div className="max-w-7xl mx-auto space-y-8">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
          <div>
            <h1 className="text-3xl font-bold text-slate-900">Staff Management</h1>
            <p className="text-slate-600 mt-1">Oversee all team members and their roles.</p>
          </div>
          <Button 
            onClick={() => setShowAddDialog(true)}
            className="bg-navy-600 hover:bg-navy-700 text-white"
          >
            <Plus className="w-4 h-4 mr-2" />
            Add Staff Member
          </Button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {isLoading ? (
            Array(4).fill(0).map((_, i) => (
              <div key={i} className="bg-white rounded-lg p-6 animate-pulse space-y-3">
                <div className="h-5 bg-slate-200 rounded w-1/2"></div>
                <div className="h-4 bg-slate-200 rounded w-1/3"></div>
                <div className="h-4 bg-slate-200 rounded w-3/4"></div>
              </div>
            ))
          ) : staff.length > 0 ? (
            staff.map((member) => (
              <StaffCard key={member.id} staffMember={member} />
            ))
          ) : (
            <div className="col-span-full text-center py-12">
              <UserCheck className="w-12 h-12 text-slate-400 mx-auto mb-4" />
              <p className="text-slate-600">No staff members have been added yet.</p>
            </div>
          )}
        </div>

        <AddStaffDialog
          open={showAddDialog}
          onClose={() => setShowAddDialog(false)}
          onSubmit={handleAddStaff}
        />
      </div>
      <style jsx>{`
        .bg-navy-600 { background-color: #475569; }
        .hover\\:bg-navy-700:hover { background-color: #334155; }
      `}</style>
    </div>
  );
}