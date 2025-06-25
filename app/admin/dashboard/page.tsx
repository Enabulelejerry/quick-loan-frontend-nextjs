"use client";
import AdminSideBar from "@/components/Admin-sidebar";
import GlobalLoading from "@/components/Global/Loading";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { useAdminDashboardStats } from "@/hooks/useAdminDashboardStats";
import { getColor } from "@/utils/ColorCode";
import { FileText, TrendingUp, Users } from "lucide-react";
import Link from "next/link";
import React from "react";

function DashboardPage() {
  const { data, isPending } = useAdminDashboardStats();
  return (
    <div className="flex h-screen bg-gray-50">
      <AdminSideBar />

      <div className="flex-1 md:ml-64">
        <main className="flex-1 p-4 md:p-8">
          {/* Header */}
          <div className="mb-8">
            <h1 className="text-3xl font-bold text-gray-900">
              Admin Dashboard
            </h1>
            <p className="text-gray-600">
              Overview of loan applications and system metrics
            </p>
          </div>
          {isPending ? (
            <div className="flex items-center justify-center h-60">
              <GlobalLoading />
            </div>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
              {/* Total Loans */}
              <Card>
                <CardHeader className="flex items-center justify-between pb-2">
                  <CardTitle className="text-sm font-medium">
                    Total Loans
                  </CardTitle>
                  <TrendingUp className="h-5 w-5 text-green-600" />
                </CardHeader>
                <CardContent>
                  <p className="text-3xl font-bold">
                    {data?.total_loan_applications}
                  </p>
                </CardContent>
              </Card>

              {/* Active Users */}
              <Card>
                <CardHeader className="flex items-center justify-between pb-2">
                  <CardTitle className="text-sm font-medium">
                    Active Users
                  </CardTitle>
                  <Users className="h-5 w-5 text-blue-600" />
                </CardHeader>
                <CardContent>
                  <p className="text-3xl font-bold">{data?.total_users}</p>
                </CardContent>
              </Card>

              {/* Loan Products */}
              <Card>
                <CardHeader className="flex items-center justify-between pb-2">
                  <CardTitle className="text-sm font-medium">
                    Loan Products
                  </CardTitle>
                  <FileText className="h-5 w-5 text-yellow-600" />
                </CardHeader>
                <CardContent>
                  <p className="text-3xl font-bold">
                    {data?.total_loan_products}
                  </p>
                </CardContent>
              </Card>

              {/* Pending Loans */}
              <Card>
                <CardHeader className="flex items-center justify-between pb-2">
                  <CardTitle className="text-sm font-medium">
                    Pending Loans
                  </CardTitle>
                  <FileText className="h-5 w-5 text-red-600" />
                </CardHeader>
                <CardContent>
                  <p className="text-3xl font-bold">
                    {data?.total_pending_loans}
                  </p>
                </CardContent>
              </Card>
            </div>
          )}

          <div>
            {/* Recent Applications */}
            <div>
              <Card>
                <CardHeader>
                  <div className="flex items-center justify-between">
                    <div>
                      <CardTitle>Recent Applications</CardTitle>
                      <CardDescription>
                        Latest loan applications requiring review
                      </CardDescription>
                    </div>
                    <Link href="/admin/loans">
                      <Button variant="outline" size="sm">
                        View All
                      </Button>
                    </Link>
                  </div>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {data?.recent_loans.map((application) => (
                      <div
                        key={application.id}
                        className="flex items-center justify-between p-4 border rounded-lg hover:bg-gray-50"
                      >
                        <div className="flex-1">
                          <div className="flex items-center gap-2 mb-1">
                            <h4 className="font-semibold">
                              {application.user.name}
                            </h4>
                            <Badge variant={getColor(application.status)}>
                              <span className="ml-1">{application.status}</span>
                            </Badge>
                          </div>
                          <p className="text-sm text-gray-600 mb-1">
                            {application.loan_product.name} - N
                            {application.amount.toLocaleString()}
                          </p>
                          <div className="flex items-center gap-4 text-xs text-gray-500">
                            <span>ID: {application.id}</span>
                            <span>Credit: {application.loan_score.score}</span>
                            <span>
                              Applied:{" "}
                              {new Date(
                                application.created_at
                              ).toLocaleDateString()}
                            </span>
                          </div>
                        </div>
                        <Link href={`/admin/loans/${application.id}`}>
                          <Button variant="outline" size="sm">
                            Review
                          </Button>
                        </Link>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        </main>
      </div>
    </div>
  );
}

export default DashboardPage;
