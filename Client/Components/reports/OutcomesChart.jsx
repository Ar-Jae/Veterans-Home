import React, { useMemo } from "react";
import { PieChart, Pie, Cell, Tooltip, Legend, ResponsiveContainer } from "recharts";
import { Skeleton } from "@/components/ui/skeleton";

const COLORS = ['#16a34a', '#facc15', '#ef4444', '#64748b'];

export default function OutcomesChart({ residents, isLoading }) {
  const data = useMemo(() => {
    if (!residents || residents.length === 0) return [];
    
    const employmentCounts = residents.reduce((acc, resident) => {
      const status = resident.employment_status || 'Unknown';
      acc[status] = (acc[status] || 0) + 1;
      return acc;
    }, {});

    return Object.entries(employmentCounts).map(([name, value]) => ({ name, value }));
  }, [residents]);

  if (isLoading) return <Skeleton className="h-[300px] w-full" />;
  if (data.length === 0) return <div className="h-[300px] flex items-center justify-center text-slate-500">No data available.</div>;

  return (
    <div style={{ width: '100%', height: 300 }}>
      <ResponsiveContainer>
        <PieChart>
          <Pie data={data} cx="50%" cy="50%" labelLine={false} outerRadius={100} fill="#8884d8" dataKey="value" nameKey="name">
            {data.map((entry, index) => <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />)}
          </Pie>
          <Tooltip />
          <Legend />
        </PieChart>
      </ResponsiveContainer>
    </div>
  );
}