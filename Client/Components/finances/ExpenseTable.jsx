import React from "react";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import Badge from "@/components/ui/badge";
import Skeleton from "@/components/ui/skeleton";
import { format } from "date-fns";

export default function ExpenseTable({ expenses, isLoading }) {
  return (
    <div className="overflow-x-auto">
      <Table>
        <TableHeader className="bg-slate-50">
          <TableRow>
            <TableHead>Date</TableHead>
            <TableHead>Category</TableHead>
            <TableHead>Description</TableHead>
            <TableHead className="text-right">Amount</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {isLoading ? (
            Array(5).fill(0).map((_, i) => (
              <TableRow key={i}>
                <TableCell><Skeleton className="h-4 w-24" /></TableCell>
                <TableCell><Skeleton className="h-6 w-28 rounded-full" /></TableCell>
                <TableCell><Skeleton className="h-4 w-40" /></TableCell>
                <TableCell className="text-right"><Skeleton className="h-4 w-20 ml-auto" /></TableCell>
              </TableRow>
            ))
          ) : expenses.length === 0 ? (
            <TableRow><TableCell colSpan={4} className="text-center h-24">No expenses logged yet.</TableCell></TableRow>
          ) : (
            expenses.map((expense) => (
              <TableRow key={expense.id}>
                <TableCell>{format(new Date(expense.date), "MMM d, yyyy")}</TableCell>
                <TableCell><Badge variant="outline">{expense.category}</Badge></TableCell>
                <TableCell>{expense.description}</TableCell>
                <TableCell className="text-right font-medium">${expense.amount.toFixed(2)}</TableCell>
              </TableRow>
            ))
          )}
        </TableBody>
      </Table>
    </div>
  );
}