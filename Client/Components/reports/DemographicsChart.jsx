import React, { useMemo } from "react";
import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer } from "recharts";
import { Skeleton } from "@/components/ui/skeleton";

export default function DemographicsChart({ residents, isLoading }) {
  const data = useMemo(() => {
    if (!residents || residents.length === 0) return [];
    
    const branchCounts = residents.reduce((acc, resident) => {
      const branch = resident.military_branch || 'Unknown';
      acc[branch] = (acc[branch] || 0) + 1;
      return acc;
    }, {});

    return Object.entries(branchCounts).map(([name, value]) => ({ name, count: value }));
  }, [residents]);

  if (isLoading) return <Skeleton className="h-[300px] w-full" />;
  if (data.length === 0) return <div className="h-[300px] flex items-center justify-center text-slate-500">No data available.</div>;

  return (
    <div style={{ width: '100%', height: 300 }}>
      <ResponsiveContainer>
        <BarChart data={data} layout="vertical" margin={{ left: 20 }}>
          <XAxis type="number" />
          <YAxis dataKey="name" type="category" width={80} />
          <Tooltip />
          <Bar dataKey="count" fill="#475569" barSize={30} />
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
}