import React, { useState, useEffect, useMemo } from "react";
// import { Resident, CasePlan } from "@/entities/all"; // Removed: file does not exist
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Users, Briefcase, Home, CheckCircle } from "lucide-react";
import KPIReportCard from "../../Components/reports/KPIReportCard";
import DemographicsChart from "../../Components/reports/DemographicsChart";
import OutcomesChart from "../../Components/reports/OutcomesChart";

export default function Reports() {
  const [residents, setResidents] = useState([]);
  const [casePlans, setCasePlans] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    loadData();
  }, []);

  const loadData = async () => {
    setIsLoading(true);
    const [resData, planData] = await Promise.all([Resident.list(), CasePlan.list()]);
    setResidents(resData);
    setCasePlans(planData);
    setIsLoading(false);
  };

  const kpis = useMemo(() => {
    const totalServed = residents.length;
    if (totalServed === 0) return { housed: 0, employment: 0, permanent: 0, satisfaction: 0 };

    const employed = residents.filter(r => r.employment_status === 'Full-time' || r.employment_status === 'Part-time').length;
    const permanentHousing = residents.filter(r => r.housing_status === 'Graduated').length;
    
    return {
      housed: totalServed,
      employment: Math.round((employed / totalServed) * 100),
      permanent: Math.round((permanentHousing / totalServed) * 100),
      satisfaction: 92 // Static for now
    };
  }, [residents]);

  return (
    <div className="p-6 bg-slate-50 min-h-screen">
      <div className="max-w-7xl mx-auto space-y-8">
        <div>
          <h1 className="text-3xl font-bold text-slate-900">Program Reports & KPIs</h1>
          <p className="text-slate-600 mt-1">Measure impact and evaluate program success.</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          <KPIReportCard title="Veterans Housed" value={kpis.housed} icon={Users} unit="total" isLoading={isLoading} />
          <KPIReportCard title="Secured Employment" value={kpis.employment} icon={Briefcase} unit="%" isLoading={isLoading} />
          <KPIReportCard title="Obtained Permanent Housing" value={kpis.permanent} icon={Home} unit="%" isLoading={isLoading} />
          <KPIReportCard title="Resident Satisfaction" value={kpis.satisfaction} icon={CheckCircle} unit="%" isLoading={isLoading} />
        </div>

        <div className="grid lg:grid-cols-2 gap-6">
          <Card>
            <CardHeader><CardTitle>Resident Demographics</CardTitle></CardHeader>
            <CardContent><DemographicsChart residents={residents} isLoading={isLoading} /></CardContent>
          </Card>
          <Card>
            <CardHeader><CardTitle>Program Outcomes</CardTitle></CardHeader>
            <CardContent><OutcomesChart residents={residents} isLoading={isLoading} /></CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}