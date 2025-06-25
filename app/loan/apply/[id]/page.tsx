"use client";

import Navbar from "@/components/navbar";
import React, { useEffect } from "react";
import { useParams, useRouter } from "next/navigation";
import { useAuth } from "@/context/AuthContext";
import { usePublicLoanDetails } from "@/hooks/usePublicLoans";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import GlobalLoading from "@/components/Global/Loading";
import { useForm } from "react-hook-form";
import useApplyForLoan from "@/hooks/useApplyForLoan";
import { toast } from "sonner";
import { handleApiError } from "@/utils/toastErrorHandler";
import { ApplyLoanPayload } from "@/types/Loan";

function LoanApplicationPage() {
  const { id } = useParams();

  const router = useRouter();
  const { user, authLoading } = useAuth();
  const { data: loan } = usePublicLoanDetails(id as string);
  const { mutate, isPending } = useApplyForLoan();
  const { register, handleSubmit } = useForm<ApplyLoanPayload>();

  useEffect(() => {
    if (!authLoading && !user) {
      router.push("/auth/login");
    }
  }, [user, authLoading, router]);

  if (authLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <GlobalLoading />
      </div>
    );
  }

  const onSubmit = (data: ApplyLoanPayload) => {
    mutate(data, {
      onSuccess: (res) => {
        toast.success(res.message || "Loan application submitted!");
        router.push("/");
      },
      onError: handleApiError,
    });
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar />
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
        <Card className="shadow-md">
          <CardHeader className="bg-primary text-white rounded-t-md py-4">
            <CardTitle className="text-2xl">Apply for {loan?.name}</CardTitle>
            <CardDescription className="text-primary-foreground/80">
              Complete your application below
            </CardDescription>
          </CardHeader>
          <CardContent className="p-6 lg:p-8">
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
              {/* Loan Details */}
              <div className="lg:col-span-1">
                <Card className="bg-primary/5">
                  <CardHeader>
                    <CardTitle className="text-lg text-primary">
                      Loan Details
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="space-y-2 text-sm text-gray-700">
                      <div className="flex justify-between">
                        <span>Product:</span>
                        <span className="font-semibold">{loan?.name}</span>
                      </div>
                      <div className="flex justify-between">
                        <span>Max Amount:</span>
                        <span className="font-semibold">
                          ₦{loan?.max_amount?.toLocaleString()}
                        </span>
                      </div>
                      <div className="flex justify-between">
                        <span>Interest Rate:</span>
                        <span className="font-semibold">
                          {loan?.interest_rate}%
                        </span>
                      </div>
                      <div className="flex justify-between">
                        <span>Duration:</span>
                        <span className="font-semibold">
                          {loan?.duration_days} days
                        </span>
                      </div>
                    </div>
                    <div className="pt-4 border-t text-sm text-gray-600">
                      {loan?.description}
                    </div>
                  </CardContent>
                </Card>
              </div>

              {/* Application Form */}
              <div className="lg:col-span-2">
                <form className="space-y-6" onSubmit={handleSubmit(onSubmit)}>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                      <Label htmlFor="name">Full Name</Label>
                      <Input
                        id="name"
                        value={user?.name}
                        disabled
                        className="bg-gray-100"
                      />
                    </div>
                    <div>
                      <Label htmlFor="email">Email</Label>
                      <Input
                        id="email"
                        value={user?.email}
                        disabled
                        className="bg-gray-100"
                      />
                    </div>
                  </div>

                  <div>
                    <Label htmlFor="amount">Loan Amount (₦)</Label>
                    <Input
                      id="amount"
                      type="number"
                      placeholder="Enter amount"
                      max={loan?.max_amount}
                      min={100}
                      required
                      {...register("amount", {
                        required: true,
                        valueAsNumber: true,
                      })}
                    />

                    <Input
                      type="hidden"
                      defaultValue={Number(id)}
                      {...register("loan_product_id", { valueAsNumber: true })}
                    />
                    <p className="text-xs text-muted-foreground mt-1">
                      Max allowed: ₦{loan?.max_amount?.toLocaleString()}
                    </p>
                  </div>

                  <div>
                    <Label htmlFor="purpose">Loan Purpose</Label>
                    <Textarea
                      id="purpose"
                      placeholder="What will you use the loan for?"
                      rows={4}
                      required
                      {...register("purpose")}
                    />
                  </div>

                  <div className="pt-4">
                    <Button
                      type="submit"
                      className="w-full sm:w-auto"
                      disabled={isPending}
                    >
                      {isPending
                        ? "Processing Application"
                        : " Submit Application"}
                    </Button>
                  </div>
                </form>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}

export default LoanApplicationPage;
