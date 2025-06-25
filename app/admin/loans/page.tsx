"use client";

import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";

import { Eye, Search } from "lucide-react";
import Link from "next/link";
import AdminSideBar from "@/components/Admin-sidebar";
import { useAdminAllApplications } from "@/hooks/useAdminAllApplications";
import GlobalLoading from "@/components/Global/Loading";
import { getStatusColor } from "@/utils/ColorCode";

export default function AdminLoansPage() {
  const { data: applications, isPending } = useAdminAllApplications();

  const getCreditScoreColor = (score: number) => {
    if (score >= 85) return "text-green-600";
    if (score >= 65) return "text-blue-600";
    if (score >= 45) return "text-yellow-600";
    return "text-red-600";
  };

  return (
    <div className="flex h-screen bg-gray-50">
      <AdminSideBar />

      <div className="flex-1 md:ml-64">
        <main className="flex-1 p-4 md:p-8">
          <div className="max-w-7xl mx-auto">
            {/* Header */}
            <div className="mb-8">
              <div className="flex items-center justify-between">
                <div>
                  <h1 className="text-3xl font-bold text-gray-900">
                    Loan Applications
                  </h1>
                  <p className="text-gray-600">
                    Manage and review all loan applications
                  </p>
                </div>
              </div>
            </div>

            {isPending ? (
              <div className="flex items-center justify-center h-60">
                <GlobalLoading />
              </div>
            ) : (
              <Card>
                <CardHeader>
                  <CardTitle>Applications ({applications?.length})</CardTitle>
                  <CardDescription>
                    Review and manage loan applications
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="overflow-x-auto">
                    <table className="w-full text-sm">
                      <thead>
                        <tr className="border-b">
                          <th className="text-left py-3 px-2">Applicant</th>
                          <th className="text-left py-3 px-2">Loan Details</th>
                          <th className="text-center py-3 px-2">
                            Credit Score
                          </th>
                          <th className="text-right py-3 px-2">Amount</th>
                          <th className="text-center py-3 px-2">Status</th>
                          <th className="text-center py-3 px-2">Applied</th>
                          <th className="text-center py-3 px-2">Actions</th>
                        </tr>
                      </thead>
                      <tbody>
                        {applications?.map((loan) => (
                          <tr
                            key={loan.id}
                            className="border-b hover:bg-gray-50"
                          >
                            <td className="py-4 px-2">
                              <div>
                                <p className="font-medium">{loan.user.name}</p>
                                <p className="text-gray-600 text-xs">
                                  {loan.user.email}
                                </p>
                              </div>
                            </td>
                            <td className="py-4 px-2">
                              <div>
                                <p className="font-medium">
                                  {loan?.loan_product.name}
                                </p>
                                <p className="text-gray-600 text-xs">
                                  ID: {loan.id}
                                </p>
                                <p className="text-gray-600 text-xs">
                                  {loan.purpose}
                                </p>
                              </div>
                            </td>
                            <td className="py-4 px-2 text-center">
                              <span
                                className={`font-semibold ${getCreditScoreColor(
                                  loan?.loan_score.score
                                )}`}
                              >
                                {loan?.loan_score.score}
                              </span>
                            </td>
                            <td className="py-4 px-2 text-right">
                              <span className="font-semibold">
                                ${loan.amount.toLocaleString()}
                              </span>
                            </td>
                            <td className="py-4 px-2 text-center">
                              <Badge
                                className={`text-sm px-3 py-1 rounded-full ${getStatusColor(
                                  loan.status
                                )}`}
                              >
                                {loan.status.charAt(0).toUpperCase() +
                                  loan.status.slice(1)}
                              </Badge>
                            </td>
                            <td className="py-4 px-2 text-center text-gray-600">
                              {new Date(loan?.created_at).toLocaleDateString()}
                            </td>
                            <td className="py-4 px-2 text-center">
                              <Link href={`/admin/loans/${loan.id}`}>
                                <Button variant="outline" size="sm">
                                  <Eye className="h-4 w-4 mr-1" />
                                  Review
                                </Button>
                              </Link>
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>

                  {applications?.length === 0 && (
                    <div className="text-center py-12">
                      <div className="text-gray-500">
                        <Search className="h-12 w-12 mx-auto mb-4 opacity-50" />
                        <h3 className="text-lg font-medium mb-2">
                          No applications found
                        </h3>
                        <p>Try adjusting your search criteria or filters.</p>
                      </div>
                    </div>
                  )}
                </CardContent>
              </Card>
            )}
          </div>
        </main>
      </div>
    </div>
  );
}
