import React, { useState, useEffect, useMemo } from "react";
import { Expense } from "@/entities/all";
import { Button } from "@/components/ui/button";
import { Plus, DollarSign, Receipt, TrendingDown } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import StatsCard from "../components/dashboard/StatsCard";
import ExpenseTable from "../components/finances/ExpenseTable";
import AddExpenseDialog from "../components/finances/AddExpenseDialog";
import FinancialSummaryChart from "../components/finances/FinancialSummaryChart";

export default function Finances() {
  const [expenses, setExpenses] = useState([]);
  const [showAddDialog, setShowAddDialog] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    loadExpenses();
  }, []);

  const loadExpenses = async () => {
    setIsLoading(true);
    const data = await Expense.list("-date");
    setExpenses(data);
    setIsLoading(false);
  };

  const handleAddExpense = async (expenseData) => {
    await Expense.create(expenseData);
    loadExpenses();
    setShowAddDialog(false);
  };

  const stats = useMemo(() => {
    const totalExpenses = expenses.reduce((sum, e) => sum + e.amount, 0);
    
    const currentMonth = new Date().getMonth();
    const monthlyExpenses = expenses
      .filter(e => new Date(e.date).getMonth() === currentMonth)
      .reduce((sum, e) => sum + e.amount, 0);

    return { totalExpenses, monthlyExpenses, expenseCount: expenses.length };
  }, [expenses]);

  return (
    <div className="p-6 bg-slate-50 min-h-screen">
      <div className="max-w-7xl mx-auto space-y-8">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
          <div>
            <h1 className="text-3xl font-bold text-slate-900">Financial Management</h1>
            <p className="text-slate-600 mt-1">Track program expenses and monitor budget.</p>
          </div>
          <Button onClick={() => setShowAddDialog(true)} className="bg-navy-600 hover:bg-navy-700 text-white"><Plus className="w-4 h-4 mr-2" />Log New Expense</Button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <StatsCard title="Total Expenses (All Time)" value={`$${stats.totalExpenses.toLocaleString()}`} icon={DollarSign} color="purple" isLoading={isLoading} />
          <StatsCard title="This Month's Expenses" value={`$${stats.monthlyExpenses.toLocaleString()}`} icon={TrendingDown} color="red" isLoading={isLoading} />
          <StatsCard title="Total Transactions" value={stats.expenseCount} icon={Receipt} color="blue" isLoading={isLoading} />
        </div>

        <div className="grid lg:grid-cols-5 gap-6">
          <Card className="lg:col-span-3">
            <CardHeader><CardTitle>Recent Expenses</CardTitle></CardHeader>
            <CardContent><ExpenseTable expenses={expenses.slice(0, 10)} isLoading={isLoading} /></CardContent>
          </Card>
          <Card className="lg:col-span-2">
            <CardHeader><CardTitle>Spending by Category</CardTitle></CardHeader>
            <CardContent><FinancialSummaryChart expenses={expenses} isLoading={isLoading} /></CardContent>
          </Card>
        </div>
        
        <AddExpenseDialog open={showAddDialog} onClose={() => setShowAddDialog(false)} onSubmit={handleAddExpense} />
      </div>
      <style jsx>{`
        .bg-navy-600 { background-color: #475569; }
        .hover\\:bg-navy-700:hover { background-color: #334155; }
      `}</style>
    </div>
  );
}