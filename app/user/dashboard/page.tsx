"use client";

import { useUserDashboardStats } from "@/hooks/useUserDashboardStats";
import { useAuth } from "@/context/AuthContext";
import UserSidebar from "@/components/User-siderbar";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  Loader2,
  FileText,
  TrendingUp,
  Clock,
  BadgeCheck,
  Wallet,
} from "lucide-react";
import { Badge } from "@/components/ui/badge";
import clsx from "clsx";
import { getStatusColor } from "@/utils/ColorCode";

export default function UserDashboard() {
  const { user } = useAuth();
  const { data, isPending } = useUserDashboardStats();

  return (
    <div className="flex min-h-screen bg-gray-50">
      <UserSidebar />
      <main className="flex-1 p-6 md:ml-64 space-y-10">
        <header>
          <h1 className="text-3xl font-bold text-gray-900">
            Welcome back, {user?.name}!
          </h1>
          <p className="text-gray-600 mt-1">
            Here&apos;s an overview of your loan activity.
          </p>
        </header>

        {isPending ? (
          <div className="flex justify-center items-center min-h-[200px]">
            <Loader2 className="h-6 w-6 animate-spin text-primary" />
          </div>
        ) : (
          <>
            {/* Stats Cards */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              <StatCard
                title="Total Loans"
                value={data?.total_loans}
                icon={<FileText />}
              />
              <StatCard
                title="Active Loans"
                value={data?.active_loans}
                icon={<TrendingUp className="text-blue-600" />}
              />
              <StatCard
                title="Pending Loans"
                value={data?.pending_loans}
                icon={<Clock className="text-yellow-600" />}
              />
              <StatCard
                title="Repaid Loans"
                value={data?.repaid_loans}
                icon={<BadgeCheck className="text-green-600" />}
              />
              <StatCard
                title="Total Paid"
                value={`₦${Number(
                  data?.total_paid_amount || 0
                ).toLocaleString()}`}
                icon={<TrendingUp className="text-emerald-600" />}
              />
              <StatCard
                title="Outstanding Balance"
                value={`₦${Number(
                  data?.total_outstanding_balance || 0
                ).toLocaleString()}`}
                icon={<Wallet className="text-red-600" />}
              />
            </div>

            {/* Recent Loan Applications */}
            <section>
              <h2 className="text-xl font-semibold mb-4">
                Recent Loan Applications
              </h2>
              {data?.recent_loans?.length === 0 ? (
                <p className="text-gray-500">No recent loan applications.</p>
              ) : (
                <div className="space-y-4">
                  {data?.recent_loans?.map((loan) => (
                    <div
                      key={loan.id}
                      className="border rounded p-4 bg-white shadow-sm flex flex-col sm:flex-row sm:items-center sm:justify-between"
                    >
                      <div>
                        <p className="font-semibold">
                          {loan.loan_product.name}
                        </p>
                        <p className="text-sm text-gray-500">
                          ₦{Number(loan.amount).toLocaleString()} •{" "}
                          {new Date(loan.created_at).toLocaleDateString()}
                        </p>
                      </div>
                      <Badge
                        className={clsx(
                          "mt-2 sm:mt-0 text-sm px-3 py-1 rounded-full font-medium",
                          getStatusColor(loan.status)
                        )}
                      >
                        {loan.status.charAt(0).toUpperCase() +
                          loan.status.slice(1)}
                      </Badge>
                    </div>
                  ))}
                </div>
              )}
            </section>
          </>
        )}
      </main>
    </div>
  );
}

// ✅ Helper Component for Stat Cards
function StatCard({
  title,
  value,
  icon,
}: {
  title: string;
  value: string | number | undefined;
  icon?: React.ReactNode;
}) {
  return (
    <Card>
      <CardHeader className="flex items-center justify-between pb-2">
        <CardTitle className="text-sm font-medium">{title}</CardTitle>
        {icon}
      </CardHeader>
      <CardContent>
        <div className="text-3xl font-bold">{value ?? "—"}</div>
      </CardContent>
    </Card>
  );
}
