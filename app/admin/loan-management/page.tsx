"use client";

import AdminSideBar from "@/components/Admin-sidebar";
import GlobalLoading from "@/components/Global/Loading";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { useAdminLoans } from "@/hooks/useAdminLoans";

import { Edit, Eye, Search, Trash2 } from "lucide-react";
import Link from "next/link";
import React from "react";

function Page() {
  const { data: loans, isPending } = useAdminLoans();
  return (
    <div className="flex flex-col md:flex-row min-h-screen bg-gray-50">
      <AdminSideBar />

      <div className="flex-1 md:ml-64 p-4 md:p-8">
        <div className="max-w-7xl mx-auto">
          <div className="mb-8">
            <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
              <div>
                <h1 className="text-2xl sm:text-3xl font-bold text-gray-900">
                  Loan Management
                </h1>
                <p className="text-gray-600">
                  Create, manage, and monitor loan products
                </p>
              </div>
            </div>
          </div>

          <Card>
            <CardHeader>
              <CardTitle>All Loan Products ({loans?.length})</CardTitle>
              <CardDescription>Manage all your loan products</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="overflow-x-auto">
                <table className="w-full text-sm min-w-[800px]">
                  <thead>
                    <tr className="border-b">
                      <th className="text-left py-3 px-2">Product Details</th>
                      <th className="text-center py-3 px-2">Max Amount</th>
                      <th className="text-center py-3 px-2">Interest Rate</th>
                      <th className="text-center py-3 px-2">Duration</th>
                      {/* <th className="text-center py-3 px-2">Applications</th> */}
                      <th className="text-center py-3 px-2">Actions</th>
                    </tr>
                  </thead>
                  {isPending ? (
                    <div className="flex items-center justify-center h-60">
                      <GlobalLoading />
                    </div>
                  ) : (
                    <tbody>
                      {loans?.map((loan) => (
                        <tr key={loan.id} className="border-b hover:bg-gray-50">
                          <td className="py-4 px-2">
                            <div>
                              <p className="font-medium">{loan.name}</p>

                              <p className="text-gray-600 text-xs">
                                {loan.description}
                              </p>
                            </div>
                          </td>
                          <td className="py-4 px-2 text-center font-semibold">
                            N{loan.max_amount.toLocaleString()}
                          </td>
                          <td className="py-4 px-2 text-center font-semibold">
                            {loan.interest_rate}%
                          </td>
                          <td className="py-4 px-2 text-center font-semibold">
                            {loan.duration_days} days
                          </td>
                          {/* <td className="py-4 px-2 text-center">
                          <span className="font-semibold">
                            {loan.totalApplications}
                          </span>
                          <p className="text-xs text-gray-600">
                            {loan.approvedApplications} approved (
                            {Math.round(
                              (loan.approvedApplications /
                                loan.totalApplications) *
                                100
                            )}
                            %)
                          </p>
                        </td> */}
                          <td className="py-4 px-2 text-center">
                            <div className="flex justify-center gap-1">
                              <Link href={`/admin/loan-management/${loan.id}`}>
                                <Button variant="outline" size="sm">
                                  <Eye className="h-4 w-4" />
                                </Button>
                              </Link>
                              <Link
                                href={`/admin/loan-management/${loan.id}/edit`}
                              >
                                <Button variant="outline" size="sm">
                                  <Edit className="h-4 w-4" />
                                </Button>
                              </Link>
                              <Button
                                variant="outline"
                                size="sm"
                                className="text-red-600 hover:text-red-700"
                              >
                                <Trash2 className="h-4 w-4" />
                              </Button>
                            </div>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  )}
                </table>
              </div>

              {loans?.length === 0 && (
                <div className="text-center py-12">
                  <div className="text-gray-500">
                    <Search className="h-12 w-12 mx-auto mb-4 opacity-50" />
                    <h3 className="text-lg font-medium mb-2">
                      No loan products found
                    </h3>
                    <p>
                      Try adjusting your search criteria or create a new loan
                      product.
                    </p>
                    <Link href="/admin/loan-management/create">
                      <Button className="mt-4">Create New Loan</Button>
                    </Link>
                  </div>
                </div>
              )}
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}

export default Page;
