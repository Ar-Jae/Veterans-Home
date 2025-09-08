import React, { useMemo } from "react";
import { PieChart, Pie, Cell, Tooltip, Legend, ResponsiveContainer } from "recharts";
import Skeleton from "@/components/ui/skeleton";

const COLORS = ['#10b981', '#3b82f6', '#8b5cf6', '#f59e0b', '#ef4444', '#06b6d4', '#6b7280'];

export default function PaymentSourceChart({ payments, isLoading }) {
  const data = useMemo(() => {
    if (!payments || payments.length === 0) return [];
    
    const sourceTotals = payments.reduce((acc, payment) => {
      acc[payment.payment_source] = (acc[payment.payment_source] || 0) + payment.amount;
      return acc;
    }, {});

    return Object.entries(sourceTotals)
      .map(([name, value]) => ({ name, value }))
      .sort((a, b) => b.value - a.value);
  }, [payments]);

  if (isLoading) {
    return <Skeleton className="h-[350px] w-full" />;
  }
  
  if (data.length === 0) {
    return (
      <div className="h-[350px] flex items-center justify-center text-slate-500">
        No payment data to display.
      </div>
    );
  }

  return (
    <div style={{ width: '100%', height: 350 }}>
      <ResponsiveContainer>
        <PieChart>
          <Pie
            data={data}
            cx="50%"
            cy="50%"
            labelLine={false}
            outerRadius={120}
            fill="#8884d8"
            dataKey="value"
            nameKey="name"
          >
            {data.map((entry, index) => (
              <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
            ))}
          </Pie>
          <Tooltip formatter={(value) => `$${Number(value).toLocaleString()}`} />
          <Legend />
        </PieChart>
      </ResponsiveContainer>
    </div>
  );
}