import React, { useState, useEffect } from "react";
// import { Incident } from "@/entities/all"; // Removed: file does not exist
import { Button } from "@/components/ui/button";
import { Plus, AlertTriangle } from "lucide-react";
import IncidentCard from "../../Components/incidents/IncidentCard";
import AddIncidentDialog from "../../Components/incidents/AddIncidentDialog";

export default function Incidents() {
  const [incidents, setIncidents] = useState([]);
  const [showAddDialog, setShowAddDialog] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    loadIncidents();
  }, []);

  const loadIncidents = async () => {
    setIsLoading(true);
    const data = await Incident.list("-date");
    setIncidents(data);
    setIsLoading(false);
  };

  const handleAddIncident = async (incidentData) => {
    await Incident.create(incidentData);
    loadIncidents();
    setShowAddDialog(false);
  };

  return (
    <div className="p-6 bg-slate-50 min-h-screen">
      <div className="max-w-7xl mx-auto space-y-8">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
          <div>
            <h1 className="text-3xl font-bold text-slate-900">Incident Reports</h1>
            <p className="text-slate-600 mt-1">Log and manage all house-related incidents.</p>
          </div>
          <Button onClick={() => setShowAddDialog(true)} className="bg-red-600 hover:bg-red-700 text-white"><Plus className="w-4 h-4 mr-2" />Log New Incident</Button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {isLoading ? (
            Array(3).fill(0).map((_, i) => (
              <div key={i} className="bg-white rounded-lg p-6 animate-pulse space-y-3">
                <div className="h-5 bg-slate-200 rounded w-1/2"></div>
                <div className="h-4 bg-slate-200 rounded w-1/3"></div>
                <div className="h-12 bg-slate-200 rounded w-full"></div>
              </div>
            ))
          ) : incidents.length > 0 ? (
            incidents.map((incident) => (
              <IncidentCard key={incident.id} incident={incident} />
            ))
          ) : (
            <div className="col-span-full text-center py-12">
              <AlertTriangle className="w-12 h-12 text-slate-400 mx-auto mb-4" />
              <p className="text-slate-600">No incidents have been reported.</p>
            </div>
          )}
        </div>

        <AddIncidentDialog open={showAddDialog} onClose={() => setShowAddDialog(false)} onSubmit={handleAddIncident} />
      </div>
    </div>
  );
}