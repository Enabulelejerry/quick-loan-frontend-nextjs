"use client";

import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";

import { Eye, Search } from "lucide-react";
import Link from "next/link";

import UserSidebar from "@/components/User-siderbar";
import { useAuthUserLoans } from "@/hooks/useAuthUserLoans";
import GlobalLoading from "@/components/Global/Loading";
import { getStatusColor } from "@/utils/ColorCode";

export default function LoanHistoryPage() {
  const { data: loans, isPending } = useAuthUserLoans();

  return (
    <div className="flex h-screen bg-gray-50">
      <UserSidebar />

      <div className="flex-1 md:ml-64">
        <main className="flex-1 p-4 md:p-8">
          <div className="max-w-6xl mx-auto">
            {/* Header */}
            <div className="mb-8">
              <h1 className="text-3xl font-bold text-gray-900">Loan History</h1>
              <p className="text-gray-600">
                View all your past and current loan applications
              </p>
            </div>

            {/* Loan List */}

            {isPending ? (
              <div className="flex items-center justify-center h-60">
                <GlobalLoading />
              </div>
            ) : (
              <div className="space-y-4">
                {loans?.map((loan) => (
                  <Card
                    key={loan?.id}
                    className="hover:shadow-md transition-shadow"
                  >
                    <CardContent className="p-6">
                      <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4">
                        <div className="flex-1">
                          <div className="flex items-center gap-3 mb-2">
                            <h3 className="text-lg font-semibold">
                              {loan.loan_product.name}
                            </h3>
                            <Badge
                              className={`text-sm px-3 py-1 rounded-full ${getStatusColor(
                                loan.status
                              )}`}
                            >
                              {loan.status.charAt(0).toUpperCase() +
                                loan.status.slice(1)}
                            </Badge>
                          </div>

                          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-sm">
                            <div>
                              <p className="text-gray-600">Loan ID</p>
                              <p className="font-medium">ID00{loan.id}</p>
                            </div>
                            <div>
                              <p className="text-gray-600">Amount</p>
                              <p className="font-medium">₦{loan?.amount}</p>
                            </div>
                            <div>
                              <p className="text-gray-600">Applied Date</p>
                              <p className="font-medium">
                                {new Date(
                                  loan?.created_at
                                ).toLocaleDateString()}
                              </p>
                            </div>
                            <div>
                              <p className="text-gray-600">Interest Rate</p>
                              <p className="font-medium">
                                {loan.interest_rate}%
                              </p>
                            </div>
                          </div>

                          {loan.status === "rejected" && (
                            <div className="mt-4 p-3 bg-red-50 rounded-lg">
                              <p className="text-red-700 text-sm">
                                Application was not approved. Contact support
                                for more details.
                              </p>
                            </div>
                          )}

                          {loan.status === "pending" && (
                            <div className="mt-4 p-3 bg-yellow-50 rounded-lg">
                              <p className="text-yellow-700 text-sm">
                                Your application is under review. You `&apos;`ll
                                receive an update within 24 hours.
                              </p>
                            </div>
                          )}
                        </div>

                        <div className="flex flex-col sm:flex-row gap-2">
                          <Link href={`/user/loans/${loan.id}`}>
                            <Button
                              variant="outline"
                              size="sm"
                              className="w-full sm:w-auto"
                            >
                              <Eye className="h-4 w-4 mr-2" />
                              View Details
                            </Button>
                          </Link>
                          {loan.status === "active" && (
                            <Button size="sm" className="w-full sm:w-auto">
                              Make Payment
                            </Button>
                          )}
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                ))}

                {loans?.length === 0 && (
                  <Card>
                    <CardContent className="text-center py-12">
                      <div className="text-gray-500">
                        <Search className="h-12 w-12 mx-auto mb-4 opacity-50" />
                        <h3 className="text-lg font-medium mb-2">
                          No loans found
                        </h3>
                        <p>
                          Try adjusting your search criteria or apply for a new
                          loan.
                        </p>
                        <Link href="/user/apply">
                          <Button className="mt-4">Apply for Loan</Button>
                        </Link>
                      </div>
                    </CardContent>
                  </Card>
                )}
              </div>
            )}
          </div>
        </main>
      </div>
    </div>
  );
}
