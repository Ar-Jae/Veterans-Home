import React, { useState, useEffect, useMemo } from "react";
import { Payment, Resident } from "@/entities/all";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Plus, Search, CreditCard, TrendingUp, DollarSign } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import StatsCard from "../components/dashboard/StatsCard";
import PaymentTable from "../components/payments/PaymentTable";
import AddPaymentDialog from "../components/payments/AddPaymentDialog";
import PaymentSourceChart from "../components/payments/PaymentSourceChart";

export default function Payments() {
  const [payments, setPayments] = useState([]);
  const [residents, setResidents] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [sourceFilter, setSourceFilter] = useState("all");
  const [showAddDialog, setShowAddDialog] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    loadData();
  }, []);

  const loadData = async () => {
    setIsLoading(true);
    try {
      const [paymentsData, residentsData] = await Promise.all([
        Payment.list("-date_received"),
        Resident.list()
      ]);
      setPayments(paymentsData);
      setResidents(residentsData);
    } catch (error) {
      console.error("Error loading data:", error);
    }
    setIsLoading(false);
  };

  const handleAddPayment = async (paymentData) => {
    await Payment.create(paymentData);
    loadData();
    setShowAddDialog(false);
  };

  const filteredPayments = useMemo(() => {
    let filtered = payments.map(payment => {
      const resident = residents.find(r => r.id === payment.resident_id);
      return {
        ...payment,
        resident_name: resident ? `${resident.first_name} ${resident.last_name}` : null
      };
    });

    if (searchTerm) {
      const lowercasedSearch = searchTerm.toLowerCase();
      filtered = filtered.filter(payment =>
        payment.payer_name.toLowerCase().includes(lowercasedSearch) ||
        payment.description?.toLowerCase().includes(lowercasedSearch) ||
        payment.reference_number?.toLowerCase().includes(lowercasedSearch)
      );
    }

    if (sourceFilter !== "all") {
      filtered = filtered.filter(payment => payment.payment_source === sourceFilter);
    }

    return filtered;
  }, [payments, residents, searchTerm, sourceFilter]);

  const stats = useMemo(() => {
    const totalRevenue = payments.reduce((sum, p) => sum + p.amount, 0);
    
    const currentMonth = new Date().getMonth();
    const monthlyRevenue = payments
      .filter(p => new Date(p.date_received).getMonth() === currentMonth)
      .reduce((sum, p) => sum + p.amount, 0);

    const averagePayment = payments.length > 0 ? totalRevenue / payments.length : 0;

    return { totalRevenue, monthlyRevenue, averagePayment, paymentCount: payments.length };
  }, [payments]);

  return (
    <div className="p-6 bg-slate-50 min-h-screen">
      <div className="max-w-7xl mx-auto space-y-8">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
          <div>
            <h1 className="text-3xl font-bold text-slate-900">Payment Management</h1>
            <p className="text-slate-600 mt-1">Track all revenue sources and payment collection</p>
          </div>
          <Button 
            onClick={() => setShowAddDialog(true)}
            className="bg-green-600 hover:bg-green-700 text-white"
          >
            <Plus className="w-4 h-4 mr-2" />
            Record Payment
          </Button>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          <StatsCard
            title="Total Revenue"
            value={`$${stats.totalRevenue.toLocaleString()}`}
            subtitle="all time"
            icon={DollarSign}
            color="green"
            isLoading={isLoading}
          />
          <StatsCard
            title="Monthly Revenue"
            value={`$${stats.monthlyRevenue.toLocaleString()}`}
            subtitle="this month"
            icon={TrendingUp}
            color="blue"
            isLoading={isLoading}
          />
          <StatsCard
            title="Average Payment"
            value={`$${stats.averagePayment.toLocaleString()}`}
            subtitle="per transaction"
            icon={CreditCard}
            color="purple"
            isLoading={isLoading}
          />
          <StatsCard
            title="Total Payments"
            value={stats.paymentCount}
            subtitle="transactions"
            icon={CreditCard}
            color="indigo"
            isLoading={isLoading}
          />
        </div>

        {/* Filters */}
        <Card>
          <CardContent className="p-6">
            <div className="flex flex-col md:flex-row gap-4">
              <div className="relative flex-1">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-slate-400" />
                <Input
                  placeholder="Search by payer name, description, or reference..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="pl-10"
                />
              </div>
              <div className="flex gap-2 flex-wrap">
                {['all', 'VA Per Diem', 'State Housing Voucher', 'Grant Funding', 'Resident Fee', 'Donation'].map((source) => (
                  <Button
                    key={source}
                    variant={sourceFilter === source ? "default" : "outline"}
                    size="sm"
                    onClick={() => setSourceFilter(source)}
                    className={sourceFilter === source ? "bg-green-600 hover:bg-green-700" : ""}
                  >
                    {source === 'all' ? 'All Sources' : source}
                  </Button>
                ))}
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Main Content */}
        <div className="grid lg:grid-cols-5 gap-6">
          <Card className="lg:col-span-3">
            <CardHeader>
              <CardTitle>Recent Payments</CardTitle>
            </CardHeader>
            <CardContent>
              <PaymentTable payments={filteredPayments} isLoading={isLoading} />
            </CardContent>
          </Card>
          
          <Card className="lg:col-span-2">
            <CardHeader>
              <CardTitle>Revenue by Source</CardTitle>
            </CardHeader>
            <CardContent>
              <PaymentSourceChart payments={payments} isLoading={isLoading} />
            </CardContent>
          </Card>
        </div>

        <AddPaymentDialog
          open={showAddDialog}
          onClose={() => setShowAddDialog(false)}
          onSubmit={handleAddPayment}
          residents={residents}
        />
      </div>
    </div>
  );
}