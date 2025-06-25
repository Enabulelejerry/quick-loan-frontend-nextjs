"use client";

import AdminSideBar from "@/components/Admin-sidebar";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { ArrowLeft, Edit } from "lucide-react";
import Link from "next/link";
import { useParams } from "next/navigation";
import { useLoan } from "@/hooks/useAdminLoans";
import GlobalLoading from "@/components/Global/Loading";

function ViewLoan() {
  const { id } = useParams();
  const { data: loan, isPending } = useLoan(id as string);

  return (
    <div className="flex min-h-screen bg-gray-50">
      <AdminSideBar />
      <div className="flex-1 md:ml-64">
        <main className="p-4 md:p-8 max-w-5xl mx-auto">
          {/* Navigation */}
          <div className="mb-6 flex items-center justify-between">
            <Link
              href="/admin/loan-management"
              className="inline-flex items-center text-primary hover:underline"
            >
              <ArrowLeft className="h-4 w-4 mr-2" />
              Back to Loan Management
            </Link>

            <Link href={`/admin/loan-management/${loan?.id}/edit`}>
              <Button size="sm">
                <Edit className="h-4 w-4 mr-2" />
                Edit Loan Product
              </Button>
            </Link>
          </div>

          {/* Loan Overview */}

          {isPending ? (
            <div className="flex items-center justify-center h-60">
              <GlobalLoading />
            </div>
          ) : (
            <Card>
              <CardHeader className="border-b">
                <CardTitle className="text-2xl">{loan?.name}</CardTitle>
                <p className="text-sm text-muted-foreground mt-1">
                  {loan?.description}
                </p>
              </CardHeader>
              <CardContent className="grid grid-cols-1 sm:grid-cols-2 gap-6 py-6">
                <div>
                  <p className="text-sm text-muted-foreground mb-1">
                    Maximum Amount
                  </p>
                  <p className="text-lg font-semibold text-gray-800">
                    ₦{loan?.max_amount.toLocaleString()}
                  </p>
                </div>

                <div>
                  <p className="text-sm text-muted-foreground mb-1">
                    Interest Rate
                  </p>
                  <p className="text-lg font-semibold text-gray-800">
                    {loan?.interest_rate}%
                  </p>
                </div>

                <div>
                  <p className="text-sm text-muted-foreground mb-1">Duration</p>
                  <p className="text-lg font-semibold text-gray-800">
                    {loan?.duration_days} days
                  </p>
                </div>

                <div className="sm:col-span-2">
                  <p className="text-sm text-muted-foreground mb-1">
                    Created At
                  </p>
                  <p className="text-sm text-gray-700">
                    {loan?.created_at &&
                      new Date(loan.created_at).toLocaleString()}
                  </p>
                </div>
              </CardContent>
            </Card>
          )}
        </main>
      </div>
    </div>
  );
}

export default ViewLoan;
