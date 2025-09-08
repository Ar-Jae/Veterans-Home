import React from "react";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "../ui/table";
import { Badge } from "@/components/ui/badge";
import { Skeleton } from "@/components/ui/skeleton";
import { format } from "date-fns";

const sourceColors = {
  'VA Per Diem': 'bg-blue-100 text-blue-800 border-blue-200',
  'State Housing Voucher': 'bg-purple-100 text-purple-800 border-purple-200',
  'Grant Funding': 'bg-green-100 text-green-800 border-green-200',
  'Resident Fee': 'bg-orange-100 text-orange-800 border-orange-200',
  'Donation': 'bg-pink-100 text-pink-800 border-pink-200',
  'Fundraising': 'bg-yellow-100 text-yellow-800 border-yellow-200',
  'Other': 'bg-gray-100 text-gray-800 border-gray-200'
};

const statusColors = {
  'Pending': 'bg-yellow-100 text-yellow-800',
  'Received': 'bg-green-100 text-green-800',
  'Processed': 'bg-blue-100 text-blue-800',
  'Failed': 'bg-red-100 text-red-800'
};

export default function PaymentTable({ payments, isLoading }) {
  return (
    <div className="overflow-x-auto">
      <Table>
        <TableHeader className="bg-slate-50">
          <TableRow>
            <TableHead>Date</TableHead>
            <TableHead>Payer</TableHead>
            <TableHead>Source</TableHead>
            <TableHead>Amount</TableHead>
            <TableHead>Status</TableHead>
            <TableHead>Reference</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {isLoading ? (
            Array(5).fill(0).map((_, i) => (
              <TableRow key={i}>
                <TableCell><Skeleton className="h-4 w-24" /></TableCell>
                <TableCell><Skeleton className="h-4 w-32" /></TableCell>
                <TableCell><Skeleton className="h-6 w-28 rounded-full" /></TableCell>
                <TableCell><Skeleton className="h-4 w-20" /></TableCell>
                <TableCell><Skeleton className="h-6 w-20 rounded-full" /></TableCell>
                <TableCell><Skeleton className="h-4 w-16" /></TableCell>
              </TableRow>
            ))
          ) : payments.length === 0 ? (
            <TableRow>
              <TableCell colSpan={6} className="text-center h-24">No payments recorded yet.</TableCell>
            </TableRow>
          ) : (
            payments.map((payment) => (
              <TableRow key={payment.id}>
                <TableCell>{format(new Date(payment.date_received), "MMM d, yyyy")}</TableCell>
                <TableCell className="font-medium">
                  <div>
                    <p>{payment.payer_name}</p>
                    {payment.resident_name && (
                      <p className="text-xs text-slate-500">for {payment.resident_name}</p>
                    )}
                  </div>
                </TableCell>
                <TableCell>
                  <Badge variant="outline" className={sourceColors[payment.payment_source]}>
                    {payment.payment_source}
                  </Badge>
                </TableCell>
                <TableCell className="font-semibold text-green-600">
                  ${payment.amount.toFixed(2)}
                </TableCell>
                <TableCell>
                  <Badge variant="outline" className={statusColors[payment.status]}>
                    {payment.status}
                  </Badge>
                </TableCell>
                <TableCell className="text-sm text-slate-600">
                  {payment.reference_number || '-'}
                </TableCell>
              </TableRow>
            ))
          )}
        </TableBody>
      </Table>
    </div>
  );
}