"use client";

import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import {
  ArrowLeft,
  Calendar,
  DollarSign,
  Percent,
  Clock,
  CheckCircle,
  AlertCircle,
} from "lucide-react";
import Link from "next/link";
import { useParams } from "next/navigation";
import { useAuthUserLoan } from "@/hooks/useAuthUserLoans";
import UserSidebar from "@/components/User-siderbar";
import GlobalLoading from "@/components/Global/Loading";

import { getStatusColor } from "@/utils/ColorCode";
import MakePaymentButton from "@/components/MakePaymentButton";
import { useAuth } from "@/context/AuthContext";

export default function LoanDetailPage() {
  const { id } = useParams();
  const { data: loan, isPending } = useAuthUserLoan(id as string);
  const { user } = useAuth();

  const totalPaid =
    loan?.repayment_schedules
      ?.filter((s) => s.status === "paid")
      .reduce((sum, s) => sum + parseFloat(s.amount_due), 0) ?? 0;

  const totalLoanAmount = loan?.amount;
  const progressPercentage =
    totalLoanAmount && totalLoanAmount > 0
      ? (totalPaid / totalLoanAmount) * 100
      : 0;

  const totalDue = Number(loan?.repayment_due) || 0;
  const remainingBalance = totalDue - totalPaid;

  const getStatusIcon = (status: string) => {
    switch (status) {
      case "paid":
        return <CheckCircle className="h-4 w-4 text-green-600" />;
      case "due":
        return <AlertCircle className="h-4 w-4 text-red-600" />;
      case "upcoming":
        return <Clock className="h-4 w-4 text-gray-400" />;
      default:
        return <Clock className="h-4 w-4 text-gray-400" />;
    }
  };

  return (
    <div className="flex flex-col md:flex-row min-h-screen bg-gray-50">
      <UserSidebar />

      <div className="flex-1 md:ml-64">
        <main className="flex-1 p-4 md:p-8">
          <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
            {/* Header */}
            <div className="mb-8">
              <Link
                href="/user/history"
                className="inline-flex items-center text-primary hover:text-primary/80 mb-4"
              >
                <ArrowLeft className="h-4 w-4 mr-2" />
                Back to Loan History
              </Link>
              <h1 className="text-2xl sm:text-3xl font-bold text-gray-900">
                Loan Details
              </h1>
              <p className="text-gray-600">
                Complete information about your loan
              </p>
            </div>

            {isPending ? (
              <div className="flex items-center justify-center h-60">
                <GlobalLoading />
              </div>
            ) : (
              <div>
                <Card className="mb-5">
                  <CardHeader>
                    <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                      <div>
                        <CardTitle className="flex items-center gap-2">
                          {loan?.loan_product.name}
                          <Badge className={getStatusColor(loan?.status || "")}>
                            {loan?.status}
                          </Badge>
                        </CardTitle>
                        <CardDescription>
                          Loan ID: 000{loan?.id}
                        </CardDescription>
                      </div>
                      <div className="text-left sm:text-right">
                        <p className="text-2xl font-bold text-primary">
                          N{loan?.amount.toLocaleString()}
                        </p>
                        <p className="text-sm text-gray-600">Original Amount</p>
                      </div>
                    </div>
                  </CardHeader>
                  <CardContent>
                    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4 mb-6">
                      <div className="flex items-center gap-2">
                        <Percent className="h-4 w-4 text-gray-400" />
                        <div>
                          <p className="text-sm text-gray-600">Interest Rate</p>
                          <p className="font-semibold">
                            {loan?.interest_rate}%
                          </p>
                        </div>
                      </div>
                      <div className="flex items-center gap-2">
                        <Clock className="h-4 w-4 text-gray-400" />
                        <div>
                          <p className="text-sm text-gray-600">Duration</p>
                          <p className="font-semibold">
                            {loan?.duration_days} days
                          </p>
                        </div>
                      </div>
                      <div className="flex items-center gap-2">
                        <DollarSign className="h-4 w-4 text-gray-400" />
                        <div>
                          <p className="text-sm text-gray-600">Daily Payment</p>
                          <p className="font-semibold">
                            ₦{loan?.repayment_schedules?.[0]?.amount_due || 0}
                          </p>
                        </div>
                      </div>
                      <div className="flex items-center gap-2">
                        <Calendar className="h-4 w-4 text-gray-400" />
                        <div>
                          <p className="text-sm text-gray-600">Next Payment</p>
                          <p className="font-semibold">
                            {new Date(
                              loan?.repayment_schedules?.[0]?.due_date || ""
                            ).toLocaleDateString()}
                          </p>
                        </div>
                      </div>
                    </div>

                    <div className="space-y-4">
                      <div>
                        <div className="flex justify-between text-sm mb-2">
                          <span>Loan Progress</span>
                          <span>{progressPercentage.toFixed(1)}% paid</span>
                        </div>
                        <Progress value={progressPercentage} className="h-2" />
                      </div>

                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 p-4 bg-gray-50 rounded-lg">
                        <div>
                          <p className="text-sm text-gray-600">Total Paid</p>
                          <p className="text-lg font-semibold text-green-600">
                            N{totalPaid.toLocaleString()}
                          </p>
                        </div>
                        <div>
                          <p className="text-sm text-gray-600">
                            Remaining Balance
                          </p>
                          <p className="text-lg font-semibold text-primary">
                            N{remainingBalance.toLocaleString()}
                          </p>
                        </div>
                      </div>

                      <div>
                        <p className="text-sm text-gray-600 mb-1">
                          Loan Purpose
                        </p>
                        <p className="text-gray-900">{loan?.purpose}</p>
                      </div>
                    </div>
                  </CardContent>
                </Card>

                {/* Repayment Schedule */}
                <Card>
                  <CardHeader>
                    <CardTitle>Repayment Schedule</CardTitle>
                    <CardDescription>
                      Your monthly payment breakdown and schedule
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    {/* DESKTOP TABLE (hidden on small screens) */}
                    <div className="hidden md:block overflow-x-auto">
                      <table className="w-full text-sm">
                        <thead>
                          <tr className="border-b">
                            <th className="text-left py-2">Day</th>
                            <th className="text-left py-2">Due Date</th>
                            <th className="text-right py-2">Payment</th>
                            <th className="text-right py-2">Principal</th>
                            <th className="text-center py-2">Status</th>
                            <th className="text-left py-2">Action</th>
                          </tr>
                        </thead>
                        <tbody>
                          {loan?.repayment_schedules?.map((payment, index) => (
                            <tr
                              key={payment.id}
                              className="border-b hover:bg-gray-50"
                            >
                              <td className="py-3">{index + 1}</td>
                              <td className="py-3">
                                {new Date(
                                  payment?.due_date
                                ).toLocaleDateString()}
                              </td>
                              <td className="py-3 text-right font-medium">
                                N{payment?.amount_due}
                              </td>
                              <td className="py-3 text-right">
                                N{loan?.amount}
                              </td>
                              <td className="py-3 text-center">
                                <div
                                  className={`inline-flex items-center gap-1 px-2 py-1 rounded-full text-xs ${getStatusColor(
                                    payment.status
                                  )}`}
                                >
                                  {getStatusIcon(payment.status)}
                                  {payment.status.charAt(0).toUpperCase() +
                                    payment.status.slice(1)}
                                </div>
                              </td>
                              <td className="py-3">
                                {payment.status === "approved" && (
                                  <MakePaymentButton
                                    email={user?.email || ""}
                                    amount={Number(payment.amount_due)}
                                    repaymentScheduleId={payment.id}
                                  />
                                )}
                              </td>
                            </tr>
                          ))}
                        </tbody>
                      </table>
                    </div>

                    {/* MOBILE STACKED VIEW (visible only on small screens) */}
                    <div className="md:hidden space-y-4">
                      {loan?.repayment_schedules?.map((payment, index) => (
                        <div
                          key={payment.id}
                          className="border p-4 rounded-lg shadow-sm bg-white"
                        >
                          <p className="text-sm text-gray-500">
                            <strong>Day:</strong> {index + 1}
                          </p>
                          <p className="text-sm text-gray-500">
                            <strong>Due Date:</strong>{" "}
                            {new Date(payment?.due_date).toLocaleDateString()}
                          </p>
                          <p className="text-sm text-gray-500">
                            <strong>Payment:</strong> N{payment?.amount_due}
                          </p>
                          <p className="text-sm text-gray-500">
                            <strong>Principal:</strong> N{loan?.amount}
                          </p>
                          <div className="flex items-center gap-2 mt-2">
                            <span
                              className={`inline-flex items-center gap-1 px-2 py-1 rounded-full text-xs ${getStatusColor(
                                payment.status
                              )}`}
                            >
                              {getStatusIcon(payment.status)}
                              {payment.status.charAt(0).toUpperCase() +
                                payment.status.slice(1)}
                            </span>
                            {payment.status === "approved" && (
                              <MakePaymentButton
                                email={user?.email || ""}
                                amount={Number(payment.amount_due)}
                                repaymentScheduleId={payment.id}
                              />
                            )}
                          </div>
                        </div>
                      ))}
                    </div>
                  </CardContent>
                </Card>
              </div>
            )}
          </div>
        </main>
      </div>
    </div>
  );
}
