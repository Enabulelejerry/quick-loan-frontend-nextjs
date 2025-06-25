"use client";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { useForm } from "react-hook-form";
import { toast } from "sonner";

import { useParams, useRouter } from "next/navigation";
import { useLoan, useUpdateLoan } from "@/hooks/useAdminLoans";
import GlobalLoading from "../Global/Loading";
import { handleApiError } from "@/utils/toastErrorHandler";

type UpdateLoanData = {
  name: string;
  description: string;
  max_amount: number;
  interest_rate: number;
  duration_days: number;
};

function EditLoanForm() {
  const { id } = useParams();
  const { data: loan, isPending } = useLoan(id as string);
  const { register, handleSubmit } = useForm<UpdateLoanData>();
  const { mutate, isPending: isLoading } = useUpdateLoan(id as string);
  const router = useRouter();

  const onSubmit = (data: UpdateLoanData) => {
    mutate(data, {
      onSuccess: (response) => {
        toast.success(response.message || "Loan product updated successfully!");
        router.push("/admin/loan-management");
      },
      onError: handleApiError,
    });
  };

  return (
    <div>
      {isPending ? (
        <div className="flex items-center justify-center h-60">
          <GlobalLoading />
        </div>
      ) : (
        <form className="space-y-6" onSubmit={handleSubmit(onSubmit)}>
          {/* Basic Information */}
          <Card>
            <CardHeader>
              <CardTitle>Basic Information</CardTitle>
              <CardDescription>
                Core details about the loan product
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div>
                <Label htmlFor="name">Loan Product Name *</Label>
                <Input
                  id="name"
                  defaultValue={loan?.name}
                  {...register("name")}
                  required
                />
              </div>

              <div>
                <Label htmlFor="description">Description *</Label>
                <Textarea
                  id="description"
                  defaultValue={loan?.description}
                  {...register("description")}
                  required
                />
              </div>
            </CardContent>
          </Card>

          {/* Financial Terms */}
          <Card>
            <CardHeader>
              <CardTitle>Financial Terms</CardTitle>
              <CardDescription>
                Set the financial parameters for this loan
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div>
                <Label htmlFor="maxAmount">Maximum Amount (N) *</Label>
                <Input
                  id="maxAmount"
                  {...register("max_amount", { valueAsNumber: true })}
                  type="number"
                  defaultValue={loan?.max_amount}
                  required
                />
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="interestRate">Interest Rate (%) *</Label>
                  <Input
                    id="interestRate"
                    type="number"
                    step="0.1"
                    defaultValue={loan?.interest_rate}
                    required
                    {...register("interest_rate", { valueAsNumber: true })}
                  />
                </div>
                <div>
                  <Label htmlFor="duration">Duration (days) *</Label>
                  <Input
                    id="duration"
                    type="number"
                    {...register("duration_days", { valueAsNumber: true })}
                    defaultValue={loan?.duration_days}
                    required
                  />
                </div>
              </div>
            </CardContent>
          </Card>

          <Button
            type="submit"
            size="lg"
            className="w-full sm:w-auto"
            disabled={isLoading}
          >
            {isLoading ? "updating..." : "Update Loan"}
          </Button>
        </form>
      )}
    </div>
  );
}

export default EditLoanForm;
