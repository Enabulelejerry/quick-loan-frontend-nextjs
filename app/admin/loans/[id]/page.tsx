"use client";

import { useParams } from "next/navigation";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

import { Badge } from "@/components/ui/badge";
import { Label } from "@/components/ui/label";
import { ArrowLeft, User, Mail, House } from "lucide-react";
import Link from "next/link";
import AdminSideBar from "@/components/Admin-sidebar";
import { useAdminLoanApplication } from "@/hooks/useAdminAllApplications";
import { getStatusColor } from "@/utils/ColorCode";
import AdminLoanAction from "@/components/AdminLoanAction";
import GlobalLoading from "@/components/Global/Loading";

export default function AdminLoanDetailPage() {
  const { id } = useParams();
  const { data: loan, isPending } = useAdminLoanApplication(id as string);

  return (
    <div className="flex h-screen bg-gray-50">
      <AdminSideBar />

      <div className="flex-1 md:ml-64">
        <main className="flex-1 p-4 md:p-8">
          <div className="max-w-7xl mx-auto">
            {/* Header */}
            <div className="mb-8">
              <Link
                href="/admin/loans"
                className="inline-flex items-center text-primary hover:text-primary/80 mb-4"
              >
                <ArrowLeft className="h-4 w-4 mr-2" />
                Back to Applications
              </Link>
              <div className="flex items-center justify-between">
                <div>
                  <h1 className="text-3xl font-bold text-gray-900">
                    Loan Application Review
                  </h1>
                  <p className="text-gray-600">Application ID: 000{loan?.id}</p>
                </div>
                {loan?.status && (
                  <Badge
                    className={`text-sm px-3 py-1 rounded-full ${getStatusColor(
                      loan.status
                    )}`}
                  >
                    {loan.status.charAt(0).toUpperCase() + loan.status.slice(1)}
                  </Badge>
                )}
              </div>
            </div>
            {isPending ? (
              <div className="flex items-center justify-center h-60">
                <GlobalLoading />
              </div>
            ) : (
              <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                {/* Main Content */}
                <div className="lg:col-span-2 space-y-6">
                  {/* Applicant Information */}
                  <Card className="w-full">
                    <CardHeader>
                      <CardTitle className="flex items-center gap-2 text-xl font-bold">
                        <User className="h-5 w-5" />
                        Applicant Information
                      </CardTitle>
                    </CardHeader>
                    <CardContent>
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <div className="space-y-4">
                          <div>
                            <Label className="text-sm font-medium text-gray-600">
                              Full Name
                            </Label>
                            <p className="text-lg font-semibold text-gray-900">
                              {loan?.user.name}
                            </p>
                          </div>
                          <div>
                            <Label className="text-sm font-medium text-gray-600">
                              Email
                            </Label>
                            <div className="flex items-center gap-2 text-gray-800">
                              <Mail className="h-4 w-4 text-gray-500" />
                              <span>{loan?.user.email}</span>
                            </div>
                          </div>
                        </div>
                      </div>
                    </CardContent>
                  </Card>

                  {/* Loan Details */}
                  <Card>
                    <CardHeader>
                      <CardTitle className="flex items-center gap-2">
                        <House className="h-5 w-5" />
                        Loan Details
                      </CardTitle>
                    </CardHeader>
                    <CardContent>
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <div className="space-y-4">
                          <div>
                            <Label className="text-sm font-medium text-gray-600">
                              Loan Type
                            </Label>
                            <p className="text-lg font-semibold">
                              {loan?.loan_product.name}
                            </p>
                          </div>
                          <div>
                            <Label className="text-sm font-medium text-gray-600">
                              Requested Amount
                            </Label>
                            <p className="text-2xl font-bold text-primary">
                              N{loan?.amount.toLocaleString()}
                            </p>
                          </div>
                          <div>
                            <Label className="text-sm font-medium text-gray-600">
                              Purpose
                            </Label>
                            <p>{loan?.purpose}</p>
                          </div>
                        </div>
                        <div className="space-y-4">
                          <div>
                            <Label className="text-sm font-medium text-gray-600">
                              Interest Rate
                            </Label>
                            <p className="text-lg font-semibold">
                              {loan?.interest_rate}%
                            </p>
                          </div>
                          <div>
                            <Label className="text-sm font-medium text-gray-600">
                              Duration
                            </Label>
                            <p className="text-lg font-semibold">
                              {loan?.duration_days}days{" "}
                            </p>
                          </div>
                          <div>
                            <Label className="text-sm font-medium text-gray-600">
                              Monthly Payment
                            </Label>
                            <p className="text-lg font-semibold">
                              ₦{loan?.repayment_schedules?.[0]?.amount_due || 0}
                            </p>
                          </div>
                        </div>
                      </div>
                    </CardContent>
                  </Card>

                  {/* Repayment Schedule */}
                  <Card>
                    <CardHeader>
                      <CardTitle>Proposed Repayment Schedule</CardTitle>
                      <CardDescription>
                        Monthly payment breakdown if approved
                      </CardDescription>
                    </CardHeader>
                    <CardContent>
                      <div className="overflow-x-auto">
                        <table className="w-full text-sm">
                          <thead>
                            <tr className="border-b">
                              <th className="text-left py-2">days</th>
                              <th className="text-left py-2">Due Date</th>
                              <th className="text-right py-2">Payment</th>
                              <th className="text-right py-2">Principal</th>
                              <th className="text-right py-2">Status</th>
                            </tr>
                          </thead>
                          <tbody>
                            {loan?.repayment_schedules?.length ? (
                              loan.repayment_schedules.map((payment, index) => (
                                <tr key={payment.id} className="border-b">
                                  <td className="py-2">{index + 1}</td>
                                  <td className="py-2">
                                    {new Date(
                                      payment.due_date
                                    ).toLocaleDateString()}
                                  </td>

                                  <td className="py-2 text-right font-medium">
                                    ₦{Number(payment.amount_due).toFixed(2)}
                                  </td>
                                  <td className="py-2 text-right">
                                    ₦{Number(loan.amount).toFixed(2)}
                                  </td>
                                  <td className="py-2 text-right">
                                    <div
                                      className={`inline-flex items-center gap-1 px-2 py-1 rounded-full text-xs ${getStatusColor(
                                        payment.status
                                      )}`}
                                    >
                                      {payment.status.charAt(0).toUpperCase() +
                                        payment.status.slice(1)}
                                    </div>
                                  </td>
                                </tr>
                              ))
                            ) : (
                              <tr>
                                <td
                                  colSpan={5}
                                  className="text-center py-4 text-muted-foreground"
                                >
                                  No repayment schedule found.
                                </td>
                              </tr>
                            )}
                          </tbody>
                        </table>
                        <p className="text-sm text-gray-600 mt-2">
                          Full schedule available after approval.
                        </p>
                      </div>
                    </CardContent>
                  </Card>
                </div>

                {/* Sidebar */}
                <div className="space-y-6">
                  {/* Decision Actions */}
                  {loan?.status === "pending" && (
                    <AdminLoanAction loanId={id as string} />
                  )}
                </div>
              </div>
            )}
          </div>
        </main>
      </div>
    </div>
  );
}
