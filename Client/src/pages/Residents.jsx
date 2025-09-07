import React, { useState, useEffect } from "react";
import { Resident } from "@/entities/all";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Search, Plus, UserPlus } from "lucide-react";

import ResidentCard from "../components/residents/ResidentCard";
import ResidentForm from "../components/residents/ResidentForm";

export default function Residents() {
  const [residents, setResidents] = useState([]);
  const [filteredResidents, setFilteredResidents] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [showForm, setShowForm] = useState(false);
  const [editingResident, setEditingResident] = useState(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    loadResidents();
  }, []);

  useEffect(() => {
    const filtered = residents.filter(resident =>
      `${resident.first_name} ${resident.last_name}`.toLowerCase().includes(searchTerm.toLowerCase()) ||
      resident.room_number.toLowerCase().includes(searchTerm.toLowerCase()) ||
      resident.service_branch?.toLowerCase().includes(searchTerm.toLowerCase())
    );
    setFilteredResidents(filtered);
  }, [residents, searchTerm]);

  const loadResidents = async () => {
    setIsLoading(true);
    const data = await Resident.list("-move_in_date");
    setResidents(data);
    setIsLoading(false);
  };

  const handleSubmit = async (residentData) => {
    if (editingResident) {
      await Resident.update(editingResident.id, residentData);
    } else {
      await Resident.create(residentData);
    }
    setShowForm(false);
    setEditingResident(null);
    loadResidents();
  };

  const handleEdit = (resident) => {
    setEditingResident(resident);
    setShowForm(true);
  };

  const getStatusStats = () => {
    const active = residents.filter(r => r.status === 'active').length;
    const onLeave = residents.filter(r => r.status === 'temporary_leave' || r.status === 'medical_leave').length;
    return { active, onLeave, total: residents.length };
  };

  const stats = getStatusStats();

  return (
    <div className="p-6 bg-gradient-to-br from-blue-50 to-indigo-50 min-h-screen">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 mb-8">
          <div>
            <h1 className="text-3xl font-bold text-gray-900 mb-2">Residents</h1>
            <p className="text-gray-600">Manage veteran residents and their information</p>
          </div>
          <Button 
            onClick={() => setShowForm(!showForm)}
            className="bg-blue-600 hover:bg-blue-700 shadow-lg"
          >
            <Plus className="w-4 h-4 mr-2" />
            Add New Resident
          </Button>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          <Card>
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-600">Active Residents</p>
                  <h3 className="text-2xl font-bold text-gray-900">{stats.active}</h3>
                </div>
                <div className="p-3 bg-green-100 rounded-lg">
                  <UserPlus className="w-6 h-6 text-green-600" />
                </div>
              </div>
            </CardContent>
          </Card>
          
          <Card>
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-600">On Leave</p>
                  <h3 className="text-2xl font-bold text-gray-900">{stats.onLeave}</h3>
                </div>
                <div className="p-3 bg-yellow-100 rounded-lg">
                  <UserPlus className="w-6 h-6 text-yellow-600" />
                </div>
              </div>
            </CardContent>
          </Card>
          
          <Card>
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-600">Total Residents</p>
                  <h3 className="text-2xl font-bold text-gray-900">{stats.total}</h3>
                </div>
                <div className="p-3 bg-blue-100 rounded-lg">
                  <UserPlus className="w-6 h-6 text-blue-600" />
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Search */}
        <div className="mb-6">
          <div className="relative max-w-md">
            <Search className="w-5 h-5 absolute left-3 top-3 text-gray-400" />
            <Input
              placeholder="Search residents by name, room, or service branch..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pl-10 shadow-sm"
            />
          </div>
        </div>

        {/* Resident Form */}
        {showForm && (
          <div className="mb-8">
            <ResidentForm
              resident={editingResident}
              onSubmit={handleSubmit}
              onCancel={() => {
                setShowForm(false);
                setEditingResident(null);
              }}
            />
          </div>
        )}

        {/* Residents Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {isLoading ? (
            Array(6).fill(0).map((_, i) => (
              <Card key={i} className="animate-pulse">
                <CardContent className="p-6">
                  <div className="space-y-4">
                    <div className="h-4 bg-gray-200 rounded w-3/4"></div>
                    <div className="h-3 bg-gray-200 rounded w-1/2"></div>
                    <div className="h-3 bg-gray-200 rounded w-full"></div>
                  </div>
                </CardContent>
              </Card>
            ))
          ) : (
            filteredResidents.map((resident) => (
              <ResidentCard
                key={resident.id}
                resident={resident}
                onEdit={handleEdit}
              />
            ))
          )}
        </div>

        {!isLoading && filteredResidents.length === 0 && (
          <div className="text-center py-12">
            <UserPlus className="w-16 h-16 text-gray-300 mx-auto mb-4" />
            <h3 className="text-lg font-medium text-gray-900 mb-2">
              {searchTerm ? 'No residents found' : 'No residents yet'}
            </h3>
            <p className="text-gray-600 mb-6">
              {searchTerm ? 'Try adjusting your search criteria' : 'Get started by adding your first resident'}
            </p>
            {!searchTerm && (
              <Button onClick={() => setShowForm(true)} className="bg-blue-600 hover:bg-blue-700">
                <Plus className="w-4 h-4 mr-2" />
                Add First Resident
              </Button>
            )}
          </div>
        )}
      </div>
    </div>
  );
}